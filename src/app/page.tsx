import { headers } from 'next/headers';
import Image from 'next/image';
import { getSiteConfig } from '@/lib/get-site-config';
import { VerifyForm } from '@/components/VerifyForm';
import { SocialLinks } from '@/components/SocialLinks';

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
  const logoUrl = branding?.large_logo_url || client.logo_url;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="w-full max-w-lg flex flex-col items-center gap-8">
        {logoUrl && (
          <div className="relative w-48 h-24">
            <Image
              src={logoUrl}
              alt={client.company_name}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Product Verification</h1>
          <p className="opacity-80">
            Verify the authenticity of your {client.company_name} product
          </p>
        </div>

        <VerifyForm
          primaryColor={client.primary_color}
          textColor={textColor}
        />

        {socialLinks.length > 0 && (
          <div className="mt-8">
            <p className="text-sm opacity-60 mb-3 text-center">Follow us</p>
            <SocialLinks links={socialLinks} textColor={textColor} />
          </div>
        )}

        <footer className="mt-12 text-sm opacity-50">
          &copy; {new Date().getFullYear()} {client.company_name}. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
