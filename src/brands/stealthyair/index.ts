import type { BrandOverride } from '../types';
import { StealthyAirHomePage } from './HomePage';

/**
 * Stealthy Air brand configuration
 *
 * Smokeless vape brand with:
 * - Black/white minimalist design
 * - Video hero section
 * - Product flavor slider
 * - Patented filtration technology focus
 * - "Discretion Meets Innovation" tagline
 */
export const stealthyairBrand: BrandOverride = {
  slug: 'stealthyair',
  name: 'Stealthy Air',
  HomePage: StealthyAirHomePage,
};
