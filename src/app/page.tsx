import { headers } from 'next/headers';
import Image from 'next/image';
import { getSiteConfig } from '@/lib/get-site-config';
import { VerifyForm } from '@/components/VerifyForm';

export default async function HomePage() {
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
  const buttonColor = branding?.button_color || '#000000';
  const buttonTextColor = branding?.button_text_color || '#ffffff';
  const logoUrl = branding?.large_logo_url || client.logo_url;

  // Find linktree link if exists
  const linktreeLink = socialLinks.find(link => link.platform.toLowerCase() === 'linktree');

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor, color: textColor }}
    >
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
                unoptimized={logoUrl.endsWith('.gif')}
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
            />

            {/* Follow Us */}
            {linktreeLink && (
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
