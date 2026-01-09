-- Create tap_location table for NFC tap tracking
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS tap_location (
  tap_loc_id BIGSERIAL PRIMARY KEY,
  tag_id BIGINT NOT NULL,
  ip VARCHAR(45),
  ip_type VARCHAR(10),
  continent_code VARCHAR(10),
  continent_name VARCHAR(50),
  country_code VARCHAR(10),
  country_name VARCHAR(100),
  region_code VARCHAR(20),
  region_name VARCHAR(100),
  city VARCHAR(100),
  zip VARCHAR(20),
  longitude DECIMAL(10, 6),
  latitude DECIMAL(10, 6),
  live SMALLINT DEFAULT 1,
  user_agent TEXT,
  encrypted_id TEXT,
  create_dt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tap_location_tag_id ON tap_location(tag_id);
CREATE INDEX IF NOT EXISTS idx_tap_location_encrypted_id ON tap_location(encrypted_id);
CREATE INDEX IF NOT EXISTS idx_tap_location_create_dt ON tap_location(create_dt);

-- Enable RLS (Row Level Security)
ALTER TABLE tap_location ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role has full access to tap_location" ON tap_location
  FOR ALL USING (true) WITH CHECK (true);

-- Grant access to anon for inserts (taps come from public)
CREATE POLICY "Allow anonymous inserts to tap_location" ON tap_location
  FOR INSERT WITH CHECK (true);

-- Allow reads for counting
CREATE POLICY "Allow anonymous reads from tap_location" ON tap_location
  FOR SELECT USING (true);
