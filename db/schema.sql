-- Run this once against your Supabase database (SQL Editor or `psql "$DATABASE_URL" -f db/schema.sql`).

create extension if not exists pgcrypto;

create table if not exists volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  availability text,
  department text not null,
  roles text[] not null
);

create table if not exists call_form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form_type text not null,   -- 'speaker' today; reusable if another CallForm use appears
  fields jsonb not null       -- {label: value} pairs, in field order
);

create table if not exists ticket_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  reference text not null unique,
  status text not null,       -- Paystack event status, e.g. 'success'
  email text,
  amount_kobo integer,
  currency text,
  tier text,                  -- resolved by matching amount against TICKETS prices
  paid_at timestamptz,
  raw_payload jsonb not null
);

-- Block Supabase's public Data API. The app connects as `postgres`, which bypasses RLS.
alter table volunteer_applications enable row level security;
alter table call_form_submissions enable row level security;
alter table ticket_orders enable row level security;


create table if not exists hackathon_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  team_name text,
  project_idea text,
  skills text,
  experience text
);

-- Pitchathon (formerly Buildathon). Table name kept to avoid a rename.
-- name/email/phone are the team lead; members holds every member, lead first:
-- [{"name", "email", "phone"}]. skills/experience are only set on old Buildathon rows.
-- The proposal is problem, project_idea (the solution), difference, traction,
-- scalability, market, monetization.
alter table hackathon_registrations add column if not exists members jsonb;
alter table hackathon_registrations add column if not exists problem text;
alter table hackathon_registrations add column if not exists difference text;
alter table hackathon_registrations add column if not exists traction text;
alter table hackathon_registrations add column if not exists scalability text;
alter table hackathon_registrations add column if not exists market text;
alter table hackathon_registrations add column if not exists monetization text;
alter table hackathon_registrations alter column skills drop not null;
alter table hackathon_registrations alter column experience drop not null;

-- One registration per team-lead email (case-insensitive).
create unique index if not exists hackathon_registrations_email_key
  on hackathon_registrations (lower(email));

alter table hackathon_registrations enable row level security;

create table if not exists partner_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  organization text not null,
  partnership_type text not null,
  message text not null
);

alter table partner_inquiries enable row level security;
