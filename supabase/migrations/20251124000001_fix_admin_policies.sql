-- Create a secure function to check if the current user is an admin
-- This avoids RLS recursion issues when querying the users table from RLS policies
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Update the Admin policy on jobs table to use the function
DROP POLICY IF EXISTS "Admins can update job status" ON public.jobs;

CREATE POLICY "Admins can update job status"
  ON public.jobs
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Also update the read policy for consistency and performance
DROP POLICY IF EXISTS "Admins can read all jobs" ON public.jobs;

CREATE POLICY "Admins can read all jobs"
  ON public.jobs
  FOR SELECT
  USING (public.is_admin());

