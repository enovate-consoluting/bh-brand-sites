import type { BrandOverride } from '../types';
import { NimaHomePage } from './HomePage';

/**
 * NIMA Wellness brand configuration
 *
 * Wellness/MedSpa site with:
 * - Custom homepage with services overview
 * - Product verification integration
 * - Contact and booking information
 * - Modern, clean design with Poppins font
 */
export const nimawellnessBrand: BrandOverride = {
  slug: 'nimawellness',
  name: 'NIMA Wellness',
  assets: {
    verifySuccessIcon: '/images/default/verify_success.svg',
    verifyFailedIcon: '/images/default/verify_failed.svg',
  },
  HomePage: NimaHomePage,
};
