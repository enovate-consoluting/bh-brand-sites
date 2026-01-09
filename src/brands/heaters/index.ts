import type { BrandOverride } from '../types';
import { HeatersHomePage } from './HomePage';

/**
 * Heaters brand configuration
 *
 * Heaters uses a fully custom homepage with:
 * - Hero section with verify form
 * - Flavor menu with product cards
 * - Trust badges section
 * - Custom animations and styling
 */
export const heatersBrand: BrandOverride = {
  slug: 'heaters',
  name: 'Heaters',
  assets: {
    favicon: '/images/heaters/favicon.ico',
  },
  HomePage: HeatersHomePage,
};
