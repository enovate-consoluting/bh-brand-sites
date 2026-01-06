export interface Client {
  client_id: string;
  company_name: string;
  primary_color: string;
  logo_url: string;
  created_at?: string;
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
