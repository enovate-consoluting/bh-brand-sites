import type { ComponentType } from 'react';
import type { SiteConfig } from '@/types/database';

/**
 * Props passed to brand page components
 */
export interface BrandPageProps {
  siteConfig: SiteConfig;
  /** Client ID for preview mode (used for verification API calls) */
  previewClientId?: string;
}

/**
 * Brand-specific static assets configuration
 */
export interface BrandAssets {
  /** Path to verification success icon (e.g., "/images/fryd/verify_success.png") */
  verifySuccessIcon?: string;
  /** Path to verification failed icon */
  verifyFailedIcon?: string;
  /** Path to linktree icon */
  linktreeIcon?: string;
  /** Path to favicon */
  favicon?: string;
}

/**
 * Brand override configuration
 * Only include components that are DIFFERENT from the default
 */
export interface BrandOverride {
  /** Brand identifier (matches client slug in database) */
  slug: string;
  /** Brand display name */
  name: string;
  /** Static assets for this brand */
  assets?: BrandAssets;
  /** Custom homepage component (optional - uses default if not provided) */
  HomePage?: ComponentType<BrandPageProps>;
  /** Custom verify page component (optional - uses default if not provided) */
  VerifyPage?: ComponentType<BrandPageProps & { code: string }>;
}
