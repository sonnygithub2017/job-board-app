-- RESET AND FIX SCRIPT
-- Run this if you're having issues with the trigger
-- This will drop and recreate the trigger with better error handling

-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop and recreate the function with better error handling
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role_value user_role;
  user_full_name text;
BEGIN
  -- Safely extract full_name from metadata
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'User');

  -- Safely extract and cast role from metadata
  BEGIN
    user_role_value := (NEW.raw_user_meta_data->>'role')::user_role;
  EXCEPTION WHEN OTHERS THEN
    user_role_value := 'job_seeker'::user_role;
  END;

  -- Insert into public.users
  INSERT INTO public.users (id, full_name, role)
  VALUES (
    NEW.id,
    user_full_name,
    user_role_value
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log the error for debugging
  RAISE WARNING 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
  -- Still return NEW so auth signup doesn't fail
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Test the function (optional - comment out if not needed)
-- SELECT proname, prosrc FROM pg_proc WHERE proname = 'handle_new_user';

