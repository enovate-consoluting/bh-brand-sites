# BH Brand Sites - Project Context

## Mission
Multi-tenant brand verification platform to migrate existing ColdFusion sites to Next.js. Each brand gets their own custom-branded verification site under a unified codebase.

**Key Principle:** Most brands share the same code. Only ~10 custom sites need separate projects.

## What This Project Is
A white-label product verification system where brands (Fryd, Wholemelt, Dandy, etc.) each get their own domain with custom branding. Consumers scan NFC chips on products and are directed to the brand's verification site to confirm authenticity.

**This single codebase serves 40+ standard verification sites.**

---

## Verification is Already Wired In (IMPORTANT)

**Label password verification is automatic for ALL clients.** When migrating a new brand site, you do NOT need to wire up verification - it's already done!

The verify pages (`/verify` and `/preview/[clientId]/verify`) automatically:
1. Check `nfc_chips` table by client_id
2. Check `label_password` table by client_id
3. Handle verify_once logic (one-time codes)
4. Log validations to `label_password_validation`

**All you need to do when migrating a site:**
- Add client to database (if not exists)
- Add branding (colors, logo)
- Add domain mapping
- That's it! Verification works automatically.

**Test any client's verification at:**
```
/preview/[clientId]/verify?code=TESTCODE
```

---

## Verification Security Architecture

### How Verification Works (Technical Flow)

```
User scans NFC/enters code → POST to /api/verify → Database lookup → Response
                                    ↓
                           Log to label_password_validation
```

**Key files:**
- `src/app/api/verify/route.ts` - API endpoint (serves ALL clients)
- `src/app/verify/page.tsx` - Server-side verify page
- `src/app/preview/[clientId]/verify/page.tsx` - Preview verify page

### Current Security Features

| Feature | Status | Description |
|---------|--------|-------------|
| One-time codes (verify_once) | Implemented | Codes can be set to work only once |
| Validation logging | Implemented | All verifications logged to `label_password_validation` |
| Client isolation | Implemented | Codes only work for their assigned client |
| Case-insensitive | Implemented | Codes normalized to uppercase |
| POST-only API | Implemented | GET requests blocked with security message |
| No URL exposure | Implemented | Results shown in modal, code never in URL |
| Direct URL blocked | Implemented | /verify pages show security warning |

### One-Time Code Logic

The `verify_once` feature is controlled per batch in `label_pass_detail`:
- `verify_once = 'Y'` → Code can only be verified ONCE
- `verify_once_override = 'N'` on individual password → Allows re-verification
- After first verification, subsequent attempts show: "This code has already been validated"

### Security Threat Model

| Threat | Risk | Mitigation |
|--------|------|------------|
| URL sharing (copy verified URL) | Medium | Use POST requests, don't expose results in URL |
| Code reuse | Low | verify_once feature prevents reuse |
| Brute force guessing | Low | Codes are long random strings |
| Screenshot sharing | Low | Can't prevent, but verify_once helps |
| API abuse | Medium | Rate limiting (TODO) |

### Security Enhancement Options

**Option 1: POST-only verification - IMPLEMENTED**
- API only accepts POST requests (GET returns security error)
- Results shown in modal popup, never in URL
- Code never exposed in browser history or shareable URLs
- Prevents URL sharing of successful verifications

**Option 2: Time-limited verification tokens (Future)**
- Generate unique token per verification attempt
- Token expires after 60 seconds
- Prevents replay attacks

**Option 3: CAPTCHA/Rate limiting (Future)**
- Add CAPTCHA before verification
- Limit verifications per IP/device
- Prevents automated abuse

**Option 4: Device fingerprinting (Future)**
- Track device info with each verification
- Flag suspicious patterns (same code, different devices)
- Analytics for fraud detection

### API Response Format

The `/api/verify` endpoint (POST only):
```json
// Success (POST)
{ "valid": true, "message": "Authentic product", "serial": "CODE123", "resultToken": "vr_..." }

// Failure (POST)
{ "valid": false, "message": "Code not found..." }

// Already verified - verify_once (POST)
{ "valid": false, "message": "This code has already been validated.", "alreadyVerified": true }

// GET request (blocked)
{ "valid": false, "message": "Direct URL verification is not allowed...", "error": "METHOD_NOT_ALLOWED" }
```

---

## Design Requirements (CRITICAL)

