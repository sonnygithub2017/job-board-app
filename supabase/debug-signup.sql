-- DEBUG SCRIPT FOR SIGNUP ISSUES
-- Run these queries one by one to diagnose the problem

-- 1. Check if the users table exists and has correct structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'users'
ORDER BY ordinal_position;

-- 2. Check if the user_role enum exists and has correct values
SELECT enumlabel
FROM pg_enum
WHERE enumtypid = 'user_role'::regtype
ORDER BY enumsortorder;

-- 3. Check if the trigger exists
SELECT tgname, tgenabled, proname
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgname = 'on_auth_user_created';

-- 4. Check the trigger function definition
SELECT prosrc
FROM pg_proc
WHERE proname = 'handle_new_user';

-- 5. Check RLS policies on users table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';

-- 6. Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'users';

-- 7. List any existing users (to check for conflicts)
SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- 8. Check public.users
SELECT id, full_name, role, created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 5;

-- 9. Test the enum casting (this should not error)
SELECT 'job_seeker'::user_role;
SELECT 'employer'::user_role;
SELECT 'admin'::user_role;

-- 10. Check for any foreign key constraints that might be causing issues
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name = 'users';

