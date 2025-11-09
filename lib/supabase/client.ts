import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase environment variables are missing. Falling back to mock data.");
  }

  return createBrowserClient(supabaseUrl ?? "https://example.supabase.co", supabaseKey ?? "public-anon-key");
};
