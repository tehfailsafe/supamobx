import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://zbtnpjdyvwohxnujwyoe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpidG5wamR5dndvaHhudWp3eW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0NDE0ODUsImV4cCI6MjAwMjAxNzQ4NX0.4oT8MUs4sIhTnccsXzU7KbOaplTyFNdCCiOIjmhEODw"
);