### Mobile-First Design
**ALL pages MUST be mobile-responsive.** Our users are almost exclusively on mobile devices - they scan NFC chips on products with their phones and land on these verification sites.

**Non-negotiable requirements:**
- Touch-friendly buttons (minimum 44px tap targets)
- Readable text without zooming (16px+ base font)
- Full-width layouts on mobile
- No horizontal scrolling
- Fast load times (users are on cellular data)
- Logos scale properly on all screen sizes
- Forms are easy to use on mobile keyboards

**Testing checklist:**
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Use browser dev tools mobile emulator
- [ ] Check both portrait and landscape

**Tailwind breakpoints we use:**
```
sm: 640px   // Small tablets
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
```

**Pattern:** Design for mobile first, then add `md:` and `lg:` classes for larger screens.

```tsx
// GOOD - Mobile first
<div className="px-4 md:px-8 lg:px-16">
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// BAD - Desktop first (don't do this)
<div className="px-16 sm:px-4">
```

### Clean, Professional UI
- Minimal, focused design
- Clear visual hierarchy
- Consistent spacing
- Brand colors applied correctly
- No clutter - verification sites should be simple and trustworthy

### Favicon Requirements
Every brand site needs proper favicons for browser tabs and home screen icons.

**Required favicon files:**
```
public/images/[brand-slug]/
├── favicon.ico          # 32x32 - Browser tab (legacy)
├── favicon-16x16.png    # 16x16 - Small browser tab
├── favicon-32x32.png    # 32x32 - Standard browser tab
├── apple-touch-icon.png # 180x180 - iOS home screen
├── android-chrome-192x192.png  # Android home screen
├── android-chrome-512x512.png  # Android splash screen
```

**Claude should ask:**
> "Do you have favicon files for this brand? I need the logo in multiple sizes for browser tabs and mobile home screens."

### Image & Asset Requirements
Images must be optimized for both web and mobile.

**Logo requirements:**
| Usage | Format | Size | Notes |
|-------|--------|------|-------|
| Main logo (web) | PNG/SVG/GIF | 400px wide max | High quality |
| Main logo (mobile) | Same file | Scales down | Use responsive CSS |
| Verify success icon | PNG/SVG | 85x85px | Can be brand-specific |
| Social icons | PNG/SVG | 60x60px | Linktree, Instagram, etc. |

**Image optimization:**
- Use WebP format when possible (smaller file size)
- Compress PNGs (TinyPNG or similar)
- SVG preferred for icons (scales perfectly)
- GIFs allowed for animated logos (like Fryd)
- Keep file sizes under 200KB for fast mobile load

**Claude should ask when reviewing a site:**
> "I see the logo is [format/size]. Do you have:
> 1. Favicon files for browser tabs?
> 2. A high-res version for the homepage?
> 3. Apple touch icon for iOS users?"

### Asset Checklist for New Brands

When migrating or adding a brand, collect these assets:

- [ ] **Logo** - High quality PNG/SVG/GIF (400px+ wide)
- [ ] **Favicon set** - All sizes listed above
- [ ] **Brand colors** - Background, text, button (hex codes)
- [ ] **Verify success icon** - Custom or use default
- [ ] **Social icons** - If brand has custom ones
- [ ] **Any other brand imagery** - Backgrounds, patterns, etc.

**If assets are missing:**
1. Ask the team lead for assets
2. Or extract from legacy site (download existing images)
3. Or use defaults (for verify icons, etc.)

---

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
├── legacy/                       # Legacy ColdFusion code (shared in repo, secrets redacted)
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

**FTP Access (Legacy Server):**
```
Host: 5.10.25.108
User: edroot
Password: 89@3Sb0z$mUM
Protocol: FTP (not SFTP)
Tool: WinSCP (located at C:\Users\antho\AppData\Local\Programs\WinSCP\WinSCP.com)
```

**IMPORTANT - DO NOT DOWNLOAD LOG FILES**
When downloading from FTP, exclude log files to avoid wasting time and tokens:
```
# WinSCP script example - download only code/images
option exclude *.log;*/logs/*;*/Logs/*;*/inetpub/*
get -filemask="*.cfm;*.css;*.js;*.png;*.jpg;*.gif;*.svg" /sitename.com/wwwroot/* legacy/[brand-name]/
```

**Site file structure on FTP:**
- Files are in `[domain]/wwwroot/` subdirectory
- Images often in `wwwroot/assets/images/` or `wwwroot/img/`

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

