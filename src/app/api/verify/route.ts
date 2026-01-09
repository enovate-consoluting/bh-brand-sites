import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';

interface VerificationResult {
  valid: boolean;
  message: string;
  serial?: string;
  alreadyVerified?: boolean;
}

async function verifyCode(code: string, clientId: string): Promise<VerificationResult> {
  const supabase = await createClient();
  const trimmedCode = code.trim().toUpperCase();

  // First check NFC chips table
  const { data: chip } = await supabase
    .from('nfc_chips')
    .select('*')
    .eq('public_id', trimmedCode)
    .eq('client_id', clientId)
    .single();

  if (chip) {
    return {
      valid: true,
      message: 'Authentic product',
      serial: trimmedCode,
    };
  }

  // Then check label passwords table (separate queries - no FK relationship)
  const { data: passwordData } = await supabase
    .from('label_password')
    .select('*')
    .eq('password', trimmedCode)
    .eq('active', 'Y')
    .limit(1);

  if (passwordData && passwordData.length > 0) {
    const password = passwordData[0];

    // Get the label_pass_detail
    const { data: detailData } = await supabase
      .from('label_pass_detail')
      .select('*')
      .eq('label_pass_detail_id', password.label_pass_detail_id)
      .eq('active', 'Y')
      .limit(1);

    if (detailData && detailData.length > 0) {
      const detail = detailData[0];

      // Check if this detail belongs to the requested client
      if (String(detail.client_id) === clientId) {
        // Check verify_once logic (Option 1 security)
        if (detail.verify_once === 'Y' && password.verify_once_override !== 'N') {
          const { data: existingValidation } = await supabase
            .from('label_password_validation')
            .select('label_pass_val_id')
            .eq('password', trimmedCode)
            .limit(1);

          if (existingValidation && existingValidation.length > 0) {
            return {
              valid: false,
              alreadyVerified: true,
              message: detail.verify_once_msg || 'This code has already been validated.',
            };
          }
        }

        // Log the validation
        await supabase
          .from('label_password_validation')
          .insert({
            label_pass_detail_id: detail.label_pass_detail_id,
            create_dt: new Date().toISOString(),
            password: trimmedCode
          });

        return {
          valid: true,
          message: detail.label_validation_msg || 'Authentic product',
          serial: password.serial_num || trimmedCode,
        };
      }
    }
  }

  return {
    valid: false,
    message: 'Code not found. This product may not be authentic.',
  };
}

async function getClientId(request: NextRequest, providedClientId?: string | null): Promise<string | null> {
  if (providedClientId) {
    return providedClientId;
  }

  const supabase = await createClient();
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const domain = host.replace(/:\d+$/, ''); // Remove port if present

  const { data: domainRecord } = await supabase
    .from('client_domains')
    .select('client_id')
    .eq('domain', domain)
    .single();

  return domainRecord?.client_id || null;
}

// Generate a unique result token
function generateResultToken(): string {
  return `vr_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// POST handler - Primary secure method (Option 2)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, clientId: providedClientId } = body;

    if (!code) {
      return NextResponse.json(
        { valid: false, message: 'No code provided' },
        { status: 400 }
      );
    }

    const clientId = await getClientId(request, providedClientId);

    if (!clientId) {
      return NextResponse.json(
        { valid: false, message: 'Could not determine client' },
        { status: 400 }
      );
    }

    const result = await verifyCode(code, clientId);

    // Generate a result token and store in cookie (Option 2 - no code in URL)
    const resultToken = generateResultToken();
    const cookieStore = await cookies();

    // Store result in a short-lived cookie (5 minutes)
    cookieStore.set('verify_result', JSON.stringify({
      token: resultToken,
      ...result,
      timestamp: Date.now(),
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 300, // 5 minutes
      path: '/',
    });

    return NextResponse.json({
      ...result,
      resultToken, // Client can use this to redirect to results page
    });
  } catch {
    return NextResponse.json(
      { valid: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}

// GET handler - Blocked for security
// Returns a friendly message directing users to use the proper verification form
export async function GET() {
  return NextResponse.json(
    {
      valid: false,
      message: 'Direct URL verification is not allowed for security reasons. Please use the verification form on the website to verify your product.',
      error: 'METHOD_NOT_ALLOWED',
      hint: 'Go to the homepage and enter your code in the verification form.',
    },
    { status: 405 }
  );
}
