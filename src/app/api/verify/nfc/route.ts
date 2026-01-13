import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

// Decryption key from legacy system
const BLOWFISH_KEY = 'zQmbEXgl2pYjf4f8xdA1/g==';

interface NFCVerificationResult {
  valid: boolean;
  message: string;
  scanCount?: number;
  productPage?: string;
  tagId?: number;
  error?: string;
}

/**
 * Decrypt the NFC tag ID using BLOWFISH
 * Legacy ColdFusion used: Decrypt(URL.id, key, 'BLOWFISH', 'Hex')
 */
function decryptTagId(encryptedId: string): number | null {
  try {
    // Convert hex string to buffer
    const encryptedBuffer = Buffer.from(encryptedId, 'hex');

    // Create decipher with BLOWFISH-ECB (ColdFusion default)
    const decipher = crypto.createDecipheriv(
      'bf-ecb',
      Buffer.from(BLOWFISH_KEY, 'base64'),
      null // ECB mode doesn't use IV
    );
    decipher.setAutoPadding(true);

    // Decrypt
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Parse as number (seq_num)
    const seqNum = parseInt(decrypted.toString('utf8').trim(), 10);

    if (isNaN(seqNum)) {
      return null;
    }

    return seqNum;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}

/**
 * Check if User-Agent is from a mobile device (Android or iOS)
 * NFC tags must be tapped from a phone - desktop browsers are rejected
 */
function isMobileDevice(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return ua.includes('android') || ua.includes('iphone') || ua.includes('ipad');
}

/**
 * Get geolocation data from IP (using ip-api.com - free, no key needed)
 */
async function getGeolocation(ip: string): Promise<Record<string, unknown> | null> {
  // Skip for localhost/private IPs
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return null;
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,query`);
    const data = await response.json();

    if (data.status === 'success') {
      return {
        ip: data.query,
        ip_type: 'IPv4',
        continent_code: data.continentCode,
        continent_name: data.continent,
        country_code: data.countryCode,
        country_name: data.country,
        region_code: data.region,
        region_name: data.regionName,
        city: data.city,
        zip: data.zip,
        latitude: data.lat,
        longitude: data.lon,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Log the tap to tap_location table
 */
async function logTap(
  supabase: Awaited<ReturnType<typeof createClient>>,
  tagId: number,
  encryptedId: string,
  ip: string,
  userAgent: string,
  live: number
): Promise<void> {
  try {
    // Get geolocation
    const geo = await getGeolocation(ip);

    await supabase.from('tap_location').insert({
      tag_id: tagId,
      encrypted_id: encryptedId,
      ip: ip,
      ip_type: geo?.ip_type || null,
      continent_code: geo?.continent_code || null,
      continent_name: geo?.continent_name || null,
      country_code: geo?.country_code || null,
      country_name: geo?.country_name || null,
      region_code: geo?.region_code || null,
      region_name: geo?.region_name || null,
      city: geo?.city || null,
      zip: geo?.zip || null,
      latitude: geo?.latitude || null,
      longitude: geo?.longitude || null,
      live: live,
      user_agent: userAgent,
      create_dt: new Date().toISOString(),
    });
  } catch (error) {
    // Don't fail verification if logging fails
    console.error('Failed to log tap:', error);
  }
}

/**
 * GET /api/verify/nfc?id=ENCRYPTED_ID
 *
 * NFC verification endpoint
 * - Decrypts the encrypted tag ID
 * - Validates against nfc_tag table
 * - Logs the tap
 * - Returns scan count and validity
 */
export async function GET(request: NextRequest): Promise<NextResponse<NFCVerificationResult>> {
  const searchParams = request.nextUrl.searchParams;
  const encryptedId = searchParams.get('id');

  // Get client info
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0] ||
             headersList.get('x-real-ip') ||
             '0.0.0.0';
  const userAgent = headersList.get('user-agent') || '';

  // Check if request is from a mobile device (NFC must be tapped from phone)
  if (!isMobileDevice(userAgent)) {
    return NextResponse.json({
      valid: false,
      message: 'This NFC product is NOT AUTHENTIC! This link is unique to one NFC chip that has been compromised and currently has been discontinued.',
      error: 'NOT_MOBILE_DEVICE',
    });
  }

  // No ID provided
  if (!encryptedId) {
    return NextResponse.json({
      valid: false,
      message: 'No tag ID provided. Please tap an NFC tag to verify.',
      error: 'MISSING_ID',
    }, { status: 400 });
  }

  // Decrypt the tag ID
  const seqNum = decryptTagId(encryptedId);

  if (seqNum === null) {
    return NextResponse.json({
      valid: false,
      message: 'Invalid tag. This product could not be verified.',
      error: 'DECRYPT_FAILED',
    }, { status: 400 });
  }

  const supabase = await createClient();

  // Look up the tag by seq_num
  const { data: tag, error: tagError } = await supabase
    .from('nfc_tag')
    .select('tag_id, seq_num, client_id, product_page, live')
    .eq('seq_num', seqNum)
    .single();

  if (tagError || !tag) {
    return NextResponse.json({
      valid: false,
      message: 'This NFC product is NOT AUTHENTIC! This link is unique to one NFC chip that has been compromised or does not exist.',
      error: 'TAG_NOT_FOUND',
    });
  }

  // Check if tag is live (active)
  if (tag.live !== 1) {
    // Log the tap even for inactive tags
    await logTap(supabase, tag.tag_id, encryptedId, ip, userAgent, 0);

    return NextResponse.json({
      valid: false,
      message: 'This NFC product is NOT AUTHENTIC! This link is unique to one NFC chip that has been compromised and currently has been discontinued.',
      error: 'TAG_INACTIVE',
    });
  }

  // Log the successful tap
  await logTap(supabase, tag.tag_id, encryptedId, ip, userAgent, 1);

  // Get scan count
  const { count: scanCount } = await supabase
    .from('tap_location')
    .select('*', { count: 'exact', head: true })
    .eq('tag_id', tag.tag_id);

  return NextResponse.json({
    valid: true,
    message: 'Authentic Product',
    scanCount: scanCount || 1,
    productPage: tag.product_page,
    tagId: tag.tag_id,
  });
}

/**
 * POST /api/verify/nfc
 * Body: { id: "ENCRYPTED_ID" }
 *
 * Alternative POST method for NFC verification
 */
export async function POST(request: NextRequest): Promise<NextResponse<NFCVerificationResult>> {
  try {
    const body = await request.json();
    const encryptedId = body.id;

    if (!encryptedId) {
      return NextResponse.json({
        valid: false,
        message: 'No tag ID provided.',
        error: 'MISSING_ID',
      }, { status: 400 });
    }

    // Reuse GET logic by creating a new request with query params
    const url = new URL(request.url);
    url.searchParams.set('id', encryptedId);
    const getRequest = new NextRequest(url, {
      method: 'GET',
      headers: request.headers,
    });

    return GET(getRequest);
  } catch {
    return NextResponse.json({
      valid: false,
      message: 'Invalid request',
      error: 'INVALID_REQUEST',
    }, { status: 400 });
  }
}