### Supabase Pro Settings

**Statement Timeout** - Default is 2 minutes. For large migrations, increase to 5 minutes:
```sql
-- Check current timeout
SHOW statement_timeout;

-- Increase to 5 minutes
ALTER DATABASE postgres SET statement_timeout = '300s';
```

### Large Table Migration Tips

When migrating tables with 100M+ rows:
- Use batch sizes of 5,000-10,000 rows
- Expect slowdown as table grows (indexes need updating)
- Statement timeouts may occur - increase timeout setting
- Migration script handles errors and retries automatically
- Can resume from last offset if interrupted

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

## Current State (January 13, 2026)

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
- ✅ Verify API route (`/api/verify`)
- ✅ Green Team enhanced with custom font and styling
- ✅ NFC verification API (`/api/verify/nfc`) with mobile-only check
- ✅ NFC error page matches legacy design (blinking red X)
- ✅ 4 new brand migrations: DMG, Green Team, Stealthy Air, Waxx Brandz
- ✅ Legacy ColdFusion code pushed to GitHub (secrets redacted)
- ✅ FTP download workflow documented
- ✅ Arcadia brand complete - infinite carousel, verification modals, mobile tested
- ✅ Dynamic favicon support via generateMetadata API

---

## Data Migration (MySQL → Supabase)

### Database Credentials

**Supabase (Target):**
```
URL: https://ncblgvjayvuviavhigwp.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jYmxndmpheXZ1dmlhdmhpZ3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1ODI5NzEsImV4cCI6MjA4MjE1ODk3MX0.Lng_t7109KpNLupL1xwDLlbVtKrYwbcQVt-gu7RYHOs
```

**MySQL (Source - Legacy):**
```
Host: 5.10.25.108
Port: 3306
Database: scanacart
User: readonly
Password: 3c0@2bGJceUj
Note: IP-restricted access - need whitelist or SSH tunnel
```

### Migration Status (January 12, 2026)

**Verified Supabase counts (checked today):**

| Table | MySQL Total | Supabase Rows | % Complete | Status |
|-------|-------------|---------------|------------|--------|
| `nfc_tag` | 10.76M | **10,763,537** | 100% | ✅ Complete |
| `label_password_validation` | ~100M+ | **2,666,857** | ~2.6% | ⏳ In Progress |
| `label_pass_detail` | ~12K | **1,791** | ~15% | ⏳ In Progress |
| `label_password` | 131.5M | **ERROR** | 0% | ❌ Table needs creation |
| `client` | ~2K | **0** | 0% | ⏹️ Pending |
| `client_branding` | - | **2** | - | Manual entries |
| `client_domains` | - | **4** | - | Manual entries |
| `tap_location` | new | **0** | - | ⏹️ Need to create table |

### Migration Architecture

**Previous setup (interrupted Jan 11-12):**
- 3 parallel jobs running simultaneously
- Each job: 5,000-10,000 rows per batch
- Using keyset pagination (not OFFSET) for performance
- Jobs were interrupted when Claude went down for maintenance

**Recommended batch sizes to test:**
- Start: 10,000 rows/batch (safe)
- Medium: 20,000 rows/batch
- Aggressive: 30,000 rows/batch
- Monitor for timeouts (Supabase default: 2 min, can increase to 5 min)

### Migration Scripts

Location: `scripts/`
- `check-migration-status.ts` - Check counts in both databases
- `check-supabase-tables.ts` - Verify Supabase table existence
- `migrate-label-password.ts` - Main migration script (TO CREATE)

### Blockers (as of Jan 12, 2026)

1. **MySQL Access Denied**
   - Error: `Access denied for user 'readonly'@'wsip-98-185-164-155.oc.oc.cox.net'`
   - Fix: Whitelist current IP or use SSH tunnel through 5.10.25.108

2. **label_password Table Missing in Supabase**
   - Table returns undefined error
   - Need to create table with proper schema and RLS policies

### Resume Strategy

1. Create `label_password` table in Supabase
2. Fix MySQL access (IP whitelist or SSH tunnel)
3. Query MySQL for max ID to find resume point
4. Start 1 job at 10K batch to test performance
5. Scale to 3 parallel jobs if stable
6. Increase batch size (20K, 30K) based on performance

### In Progress
- ⏳ Documenting migration status
- ⏳ Creating migration scripts

