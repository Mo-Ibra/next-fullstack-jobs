import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Job = {
  id: string
  title: string
  company: string
  company_logo: string | null
  location: string
  description: string
  salary: string | null
  job_type: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}