import "server-only";

import { createClient } from "@supabase/supabase-js";

import { config } from "@/lib/config";

export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SECRET_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
