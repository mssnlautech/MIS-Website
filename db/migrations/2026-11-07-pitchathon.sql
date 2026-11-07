-- Buildathon -> Pitchathon. Run once in the Supabase SQL Editor before deploying.
-- Additive only: existing rows are kept untouched.

alter table hackathon_registrations add column if not exists members jsonb;
alter table hackathon_registrations add column if not exists problem text;
-- Proposal fields (project_idea holds the solution).
alter table hackathon_registrations add column if not exists difference text;
alter table hackathon_registrations add column if not exists traction text;
alter table hackathon_registrations add column if not exists scalability text;
alter table hackathon_registrations add column if not exists market text;
alter table hackathon_registrations add column if not exists monetization text;
alter table hackathon_registrations alter column skills drop not null;
alter table hackathon_registrations alter column experience drop not null;
