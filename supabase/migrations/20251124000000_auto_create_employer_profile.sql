-- Update handle_new_user to automatically create employer profile
-- This avoids RLS issues when creating the profile from the client side

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role_value public.user_role;
  user_full_name text;
  company_name text;
  company_description text;
  company_website text;
  company_logo_url text;
  company_info jsonb;
BEGIN
  -- Safely extract full_name from metadata
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'User');

  -- Safely extract and cast role from metadata
  BEGIN
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

  -- If role is employer, insert into employers
  IF user_role_value = 'employer' THEN
    -- Extract company info from metadata
    company_info := NEW.raw_user_meta_data->'company_info';

    IF company_info IS NOT NULL THEN
        company_name := company_info->>'company_name';
        company_description := company_info->>'company_description';
        company_website := company_info->>'company_website';
        company_logo_url := company_info->>'company_logo_url';

        IF company_name IS NOT NULL THEN
          INSERT INTO public.employers (
            user_id,
            company_name,
            company_description,
            company_website,
            company_logo_url
          ) VALUES (
            NEW.id,
            company_name,
            company_description,
            company_website,
            company_logo_url
          );
        END IF;
    END IF;
  END IF;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log the error for debugging
  RAISE WARNING 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
  -- Still return NEW so auth signup doesn't fail
  RETURN NEW;
END;
$$;

