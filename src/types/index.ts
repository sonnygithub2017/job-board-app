// Enums
export type UserRole = 'job_seeker' | 'employer' | 'admin';
export type JobStatus = 'pending' | 'approved' | 'rejected';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';

// User types
export interface User {
  id: string;
  role: UserRole;
  full_name: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

// Employer types
export interface Employer {
  id: string;
  user_id: string;
  company_name: string;
  company_description: string | null;
  company_website: string | null;
  company_logo_url: string | null;
  created_at: string;
  updated_at: string;
}

// Job types
export interface Job {
  id: string;
  employer_id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  category: string;
  description: string;
  requirements: string[];
  status: JobStatus;
  posted_at: string;
  created_at: string;
  updated_at: string;
}

// Form types for creating/updating
export interface CreateJobData {
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  category: string;
  description: string;
  requirements: string[];
}

export interface UpdateJobData extends Partial<CreateJobData> {
  status?: JobStatus;
}

export interface CreateEmployerData {
  company_name: string;
  company_description?: string;
  company_website?: string;
  company_logo_url?: string;
}

export interface UpdateEmployerData extends Partial<CreateEmployerData> {}

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  company_info?: CreateEmployerData;
}

export interface SignInData {
  email: string;
  password: string;
}

// Auth context types
export interface AuthUser extends User {
  email: string;
  employer?: Employer;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
