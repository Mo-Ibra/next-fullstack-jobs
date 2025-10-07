import { supabaseAdmin, Job } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

async function getJob(id: string) {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Job;
}

export default async function JobDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Navigation */}
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Job Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-4">
              {job.company_logo && (
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white ring-4 ring-white/50 shadow-xl">
                    <Image
                      src={job.company_logo}
                      alt={`${job.company} logo`}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1">
                <p className="text-blue-100 font-medium mb-1">{job.company}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-2 items-center">
                  {job.work_location_type === "remote" && (
                    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                      🏠 REMOTE
                    </span>
                  )}
                  {job.work_location_type === "hybrid" && (
                    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                      🔄 HYBRID
                    </span>
                  )}
                  {job.work_location_type === "on-site" && (
                    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                      🏢 ON-SITE
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Key Details Section */}
          <div className="grid md:grid-cols-3 gap-6 p-8 bg-gray-50 border-b border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-semibold text-gray-900">{job.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-purple-600"
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
              <div>
                <p className="text-sm text-gray-500 mb-1">Job Type</p>
                <p className="font-semibold text-gray-900">{job.job_type}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Salary</p>
                {job.salary_min && job.salary_max ? (
                  <p className="font-bold text-green-600">
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
                  </p>
                ) : job.salary ? (
                  <p className="font-bold text-green-600">{job.salary}</p>
                ) : (
                  <p className="font-semibold text-gray-500">Not specified</p>
                )}
              </div>
            </div>
          </div>

          {/* Benefits/Tags Section */}
          <div className="px-8 py-6 bg-white border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {job.visa_sponsorship && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm border border-blue-100">
                  ✈️ Visa Sponsorship Available
                </span>
              )}
              {job.required_languages && job.required_languages.length > 0 && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-semibold text-sm border border-purple-100">
                  🌐 {job.required_languages.length} Language
                  {job.required_languages.length > 1 ? "s" : ""} Required
                </span>
              )}
            </div>
          </div>

          {/* Language Requirements */}
          {job.required_languages && job.required_languages.length > 0 && (
            <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                </span>
                Language Requirements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {job.required_languages.map((lang, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-purple-200 rounded-xl px-4 py-3 hover:border-purple-300 transition-colors"
                  >
                    <p className="font-bold text-purple-900 mb-1">
                      {lang.language}
                    </p>
                    <p className="text-sm text-purple-600">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Job Description */}
          <div className="px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              Job Description
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>
            </div>
          </div>

          {/* Apply CTA Section */}
          {job.application_link && (
            <div className="px-8 py-8 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Ready to Apply?
                </h3>
                <p className="text-gray-600 mb-6">
                  Take the next step in your full-stack development career
                </p>
                <a
                  href={job.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Apply for this Position
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
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  You'll be redirected to the application page
                </p>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500">
              <p>
                Posted on{" "}
                {new Date(job.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View more jobs →
              </Link>
            </div>
          </div>
        </div>

        {/* Share/Actions Section */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold shadow-lg border border-gray-200 transition-all"
          >
            ← Browse More Jobs
          </Link>
          <Link
            href="/submit-job"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
          >
            Post Your Job
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