### Pending
- [ ] Create `label_password` table in Supabase
- [ ] Fix MySQL access (whitelist IP or SSH tunnel)
- [ ] Create `tap_location` table in Supabase
- [ ] Resume `label_password` migration (131.5M rows)
- [ ] Continue `label_password_validation` migration
- [ ] Continue `label_pass_detail` migration
- [ ] Migrate `client` table
- [ ] Map authenticfryd.com domain in production
- [ ] Test end-to-end verification flow

---

## Migration Checklist

### Status Legend
- **in progress** - Migration started
- **needs final review** - UI built, needs testing and verification wiring
- **complete** - Fully migrated and tested

### Brands with Custom Overrides
| Brand | Client ID | Domain | Type | Status | Notes | Pending |
|-------|-----------|--------|------|--------|-------|---------|
| Fryd | 2126 | authenticfryd.com | custom | needs final review | Desktop and Mobile UI tested, no defects | Verification with Production labels |
| Heaters | 2128 | heatersofficial.com | custom | needs final review | Desktop and Mobile UI tested, no defects | Verification with Production labels |
| DMG | 2145 | dmgbrandverify.com | custom | needs final review | Mobile tested, no defects. Supports ?product=black-hat and ?product=pink-hat | |
| Green Team | 1990 | verifygreenteam.com | custom | needs final review | Desktop and Mobile UI tested, no defects | Verification with Production labels |
| Stealthy Air | TBD | stealthyair.com | custom | needs final review | **Client NOT in DB** | |
| Waxx Brandz | 1852 | waxxbrandz.com | custom | needs final review | **Duplicate client: 2075** | |
| NIMA Wellness | TBD | nimawellness.com | custom | in progress | Treatment carousels complete, UI polish done. Awaiting text comparison with production screenshots. | Text verification, mobile testing, deploy |
| Arcadia | 2127 | TBD | custom | **complete** | Desktop and Mobile UI tested. Infinite carousel, verification modals. | Domain mapping, production codes migration |

### Skipped Domains
| Domain | Reason | Date |
|--------|--------|------|
| verifyqualitycontrol.com | Domain changed - renamed to another domain in our list of 166 | Jan 9, 2026 |

### Database Issues to Resolve
- **Green Team**: Has duplicate client records (1990 and 2103). Recommend keeping 1990 (has logo).
- **Waxx Brandz**: Has duplicate client records (1852 and 2075). Recommend keeping 1852 (has logo).
- **Stealthy Air**: Client not found in database - needs to be created.

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

### January 13, 2026 (Session 5)
**Goal:** Finalize documentation and push legacy code to GitHub

**What was done:**
- Fixed image path case sensitivity issues in Stealthy Air and Waxx Brandz components
- Checked database for client records - found duplicates and missing client
- Updated documentation with FTP rules, migration status, and next steps for AP
- Pushed all brand migrations to production (4 brands, 60 files)
- Pushed legacy ColdFusion code to GitHub (was previously gitignored)
- Redacted API secrets in legacy code before pushing

**Legacy folder now shared:**
The `legacy/` folder is now pushed to GitHub (no longer gitignored) so the whole team can reference the original ColdFusion code. Secrets have been redacted (Mailgun API key, IP validation key).

**Sites in legacy/ folder:**
- `authenticatefryd.com/`
- `dmgbrandverify.com/`
- `stealthyair.com/`
- `verifygreenteam.com/`
- `verifyqualitycontrol.com/`
- `waxxbrandz.com/`

**Current state:**
- All 4 brand migrations pushed and deployed
- AP can clone repo and see everything
- Documentation updated with handoff instructions

---

### January 12, 2026 (Session 4)
**Goal:** Resume data migration after Claude maintenance outage

**Context:**
- Claude went down for maintenance over the weekend (Jan 11-12)
- 3 parallel migration jobs were running and got interrupted
- Previous status: label_password was at 44% (~57.7M of 131.5M rows)

**Investigation findings:**

1. **Supabase current state (verified):**
   - `nfc_tag`: 10,763,537 rows ✅ Complete
   - `label_password_validation`: 2,666,857 rows (in progress)
   - `label_pass_detail`: 1,791 rows (in progress)
   - `label_password`: ERROR - table doesn't exist or has access issues
   - `client`: 0 rows (not migrated)

