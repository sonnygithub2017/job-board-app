import { supabase } from '../lib/supabase';
import type { Employer, CreateEmployerData, UpdateEmployerData } from '../types';

export const employerService = {
  async getEmployerProfile(userId: string): Promise<Employer | null> {
    const { data, error } = await supabase
      .from('employers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching employer profile:', error);
      throw error;
    }

    return data;
  },

  async getEmployerById(employerId: string): Promise<Employer | null> {
    const { data, error } = await supabase
      .from('employers')
      .select('*')
      .eq('id', employerId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching employer by id:', error);
      return null;
    }

    return data;
  },

  async createEmployerProfile(
    userId: string,
    employerData: CreateEmployerData
  ): Promise<Employer> {
    const { data, error } = await supabase
      .from('employers')
      .insert({
        user_id: userId,
        ...employerData,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEmployerProfile(
    employerId: string,
    updates: UpdateEmployerData
  ): Promise<Employer> {
    const { data, error } = await supabase
      .from('employers')
      .update(updates)
      .eq('id', employerId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

