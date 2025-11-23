-- Fix for "type user_role does not exist" error during signup
-- This sets the search_path to public so the function can find the enum type and table

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role_value public.user_role;
  user_full_name text;
BEGIN
  -- Safely extract full_name from metadata
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'User');

  -- Safely extract and cast role from metadata
  BEGIN
    -- We use public.user_role to be explicit, though search_path should handle it
    user_role_value := (NEW.raw_user_meta_data->>'role')::public.user_role;
  EXCEPTION WHEN OTHERS THEN
    user_role_value := 'job_seeker'::public.user_role;
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
$$;

