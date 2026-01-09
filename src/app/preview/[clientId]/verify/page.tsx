import Link from 'next/link';
import { getSiteConfigById } from '@/lib/get-site-config-by-id';

interface PreviewVerifyPageProps {
  params: Promise<{ clientId: string }>;
}

export default async function PreviewVerifyPage({ params }: PreviewVerifyPageProps) {
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

  const { client, branding } = siteConfig;
  const backgroundColor = branding?.background_color || '#ffffff';
  const textColor = branding?.text_color || '#000000';

  // Security: Block direct URL access to verify page
  // All verification must go through the form on the homepage
  return (
    <main className="min-h-screen" style={{ backgroundColor, color: textColor }}>
      {/* Preview Banner */}
      <div className="bg-yellow-400 text-black text-center py-2 text-sm font-medium fixed top-0 left-0 right-0 z-[100]">
        PREVIEW MODE - {client.company_name} (ID: {clientId})
        {' | '}
        <Link href="/preview" className="underline">View All Clients</Link>
      </div>

      <div className="min-h-screen flex items-center justify-center p-8 pt-16">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold mb-4">Direct URL Access Not Allowed</h1>

          <p className="mb-6" style={{ opacity: 0.7 }}>
            For security reasons, verification codes cannot be accessed directly via URL.
            This helps protect against code sharing and unauthorized verification attempts.
          </p>

          <p className="mb-8" style={{ opacity: 0.7 }}>
            Please use the verification form on the homepage to verify your product.
          </p>

          <Link
            href={`/preview/${clientId}`}
            className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Go to Verification Form
          </Link>
        </div>
      </div>
    </main>
  );
}
