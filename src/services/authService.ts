import { supabase } from '../lib/supabase';
import type { SignUpData, SignInData } from '../types';

export const authService = {
  async signUp(data: SignUpData) {
    const { email, password, full_name, role, company_info } = data;

    // Sign up the user with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          role,
          company_info: role === 'employer' ? company_info : undefined,
        },
      },
    });

    if (signUpError) throw signUpError;
    if (!authData.user) throw new Error('User creation failed');

    // Employer profile is now created automatically by the database trigger
    // to avoid RLS issues during signup.

    return authData;
  },

  async signIn(data: SignInData) {
    const { email, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return authData;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  },

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  },

  async getCurrentSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
};

