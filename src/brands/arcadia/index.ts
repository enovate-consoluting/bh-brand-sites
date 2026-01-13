import type { BrandOverride } from '../types';
import { ArcadiaHomePage } from './HomePage';
import { arcadiaImages } from './config';

/**
 * Arcadia Verification brand configuration
 *
 * Mobile-first product verification page with:
 * - Hero section with logo
 * - Product section with product renders
 * - Verification form (input + verify button)
 * - Success/Error modals
 * - Small footer
 * 
 * All images use Cloudflare CDN links from config.ts
 */
export const arcadiaBrand: BrandOverride = {
  slug: 'arcadia',
  name: 'Arcadia Verification',
  assets: {
    verifySuccessIcon: arcadiaImages.verifySuccess,
    verifyFailedIcon: arcadiaImages.verifyFailed,
  },
  HomePage: ArcadiaHomePage,
};
