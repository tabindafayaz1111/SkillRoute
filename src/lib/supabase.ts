import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton — reuse the same client across renders to avoid multiple instances.
let client: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!client) {
    client = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Persist session in localStorage — user stays logged in forever.
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}
