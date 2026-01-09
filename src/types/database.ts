export interface Client {
  client_id: string;
  company_name: string;
  primary_color: string;
  logo_url: string;
  created_at?: string;
  /** Brand slug for folder lookups (e.g., "fryd", "wholemelt") */
  slug?: string;
}

/**
 * Derive a slug from company name if not explicitly set
 * "Fryd Extracts" -> "fryd"
 * "Whole Melt" -> "wholemelt"
 */
export function getClientSlug(client: Client): string {
  if (client.slug) return client.slug;
  // Take first word, lowercase, remove non-alphanumeric
  return client.company_name
    .split(' ')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export interface ClientDomain {
  id: string;
  client_id: string;
  domain: string;
}

export interface ClientBranding {
  id: string;
  client_id: string;
  large_logo_url: string;
  background_color: string;
  text_color: string;
  button_color: string;
  button_text_color: string;
  font_family?: string;
}

export interface ClientSocialLink {
  id: string;
  client_id: string;
  platform: string;
  handle: string;
}

export interface Product {
  product_id: string;
  client_id: string;
  name: string;
  image_url: string;
}

export interface NfcChip {
  chip_id: string;
  client_id: string;
  public_id: string;
  chip_uid: string;
  product_id?: string;
}

export interface SiteConfig {
  client: Client;
  branding: ClientBranding | null;
  socialLinks: ClientSocialLink[];
}
