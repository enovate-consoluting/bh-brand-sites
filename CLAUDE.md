# BH Brand Sites - Project Context

## Mission
Multi-tenant brand verification platform to migrate existing ColdFusion sites to Next.js. Each brand gets their own custom-branded verification site under a unified codebase.

**Key Principle:** Most brands share the same code. Only ~10 custom sites need separate projects.

## What This Project Is
A white-label product verification system where brands (Fryd, Wholemelt, Dandy, etc.) each get their own domain with custom branding. Consumers scan NFC chips on products and are directed to the brand's verification site to confirm authenticity.

**This single codebase serves 40+ standard verification sites.**

## Live URLs
- **Production:** https://bh-brand-sites.vercel.app
- **Vercel Dashboard:** https://vercel.com/enovate50/bh-brand-sites
- **GitHub:** https://github.com/enovate-consoluting/bh-brand-sites

---

## Getting Started (New Team Members)

### Step 1: Clone the Repository
```bash
git clone https://github.com/enovate-consoluting/bh-brand-sites.git
cd bh-brand-sites
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=https://ncblgvjayvuviavhigwp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ask team lead for key]
SUPABASE_SERVICE_ROLE_KEY=[ask team lead for key]
```

### Step 4: Run Locally
```bash
npm run dev
```
Server runs at http://localhost:3000 (or next available port)

### Step 5: Test Preview Mode
- Go to: http://localhost:3000/preview
- See all clients in the database
- Click any client to preview their site

### Deployments
**Auto-deploy is enabled.** Just push to GitHub:
```bash
git add .
git commit -m "Your message"
git push
```
Vercel automatically deploys. No manual steps needed.

---

## Tech Stack
- **Framework:** Next.js 14 (App Router, Turbopack)
- **Database:** Supabase (PostgreSQL) + Legacy MySQL (read-only)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Vercel

---

## Project Structure

```
bh-brand-sites/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Shared homepage (ALL brands use this)
│   │   ├── verify/page.tsx       # Shared verify page (ALL brands use this)
│   │   ├── preview/              # Preview mode for local testing
│   │   │   ├── page.tsx          # List all clients
│   │   │   └── [clientId]/       # Preview specific client
│   │   │       ├── page.tsx      # Client homepage preview
│   │   │       └── verify/page.tsx # Client verify preview
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── brands/                   # Brand-specific overrides
│   │   ├── README.md             # Instructions for adding brands
│   │   ├── index.ts              # Brand registry
│   │   ├── types.ts              # TypeScript types
│   │   └── fryd/                 # Fryd's config (first migrated brand)
│   │       └── index.ts
│   ├── components/
│   │   ├── VerifyForm.tsx
│   │   └── SocialLinks.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── get-site-config.ts      # Fetches config by domain
│   │   └── get-site-config-by-id.ts # Fetches config by client ID (preview)
│   ├── middleware.ts
│   └── types/
│       └── database.ts
├── public/
│   └── images/
│       ├── default/              # Default icons
│       └── [brand-slug]/         # Brand-specific assets
├── legacy/                       # Legacy ColdFusion code (LOCAL ONLY - gitignored)
│   └── [brand-name]/
└── CLAUDE.md                     # This file
```

---

## Preview Mode (Local Testing)

Preview mode lets you test any brand without DNS changes.

| URL | What It Shows |
|-----|---------------|
| `/preview` | List of ALL clients (click to preview) |
| `/preview/2126` | Fryd's homepage |
| `/preview/2126/verify?code=XXX` | Fryd's verify page |
| `/preview/[clientId]` | Any client by ID |

**Brands with branding configured show green. Others show gray.**

---

## Analyst Workflow: Migrating a Brand Site

### Overview
1. Download legacy code to `legacy/[brand-name]/`
2. Ask Claude to review it
3. Claude determines: **STANDARD** or **CUSTOM**
4. If standard → Claude adds to database, gives preview URL
5. If custom → Flag for separate project

### Step-by-Step

#### 1. Download Legacy Code
```bash
mkdir legacy/[brand-name]
# Download ColdFusion files from production server
# Place all files in legacy/[brand-name]/
```

#### 2. Tell Claude to Review
Say to Claude:
> "I've put legacy code for [Brand Name] in `legacy/[brand-name]/`. Review it and tell me if it's a standard verification site or a custom site."

#### 3. Claude Will Analyze and Report

**Claude will look for:**
- What pages exist (homepage, verify, registration, rewards, etc.)
- What database tables it queries
- Any custom features beyond basic verification
- Branding info (colors, logos)

**Claude will respond with one of:**

**STANDARD SITE:**
> "This is a STANDARD verification site. It has:
> - Homepage with verification form
> - Verify page that checks codes
> - No custom features
>
> I'll add it to the database. What's the client ID?"

**CUSTOM SITE:**
> "This is a CUSTOM site. It has features beyond standard verification:
> - [Feature 1]
> - [Feature 2]
>
> Recommendation: This should be a separate Vercel project."

#### 4. For Standard Sites - Claude Adds to Database

Claude will:
1. Add domain to `client_domains` table
2. Add branding to `client_branding` table
3. Register brand assets if needed
4. Give you preview URL: `http://localhost:3000/preview/[clientId]`

#### 5. Test and Verify
- Open the preview URL
- Check logo, colors, layout
- Test verify form
- If good → commit and push

---

## How Claude Identifies Standard vs Custom Sites

### STANDARD Site Characteristics
- Homepage with logo and verification form
- Verify page that checks code against database
- Maybe social links (Instagram, Linktree)
- Simple branding (colors, logo)
- **No user accounts, no registration, no rewards**

