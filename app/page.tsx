import { Job, supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

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
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">FS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Full-Stack Jobs
                </h1>
                <p className="text-xs text-gray-500">Find Your Dream Role</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/submit-job"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
              >
                Post a Job
              </Link>
              <Link
                href="/blog"
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {jobs.length} Active Full-Stack Positions
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Your Next
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Full-Stack{" "}
              </span>
              Opportunity
            </h2>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Connect with top companies hiring full-stack developers. Remote,
              hybrid, and on-site positions from startups to enterprises.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="#jobs"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 inline-flex items-center gap-2"
              >
                Browse All Jobs
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/submit-job"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg border-2 border-gray-200 transition-all hover:border-gray-300"
              >
                Post a Position
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {jobs.length}+
                </p>
                <p className="text-sm text-gray-600">Active Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{companies}+</p>
                <p className="text-sm text-gray-600">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {remoteJobs}+
                </p>
                <p className="text-sm text-gray-600">Remote Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Remote Friendly
              </h3>
              <p className="text-gray-600">
                Find flexible remote and hybrid positions that fit your
                lifestyle
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Top Companies
              </h3>
              <p className="text-gray-600">
                Connect with leading tech companies and innovative startups
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Quick Apply
              </h3>
              <p className="text-gray-600">
                Apply directly with one click - no complicated forms
              </p>
            </div>
          </div>
        </div>
      </section>

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
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg mb-4">
                  No jobs posted yet.
                </p>
                <Link
                  href="/submit-job"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Be the first to post a job →
                </Link>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100"
                >
                  <div className="flex gap-4">
                    {job.company_logo && (
                      <div className="flex-shrink-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ring-2 ring-gray-100">
                          <Image
                            src={job.company_logo}
                            alt={`${job.company} logo`}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <Link href={`/jobs/${job.id}`}>
                            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-1">
                              {job.title}
                            </h3>
                          </Link>
                          <div className="flex flex-wrap gap-2 items-center">
                            {job.work_location_type === "remote" && (
                              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                🏠 REMOTE
                              </span>
                            )}
                            {job.work_location_type === "hybrid" && (
                              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                🔄 HYBRID
                              </span>
                            )}
                          </div>
                        </div>
                        {job.salary_min && job.salary_max ? (
                          <span className="text-green-600 font-bold ml-4 flex-shrink-0 text-lg">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: job.salary_currency,
                              maximumFractionDigits: 0,
                            }).format(job.salary_min)}{" "}
                            -{" "}
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: job.salary_currency,
                              maximumFractionDigits: 0,
                            }).format(job.salary_max)}
                          </span>
                        ) : (
                          job.salary && (
                            <span className="text-green-600 font-bold ml-4 flex-shrink-0 text-lg">
                              {job.salary}
                            </span>
                          )
                        )}
                      </div>

                      <p className="text-gray-900 font-semibold mb-3">
                        {job.company}
                      </p>

                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                          📍 {job.location}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                          💼 {job.job_type}
                        </span>
                        {job.work_location_type === "on-site" && (
                          <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                            🏢 On-site
                          </span>
                        )}
                        {job.visa_sponsorship && (
                          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-medium">
                            ✈️ Visa Sponsorship
                          </span>
                        )}
                        {job.required_languages &&
                          job.required_languages.length > 0 && (
                            <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-lg font-medium">
                              🌐 {job.required_languages.length} Language
                              {job.required_languages.length > 1 ? "s" : ""}
                            </span>
                          )}
                      </div>

                      {/* <p className="text-gray-600 line-clamp-2 mb-4">
                        {job.description}
                      </p> */}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          Posted {new Date(job.created_at).toLocaleDateString()}
                        </p>

                        {job.application_link && (
                          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-md hover:shadow-lg">
                            Apply Now
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Hire Top Talent?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Post your full-stack position and connect with qualified developers
            today
          </p>
          <Link
            href="/submit-job"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-bold shadow-2xl transition-all inline-flex items-center gap-2"
          >
            Post a Job - It's Free
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">FS</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  Full-Stack Jobs
                </h3>
                <p className="text-sm text-gray-400">Find Your Dream Role</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © 2025 Full-Stack Jobs. All rights reserved.
              </p>
              <div className="flex gap-4 mt-2 justify-center md:justify-end">
                <Link
                  href="/admin"
                  className="text-sm hover:text-white transition-colors"
                >
                  Admin
                </Link>
                <Link
                  href="/submit-job"
                  className="text-sm hover:text-white transition-colors"
                >
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
