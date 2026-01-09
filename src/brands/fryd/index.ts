import type { BrandOverride } from '../types';

/**
 * Fryd brand configuration
 *
 * Fryd uses the default shared components but with custom assets.
 * If Fryd needs a completely custom page in the future, add:
 *   HomePage: FrydHomePage,
 *   VerifyPage: FrydVerifyPage,
 */
export const frydBrand: BrandOverride = {
  slug: 'fryd',
  name: 'Fryd',
  assets: {
    verifySuccessIcon: '/images/fryd/verify_success.png',
    linktreeIcon: '/images/fryd/linktree.png',
    favicon: '/images/fryd/favicon-32x32.png',
  },
  // No custom components - uses default shared pages with Fryd's assets
};
