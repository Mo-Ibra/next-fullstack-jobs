import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Job = {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  description: string;
  salary: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  visa_sponsorship: boolean;
  required_languages: Array<{
    language: string;
    level: "Basic" | "Intermediate" | "Advanced" | "Native";
  }>;
  job_type: string;
  work_location_type: "remote" | "on-site" | "hybrid";
  status: "pending" | "approved" | "rejected";
  application_link: string;
  created_at: string;
};
