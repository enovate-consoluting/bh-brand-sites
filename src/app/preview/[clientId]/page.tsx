import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteConfigById } from '@/lib/get-site-config-by-id';
import { getClientSlug } from '@/types/database';
import { getBrandAssets, getBrandOverride } from '@/brands';
import { VerifyForm } from '@/components/VerifyForm';

interface PreviewPageProps {
  params: Promise<{ clientId: string }>;
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { clientId } = await params;
  const siteConfig = await getSiteConfigById(clientId);

  if (!siteConfig) {
    return { title: 'Client Not Found' };
  }

  const { client } = siteConfig;
  const slug = getClientSlug(client);
  const brandAssets = getBrandAssets(slug);
  const displayName = slug === 'arcadia' || slug === 'lucid' ? 'Arcadia' : client.company_name;

  return {
    title: displayName,
    icons: brandAssets.favicon ? {
      icon: [{ url: brandAssets.favicon, type: 'image/png' }],
      shortcut: brandAssets.favicon,
      apple: brandAssets.favicon,
    } : undefined,
  };
}

export default async function PreviewHomePage({ params }: PreviewPageProps) {
  const { clientId } = await params;
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
  const brandOverride = getBrandOverride(slug);

  // Check if brand has a custom HomePage component
  if (brandOverride?.HomePage) {
    const CustomHomePage = brandOverride.HomePage;
    return (
      <>
        {/* Preview Banner */}
        <div className="bg-yellow-400 text-black text-center py-2 text-sm font-medium fixed top-0 left-0 right-0 z-[100]">
          PREVIEW MODE - {slug === 'arcadia' || slug === 'lucid' ? 'Arcadia' : client.company_name} (ID: {clientId})
          {' | '}
          <Link href="/preview" className="underline">View All Clients</Link>
        </div>
        <div className="pt-8" style={{ backgroundColor: 'transparent' }}>
          <CustomHomePage siteConfig={siteConfig} previewClientId={clientId} />
        </div>
      </>
    );
  }

  // Default template for brands without custom components
  const backgroundColor = branding?.background_color || '#ffffff';
  const textColor = branding?.text_color || '#000000';
  const buttonColor = branding?.button_color || '#000000';
  const buttonTextColor = branding?.button_text_color || '#ffffff';

  // Validate logo URL - must be absolute URL or start with /
  const rawLogoUrl = branding?.large_logo_url || client.logo_url;
  const logoUrl = rawLogoUrl && (rawLogoUrl.startsWith('http') || rawLogoUrl.startsWith('/'))
    ? rawLogoUrl
    : null;

  // Find linktree link if exists
  const linktreeLink = socialLinks.find(link => link.platform.toLowerCase() === 'linktree');

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor, color: textColor }}
    >
      {/* Preview Banner */}
      <div className="bg-yellow-400 text-black text-center py-2 text-sm font-medium">
        PREVIEW MODE - {client.company_name} (ID: {clientId})
        {' | '}
        <Link href="/preview" className="underline">View All Clients</Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Logo */}
          {logoUrl && (
            <div className="w-full max-w-xs md:max-w-sm mb-8">
              <Image
                src={logoUrl}
                alt={client.company_name}
                width={400}
                height={400}
                className="w-full h-auto"
                priority
                unoptimized={logoUrl?.endsWith('.gif')}
              />
            </div>
          )}

          {/* Verify Section */}
          <div className="w-full max-w-md text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wide">
              Verify Your Product
            </h1>

            <VerifyForm
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              previewClientId={clientId}
              logoUrl={logoUrl || undefined}
              companyName={client.company_name}
              successIcon={brandAssets.verifySuccessIcon}
              failedIcon={brandAssets.verifyFailedIcon}
            />

            {/* Follow Us */}
            {linktreeLink && brandAssets.linktreeIcon && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">
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
