import { headers } from 'next/headers';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/get-site-config';

export default async function VerifyPage() {
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

  const { branding } = siteConfig;
  const backgroundColor = branding?.background_color || '#ffffff';
  const textColor = branding?.text_color || '#000000';

  // Security: Block direct URL access to verify page
  // All verification must go through the form on the homepage
  return (
    <main className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor, color: textColor }}>
      <div className="max-w-md text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-yellow-500\" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Direct URL Access Not Allowed</h1>

        <p className="text-gray-600 mb-6" style={{ color: textColor, opacity: 0.7 }}>
          For security reasons, verification codes cannot be accessed directly via URL.
          This helps protect against code sharing and unauthorized verification attempts.
        </p>

        <p className="text-gray-600 mb-8" style={{ color: textColor, opacity: 0.7 }}>
          Please use the verification form on our homepage to verify your product.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Go to Verification Form
        </Link>
      </div>
    </main>
  );
}
