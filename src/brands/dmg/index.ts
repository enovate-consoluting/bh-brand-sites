import type { BrandOverride } from '../types';
import { DMGHomePage } from './HomePage';

/**
 * DMG Hats / Lovers Only brand configuration
 *
 * NFC tap-to-verify hat brand with:
 * - Pink romantic theme with hearts overlay
 * - Hat product display
 * - Scan counter (from NFC tap)
 * - No code input - verification happens on NFC tap
 */
export const dmgBrand: BrandOverride = {
  slug: 'dmg',
  name: 'DMG Hats',
  assets: {
    verifySuccessIcon: '/images/dmg/AUTHENTIC-PRODUCT.png',
    verifyFailedIcon: '/images/dmg/red-x.png',
  },
  HomePage: DMGHomePage,
};
