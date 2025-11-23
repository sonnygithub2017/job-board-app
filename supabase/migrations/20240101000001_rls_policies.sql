-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS TABLE POLICIES
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Allow user creation during signup (handled by trigger)
CREATE POLICY "Enable insert for authenticated users"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- EMPLOYERS TABLE POLICIES
-- ============================================

-- Employers can read their own company info
CREATE POLICY "Employers can read own company"
  ON public.employers
  FOR SELECT
  USING (user_id = auth.uid());

-- Employers can insert their own company info
CREATE POLICY "Employers can insert own company"
  ON public.employers
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Employers can update their own company info
CREATE POLICY "Employers can update own company"
  ON public.employers
  FOR UPDATE
  USING (user_id = auth.uid());

-- Public can read employer info (for job listings)
CREATE POLICY "Public can read employer info"
  ON public.employers
  FOR SELECT
  USING (true);

-- ============================================
-- JOBS TABLE POLICIES
-- ============================================

-- Public can read approved jobs
CREATE POLICY "Public can read approved jobs"
  ON public.jobs
  FOR SELECT
  USING (status = 'approved');

-- Employers can read their own jobs (any status)
CREATE POLICY "Employers can read own jobs"
  ON public.jobs
  FOR SELECT
  USING (
    employer_id IN (
      SELECT id FROM public.employers WHERE user_id = auth.uid()
    )
  );

-- Employers can insert jobs (status defaults to pending)
CREATE POLICY "Employers can insert jobs"
  ON public.jobs
  FOR INSERT
  WITH CHECK (
    employer_id IN (
      SELECT id FROM public.employers WHERE user_id = auth.uid()
    )
    AND status = 'pending'
  );

-- Employers can update their own jobs (cannot change status)
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
    -- Prevent employers from changing status
    AND status = (SELECT status FROM public.jobs WHERE id = jobs.id)
  );

-- Employers can delete their own jobs
CREATE POLICY "Employers can delete own jobs"
  ON public.jobs
  FOR DELETE
  USING (
    employer_id IN (
      SELECT id FROM public.employers WHERE user_id = auth.uid()
    )
  );

-- Admins can read all jobs
CREATE POLICY "Admins can read all jobs"
  ON public.jobs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update job status
CREATE POLICY "Admins can update job status"
  ON public.jobs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

