-- Fix infinite recursion in "Employers can update own jobs" policy
-- accessing public.jobs inside the policy caused the recursion

-- Create a secure function to get job status without triggering RLS
CREATE OR REPLACE FUNCTION public.get_job_status(job_id uuid)
RETURNS public.job_status
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT status FROM public.jobs WHERE id = job_id;
$$;

-- Recreate the employer update policy using the secure function
DROP POLICY IF EXISTS "Employers can update own jobs" ON public.jobs;

CREATE POLICY "Employers can update own jobs"
  ON public.jobs
  FOR UPDATE
  USING (
    employer_id IN (
      SELECT id FROM public.employers WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    employer_id IN (
      SELECT id FROM public.employers WHERE user_id = auth.uid()
    )
    -- Use secure function to check status consistency without recursion
    AND status = public.get_job_status(id)
  );

