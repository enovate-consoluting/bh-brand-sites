# Troubleshooting Arcadia Preview

## Quick Checks

### 1. Is the dev server running?

Open terminal and run:
```bash
npm run dev
```

You should see:
```
▲ Next.js 16.1.1
- Local:        http://localhost:3000
```

If you see errors, check the error messages below.

### 2. Can you access the preview list?

Go to: **http://localhost:3000/preview**

**If you see "No clients found":**
- Your database connection isn't working
- Check your `.env.local` file has correct Supabase credentials
- Verify Supabase project is active

**If you see clients but not Arcadia:**
- Arcadia client doesn't exist in database yet
- See "Database Setup" below

### 3. Can you access Arcadia directly?

Go to: **http://localhost:3000/preview/arcadia**

**If you see "Client Not Found":**
- The client_id 'arcadia' doesn't exist in your `clients` table
- See "Database Setup" below

**If you see a blank page or error:**
- Check browser console (F12) for errors
- Check terminal for build errors

## Common Issues & Solutions

### Issue 1: Database Connection Error

**Symptoms:**
- "No clients found" on `/preview`
- Error in terminal about Supabase connection

**Solution:**
1. Check `.env.local` exists in project root
2. Verify it contains:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
   SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx
   ```
3. Restart dev server after adding/updating `.env.local`

### Issue 2: Client Not Found

**Symptoms:**
- "Client Not Found" when accessing `/preview/arcadia`

**Solution:**
Run this SQL in Supabase SQL Editor:

```sql
-- Check if client exists
SELECT * FROM clients WHERE client_id = 'arcadia';

-- If not found, create it:
INSERT INTO clients (client_id, company_name, logo_url, slug, primary_color)
VALUES ('arcadia', 'Arcadia', '/images/arcadia/logo.png', 'arcadia', '#000000')
ON CONFLICT (client_id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  slug = EXCLUDED.slug,
  logo_url = EXCLUDED.logo_url;
```

**Important:** The `slug` field MUST be `'arcadia'` (lowercase) for the brand override to work!

### Issue 3: Brand Override Not Loading

**Symptoms:**
- Page loads but shows default template instead of Arcadia design
- No hero section, product section, etc.

**Solution:**
1. Verify the slug matches:
   ```sql
   SELECT client_id, company_name, slug FROM clients WHERE client_id = 'arcadia';
   ```
   Should show: `slug = 'arcadia'`

2. If slug is NULL or different, update it:
   ```sql
   UPDATE clients SET slug = 'arcadia' WHERE client_id = 'arcadia';
   ```

3. Restart dev server

### Issue 4: Images Not Showing

**Symptoms:**
- Broken image icons
- Console errors about missing images

**Solution:**
1. Check images exist in `public/images/arcadia/`:
   - `logo.png` (or `.gif`)
   - `product-1.png`
   - `product-2.png` (optional)

2. Verify file names match exactly (case-sensitive)

3. If images don't exist yet, the page will still work but show broken image icons

### Issue 5: Build/Compilation Errors

**Symptoms:**
- Terminal shows TypeScript/compilation errors
- Page won't load

**Solution:**
1. Check for syntax errors in:
   - `src/brands/arcadia/HomePage.tsx`
   - `src/brands/arcadia/index.ts`
   - `src/brands/index.ts`

2. Run:
   ```bash
   npm run lint
   ```

3. Fix any errors shown

### Issue 6: Verification Not Working

**Symptoms:**
- Form submits but nothing happens
- Modal doesn't appear

**Solution:**
1. Check browser console (F12) for JavaScript errors
2. Verify API route exists: `src/app/api/verify/route.ts`
3. Check network tab to see if POST request is being made
4. Verify you have test codes in database:
   ```sql
   -- Check for test codes
   SELECT * FROM nfc_chips WHERE client_id = 'arcadia' LIMIT 5;
   SELECT * FROM label_password WHERE active = 'Y' LIMIT 5;
   ```

## Step-by-Step Debugging

### Step 1: Verify Database Connection

Run in Supabase SQL Editor:
```sql
SELECT COUNT(*) as total_clients FROM clients;
```

If this works, your connection is good. If it errors, check your `.env.local`.

### Step 2: Verify Arcadia Client Exists

```sql
SELECT 
  client_id, 
  company_name, 
  slug,
  logo_url
FROM clients 
WHERE client_id = 'arcadia';
```

**Expected result:**
- `client_id`: 'arcadia'
- `company_name`: 'Arcadia' (or any name)
- `slug`: 'arcadia' (THIS IS CRITICAL!)
- `logo_url`: '/images/arcadia/logo.png' (or any valid path)

### Step 3: Verify Branding Exists

```sql
SELECT * FROM client_branding WHERE client_id = 'arcadia';
```

If no results, create it:
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
  '#ffffff',
  '#000000',
  '#000000',
  '#ffffff'
);
```

### Step 4: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Navigate to `http://localhost:3000/preview/arcadia`
4. Look for any red errors

Common errors:
- `Failed to fetch` → Database connection issue
- `Cannot read property...` → Code error, check component
- `404` → Route not found, check file structure

### Step 5: Check Terminal Output

Look for:
- ✅ `Compiled successfully` → Good!
- ❌ `Error: ...` → Fix the error shown
- ⚠️ `Warning: ...` → Usually safe to ignore

## Still Not Working?

1. **Check file structure:**
   ```
   src/brands/arcadia/
   ├── HomePage.tsx  ← Must exist
   └── index.ts      ← Must exist
   
   src/brands/
   └── index.ts      ← Must import arcadiaBrand
   ```

2. **Verify imports in `src/brands/index.ts`:**
   ```typescript
   import { arcadiaBrand } from './arcadia';
   
   const brandRegistry = {
     // ... other brands
     arcadia: arcadiaBrand,  ← Must be here
   };
   ```

3. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

4. **Check Next.js version:**
   ```bash
   npm list next
   ```
   Should be 16.1.1 (as in package.json)

## Quick Test Query

Run this complete setup in Supabase SQL Editor:

```sql
-- Create/update client
INSERT INTO clients (client_id, company_name, logo_url, slug, primary_color)
VALUES ('arcadia', 'Arcadia Verification', '/images/arcadia/logo.png', 'arcadia', '#000000')
ON CONFLICT (client_id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  slug = 'arcadia',  -- Force slug to be 'arcadia'
  logo_url = EXCLUDED.logo_url;

-- Create/update branding
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
  '#ffffff',
  '#000000',
  '#000000',
  '#ffffff'
)
ON CONFLICT (client_id) DO UPDATE SET
  large_logo_url = EXCLUDED.large_logo_url,
  background_color = EXCLUDED.background_color,
  text_color = EXCLUDED.text_color,
  button_color = EXCLUDED.button_color,
  button_text_color = EXCLUDED.button_text_color;

-- Verify it worked
SELECT 
  c.client_id,
  c.company_name,
  c.slug,
  cb.background_color,
  cb.text_color
FROM clients c
LEFT JOIN client_branding cb ON c.client_id = cb.client_id
WHERE c.client_id = 'arcadia';
```

After running this, restart your dev server and try again!
