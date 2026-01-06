# BH Brand Sites - Project Context

## Mission
Multi-tenant brand verification platform to migrate existing ColdFusion sites to Next.js and host all new brand verification websites. Each brand gets their own custom-branded verification site under a unified codebase, reducing maintenance overhead and enabling rapid deployment of new brand sites.

## What This Project Is
A white-label product verification system where brands (Dandy, Blinkers, Wholemelt, etc.) each get their own domain with custom branding. Consumers scan NFC chips on products and are directed to the brand's verification site to confirm authenticity. The platform handles domain routing, dynamic theming, and verification logic for 50+ brands from a single Next.js codebase.

## Live URLs
- **Production:** https://bh-brand-sites.vercel.app
- **Vercel Dashboard:** https://vercel.com/enovate50/bh-brand-sites
- **GitHub:** https://github.com/enovate-consoluting/bh-brand-sites

## Tech Stack
- **Framework:** Next.js 14 (App Router, Turbopack)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Vercel
- **Auth:** Supabase (for future admin features)

## Database

### Supabase Project
- **URL:** https://ncblgvjayvuviavhigwp.supabase.co
- **Tables:**
  - `clients` - Brand companies (company_name, primary_color, logo_url, contact info, settings)
  - `client_domains` - Maps domains to clients (domain → client_id)
  - `client_branding` - Extended branding (large_logo_url, background_color, text_color, button_color, font_family, custom_css)
  - `client_social_links` - Social media links per client (platform, handle)
  - `nfc_chips` - Verification codes (public_id, chip_uid, product_id, status, nfc_url)
  - `verification_logs` - Scan tracking with location data
  - `rp_registered_products` - Product registrations with user info
  - `member_rewards` - Points/rewards system (for future use)

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Key Features

### Core (MVP)
- [x] Multi-tenant domain detection middleware
- [x] Dynamic branding per client (colors, logos)
- [x] Homepage with verification form
- [x] Verify page - checks NFC chip codes against database
- [x] Social links display
- [ ] Client domain mapping (table exists, needs data)

### Phase 2
- [ ] Product registration flow
- [ ] Image upload for registrations
- [ ] Email notifications

### Phase 3
- [ ] Rewards/points system
- [ ] Member accounts
- [ ] Admin dashboard per brand

## Current State (January 6, 2026)

- ✅ Next.js 14 project initialized with TypeScript + Tailwind
- ✅ Supabase client configured (server + browser)
- ✅ Middleware detects domain and loads client config
- ✅ Homepage with verify form, logo, social links
- ✅ Verify page checks codes against nfc_chips table
- ✅ Deployed to Vercel with env vars
- ✅ GitHub repo connected for auto-deploy
- ⚠️ No domains mapped yet in client_domains table
- ⚠️ Most clients missing branding data (logos, colors)

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Homepage with verify form
│   ├── verify/page.tsx       # Verification result page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── VerifyForm.tsx        # Code input form
│   └── SocialLinks.tsx       # Social media icons
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser Supabase client
│   │   └── server.ts         # Server Supabase client
│   └── get-site-config.ts    # Fetches client config by domain
├── middleware.ts             # Domain detection
└── types/
    └── database.ts           # TypeScript types
```

## Quick Reference

### Commands
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
vercel --prod    # Deploy to production
```

### Adding a New Brand Site
1. Ensure client exists in `clients` table
2. Add domain mapping to `client_domains` (domain, client_id)
3. Add branding to `client_branding` (logo, colors)
4. Add social links to `client_social_links` (optional)
5. Configure domain in Vercel + DNS

### Database Access (CLI)
```bash
# Example: Get all clients
curl -s "https://ncblgvjayvuviavhigwp.supabase.co/rest/v1/clients?select=*" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"
```

---

## Migration Workflow

### Philosophy: Clean As You Go
**DO NOT blindly copy old database structures or code patterns.** The legacy ColdFusion codebase has accumulated technical debt. This migration is an opportunity to:

1. **Normalize data** - If old tables have redundant columns, ask before recreating them
2. **Ask questions** - When something looks messy, stop and clarify before implementing
3. **Document decisions** - Note why we structured things differently than the legacy system
4. **Keep it simple** - Only build what's needed for the current site, not "just in case" features

