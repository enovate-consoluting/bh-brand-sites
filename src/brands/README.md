# Brand Overrides

This folder contains brand-specific customizations that override the default shared components.

## Structure

```
src/brands/
├── index.ts              # Brand registry - maps brand slugs to their overrides
├── README.md             # This file
├── fryd/                 # Fryd-specific overrides
│   ├── index.ts          # Exports Fryd's custom components
│   ├── HomePage.tsx      # Custom homepage (optional)
│   ├── VerifyPage.tsx    # Custom verify page (optional)
│   └── config.ts         # Brand-specific config (images, text, etc.)
└── [other-brand]/
    └── ...
```

## How It Works

1. When a page loads, it checks `src/brands/index.ts` for the current brand
2. If the brand has a custom component, it uses that
3. If not, it falls back to the default shared component in `src/app/`

## Adding a New Brand Override

1. Create a folder: `src/brands/[brand-slug]/`
2. Add your custom components (HomePage.tsx, VerifyPage.tsx, etc.)
3. Export them from `src/brands/[brand-slug]/index.ts`
4. Register the brand in `src/brands/index.ts`

## When to Create an Override

- **DON'T** create an override just for colors/logos - use the database (`client_branding`)
- **DO** create an override when:
  - The layout is fundamentally different
  - There are brand-specific features (rewards, registration, etc.)
  - Custom interactive elements are needed

## Static Assets

Brand-specific images go in `public/images/[brand-slug]/`:
```
public/images/fryd/logo.gif
public/images/fryd/verify_success.png
```

Reference them in components as `/images/fryd/logo.gif`
