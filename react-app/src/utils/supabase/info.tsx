// Supabase configuration for frontend
// These will be injected by the Figma Make environment
declare global {
  interface Window {
    ENV?: {
      SUPABASE_URL?: string;
      SUPABASE_ANON_KEY?: string;
    };
  }
}

// Get environment variables
function getSupabaseUrl(): string {
  // Try various ways to get the URL
  if (
    typeof window !== "undefined" &&
    window.ENV?.SUPABASE_URL
  ) {
    return window.ENV.SUPABASE_URL;
  }

  // Fallback - this should be replaced with actual values in production
  return "https://xyobtfgeklovtfmlxrns.supabase.co";
}

function getSupabaseKey(): string {
  // Try various ways to get the key
  if (
    typeof window !== "undefined" &&
    window.ENV?.SUPABASE_ANON_KEY
  ) {
    return window.ENV.SUPABASE_ANON_KEY;
  }

  // Fallback - this should be replaced with actual values in production
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5b2J0Zmdla2xvdnRmbWx4cm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjQxMzksImV4cCI6MjA3Mjg0MDEzOX0.BnHCAj8fudxjyVjwYmvetMMD6BFKT1wTQ3suXU-PbWI";
}

const supabaseUrl = getSupabaseUrl();
export const projectId =
  supabaseUrl.match(/https:\/\/(.+?)\.supabase\.co/)?.[1] ||
  "your-project";
export const publicAnonKey = getSupabaseKey();