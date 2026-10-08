import { createBrowserClient } from "@supabase/ssr";

let client;

function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Brak NEXT_PUBLIC_SUPABASE_URL lub NEXT_PUBLIC_SUPABASE_ANON_KEY. Dodaj je w Vercel → Settings → Environment Variables."
    );
  }

  return createBrowserClient(url, key);
}

export function getSupabase() {
  if (!client) {
    client = createSupabaseClient();
  }
  return client;
}

/** Lazy proxy — nie wywala buildu, gdy env jest ustawione dopiero w runtime. */
export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      const value = getSupabase()[prop];
      return typeof value === "function" ? value.bind(getSupabase()) : value;
    },
  }
);
