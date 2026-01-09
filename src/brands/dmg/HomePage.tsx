'use client';

import Image from 'next/image';
import type { BrandPageProps } from '../types';
import './dmg.css';

/**
 * DMG Hats / Lovers Only Homepage
 *
 * NFC tap-to-verify page - no code input needed.
 * User taps NFC tag on product → lands here → sees "Authentic"
 *
 * Features:
 * - Pink romantic theme with hearts overlay
 * - "Lovers Only" title
 * - Hat product image (Black Hat default)
 * - Scan counter display
 * - Authentic badge
 * - Brand logo
 */
export function DMGHomePage({ siteConfig }: BrandPageProps) {
  // TODO: Get scan count from URL params or API when NFC integration is complete
  const scanCount = 1;

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
              src="/images/dmg/Black Hat.png"
              alt="DMG Hat"
              width={290}
              height={290}
              className="w-full h-auto"
            />
          </div>

          {/* Scan Counter */}
          <div className="dmg-scan-counter">
            <h4>
              Scan Counter: <span>{String(scanCount).padStart(2, '0')}</span>
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
