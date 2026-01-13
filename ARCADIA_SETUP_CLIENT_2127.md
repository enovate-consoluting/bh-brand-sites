# Arcadia Setup - Client ID 2127

## Quick SQL Setup

Run this in your Supabase SQL Editor:

```sql
-- Update the client to have slug = 'arcadia' for brand override to work
UPDATE clients 
SET slug = 'arcadia'
WHERE client_id = '2127';

-- Ensure branding exists for client 2127
INSERT INTO client_branding (
  client_id,
  large_logo_url,
  background_color,
  text_color,
  button_color,
  button_text_color
)
VALUES (
  '2127',
  '/images/arcadia/logo.png',
  '#ffffff',  -- Background: white
  '#000000',  -- Text: black
  '#000000',  -- Button: black
  '#ffffff'   -- Button text: white
)
ON CONFLICT (client_id) DO UPDATE SET
  large_logo_url = EXCLUDED.large_logo_url,
  background_color = EXCLUDED.background_color,
  text_color = EXCLUDED.text_color,
  button_color = EXCLUDED.button_color,
  button_text_color = EXCLUDED.button_text_color;

-- Verify the setup
SELECT 
  c.client_id,
  c.company_name,
  c.slug,
  cb.background_color,
  cb.text_color,
  cb.button_color
FROM clients c
LEFT JOIN client_branding cb ON c.client_id = cb.client_id
WHERE c.client_id = '2127';
```

## Access the Preview

After running the SQL, access the page at:

```
http://localhost:3000/preview/2127
```

**Important:** The `slug` field MUST be set to `'arcadia'` for the custom Arcadia homepage to load. Without it, you'll see the default template.

## How It Works

- **Client ID**: `2127` (used in URLs: `/preview/2127`)
- **Slug**: `'arcadia'` (used to find brand override in code)
- The preview route loads client 2127, gets its slug ('arcadia'), then finds the ArcadiaHomePage component

## Update Logo Path

If your logo is already in the database, update the path:

```sql
UPDATE client_branding
SET large_logo_url = '/images/arcadia/logo.png'
WHERE client_id = '2127';
```

Or if you have a different logo path already set, that's fine too - just make sure it's accessible.
