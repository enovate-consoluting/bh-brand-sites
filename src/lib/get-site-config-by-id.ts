import { createClient } from '@/lib/supabase/server';
import type { SiteConfig, Client, ClientBranding, ClientSocialLink } from '@/types/database';

/**
 * Fetch site configuration by client ID (for preview mode)
 * Bypasses domain lookup - used for local testing
 */
export async function getSiteConfigById(clientId: string): Promise<SiteConfig | null> {
  const supabase = await createClient();

  // Fetch client, branding, and social links in parallel
  const [clientResult, brandingResult, socialResult] = await Promise.all([
    supabase
      .from('clients')
      .select('*')
      .eq('client_id', clientId)
      .single(),
    supabase
      .from('client_branding')
      .select('*')
      .eq('client_id', clientId)
      .single(),
    supabase
      .from('client_social_links')
      .select('*')
      .eq('client_id', clientId),
  ]);

  if (!clientResult.data) {
    return null;
  }

  return {
    client: clientResult.data as Client,
    branding: brandingResult.data as ClientBranding | null,
    socialLinks: (socialResult.data || []) as ClientSocialLink[],
  };
}
