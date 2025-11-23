# Troubleshooting Guide

## Sign Up Issues

### "Database error saving new user" when signing up as Employer

This error can occur due to several reasons. Follow these steps to resolve:

#### 1. Disable Email Confirmation (Recommended for Development)

By default, Supabase requires email confirmation which can cause issues during development.

**Steps to disable:**
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Providers** > **Email**
3. Scroll down to **"Confirm email"**
4. **Uncheck** "Enable email confirmations"
5. Click **Save**

#### 2. Check RLS Policies

Ensure Row Level Security policies are properly set up:

1. Go to **Database** > **Policies** in Supabase
2. Check that the `employers` table has these policies:
   - `Employers can insert own company` (INSERT)
   - `Employers can read own company` (SELECT)
   - `Employers can update own company` (UPDATE)

#### 3. Verify the Trigger is Working

The `handle_new_user` trigger should automatically create a user profile when someone signs up.

**Test the trigger:**
```sql
-- Run this in SQL Editor to check if trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

If it doesn't exist, re-run the migration: `20240101000002_functions.sql`

#### 4. Check for Existing Users

If you've been testing, you might have partial user records.

**Clean up test data:**
```sql
-- Check for users without employer profiles
SELECT u.id, u.email, u.role, e.id as employer_id
FROM auth.users au
JOIN public.users u ON au.id = u.id
LEFT JOIN public.employers e ON u.id = e.user_id
WHERE u.role = 'employer';

-- If you need to delete test users (BE CAREFUL):
-- DELETE FROM auth.users WHERE email = 'test@example.com';
```

#### 5. Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for detailed error messages when signing up.

Common errors and solutions:
- **"new row violates row-level security policy"**: RLS policies not set correctly
- **"duplicate key value violates unique constraint"**: User already exists
- **"relation does not exist"**: Migrations not run properly

#### 6. Verify Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

After updating, restart the dev server:
```bash
npm run dev
```

## Testing Sign Up Flow

### Create a Test Employer Account

1. Make sure email confirmation is disabled (see step 1 above)
2. Go to Sign Up page
3. Fill in:
   - Full Name: "Test Employer"
   - Email: "employer@test.com"
   - Password: "password123"
   - Role: "Employer"
   - Company Name: "Test Company"
4. Click "Create Account"

### What Should Happen

1. User is created in `auth.users`
2. Trigger automatically creates entry in `public.users`
3. App creates entry in `public.employers`
4. User is logged in and redirected to Employer Dashboard

### If It Still Fails

Run this SQL to manually check what's happening:

```sql
-- Check if user was created
SELECT * FROM auth.users WHERE email = 'employer@test.com';

-- Check if profile was created
SELECT * FROM public.users WHERE email = 'employer@test.com';

-- Check if employer profile exists
SELECT e.*
FROM public.employers e
JOIN public.users u ON e.user_id = u.id
WHERE u.email = 'employer@test.com';
```

## Alternative: Manual Account Creation

If automatic signup continues to fail, you can manually create accounts via SQL:

```sql
-- This is handled by Supabase Auth UI, but for reference:
-- 1. Sign up normally (even if employer profile fails)
-- 2. Then manually create employer profile:

INSERT INTO public.employers (user_id, company_name, company_description, company_website)
VALUES (
  'user-id-from-auth-users',
  'Test Company',
  'A test company',
  'https://test.com'
);
```

## Common Issues and Solutions

### Issue: "Failed to fetch"
**Solution**: Check that Supabase project is running and environment variables are correct.

### Issue: "Invalid API key"
**Solution**: Regenerate your anon key in Supabase dashboard and update `.env.local`.

### Issue: Jobs not showing up
**Solution**: Make sure at least one job is approved by an admin.

### Issue: Cannot access employer/admin pages
**Solution**: Check user role in database:
```sql
SELECT id, email, role FROM public.users WHERE email = 'your@email.com';
```

To change role:
```sql
UPDATE public.users SET role = 'employer' WHERE email = 'your@email.com';
-- or
UPDATE public.users SET role = 'admin' WHERE email = 'your@email.com';
```

## Need More Help?

1. Check browser console for detailed errors
2. Check Supabase logs: Dashboard > Logs
3. Verify all migrations ran successfully
4. Try creating a fresh Supabase project and running migrations again

