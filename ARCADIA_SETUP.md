# Arcadia Verification Page - Local Setup Guide

## Step 1: Install Dependencies

If you haven't already, install the project dependencies:

```bash
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Where to find these:**
- Go to your Supabase project dashboard
- Settings → API
- Copy the URL and anon key
- Copy the service_role key (keep this secret!)

## Step 3: Set Up Database (Supabase)

You need to create a client entry in your database. Run these SQL queries in your Supabase SQL Editor:

### 3a. Create the Client (if it doesn't exist)

```sql
INSERT INTO clients (client_id, company_name, logo_url, slug)
VALUES ('arcadia', 'Arcadia', '/images/arcadia/logo.png', 'arcadia')
ON CONFLICT (client_id) DO NOTHING;
```

### 3b. Add Branding Configuration

```sql
INSERT INTO client_branding (
  client_id,
  large_logo_url,
  background_color,
  text_color,
  button_color,
  button_text_color
)
VALUES (
  'arcadia',
  '/images/arcadia/logo.png',
  '#ffffff',  -- Background color (white)
  '#000000',  -- Text color (black)
  '#000000',  -- Button color (black)
  '#ffffff'   -- Button text color (white)
)
ON CONFLICT (client_id) DO UPDATE SET
  large_logo_url = EXCLUDED.large_logo_url,
  background_color = EXCLUDED.background_color,
  text_color = EXCLUDED.text_color,
  button_color = EXCLUDED.button_color,
  button_text_color = EXCLUDED.button_text_color;
```

**Note:** Adjust the colors to match your brand!

## Step 4: Add Your Images

Place your images in the `public/images/arcadia/` folder:

- `logo.png` (or `.gif`) - Your brand logo
- `product-1.png` - First product render
- `product-2.png` - Second product render (optional)

## Step 5: Start the Development Server

```bash
npm run dev
```

## Step 6: View the Page

Open your browser and go to:

**Option 1: Preview by Client ID**
```
http://localhost:3000/preview/arcadia
```

**Option 2: Browse All Clients**
```
http://localhost:3000/preview
```
Then click on "Arcadia" from the list.

## Step 7: Test Verification

1. Enter a test verification code in the input field
2. Click "Verify"
3. The modal will show success or error based on your database

**To test with real codes:**
- Make sure you have entries in the `nfc_chips` or `label_password` tables
- The verification API checks both tables automatically

## Troubleshooting

### "Client Not Found" Error
- Make sure you created the client in the database with `client_id = 'arcadia'`
- Check that the slug matches: `slug = 'arcadia'`

### Images Not Showing
- Verify images are in `public/images/arcadia/` folder
- Check file names match exactly (case-sensitive)
- Make sure images are valid PNG/GIF/SVG files

### Database Connection Issues
- Verify your `.env.local` file has correct Supabase credentials
- Check that your Supabase project is active
- Ensure the tables (`clients`, `client_branding`) exist in your database

### Verification Not Working
- Check that you have test codes in `nfc_chips` or `label_password` tables
- Verify the `client_id` in those tables matches 'arcadia'
- Check browser console for any API errors

## Mobile Testing

Since 80% of users are on mobile, test on:
- **Chrome DevTools**: Press F12 → Toggle device toolbar (Ctrl+Shift+M)
- **Real Device**: Use your phone's browser and connect to `http://[your-local-ip]:3000/preview/arcadia`
  - Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
  - Example: `http://192.168.1.100:3000/preview/arcadia`

## Next Steps

Once everything works locally:
1. Add your actual product images
2. Customize colors in the database
3. Add your domain to `client_domains` table when ready to deploy
4. Deploy to production (Vercel, etc.)
