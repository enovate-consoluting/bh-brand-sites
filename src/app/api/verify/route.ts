import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const clientId = searchParams.get('clientId'); // For preview mode

  if (!code) {
    return NextResponse.json(
      { valid: false, message: 'No code provided' },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // If clientId is provided (preview mode), use it directly
  // Otherwise, look up the client by domain
  let targetClientId = clientId;

  if (!targetClientId) {
    // Get domain from request headers
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const domain = host.replace(/:\d+$/, ''); // Remove port if present

    // Look up client by domain
    const { data: domainRecord } = await supabase
      .from('client_domains')
      .select('client_id')
      .eq('domain', domain)
      .single();

    if (domainRecord) {
      targetClientId = domainRecord.client_id;
    }
  }

  if (!targetClientId) {
    return NextResponse.json(
      { valid: false, message: 'Could not determine client' },
      { status: 400 }
    );
  }

  // First, get all label_pass_detail_ids for this client
  const { data: details } = await supabase
    .from('label_pass_detail')
    .select('label_pass_detail_id')
    .eq('client_id', targetClientId)
    .eq('active', 'Y');

  if (!details || details.length === 0) {
    return NextResponse.json({
      valid: false,
      message: 'No verification batches found for this client.',
    });
  }

  const detailIds = details.map(d => d.label_pass_detail_id);

  // Look up the code in label_password table
  const { data: labelCode } = await supabase
    .from('label_password')
    .select('password, serial_num, label_pass_detail_id, active')
    .eq('password', code.toUpperCase())
    .in('label_pass_detail_id', detailIds)
    .eq('active', 'Y')
    .single();

  if (labelCode) {
    return NextResponse.json({
      valid: true,
      message: 'Authentic product',
      serial: labelCode.serial_num || code,
    });
  }

  // Also check nfc_chips table as fallback
  const { data: chip } = await supabase
    .from('nfc_chips')
    .select('*')
    .eq('public_id', code.toUpperCase())
    .eq('client_id', targetClientId)
    .single();

  if (chip) {
    return NextResponse.json({
      valid: true,
      message: 'Authentic product',
      serial: code,
    });
  }

  return NextResponse.json({
    valid: false,
    message: 'Code not found. This product may not be authentic.',
  });
}
