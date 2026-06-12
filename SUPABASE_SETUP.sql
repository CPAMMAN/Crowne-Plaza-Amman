-- ============================================================
--  CP AMMAN ISSUE TRACKER — Supabase Setup
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. USERS TABLE
create table if not exists users (
  id           bigint generated always as identity primary key,
  username     text unique not null,
  password     text not null,
  role         text not null,        -- 'management' or 'department'
  dept         text,                 -- e.g. 'Engineering'
  name_en      text,
  name_ar      text
);

-- 2. ISSUES TABLE
create table if not exists issues (
  id                   uuid default gen_random_uuid() primary key,
  title                text,
  location             text,
  priority             text default 'medium',
  status               text default 'open',
  comment              text,
  eta_from             date,
  eta_to               date,
  assigned_depts       text[],
  photo_url            text,
  resolution_photo_url text,
  dept_note            text,
  mgmt_note            text,
  reported_by          text,
  updated_by           text,
  created_at           timestamptz default now(),
  updated_at           timestamptz default now()
);

-- 3. DISABLE ROW LEVEL SECURITY (simple public access)
alter table users  disable row level security;
alter table issues disable row level security;

-- 4. DEFAULT USERS
insert into users (username, password, role, dept, name_en, name_ar) values
  ('management',   'cp.mgmt2024',  'management', null,          'Management',       'الإدارة'),
  ('engineering',  'eng2024',      'department', 'Engineering',  'Engineering',      'الهندسة'),
  ('housekeeping', 'hk2024',       'department', 'Housekeeping', 'Housekeeping',     'التدبير المنزلي'),
  ('frontoffice',  'fo2024',       'department', 'Front Office', 'Front Office',     'الاستقبال'),
  ('fnb',          'fnb2024',      'department', 'F&B',          'Food & Beverage',  'الأغذية والمشروبات'),
  ('security',     'sec2024',      'department', 'Security',     'Security',         'الأمن')
on conflict (username) do nothing;

-- ⚠️ CHANGE ALL PASSWORDS AFTER FIRST LOGIN
