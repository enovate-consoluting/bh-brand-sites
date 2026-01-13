-- Fix LUCID / Arcadia Mismatch
-- Run this in Supabase SQL Editor to update client 2127

-- Option 1: Update company_name to "Arcadia" (recommended)
UPDATE clients 
SET 
  company_name = 'Arcadia',
  slug = 'arcadia'
WHERE client_id = '2127';

-- Option 2: If you prefer to keep "LUCID" in the database but display "Arcadia"
-- You can keep company_name as "LUCID" but ensure slug is "arcadia"
-- UPDATE clients SET slug = 'arcadia' WHERE client_id = '2127';

-- Verify the update
SELECT client_id, company_name, slug 
FROM clients 
WHERE client_id = '2127';

-- Expected result:
-- client_id: 2127
-- company_name: Arcadia (or LUCID if you used Option 2)
-- slug: arcadia
