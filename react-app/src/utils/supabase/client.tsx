import { createClient } from '@supabase/supabase-js';

// Supabase configuration - these will be provided by the Figma Make environment
// The actual values will be injected when the Supabase connection is established
const SUPABASE_URL = 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = 'placeholder-key';

// Create a single Supabase client instance to avoid multiple GoTrueClient instances
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storageKey: 'english-center-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});

// Export the project ID for API calls
export const projectId = SUPABASE_URL.match(/https:\/\/(.+?)\.supabase\.co/)?.[1] || 'placeholder';
export const publicAnonKey = SUPABASE_ANON_KEY;