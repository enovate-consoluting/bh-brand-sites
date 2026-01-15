import { getBrandOverride } from '@/brands';
import { NimaHomePage } from '@/brands/nimawellness/HomePage';
import type { SiteConfig } from '@/types/database';
import Link from 'next/link';

/**
 * Debug page to test NIMA Wellness without database entry
 * Access at: http://localhost:3000/debug-nima
 *
 * This page renders the NimaHomePage component directly with mock data,
 * allowing you to preview the design without needing a database record.
 */
export default function DebugNimaPage() {
  // Check if brand override is registered
  const brandOverride = getBrandOverride('nimawellness');
  const hasOverride = !!brandOverride;

  // Mock site config for testing
  const mockSiteConfig: SiteConfig = {
    client: {
      client_id: 'nima-test',
      company_name: 'NIMA Wellness',
      logo_url: '/images/nimawellness/logo.png',
      slug: 'nimawellness',
      primary_color: '#0098f5',
    },
    branding: {
      id: 'nima-test-branding',
      client_id: 'nima-test',
      large_logo_url: '/images/nimawellness/logo.png',
      background_color: '#ffffff',
      text_color: '#101010',
      button_color: '#0098f5',
      button_text_color: '#ffffff',
    },
    socialLinks: [],
  };

  return (
    <>
      {/* Debug Banner */}
      <div className="bg-purple-500 text-white text-center py-2 text-sm font-medium fixed top-0 left-0 right-0 z-[100]">
        DEBUG MODE - NIMA Wellness (No Database)
        {' | '}
        <span className={hasOverride ? 'text-green-300' : 'text-red-300'}>
          Brand Override: {hasOverride ? '✅ Found' : '❌ Not Found'}
        </span>
        {' | '}
        <Link href="/preview" className="underline">View All Clients</Link>
      </div>
      <div className="pt-8">
        <NimaHomePage siteConfig={mockSiteConfig} previewClientId="nima-test" />
      </div>
    </>
  );
}
