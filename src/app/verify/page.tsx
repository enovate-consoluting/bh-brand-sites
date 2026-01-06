import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/get-site-config';
import { createClient } from '@/lib/supabase/server';

interface VerifyPageProps {
  searchParams: Promise<{ code?: string }>;
}

interface VerificationResult {
  verified: boolean;
  message: string;
}

async function verifyCode(code: string, clientId: string): Promise<VerificationResult> {
  const supabase = await createClient();

  // Look up the chip by public_id in nfc_chips table
  const { data: chip } = await supabase
    .from('nfc_chips')
    .select('*')
    .eq('public_id', code)
    .eq('client_id', clientId)
    .single();

  if (chip) {
    return {
      verified: true,
      message: 'Authentic product',
    };
  }

  // TODO: Also check label_password table once migrated

  return {
    verified: false,
    message: 'Code not found. This product is not valid. Please contact your vendor.',
  };
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const code = params.code || '';

  const headersList = await headers();
  const host = headersList.get('host') || 'localhost';
  const domain = host.split(':')[0];

  const siteConfig = await getSiteConfig(domain);

  if (!siteConfig) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Site Not Found</h1>
          <p className="text-gray-600">
            This domain is not configured. Please contact support.
          </p>
        </div>
      </main>
    );
  }

  const { client, branding, socialLinks } = siteConfig;
  const backgroundColor = branding?.background_color || '#ffffff';
  const textColor = branding?.text_color || '#000000';
  const logoUrl = branding?.large_logo_url || client.logo_url;

  // Find linktree link
  const linktreeLink = socialLinks.find(link => link.platform.toLowerCase() === 'linktree');

  let result: VerificationResult | null = null;
  if (code) {
    result = await verifyCode(code, client.client_id);
  }

  // If no code provided, redirect-like behavior
  if (!code) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor, color: textColor }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please enter a code.</h1>
          <Link href="/" className="underline">Go back</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor, color: textColor }}>
      {/* Verification Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="w-full max-w-sm rounded-2xl p-6 text-center"
          style={{ backgroundColor: '#ffdcdd' }}
        >
          {result?.verified ? (
            <>
              {/* Success Icon */}
              <div className="mb-4">
                <Image
                  src="/images/fryd/verify_success.png"
                  alt="Verified"
                  width={85}
                  height={85}
                  className="mx-auto"
                />
              </div>

              {/* Authentic product text */}
              <h5 className="text-black text-lg font-medium mb-4">
                Authentic product
              </h5>

              {/* Small logo */}
              {logoUrl && (
                <div className="mb-4">
                  <Image
                    src={logoUrl}
                    alt={client.company_name}
                    width={122}
                    height={122}
                    className="mx-auto rounded-2xl"
                    unoptimized={logoUrl.endsWith('.gif')}
                  />
                </div>
              )}

              {/* Serial number */}
              <h1 className="text-black text-lg font-medium">
                Serial# {code}
              </h1>
            </>
          ) : (
            <>
              {/* Failed verification */}
              <div className="mb-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              <h5 className="text-black text-lg font-medium mb-4">
                Verification Failed
              </h5>

              <p className="text-gray-700 text-sm mb-4">
                {result?.message}
              </p>

              <p className="text-gray-500 text-sm">
                Code entered: {code}
              </p>
            </>
          )}

          {/* Close/Back button */}
          <Link
            href="/"
            className="inline-block mt-6 text-gray-600 hover:text-gray-800 text-sm underline"
          >
            Verify another product
          </Link>
        </div>
      </div>

      {/* Background content (dimmed) */}
      <div className="container mx-auto px-4 py-8 opacity-50">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {logoUrl && (
            <div className="w-full max-w-xs md:max-w-sm mb-8">
              <Image
                src={logoUrl}
                alt={client.company_name}
                width={400}
                height={400}
                className="w-full h-auto"
                unoptimized={logoUrl.endsWith('.gif')}
              />
            </div>
          )}

          <div className="w-full max-w-md text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wide">
              Verify Your Product
            </h1>

            {linktreeLink && (
              <div className="mt-8">
                <h2 className="text-xl font-bold">
                  Follow us:
                  <a
                    href={`https://linktr.ee/${linktreeLink.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block ml-3 align-middle"
                  >
                    <Image
                      src="/images/fryd/linktree.png"
                      alt="Linktree"
                      width={60}
                      height={60}
                      className="inline-block"
                    />
                  </a>
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