### CUSTOM Site Characteristics
Look for ANY of these:
- User registration/login
- Member accounts
- Points/rewards system
- Product registration (user enters info, uploads photos)
- Multiple product pages
- Shopping cart / e-commerce
- Custom API integrations
- Complex multi-step flows
- Admin dashboard

**If you see these features → CUSTOM site → Separate project**

### Files That Indicate Custom Site
```
# These file patterns suggest CUSTOM:
- login.cfm, register.cfm, signup.cfm
- account.cfm, profile.cfm, dashboard.cfm
- rewards.cfm, points.cfm, redeem.cfm
- cart.cfm, checkout.cfm, order.cfm
- admin/, manage/, cms/
- Multiple product pages
- Complex folder structures
```

### Files That Indicate Standard Site
```
# These file patterns suggest STANDARD:
- index.cfm (homepage only)
- verify.cfm, validate.cfm, check.cfm
- Simple flat structure
- Just a few files total
```

---

## Adding a New Brand (Standard Site)

### What You Need
- Client ID (from database or legacy system)
- Domain name
- Logo URL
- Brand colors (background, text, button)

### Database Entries

**Add to `client_domains`:**
```sql
INSERT INTO client_domains (client_id, domain)
VALUES ('1234', 'verifybrand.com');
```

**Add to `client_branding`:**
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
  '1234',
  '/images/brand/logo.png',
  '#000000',
  '#ffffff',
  '#ff0000',
  '#ffffff'
);
```

### Brand Assets (Optional)

If brand has custom icons:
1. Create folder: `public/images/[brand-slug]/`
2. Add: `verify_success.png`, `linktree.png`, etc.
3. Create: `src/brands/[brand-slug]/index.ts`
4. Register in: `src/brands/index.ts`

**If no custom assets:** Skip this. Brand uses default icons.

---

## Commands Reference

```bash
npm run dev      # Start local dev server
npm run build    # Build for production
npm run lint     # Run ESLint
git push         # Deploy to Vercel (auto)
```

---

## Database (Supabase)

### Tables
- `clients` - Brand companies (company_name, primary_color, logo_url)
- `client_domains` - Maps domains to clients (domain → client_id)
- `client_branding` - Extended branding (colors, logos, fonts)
- `client_social_links` - Social media links per client
- `nfc_chips` - Verification codes (public_id, client_id, status)
- `verification_logs` - Scan tracking

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Legacy Database (Read-Only)

### Critical Rule: DO NOT MIGRATE DATA
The old database has other systems depending on it. We:
1. **Query the existing database** - Connect and read from it
2. **Write to both if needed** - Old DB + new DB
3. **Never duplicate IDs** - Keep IDs in sync with legacy

### Connection (TBD)
```
Host: [pending from sys admin]
Database: [pending]
Tables:
  - label_password - verification codes
  - label_password_detail - code settings
  - label_password_validation - verification log
  - client - company info
```

---

## Current State (January 9, 2026)

### Completed
- ✅ Next.js 14 project with TypeScript + Tailwind
- ✅ Multi-tenant domain detection middleware
- ✅ Dynamic branding per client
- ✅ Homepage with verification form
- ✅ Verify page with NFC chip validation
- ✅ Brand override system (`src/brands/`)
- ✅ Preview mode for local testing (`/preview`)
- ✅ Fryd configured as first brand
- ✅ Default assets for brands without custom icons
- ✅ Deployed to Vercel with auto-deploy

### In Progress
- ⏳ Legacy database connection (sys admin getting credentials)
- ⏳ Data migration (clients, NFC chips, labels)
- ⏳ First brand migration (Fryd - authenticfryd.com)

### Pending
- [ ] Wire up legacy database for verification
- [ ] Map authenticfryd.com domain in production
- [ ] Test end-to-end verification flow
- [ ] Migrate remaining standard sites

---

## Migration Checklist

| Brand | Client ID | Domain | Type | Status |
|-------|-----------|--------|------|--------|
| Fryd | 2126 | authenticfryd.com | standard | in progress |
| (add more as migrated) | | | | |

---

## Troubleshooting

### "Site Not Found" on localhost
The main site (`/`) uses domain detection. Use preview mode instead:
- http://localhost:3000/preview/[clientId]

### Client not showing in preview list
- Check if client exists in `clients` table
- Check Supabase connection (env vars)

### Branding not loading
- Check `client_branding` table has entry for client_id
- Check logo URL is accessible

### Changes not deploying
- Check GitHub push succeeded
- Check Vercel dashboard for build errors

---

## Session Log

### January 9, 2026
**Goal:** Set up brand override structure and preview mode

**What was done:**
- Created `src/brands/` folder structure
- Added brand registry and asset loader
- Configured Fryd as first brand
- Created default verify icons (SVG)
- Built preview mode (`/preview`, `/preview/[clientId]`)
- Updated pages to use dynamic brand assets
- Removed hardcoded references
- Updated CLAUDE.md with full analyst workflow

**Key files:**
- `src/brands/index.ts` - Brand registry
- `src/app/preview/` - Preview mode routes
- `src/lib/get-site-config-by-id.ts` - Config loader by ID

### January 6, 2026
**Goal:** Initialize multi-tenant brand verification platform

**What was done:**
- Created Next.js 14 project
- Set up Supabase client
- Created middleware for domain detection
- Built homepage and verify pages
- Deployed to Vercel

---

*Last updated: January 9, 2026*
