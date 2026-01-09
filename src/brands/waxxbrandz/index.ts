import type { BrandOverride } from '../types';
import { WaxxBrandzHomePage } from './HomePage';

/**
 * Waxx Brandz brand configuration
 *
 * Cannabis concentrates brand with:
 * - Dark theme with gold accents
 * - Video banner
 * - Multiple product lines (Live Resin, Live Diamonds, Pre Rolls)
 * - "From Farm to Device" story
 * - Newsletter signup
 */
export const waxxbrandzBrand: BrandOverride = {
  slug: 'waxxbrandz',
  name: 'Waxx Brandz',
  HomePage: WaxxBrandzHomePage,
};
