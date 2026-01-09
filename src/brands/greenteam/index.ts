import type { BrandOverride } from '../types';
import { GreenTeamHomePage } from './HomePage';

/**
 * Green Team brand configuration
 *
 * Cannabis vape brand with:
 * - Dark gray/green color scheme
 * - Video hero section (Cloudflare stream)
 * - Liquid Diamonds product line
 * - Age gate (21+)
 * - Full navigation (Home, Products, Media, Verify)
 */
export const greenteamBrand: BrandOverride = {
  slug: 'greenteam',
  name: 'Green Team',
  assets: {
    // Using Cloudflare image delivery for logo
    favicon: 'https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public',
  },
  HomePage: GreenTeamHomePage,
};
