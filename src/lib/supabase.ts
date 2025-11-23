import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabase';
import type { Database } from '../types/database';

export const supabase = createClient<Database>(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