2. **MySQL access blocked:**
   - Error: Access denied for user 'readonly'@'wsip-98-185-164-155.oc.oc.cox.net'
   - The readonly user is IP-restricted
   - Need to whitelist current IP or use SSH tunnel

**Files created:**
- `scripts/check-migration-status.ts` - Check both database counts
- `scripts/check-supabase-tables.ts` - Verify Supabase tables
- Updated `CLAUDE.md` with full migration documentation

**Blockers identified:**
1. MySQL access denied from current IP
2. `label_password` table needs to be created in Supabase

**Next steps:**
1. Create `label_password` table in Supabase (SQL ready)
2. Fix MySQL access (whitelist IP or SSH tunnel)
3. Create migration script with configurable batch sizes
4. Test with 1 job at 10K batch
5. Scale to 3 parallel jobs at 20K-30K batch

---

### January 9, 2026 (Session 3)
**Goal:** Enhance Green Team brand and add verify API

**What was done:**
- Enhanced Green Team homepage with full custom styling
- Added Posey custom font for Green Team (`public/fonts/greenteam/`)
- Created verify API route (`src/app/api/verify/route.ts`)
- Updated preview pages for better brand support
- Deployed to production (commit `5582e2a`)
- Tested Green Team mobile responsiveness - verified no defects
- DMG Hats: Added AlexBrush custom font
- DMG Hats: Added product variants via URL param (?product=black-hat, ?product=pink-hat)
- DMG Hats: Fixed image centering on mobile
- DMG Hats: Mobile tested - no defects

**Key files created/modified:**
- `src/brands/greenteam/HomePage.tsx` - Major enhancements (947+ lines)
- `src/brands/greenteam/greenteam.css` - Custom styles
- `src/app/api/verify/route.ts` - New verify API endpoint
- `public/fonts/greenteam/Posey-Regular.ttf` - Custom font

**Deployment:**
- Successfully pushed to production
- Live at: https://bh-brand-sites.vercel.app

---

### January 9, 2026 (Session 2)
**Goal:** Migrate 5 most recent ColdFusion sites to Next.js

**Sites analyzed from FTP:**
1. **verifygreenteam.com** → Custom brand override created
2. **dmgbrandverify.com** → Custom brand override created
3. **stealthyair.com** → Custom brand override created (needs client in DB)
4. **waxxbrandz.com** → Custom brand override created
5. **verifyqualitycontrol.com** → Empty site (just `<html><body></body></html>`)

**What was done:**
- Downloaded legacy code from FTP for all 5 sites
- Created 4 brand overrides with custom HomePage components
- Downloaded images from FTP (Stealthy Air, Waxx Brandz)
- Fixed image path case sensitivity issues
- Updated brand registry with all new brands
- Checked database for client records (found duplicates)
- Updated documentation with FTP rules and migration status

**Key files created:**
- `src/brands/dmg/` - DMG brand override
- `src/brands/greenteam/` - Green Team brand override
- `src/brands/stealthyair/` - Stealthy Air brand override
- `src/brands/waxxbrandz/` - Waxx Brandz brand override
- `public/images/stealthyair/` - Brand images
- `public/images/waxxbrandz/` - Brand images

**Database findings:**
- DMG: client_id 2145 (OK)
- Green Team: DUPLICATE - client_id 1990 and 2103
- Waxx Brandz: DUPLICATE - client_id 1852 and 2075
- Stealthy Air: NOT FOUND - needs to be created

**Next steps for AP:**
1. Resolve duplicate client records in database:
   - Green Team: Keep client_id 1990, delete/deactivate 2103
   - Waxx Brandz: Keep client_id 1852, delete/deactivate 2075
2. Create Stealthy Air client in database (currently missing)
3. Wire up verification API for all brands (do once, works for all)
4. Test each brand via preview mode:
   - `/preview/2145` - DMG
   - `/preview/1990` - Green Team
   - `/preview/1852` - Waxx Brandz
   - `/preview/[new-id]` - Stealthy Air (after creating client)
5. Continue migrating remaining sites from the 166 list

**Decisions made this session:**
- Build UI/frontend only for now - verification backend will be wired up once for all brands
- CDN image URLs (like Cloudflare imagedelivery) stay as-is in code, don't download
- Local images from FTP get downloaded to `public/images/[brand]/`
- verifyqualitycontrol.com SKIPPED - domain was renamed to another in our list
- Sites marked "needs final review" = UI complete, needs testing

