# Legacy Code Reference

This folder contains downloaded ColdFusion code from production servers for reference during migration.

## Folder Structure
```
legacy/
├── dandy/           # Dandy brand legacy code
├── blinkers/        # Blinkers brand legacy code
├── wholemelt/       # Wholemelt brand legacy code
└── [brand-name]/    # Each brand gets its own folder
```

## How to Use

1. **Download** the ColdFusion files from the production server
2. **Create a folder** with the brand name (lowercase, no spaces)
3. **Drop the files** in that folder
4. **Reference** during migration - but don't blindly copy!

## Important Notes

- This code is **read-only reference** - we don't run it
- The goal is to understand the old logic, then rebuild it cleanly
- Old database structures may be messy - we normalize as we migrate
- Ask questions before creating new tables/columns

## This folder is gitignored
Legacy code stays local for reference only - it doesn't get pushed to the repo.
