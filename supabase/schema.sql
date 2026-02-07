-- ══════════════════════════════════════════════════════════════
-- Recruitment Maneuver — Database Schema
-- Run this in your Supabase SQL Editor to set up all tables.
-- ══════════════════════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ── Profiles ──
create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  full_name text not null default '',
  training_level text not null default 'attending' check (training_level in ('attending', 'fellow')),
  years_out integer not null default 0,
  desired_start_date date,
  specialty text not null default 'pccm',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Preferences ──
create table if not exists preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  -- Geography
  preferred_states text[] not null default '{}',
  preferred_cities text[] not null default '{}',
  radius_miles integer not null default 50,
  willing_to_relocate boolean not null default false,
  practice_type text not null default 'academic' check (practice_type in ('academic', 'community', 'hybrid')),
  -- Practice model
  icu_schedule_model text not null default '',
  call_frequency text not null default '',
  nocturnist_coverage boolean not null default false,
  tele_icu boolean not null default false,
  procedures_comfort text[] not null default '{}',
  -- Team support
  has_residents boolean not null default false,
  has_fellows boolean not null default false,
  has_apps boolean not null default false,
  rt_coverage text not null default '',
  rounding_support text not null default '',
  -- Compensation
  comp_model text not null default 'base' check (comp_model in ('base', 'rvu', 'mixed')),
  min_base_salary integer,
  signing_bonus_important boolean not null default false,
  loan_repayment_important boolean not null default false,
  min_pto_days integer,
  cme_budget_important boolean not null default false,
  malpractice_important boolean not null default false,
  -- Must-haves and dealbreakers
  must_haves text[] not null default '{}',
  dealbreakers text[] not null default '{}',
  -- Weights (0–10 per scoring category)
  weights jsonb not null default '{
    "location": 5,
    "schedule_call": 5,
    "icu_model": 5,
    "team_support": 5,
    "compensation": 5,
    "culture": 5,
    "growth_leadership": 5,
    "procedures": 5,
    "research_academics": 5
  }',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Opportunities ──
create table if not exists opportunities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  organization_name text not null,
  city text not null default '',
  state text not null default '',
  practice_type text not null default 'academic' check (practice_type in ('academic', 'community', 'hybrid')),
  -- ICU Model
  icu_model_description text not null default '',
  icu_beds integer,
  open_vs_closed text not null default '',
  -- Schedule & Call
  schedule_description text not null default '',
  call_frequency text not null default '',
  nocturnist_coverage boolean not null default false,
  tele_icu boolean not null default false,
  -- Compensation
  base_salary integer,
  rvu_rate numeric(10,2),
  signing_bonus integer,
  loan_repayment integer,
  pto_days integer,
  cme_budget integer,
  malpractice_covered boolean not null default false,
  comp_notes text not null default '',
  -- Team
  has_residents boolean not null default false,
  has_fellows boolean not null default false,
  has_apps boolean not null default false,
  app_count integer,
  rt_coverage text not null default '',
  -- Culture & Growth
  culture_notes text not null default '',
  leadership_opportunities text not null default '',
  research_support boolean not null default false,
  teaching_opportunities boolean not null default false,
  procedures_available text[] not null default '{}',
  -- Meta
  benefits_notes text not null default '',
  free_notes text not null default '',
  stage text not null default 'researching' check (stage in (
    'researching', 'applied', 'interviewing',
    'offer_received', 'negotiating', 'accepted', 'declined'
  )),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Opportunity Scores ──
create table if not exists opportunity_scores (
  id uuid primary key default uuid_generate_v4(),
  opportunity_id uuid references opportunities(id) on delete cascade not null,
  score_total numeric(5,2) not null default 0,
  breakdown jsonb not null default '[]',
  rationale text not null default '',
  created_at timestamptz not null default now()
);

-- ── Tasks ──
create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  opportunity_id uuid references opportunities(id) on delete set null,
  title text not null,
  due_date date,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  created_at timestamptz not null default now()
);

-- ── Notes ──
create table if not exists notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  opportunity_id uuid references opportunities(id) on delete cascade not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- ── Row Level Security ──

alter table profiles enable row level security;
alter table preferences enable row level security;
alter table opportunities enable row level security;
alter table opportunity_scores enable row level security;
alter table tasks enable row level security;
alter table notes enable row level security;

-- Profiles: users can only see/edit their own
create policy "Users can view own profile" on profiles for select using (auth.uid() = user_id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = user_id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = user_id);

-- Preferences: users can only see/edit their own
create policy "Users can view own preferences" on preferences for select using (auth.uid() = user_id);
create policy "Users can insert own preferences" on preferences for insert with check (auth.uid() = user_id);
create policy "Users can update own preferences" on preferences for update using (auth.uid() = user_id);

-- Opportunities: users can only see/edit their own
create policy "Users can view own opportunities" on opportunities for select using (auth.uid() = user_id);
create policy "Users can insert own opportunities" on opportunities for insert with check (auth.uid() = user_id);
create policy "Users can update own opportunities" on opportunities for update using (auth.uid() = user_id);
create policy "Users can delete own opportunities" on opportunities for delete using (auth.uid() = user_id);

-- Opportunity Scores: via opportunity ownership
create policy "Users can view own scores" on opportunity_scores for select
  using (exists (select 1 from opportunities where opportunities.id = opportunity_scores.opportunity_id and opportunities.user_id = auth.uid()));
create policy "Users can insert own scores" on opportunity_scores for insert
  with check (exists (select 1 from opportunities where opportunities.id = opportunity_scores.opportunity_id and opportunities.user_id = auth.uid()));
create policy "Users can delete own scores" on opportunity_scores for delete
  using (exists (select 1 from opportunities where opportunities.id = opportunity_scores.opportunity_id and opportunities.user_id = auth.uid()));

-- Tasks: users can only see/edit their own
create policy "Users can view own tasks" on tasks for select using (auth.uid() = user_id);
create policy "Users can insert own tasks" on tasks for insert with check (auth.uid() = user_id);
create policy "Users can update own tasks" on tasks for update using (auth.uid() = user_id);
create policy "Users can delete own tasks" on tasks for delete using (auth.uid() = user_id);

-- Notes: users can only see/edit their own
create policy "Users can view own notes" on notes for select using (auth.uid() = user_id);
create policy "Users can insert own notes" on notes for insert with check (auth.uid() = user_id);
create policy "Users can update own notes" on notes for update using (auth.uid() = user_id);
create policy "Users can delete own notes" on notes for delete using (auth.uid() = user_id);

-- ── Indexes ──
create index if not exists idx_opportunities_user_id on opportunities(user_id);
create index if not exists idx_opportunities_stage on opportunities(stage);
create index if not exists idx_tasks_user_id on tasks(user_id);
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_notes_opportunity_id on notes(opportunity_id);
create index if not exists idx_opportunity_scores_opp on opportunity_scores(opportunity_id);

-- ── Auto-update updated_at trigger ──
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();
create trigger preferences_updated_at before update on preferences
  for each row execute function update_updated_at_column();
create trigger opportunities_updated_at before update on opportunities
  for each row execute function update_updated_at_column();