---

### January 9, 2026 (Session 1)
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

### January 13, 2026 (Session 6)
**Goal:** Migrate NIMA Wellness public website from ColdFusion to Next.js

**Context:**
- NIMA Wellness (nimawellness.com) is a hormone & wellness clinic in Orange County
- Scope: PUBLIC WEBSITE ONLY - not the admin panel or booking system
- Work done locally via debug page at `/debug-nima`

**What was done:**
- Downloaded legacy code from FTP (`/nimawellness.com/CF2023/` and `/nimawellness.com/wwwroot/`)
- Created brand configuration: `src/brands/nimawellness/config.ts`
- Created HomePage component: `src/brands/nimawellness/HomePage.tsx` (~1000+ lines)
- Downloaded video assets to `public/video/nimawellness/`
- Downloaded images to `public/images/nimawellness/`
- Created debug page: `src/app/debug-nima/page.tsx`
- Fixed Tailwind scanning legacy files (added `@source not` directive)
- Switched hero video to Cloudflare Stream (local video caused memory issues)

**Key discovery: FTP files are NOT the production source**
- Production nimawellness.com has text like "Orange County's #1 Hormone & Wellness Authority"
- This text is NOT in any FTP files (CF2023 or wwwroot folders)
- Production is deployed from a different source (location unknown)
- Used WebFetch to get production content directly

**Brand configuration extracted:**
```
Primary: #0098f5 (blue)
Secondary: #ff9b00 (yellow/orange)
Dark: #101010
Light: #f2f2f2
Font: Poppins (Google Fonts)
```

**Cloudflare Stream video URLs discovered:**
- Customer ID: `19w1a8y0iapg9msz`
- Hero video: `https://customer-19w1a8y0iapg9msz.cloudflarestream.com/aa66c1a1403d1ae2c458968981b3fde8/iframe`

**Files created:**
- `src/brands/nimawellness/config.ts` - Colors, images, contact info
- `src/brands/nimawellness/HomePage.tsx` - Main homepage component
- `src/app/debug-nima/page.tsx` - Debug page for testing
- `src/app/debug-nima-simple/page.tsx` - Simple test page
- `public/video/nimawellness/*.mp4` - Video files (hero, fashion, testimonials)
- `public/images/nimawellness/` - Logos, team photos, thumbnails
- `legacy/nimawellness.com/CF2023/` - Downloaded ColdFusion source

**Sections implemented (from production fetch):**
- Hero section with Cloudflare Stream video background
- "Our Mission" section
- "Luxury Health & Wellness" treatment cards
- P-Shot and O-Shot sections with benefit lists
- "Why NIMA is Different" (4 pillars)
- VIP Program section (5 exclusive perks)
- Final CTA section
- Footer with business hours

**Errors fixed:**
1. Tailwind scanning legacy `.cfm` files - added `@source not "../../legacy/**/*";` to globals.css
2. TypeScript missing `id` property - added to mock branding in debug page
3. Page spinning/not loading - switched to Cloudflare Stream, set video `preload="none"`
4. File paths with spaces - renamed files to use hyphens

**Blocked:**
- Migration paused until true production source files are found
- FTP files are outdated - manual line-by-line comparison is inefficient
- Need to locate where production is actually deployed from

**Debug URL:** http://localhost:3000/debug-nima

**Status:** IN PROGRESS - Waiting for production source files

---

### January 13, 2026 (Session 7)
**Goal:** Complete Arcadia brand landing page

**Context:**
- Arcadia (client_id 2127) - vape/flavor brand
- Needed custom landing page with product showcase and verification

