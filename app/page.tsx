import { Job, supabaseAdmin } from "@/lib/supabase";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CTA from "@/components/Cta";
import Navigation from "@/components/Navigation";
import JobsSection from "@/components/JobsSection";
import { getAllPosts } from "@/lib/blog";
import LatestArticles from "@/components/LatestArticles";

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

  const blogPosts = getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero jobs={jobs} companies={companies} remoteJobs={remoteJobs} />

      {/* Features Section */}
      {/* <Features /> */}

      {/* Jobs Section */}
      <JobsSection jobs={jobs} />

      <LatestArticles posts={blogPosts} />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
