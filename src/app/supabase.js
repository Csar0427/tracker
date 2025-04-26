// supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eixqobhyuhffokfszrut.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeHFvYmh5dWhmZm9rZnN6cnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjIyNzgsImV4cCI6MjA2MTIzODI3OH0.8YcUJPz7NzWGpyAHT4Jv1CJZO12-B8N7pD1hSluuOZc";
export const supabase = createClient(supabaseUrl, supabaseKey);