**What was done:**
- Implemented seamless infinite product carousel (CSS-only animation)
- Added verification success/error modals
- Success modal shows small Arcadia logo + "Authentic Arcadia Product"
- Error modal shows "Not Authentic" with retry prompt
- Added favicon support using Next.js `generateMetadata` API
- Fixed favicon not showing (was using inline `<head>` tag which doesn't work in App Router)
- Updated page title to just "Arcadia"
- Tested on desktop and mobile - no defects
- Deployed to production

**Key files:**
- `src/brands/arcadia/HomePage.tsx` - Main page component with carousel and modals
- `src/brands/arcadia/arcadia.css` - Infinite carousel CSS animation
- `src/brands/arcadia/config.ts` - Cloudflare CDN image URLs (logo, flavors, 20 flavor renders)
- `src/brands/arcadia/index.ts` - Brand registration with favicon
- `src/app/preview/[clientId]/page.tsx` - Added `generateMetadata` for dynamic favicon/title
- `public/images/arcadia/favicon.png` - Favicon file

**Carousel implementation:**
- Pure CSS animation using `translateX(-50%)`
- Images duplicated in DOM for seamless loop
- 80s animation duration (desktop: 100s)
- Pauses on hover
- Items aligned to bottom, scale on hover

**Verification status:**
- API endpoint ready (`/api/verify`)
- 4 batches configured in `label_pass_detail` for client 2127
- Only test code `ARCADIA123` exists - production codes need migration
- Data migration deferred - will coordinate with senior dev for all brands

**Pending:**
1. Get custom domain from brand owner
2. Add domain to `client_domains` table
3. Configure domain in Vercel
4. Migrate production verification codes from MySQL

**Preview URL:** https://bh-brand-sites.vercel.app/preview/2127

**Commits:**
- `225bdc4` - Complete Arcadia landing page with infinite carousel and verification modals
- `26807fd` - Fix favicon using Next.js generateMetadata API
- `5f62730` - Update page title to just brand name, fix favicon type

**Status:** COMPLETE - Waiting for domain and production codes

---

### January 15-16, 2026 (Session 8)
**Goal:** Continue NIMA Wellness migration - implement treatment carousels and UI polish

**Context:**
- Continuing from Session 6 where basic structure was created
- Decided to proceed with production content comparison via screenshots instead of relying on FTP files

**What was done:**

**Treatment Carousel Implementation:**
- Implemented true infinite loop carousel with cloned slides at both ends
- Layout: `[clone of last] + [all real slides] + [clone of first]`
- Seamless transition using `transitionend` event listener with instant jumps
- Direct DOM manipulation via refs to avoid React re-render timing issues
- Autoplay at 2000ms intervals (matches production)
- Single-slide tabs handled separately (no clones needed)

**Treatment Tabs Completed:**
1. **Hormone Replacement Therapy** - Single slide with TRT/BHRT info
2. **Treatment By Age** - 4 slides (30s, 40s, 50s, 60s) with age badge overlay
3. **Erectile Dysfunction** - Single slide with comprehensive ED solutions
4. **Anti-Aging** - 3 slides (Non-Surgical, Laser, Peptides/NAD+)
5. **Body Sculpting** - Single slide with all body contouring treatments
6. **Medical Weight Loss** - Single slide with GLP-1/GIP programs
7. **Sexual Health** - 2 slides (P-Shot™ and O-Shot™) with "Perfect For" sections

**UI Polish:**
- Fixed Learn More button styling (filled blue, not outline)
- Fixed button text weight (400 instead of 500)
- Fixed button shadow clipping with container padding (`pb-4`)
- Fixed P-Shot image cropping with `object-position: top center`
- Changed carousel arrows from ← → to < > chevrons
- Fixed arrow direction (left points left, right points right)
- Added polymorphic handling for `learnMore` (string or object format)

**Key Technical Decisions:**
- Use `slideIndexRef` (useRef) instead of state to track position - avoids re-render timing issues
- Clone slides in DOM for seamless infinite loop
- Instant jump (no transition) when reaching clone boundaries
- `requestAnimationFrame` double-wrap for smooth jump timing

**Files modified:**
- `src/brands/nimawellness/HomePage.tsx` - All treatment data and carousel logic (~1300 lines)
- `src/brands/nimawellness/nimawellness.css` - Button styles, arrow positioning, image fit

**CSS Classes Added:**
- `.nima-btn-primary` / `.nima-btn-secondary` - Filled blue buttons with shadow
- `.nima-perfect-for` - Styled callout box for Sexual Health slides
- `.nima-slider-arrows` - Positioned at carousel edges
- `.nima-treatment-slide .nima-slide-thumb img` - `object-position: top center`

**Next Steps:**
1. Compare treatment card text with production screenshots (user will provide)
2. Fix any text discrepancies found
3. Final mobile testing
4. Register brand and deploy

**Debug URL:** http://localhost:3000/debug-nima (or port 3002 if 3000 in use)

**Status:** IN PROGRESS - Awaiting production screenshots for text comparison

---

*Last updated: January 16, 2026 (Session 8)*
