-- ============================================================
-- coachHQ Supabase Schema Setup
-- Copy and paste each CREATE TABLE section into your Supabase SQL Editor
-- Then run the RLS policies section
-- ============================================================

-- 1. PROFILES TABLE (for coach data)
create table profiles (
  id uuid references auth.users primary key,
  name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- 2. STUDENTS TABLE
create table students (
  id bigint primary key generated always as identity,
  coach_id uuid references auth.users not null,
  name text not null,
  level text, -- 'Beginner', 'Inter', 'Advanced'
  age integer,
  dob text,
  contact text,
  address text,
  sessions_count integer default 0,
  technique_rating integer default 0,
  footwork_rating integer default 0,
  speed_rating integer default 0,
  stamina_rating integer default 0,
  tactics_rating integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table students enable row level security;
create policy "Users can read own students" on students for select using (auth.uid() = coach_id);
create policy "Users can insert own students" on students for insert with check (auth.uid() = coach_id);
create policy "Users can update own students" on students for update using (auth.uid() = coach_id);
create policy "Users can delete own students" on students for delete using (auth.uid() = coach_id);

-- 3. DRILLS TABLE
create table drills (
  id bigint primary key generated always as identity,
  coach_id uuid references auth.users not null,
  name text not null,
  category text,
  difficulty integer,
  description text,
  duration_mins integer,
  focus_points text[],
  equipment text[],
  created_at timestamptz default now()
);

alter table drills enable row level security;
create policy "Users can read own drills" on drills for select using (auth.uid() = coach_id);
create policy "Users can insert own drills" on drills for insert with check (auth.uid() = coach_id);
create policy "Users can update own drills" on drills for update using (auth.uid() = coach_id);

-- 4. SESSIONS TABLE
create table sessions (
  id bigint primary key generated always as identity,
  coach_id uuid references auth.users not null,
  student_id bigint references students(id) on delete cascade,
  day text not null,
  time text not null,
  drill_id bigint references drills(id),
  drill_name text,
  recurring boolean default true,
  session_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table sessions enable row level security;
create policy "Users can read own sessions" on sessions for select using (auth.uid() = coach_id);
create policy "Users can insert own sessions" on sessions for insert with check (auth.uid() = coach_id);
create policy "Users can update own sessions" on sessions for update using (auth.uid() = coach_id);
create policy "Users can delete own sessions" on sessions for delete using (auth.uid() = coach_id);

-- 5. AVAILABILITIES TABLE
create table availabilities (
  id bigint primary key generated always as identity,
  coach_id uuid references auth.users not null,
  day text not null,
  start_time text not null,
  end_time text not null,
  created_at timestamptz default now()
);

alter table availabilities enable row level security;
create policy "Users can read own availabilities" on availabilities for select using (auth.uid() = coach_id);
create policy "Users can insert own availabilities" on availabilities for insert with check (auth.uid() = coach_id);
create policy "Users can delete own availabilities" on availabilities for delete using (auth.uid() = coach_id);

-- 6. SESSION HISTORY / NOTES
create table session_history (
  id bigint primary key generated always as identity,
  coach_id uuid references auth.users not null,
  student_id bigint references students(id) on delete cascade,
  session_id bigint references sessions(id) on delete cascade,
  session_date date not null,
  duration_mins integer,
  overall_rating integer,
  technique_rating integer,
  footwork_rating integer,
  speed_rating integer,
  stamina_rating integer,
  tactics_rating integer,
  notes text,
  created_at timestamptz default now()
);

alter table session_history enable row level security;
create policy "Users can read own history" on session_history for select using (auth.uid() = coach_id);
create policy "Users can insert own history" on session_history for insert with check (auth.uid() = coach_id);

-- ============================================================
-- SAMPLE DATA (Optional - run after tables are created)
-- ============================================================
-- Uncomment and run to populate sample data
-- Replace YOUR_COACH_UUID with your actual auth.users id

-- insert into students (coach_id, name, level, age, dob, contact, address, sessions_count)
-- values 
--   ('YOUR_COACH_UUID', 'Lee Smith', 'Advanced', 22, '12/03/2002', '0412 345 678', '5 Pine St, Sydney NSW 2000', 24),
--   ('YOUR_COACH_UUID', 'Jordan Davis', 'Inter', 19, '04/07/2005', '0421 234 567', '12 Oak Ave, Melbourne VIC 3000', 18),
--   ('YOUR_COACH_UUID', 'Alex Thompson', 'Advanced', 25, '19/11/1999', '0433 456 789', '8 Elm Rd, Brisbane QLD 4000', 16),
--   ('YOUR_COACH_UUID', 'Sam Martinez', 'Beginner', 16, '22/05/2008', '0444 567 890', '3 Birch Ln, Perth WA 6000', 12),
--   ('YOUR_COACH_UUID', 'Rachel Park', 'Inter', 20, '08/09/2004', '0455 678 901', '21 Cedar St, Adelaide SA 5000', 11);

-- insert into drills (coach_id, name, category, difficulty)
-- values
--   ('YOUR_COACH_UUID', 'Full Court Footwork', 'Footwork', 4),
--   ('YOUR_COACH_UUID', 'Net Kill', 'Technique', 3),
--   ('YOUR_COACH_UUID', 'Smash and Kill', 'Smash', 5);

-- insert into sessions (coach_id, student_id, day, time, drill_name, recurring)
-- values
--   ('YOUR_COACH_UUID', 1, 'Monday', '5:00 PM', 'Full Court Footwork', true),
--   ('YOUR_COACH_UUID', 2, 'Tuesday', '4:00 PM', 'Drop Shot', true);

-- insert into availabilities (coach_id, day, start_time, end_time)
-- values
--   ('YOUR_COACH_UUID', 'Monday', '09:00 AM', '12:00 PM'),
--   ('YOUR_COACH_UUID', 'Monday', '2:00 PM', '7:00 PM');
