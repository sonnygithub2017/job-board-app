-- Verification Script for Supabase Setup
-- Run this in Supabase SQL Editor to verify everything is set up correctly

-- 1. Check if tables exist
SELECT 'Tables Check' as check_type,
       COUNT(*) as count,
       'Should be 3 (users, employers, jobs)' as expected
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('users', 'employers', 'jobs');

-- 2. Check if enums exist
SELECT 'Enums Check' as check_type,
       COUNT(*) as count,
       'Should be 3 (user_role, job_status, job_type)' as expected
FROM pg_type
WHERE typname IN ('user_role', 'job_status', 'job_type');

-- 3. Check if trigger exists
SELECT 'Trigger Check' as check_type,
       COUNT(*) as count,
       'Should be 1 (on_auth_user_created)' as expected
FROM pg_trigger
WHERE tgname = 'on_auth_user_created';

-- 4. Check if functions exist
SELECT 'Functions Check' as check_type,
       COUNT(*) as count,
       'Should be 4 helper functions' as expected
FROM pg_proc
WHERE proname IN ('handle_new_user', 'is_employer', 'is_admin', 'get_user_role', 'get_employer_id');

-- 5. Check RLS is enabled
SELECT 'RLS Enabled Check' as check_type,
       COUNT(*) as count,
       'Should be 3 (all tables)' as expected
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('users', 'employers', 'jobs')
  AND rowsecurity = true;

-- 6. Check policies exist
SELECT 'Policies Check' as check_type,
       COUNT(*) as count,
       'Should be 11+ policies' as expected
FROM pg_policies
WHERE schemaname = 'public';

-- 7. List all policies for review
SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 8. Check if any users exist
SELECT 'Users Count' as check_type,
       COUNT(*) as count,
       'Number of registered users' as expected
FROM auth.users;

-- 9. Check public.users sync
SELECT 'Public Users Count' as check_type,
       COUNT(*) as count,
       'Should match auth.users count' as expected
FROM public.users;

-- 10. Check employers
SELECT 'Employers Count' as check_type,
       COUNT(*) as count,
       'Number of employer profiles' as expected
FROM public.employers;

-- 11. Check jobs
SELECT 'Jobs Count' as check_type,
       COUNT(*) as count,
       'Number of job listings' as expected
FROM public.jobs;

-- If everything is set up correctly, you should see:
-- - 3 tables
-- - 3 enums
-- - 1 trigger
-- - 4+ functions
-- - 3 tables with RLS enabled
-- - 11+ policies

