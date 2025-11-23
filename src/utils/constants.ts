import type { JobType, UserRole, JobStatus } from '../types';

export const JOB_TYPES: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Freelance'];

export const JOB_CATEGORIES = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Product',
  'Customer Support',
  'DevOps',
  'Data Science',
  'Finance',
  'Human Resources',
  'Legal',
  'Operations',
  'Other',
] as const;

export const USER_ROLES: { value: UserRole; label: string }[] = [
  { value: 'job_seeker', label: 'Job Seeker' },
  { value: 'employer', label: 'Employer' },
];

export const JOB_STATUSES: JobStatus[] = ['pending', 'approved', 'rejected'];

export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
} as const;

export const ROLE_LABELS = {
  job_seeker: 'Job Seeker',
  employer: 'Employer',
  admin: 'Admin',
} as const;