### Folder Structure
```
bh-brand-sites/
├── src/                    # Next.js application code (shared by all brands)
├── legacy/                 # Legacy ColdFusion code (LOCAL ONLY - gitignored)
│   ├── dandy/              # Dandy's old CF files
│   ├── blinkers/           # Blinkers' old CF files
│   └── [brand-name]/       # Each brand's legacy code
├── CLAUDE.md               # This file - project context
└── ...
```

### Step-by-Step: Migrating a Brand Site

#### 1. Download Legacy Code
```bash
# Create folder for the brand
mkdir legacy/[brand-name]

# Download ColdFusion files from production server
# (Use FTP, SCP, or whatever access you have)
# Place all files in legacy/[brand-name]/
```

#### 2. Review Legacy Code with Claude
Tell Claude:
> "I've downloaded the legacy code for [Brand Name] into `legacy/[brand-name]/`. Let's review it together. Walk me through what this site does and what we need to migrate."

Claude will:
- Read through the legacy files
- Identify the features and flows
- Ask clarifying questions about business logic
- Propose a clean implementation

#### 3. Check/Update Database
Before writing code, verify the data:
- Does the client exist in `clients` table?
- Is there branding in `client_branding`?
- Are there NFC chips in `nfc_chips` for this client?
- What's in the old database that we need to migrate?

**If old database has messy structure:**
- Claude will ask: "The old table has X columns, but Y and Z seem redundant. Should we normalize this?"
- You decide - don't just copy the mess

#### 4. Implement the Site
- Add domain to `client_domains`
- Add/update branding in `client_branding`
- Add any new features needed (most sites use the shared codebase)
- If custom features needed, discuss architecture first

#### 5. Test & Deploy
```bash
npm run dev                 # Test locally
git add . && git commit     # Commit changes
git push                    # Auto-deploys to Vercel
```

#### 6. DNS & Go Live
- Add custom domain in Vercel dashboard
- Update DNS to point to Vercel
- Verify site loads with correct branding

### Questions Claude Should Ask During Migration

1. **Data Structure:**
   - "The old database has [X]. Do we need this, or can we simplify?"
   - "This column seems unused. Should I skip it?"

2. **Features:**
   - "The old site has [feature]. Is this still needed?"
   - "This logic seems complex. Can you explain the business reason?"

3. **Branding:**
   - "I see these colors in the old CSS. Are these current brand colors?"
   - "The old site has [X] pages. Which are essential for launch?"

4. **Edge Cases:**
   - "What should happen when [X]?"
   - "The old code handles [Y] this way - is that correct behavior?"

### For Team Members Using This Workflow

When starting work on a new brand migration:

1. **Read this CLAUDE.md first** - Understand the project structure
2. **Download legacy code** to `legacy/[brand-name]/`
3. **Tell Claude:** "Let's migrate [Brand Name]. I've put the legacy code in `legacy/[brand-name]/`. Review it and ask me questions before we start coding."
4. **Answer Claude's questions** - Don't let it guess
5. **Review Claude's plan** before implementation
6. **Test thoroughly** before deploying

### Red Flags to Watch For

- 🚩 Claude creating new database tables without asking
- 🚩 Claude copying old column names that don't make sense
- 🚩 Implementing features that seem unused
- 🚩 Complex logic without clear business justification

**When in doubt, STOP and ASK.**

---

## Session Log

### January 6, 2026
**Goal:** Initialize multi-tenant brand verification platform

**What was done:**
- Created Next.js 14 project with TypeScript + Tailwind
- Set up Supabase client (server + browser)
- Created middleware for domain-based multi-tenancy
- Built homepage with verification form, logo, social links
- Built /verify page with NFC chip code validation
- Pushed to GitHub and deployed to Vercel
- Configured Supabase environment variables
- Verified database access (50+ clients already exist)

**Key files created:**
- `src/middleware.ts` - Domain detection and client routing
- `src/lib/get-site-config.ts` - Fetches client config from Supabase
- `src/app/page.tsx` - Dynamic homepage
- `src/app/verify/page.tsx` - Verification result page
- `src/components/VerifyForm.tsx` - Code input form
- `src/components/SocialLinks.tsx` - Social media icons
- `src/types/database.ts` - TypeScript interfaces

**Still needs work:**
- Map first client domain in `client_domains`
- Add branding data for first client
- Test end-to-end verification flow

---

*Last updated: January 6, 2026*
