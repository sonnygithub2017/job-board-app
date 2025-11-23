import { supabase } from '../lib/supabase';
import type { Job, CreateJobData, UpdateJobData, JobStatus } from '../types';

export const jobService = {
  // Public: Get approved jobs with optional filters
  async getApprovedJobs(filters?: {
    searchTerm?: string;
    location?: string;
    type?: string;
    category?: string;
  }): Promise<Job[]> {
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('status', 'approved')
      .order('posted_at', { ascending: false });

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters?.searchTerm) {
      query = query.or(
        `title.ilike.%${filters.searchTerm}%,company.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching approved jobs:', error);
      throw error;
    }

    return data || [];
  },

  // Get single job by ID
  async getJobById(jobId: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching job:', error);
      throw error;
    }

    return data;
  },

  // Employer: Get jobs for specific employer
  async getEmployerJobs(employerId: string): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('employer_id', employerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching employer jobs:', error);
      throw error;
    }

    return data || [];
  },

  // Admin: Get all jobs with optional status filter
  async getAllJobs(statusFilter?: JobStatus): Promise<Job[]> {
    let query = supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter) {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching all jobs:', error);
      throw error;
    }

    return data || [];
  },

  // Employer: Create new job
  async createJob(employerId: string, jobData: CreateJobData): Promise<Job> {
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        employer_id: employerId,
        ...jobData,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating job:', error);
      throw error;
    }

    return data;
  },

  // Employer: Update own job
  async updateJob(jobId: string, updates: UpdateJobData): Promise<Job> {
    // Remove status from updates if present (employers can't change status)
    const { status, ...allowedUpdates } = updates;

    const { data, error } = await supabase
      .from('jobs')
      .update(allowedUpdates)
      .eq('id', jobId)
      .select()
      .single();

    if (error) {
      console.error('Error updating job:', error);
      throw error;
    }

    return data;
  },

  // Employer: Delete own job
  async deleteJob(jobId: string): Promise<void> {
    const { error } = await supabase.from('jobs').delete().eq('id', jobId);

    if (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  // Admin: Update job status (approve/reject)
  async updateJobStatus(jobId: string, status: JobStatus): Promise<Job> {
    const { data, error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', jobId)
      .select()
      .single();

    if (error) {
      console.error('Error updating job status:', error);
      throw error;
    }

    return data;
  },

  // Get job statistics for employer
  async getEmployerJobStats(employerId: string) {
    const jobs = await this.getEmployerJobs(employerId);

    return {
      total: jobs.length,
      pending: jobs.filter((j) => j.status === 'pending').length,
      approved: jobs.filter((j) => j.status === 'approved').length,
      rejected: jobs.filter((j) => j.status === 'rejected').length,
    };
  },

  // Get job statistics for admin
  async getAdminJobStats() {
    const jobs = await this.getAllJobs();

    return {
      total: jobs.length,
      pending: jobs.filter((j) => j.status === 'pending').length,
      approved: jobs.filter((j) => j.status === 'approved').length,
      rejected: jobs.filter((j) => j.status === 'rejected').length,
    };
  },
};

