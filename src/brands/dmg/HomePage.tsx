'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { BrandPageProps } from '../types';
import './dmg.css';

// Product variants
const products: Record<string, { image: string; alt: string }> = {
  'black-hat': { image: 'Black Hat.png', alt: 'Black Hat' },
  'pink-hat': { image: 'Pink Hat.png', alt: 'Pink Hat' },
};

type VerifyState = 'loading' | 'success' | 'error' | 'no-id';

interface NFCResult {
  valid: boolean;
  message: string;
  scanCount?: number;
  error?: string;
}

/**
 * DMG Hats / Lovers Only Homepage
 *
 * NFC tap-to-verify page - no code input needed.
 * User taps NFC tag on product → lands here → verifies automatically
 *
 * URL params:
 * - ?id=ENCRYPTED_ID (from NFC chip)
 * - ?product=black-hat (default)
 * - ?product=pink-hat
 *
 * Features:
 * - Pink romantic theme with hearts overlay
 * - "Lovers Only" title
 * - Hat product image based on URL param
 * - Real scan counter from database
 * - Authentic/Not Authentic badge
 * - Brand logo
 */
export function DMGHomePage({ siteConfig }: BrandPageProps) {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product') || 'black-hat';
  const encryptedId = searchParams.get('id');
  const product = products[productParam] || products['black-hat'];

  const [verifyState, setVerifyState] = useState<VerifyState>(encryptedId ? 'loading' : 'no-id');
  const [scanCount, setScanCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Verify NFC tag on mount
  useEffect(() => {
    if (!encryptedId) {
      setVerifyState('no-id');
      return;
    }

    async function verifyNFC() {
      try {
        const response = await fetch(`/api/verify/nfc?id=${encodeURIComponent(encryptedId)}`);
        const data: NFCResult = await response.json();

        if (data.valid) {
          setVerifyState('success');
          setScanCount(data.scanCount || 1);
        } else {
          setVerifyState('error');
          setErrorMessage(data.message || 'Verification failed');
        }
      } catch {
        setVerifyState('error');
        setErrorMessage('Unable to verify. Please try again.');
      }
    }

    verifyNFC();
  }, [encryptedId]);

  // No NFC ID provided - show message to tap
  if (verifyState === 'no-id') {
    return (
      <section className="dmg-wrapper">
        <div className="dmg-background">
          <Image
            src="/images/dmg/BACKGROUND COLOR.png"
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="dmg-overlay" />
        <div className="dmg-content">
          <div className="dmg-verify-box">
            <div className="dmg-title">
              <Image
                src="/images/dmg/LOVERS ONLY TITLE.png"
                alt="Lovers Only"
                width={280}
                height={100}
                className="w-full h-auto"
              />
            </div>
            <div className="text-center py-8">
              <p className="text-white text-xl mb-4">Tap the NFC chip on your product to verify authenticity</p>
              <p className="text-white/70 text-sm">Hold your phone near the NFC tag</p>
            </div>
            <div className="dmg-logo">
              <Image
                src="/images/dmg/brand logo.png"
                alt={siteConfig.client?.company_name || 'DMG Hats'}
                width={100}
                height={100}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (verifyState === 'loading') {
    return (
      <section className="dmg-wrapper">
        <div className="dmg-background">
          <Image
            src="/images/dmg/BACKGROUND COLOR.png"
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="dmg-overlay" />
        <div className="dmg-content">
          <div className="dmg-verify-box">
            <div className="dmg-title">
              <Image
                src="/images/dmg/LOVERS ONLY TITLE.png"
                alt="Lovers Only"
                width={280}
                height={100}
                className="w-full h-auto"
              />
            </div>
            <div className="text-center py-8">
              <div className="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4" />
              <p className="text-white text-xl">Verifying your product...</p>
            </div>
            <div className="dmg-logo">
              <Image
                src="/images/dmg/brand logo.png"
                alt={siteConfig.client?.company_name || 'DMG Hats'}
                width={100}
                height={100}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state - NOT AUTHENTIC
  if (verifyState === 'error') {
    return (
      <section className="dmg-wrapper">
        <div className="dmg-background">
          <Image
            src="/images/dmg/BACKGROUND COLOR.png"
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="dmg-overlay" />
        <div className="dmg-content">
          <div className="dmg-verify-box">
            <div className="dmg-title">
              <Image
                src="/images/dmg/LOVERS ONLY TITLE.png"
                alt="Lovers Only"
                width={280}
                height={100}
                className="w-full h-auto"
              />
            </div>

            {/* Red X - NOT AUTHENTIC */}
            <div className="py-4">
              <div className="w-20 h-20 mx-auto bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <div className="text-center py-4">
              <h2 className="text-red-500 text-2xl font-bold mb-4">NOT AUTHENTIC!</h2>
              <p className="text-white/80 text-sm px-4">{errorMessage}</p>
              <p className="text-white/60 text-xs mt-4">
                If you continue to see this message, the product is not authentic.
              </p>
            </div>

            <div className="dmg-logo">
              <Image
                src="/images/dmg/brand logo.png"
                alt={siteConfig.client?.company_name || 'DMG Hats'}
                width={100}
                height={100}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Success state - AUTHENTIC
  return (
    <section className="dmg-wrapper">
      {/* Background */}
      <div className="dmg-background">
        <Image
          src="/images/dmg/BACKGROUND COLOR.png"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Hearts overlay */}
      <div className="dmg-overlay" />

      {/* Main content */}
      <div className="dmg-content">
        <div className="dmg-verify-box">
          {/* Lovers Only Title */}
          <div className="dmg-title">
            <Image
              src="/images/dmg/LOVERS ONLY TITLE.png"
              alt="Lovers Only"
              width={280}
              height={100}
              className="w-full h-auto"
            />
          </div>

          {/* Hat Product Image */}
          <div className="dmg-product">
            <Image
              src={`/images/dmg/${product.image}`}
              alt={product.alt}
              width={290}
              height={290}
              className="w-full h-auto"
            />
          </div>

          {/* Scan Counter */}
          <div className="dmg-scan-counter">
            <h4>
              Scan Counter: <span>{scanCount}</span>
            </h4>
          </div>

          {/* Authentic Badge */}
          <div className="dmg-authentic">
            <Image
              src="/images/dmg/authentic hat text.png"
              alt="Authentic Product"
              width={260}
              height={80}
              className="w-full h-auto"
            />
          </div>

          {/* Brand Logo */}
          <div className="dmg-logo">
            <Image
              src="/images/dmg/brand logo.png"
              alt={siteConfig.client?.company_name || 'DMG Hats'}
              width={100}
              height={100}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
