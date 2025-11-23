// Database types for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          role: 'job_seeker' | 'employer' | 'admin'
          full_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'job_seeker' | 'employer' | 'admin'
          full_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'job_seeker' | 'employer' | 'admin'
          full_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      employers: {
        Row: {
          id: string
          user_id: string
          company_name: string
          company_description: string | null
          company_website: string | null
          company_logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          company_description?: string | null
          company_website?: string | null
          company_logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          company_description?: string | null
          company_website?: string | null
          company_logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          employer_id: string
          title: string
          company: string
          location: string
          type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
          salary: string
          category: string
          description: string
          requirements: string[]
          status: 'pending' | 'approved' | 'rejected'
          posted_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employer_id: string
          title: string
          company: string
          location: string
          type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
          salary: string
          category: string
          description: string
          requirements?: string[]
          status?: 'pending' | 'approved' | 'rejected'
          posted_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employer_id?: string
          title?: string
          company?: string
          location?: string
          type?: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
          salary?: string
          category?: string
          description?: string
          requirements?: string[]
          status?: 'pending' | 'approved' | 'rejected'
          posted_at?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_employer: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: 'job_seeker' | 'employer' | 'admin'
      }
      get_employer_id: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      user_role: 'job_seeker' | 'employer' | 'admin'
      job_status: 'pending' | 'approved' | 'rejected'
      job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
    }
  }
}

