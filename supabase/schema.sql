-- =============================================
-- NamBuyer - Database Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Submissions table
create table if not exists submissions (
  id uuid default gen_random_uuid() primary key,
  reference_number text unique not null,
  make text not null,
  model text not null,
  year integer not null,
  mileage integer not null,
  color text not null,
  transmission text not null check (transmission in ('manual', 'automatic')),
  fuel_type text not null check (fuel_type in ('petrol', 'diesel')),
  condition text not null check (condition in ('excellent', 'good', 'fair', 'poor')),
  vehicle_status text not null default 'used' check (vehicle_status in ('used', 'rebuilt', 'accident_damaged')),
  accident_history text not null default 'accident_free' check (accident_history in ('accident_free', 'been_in_accident')),
  known_issues text,
  service_history text not null default 'none' check (service_history in ('full', 'partial', 'none')),
  -- Accident-damaged / scrap fields
  damage_type text check (damage_type in ('front', 'rear', 'side', 'rollover', 'flood', 'fire', 'hail', 'multiple')),
  is_drivable boolean,
  has_insurance boolean,
  damage_description text,
  scrap_interest boolean not null default false,
  ownership_duration text not null default '0-6 months',
  is_financed boolean not null default false,
  settlement_amount decimal(12,2),
  description text,
  asking_price decimal(12,2) not null,
  offer_amount decimal(12,2),
  offer_notes text,
  seller_name text not null,
  seller_phone text not null,
  seller_email text,
  seller_location text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'inspection_scheduled', 'offer_made', 'accepted', 'rejected', 'completed')),
  inspection_date timestamptz,
  inspection_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Submission photos table
create table if not exists submission_photos (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid references submissions(id) on delete cascade not null,
  photo_url text not null,
  photo_path text not null,
  created_at timestamptz default now()
);

-- Auto-update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger submissions_updated_at
  before update on submissions
  for each row
  execute function update_updated_at();

-- Create indexes
create index if not exists idx_submissions_status on submissions(status);
create index if not exists idx_submissions_reference on submissions(reference_number);
create index if not exists idx_submissions_created on submissions(created_at desc);
create index if not exists idx_photos_submission on submission_photos(submission_id);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

alter table submissions enable row level security;
alter table submission_photos enable row level security;

-- Allow anyone to INSERT submissions (sellers don't need auth)
create policy "Anyone can submit a car"
  on submissions for insert
  with check (true);

-- Allow anyone to SELECT their submission by reference number
create policy "Anyone can view submissions"
  on submissions for select
  using (true);

-- Only authenticated users (admins) can UPDATE submissions
create policy "Admins can update submissions"
  on submissions for update
  using (auth.role() = 'authenticated');

-- Allow anyone to INSERT photos (part of submission flow)
create policy "Anyone can upload submission photos"
  on submission_photos for insert
  with check (true);

-- Allow anyone to view photos
create policy "Anyone can view photos"
  on submission_photos for select
  using (true);

-- Only admins can delete photos
create policy "Admins can delete photos"
  on submission_photos for delete
  using (auth.role() = 'authenticated');

-- =============================================
-- Storage bucket for car photos
-- =============================================
-- Run these separately if they fail in batch:

insert into storage.buckets (id, name, public)
values ('car-photos', 'car-photos', true)
on conflict (id) do nothing;

-- Allow anyone to upload to car-photos bucket
create policy "Anyone can upload car photos"
  on storage.objects for insert
  with check (bucket_id = 'car-photos');

-- Allow anyone to view car photos
create policy "Anyone can view car photos"
  on storage.objects for select
  using (bucket_id = 'car-photos');

-- Allow authenticated users to delete car photos
create policy "Admins can delete car photos"
  on storage.objects for delete
  using (bucket_id = 'car-photos' and auth.role() = 'authenticated');
