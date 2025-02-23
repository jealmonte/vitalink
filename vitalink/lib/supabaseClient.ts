import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iigyxuvhjcpljyimfkkn.supabase.co'; // Your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZ3l4dXZoamNwbGp5aW1ma2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMzQxNzIsImV4cCI6MjA1NTkxMDE3Mn0.eSP9ZZe5acdcsN00gLzrs3NgaZ8LIfKw2Hc8MMT6KKo'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
