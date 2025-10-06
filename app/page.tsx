import { Job, supabaseAdmin } from "@/lib/supabase";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CTA from "@/components/Cta";
import Navigation from "@/components/Navigation";
import Features from "@/components/Features";
import JobNotFound from "@/components/JobNotFound";
import JobCard from "@/components/JobCard";

async function getJobs() {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }

  return data as Job[];
}

export default async function Home() {
  const jobs = await getJobs();
  const remoteJobs = jobs.filter(
    (j) => j.work_location_type === "remote"
  ).length;
  const companies = new Set(jobs.map((j) => j.company)).size;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero jobs={jobs} companies={companies} remoteJobs={remoteJobs} />

      {/* Features Section */}
      <Features />

      {/* Jobs Section */}
      <section id="jobs" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Latest Opportunities
            </h2>
            <p className="text-lg text-gray-600">
              {jobs.length} full-stack position{jobs.length !== 1 ? "s" : ""}{" "}
              waiting for you
            </p>
          </div>

          <div className="grid gap-6">
            {jobs.length === 0 ? (
              <JobNotFound />
            ) : (
              jobs.map((job, index) => (
                <JobCard job={job} key={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
