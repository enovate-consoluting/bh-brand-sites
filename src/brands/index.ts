import type { BrandOverride, BrandAssets } from './types';
import { frydBrand } from './fryd';
import { heatersBrand } from './heaters';
import { dmgBrand } from './dmg';
import { greenteamBrand } from './greenteam';
import { stealthyairBrand } from './stealthyair';
import { waxxbrandzBrand } from './waxxbrandz';

/**
 * Registry of all brand overrides
 *
 * Add new brands here as they need customization.
 * Brands NOT in this registry will use default shared components.
 */
const brandRegistry: Record<string, BrandOverride> = {
  fryd: frydBrand,
  heaters: heatersBrand,
  dmg: dmgBrand,
  greenteam: greenteamBrand,
  green: greenteamBrand, // Alias: "Green Team" -> "green" (first word only)
  stealthyair: stealthyairBrand,
  waxxbrandz: waxxbrandzBrand,
};

/**
 * Get brand override by slug
 * Returns undefined if brand has no overrides (uses defaults)
 */
export function getBrandOverride(slug: string): BrandOverride | undefined {
  return brandRegistry[slug.toLowerCase()];
}

/**
 * Get brand assets, with fallbacks to defaults
 */
export function getBrandAssets(slug: string): BrandAssets {
  const brand = getBrandOverride(slug);
  return {
    verifySuccessIcon: brand?.assets?.verifySuccessIcon || '/images/default/verify_success.svg',
    verifyFailedIcon: brand?.assets?.verifyFailedIcon || '/images/default/verify_failed.svg',
    linktreeIcon: brand?.assets?.linktreeIcon || '/images/default/linktree.png',
    favicon: brand?.assets?.favicon,
    ...brand?.assets,
  };
}

/**
 * Check if a brand has a custom component
 */
export function hasBrandOverride(slug: string, component: 'HomePage' | 'VerifyPage'): boolean {
  const brand = getBrandOverride(slug);
  return brand?.[component] !== undefined;
}

export type { BrandOverride, BrandAssets, BrandPageProps } from './types';
