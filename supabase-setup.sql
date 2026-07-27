-- Run this in Supabase SQL Editor (one time setup)

-- Profiles table (stores coach name)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  created_at timestamp with time zone default now()
);

-- Allow users to read/write their own profile
alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
