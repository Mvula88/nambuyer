-- =============================================
-- Migration: Add accident-damaged vehicle fields
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. Update vehicle_status check constraint to allow 'accident_damaged'
ALTER TABLE submissions DROP CONSTRAINT IF EXISTS submissions_vehicle_status_check;
ALTER TABLE submissions ADD CONSTRAINT submissions_vehicle_status_check
  CHECK (vehicle_status IN ('used', 'rebuilt', 'accident_damaged'));

-- 2. Add new columns for damage details
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS damage_type text
  CHECK (damage_type IN ('front', 'rear', 'side', 'rollover', 'flood', 'fire', 'hail', 'multiple'));

ALTER TABLE submissions ADD COLUMN IF NOT EXISTS is_drivable boolean;

ALTER TABLE submissions ADD COLUMN IF NOT EXISTS has_insurance boolean;

ALTER TABLE submissions ADD COLUMN IF NOT EXISTS damage_description text;

ALTER TABLE submissions ADD COLUMN IF NOT EXISTS scrap_interest boolean NOT NULL DEFAULT false;
