// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mnoetyepsttjtjioulxt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ub2V0eWVwc3R0anRqaW91bHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MTg1MDgsImV4cCI6MjA2MTA5NDUwOH0._mgbfcqivzDPq7FA81O6s3YepfonlJUU-_NeKDJ39oo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);