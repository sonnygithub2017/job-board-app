import { supabase } from '../lib/supabase';
import type { User, Employer } from '../types';

export const userService = {
  async getUserProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  },

  async updateUserProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserWithEmployer(userId: string) {
    // Get user profile
    const user = await this.getUserProfile(userId);
    if (!user) return null;

    // Get auth user for email
    const { data: authData } = await supabase.auth.getUser();
    const email = authData.user?.email || '';

    // If employer, get employer profile
    let employer: Employer | undefined;
    if (user.role === 'employer') {
      const { data: employerData, error } = await supabase
        .from('employers')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching employer profile:', error);
      }

      if (employerData) {
        employer = employerData;
      }
    }

    return {
      ...user,
      email,
      employer,
    };
  },
};

