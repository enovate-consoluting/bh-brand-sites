import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/get-site-config';
import { createClient } from '@/lib/supabase/server';
import type { Product, NfcChip } from '@/types/database';

interface VerifyPageProps {
  searchParams: Promise<{ code?: string }>;
}

interface VerificationResult {
  verified: boolean;
  chip?: NfcChip;
  product?: Product;
  message: string;
}

async function verifyCode(code: string, clientId: string): Promise<VerificationResult> {
  const supabase = await createClient();

  // Look up the chip by public_id
  const { data: chip, error } = await supabase
    .from('nfc_chips')
    .select('*')
    .eq('public_id', code)
    .eq('client_id', clientId)
    .single();

  if (error || !chip) {
    return {
      verified: false,
      message: 'This code could not be verified. Please check the code and try again.',
    };
  }

  // If chip has a product_id, fetch the product
  let product: Product | undefined;
  if (chip.product_id) {
    const { data: productData } = await supabase
      .from('products')
      .select('*')
      .eq('product_id', chip.product_id)
      .single();

    if (productData) {
      product = productData as Product;
    }
  }

  return {
    verified: true,
    chip: chip as NfcChip,
    product,
    message: 'This product is authentic!',
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

  const { client, branding } = siteConfig;
  const backgroundColor = branding?.background_color || '#ffffff';
  const textColor = branding?.text_color || '#000000';
  const logoUrl = branding?.large_logo_url || client.logo_url;

  let result: VerificationResult | null = null;
  if (code) {
    result = await verifyCode(code, client.client_id);
  }

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

        {!code ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Code Provided</h1>
            <p className="opacity-80 mb-6">
              Please enter a verification code to check your product.
            </p>
            <Link
              href="/"
              className="inline-block py-3 px-6 rounded-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: client.primary_color, color: textColor }}
            >
              Go to Verification
            </Link>
          </div>
        ) : result ? (
          <div className="text-center w-full">
            {result.verified ? (
              <>
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#22c55e' }}
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h1 className="text-2xl font-bold mb-2">Authentic Product</h1>
                <p className="opacity-80 mb-6">{result.message}</p>

                {result.product && (
                  <div className="bg-white/10 rounded-lg p-6 mb-6">
                    {result.product.image_url && (
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <Image
                          src={result.product.image_url}
                          alt={result.product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h2 className="text-xl font-semibold">{result.product.name}</h2>
                  </div>
                )}

                <p className="text-sm opacity-60">
                  Verification Code: {code}
                </p>
              </>
            ) : (
              <>
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#ef4444' }}
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>

                <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
                <p className="opacity-80 mb-6">{result.message}</p>

                <p className="text-sm opacity-60 mb-6">
                  Code entered: {code}
                </p>
              </>
            )}

            <Link
              href="/"
              className="inline-block py-3 px-6 rounded-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: client.primary_color, color: textColor }}
            >
              Verify Another Product
            </Link>
          </div>
        ) : null}

        <footer className="mt-12 text-sm opacity-50">
          &copy; {new Date().getFullYear()} {client.company_name}. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
