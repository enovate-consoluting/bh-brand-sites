import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfigById } from '@/lib/get-site-config-by-id';
import { getClientSlug } from '@/types/database';
import { getBrandAssets } from '@/brands';
import { createClient } from '@/lib/supabase/server';

interface PreviewVerifyPageProps {
  params: Promise<{ clientId: string }>;
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

  return {
    verified: false,
    message: 'Code not found. This product is not valid. Please contact your vendor.',
  };
}

export default async function PreviewVerifyPage({ params, searchParams }: PreviewVerifyPageProps) {
  const { clientId } = await params;
  const { code = '' } = await searchParams;

  const siteConfig = await getSiteConfigById(clientId);

  if (!siteConfig) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Client Not Found</h1>
          <p className="text-gray-600 mb-4">
            No client with ID: {clientId}
          </p>
          <Link href="/preview" className="text-blue-600 underline">
            View all clients
          </Link>
        </div>
      </main>
    );
  }

  const { client, branding, socialLinks } = siteConfig;
  const slug = getClientSlug(client);
  const brandAssets = getBrandAssets(slug);

  const backgroundColor = branding?.background_color || '#ffffff';
  const textColor = branding?.text_color || '#000000';

  // Validate logo URL - must be absolute URL or start with /
  const rawLogoUrl = branding?.large_logo_url || client.logo_url;
  const logoUrl = rawLogoUrl && (rawLogoUrl.startsWith('http') || rawLogoUrl.startsWith('/'))
    ? rawLogoUrl
    : null;

  // Find linktree link
  const linktreeLink = socialLinks.find(link => link.platform.toLowerCase() === 'linktree');

  let result: VerificationResult | null = null;
  if (code) {
    result = await verifyCode(code, clientId);
  }

  // If no code provided
  if (!code) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor, color: textColor }}>
        <div className="bg-yellow-400 text-black text-center py-2 text-sm font-medium fixed top-0 left-0 right-0">
          PREVIEW MODE - {client.company_name} (ID: {clientId})
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please enter a code.</h1>
          <Link href={`/preview/${clientId}`} className="underline">Go back</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor, color: textColor }}>
      {/* Preview Banner */}
      <div className="bg-yellow-400 text-black text-center py-2 text-sm font-medium fixed top-0 left-0 right-0 z-[100]">
        PREVIEW MODE - {client.company_name} (ID: {clientId})
        {' | '}
        <Link href="/preview" className="underline">View All Clients</Link>
      </div>

      {/* Verification Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pt-12">
        <div
          className="w-full max-w-sm rounded-2xl p-6 text-center"
          style={{ backgroundColor: '#fafafa' }}
        >
          {result?.verified ? (
            <>
              {/* Success Icon */}
              <div className="mb-4">
                <Image
                  src={brandAssets.verifySuccessIcon || '/images/default/verify_success.svg'}
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
                    unoptimized={logoUrl?.endsWith('.gif')}
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
                <Image
                  src={brandAssets.verifyFailedIcon || '/images/default/verify_failed.svg'}
                  alt="Failed"
                  width={80}
                  height={80}
                  className="mx-auto"
                />
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
            href={`/preview/${clientId}`}
            className="inline-block mt-6 text-gray-600 hover:text-gray-800 text-sm underline"
          >
            Verify another product
          </Link>
        </div>
      </div>

      {/* Background content (dimmed) */}
      <div className="container mx-auto px-4 py-8 opacity-50 pt-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {logoUrl && (
            <div className="w-full max-w-xs md:max-w-sm mb-8">
              <Image
                src={logoUrl}
                alt={client.company_name}
                width={400}
                height={400}
                className="w-full h-auto"
                unoptimized={logoUrl?.endsWith('.gif')}
              />
            </div>
          )}

          <div className="w-full max-w-md text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wide">
              Verify Your Product
            </h1>

            {linktreeLink && brandAssets.linktreeIcon && (
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
                      src={brandAssets.linktreeIcon}
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
