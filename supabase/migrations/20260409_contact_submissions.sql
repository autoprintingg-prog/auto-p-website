-- Migration: create contact_submissions table
-- Run this in the Supabase SQL Editor for your project.

create table if not exists public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  institution  text not null default '',
  message      text not null,
  created_at   timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.contact_submissions enable row level security;

-- Allow anyone (anon key) to INSERT a new submission
create policy "Allow public insert"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Only authenticated users (admin) can SELECT submissions
create policy "Allow authenticated read"
  on public.contact_submissions
  for select
  to authenticated
  using (true);
