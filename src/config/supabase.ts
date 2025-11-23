export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

