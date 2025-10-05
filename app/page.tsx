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

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
            <div className="flex gap-4">
              <Link
                href="/submit-job"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Post a Job
              </Link>
              <Link
                href="/admin"
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Next Opportunity
          </h2>
          <p className="text-gray-600">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No jobs posted yet.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 block"
              >
                <div className="flex gap-4">
                  {job.company_logo && (
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
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
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      {job.salary_min && job.salary_max ? (
                        <span className="text-green-600 font-medium ml-4 flex-shrink-0">
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
                          <span className="text-green-600 font-medium ml-4 flex-shrink-0">
                            {job.salary}
                          </span>
                        )
                      )}
                    </div>

                    <p className="text-gray-700 font-medium mb-2">
                      {job.company}
                    </p>

                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        📍 {job.location}
                      </span>
                      <span className="flex items-center">
                        💼 {job.job_type}
                      </span>
                      {job.visa_sponsorship && (
                        <span className="flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                          ✈️ Visa Sponsorship
                        </span>
                      )}
                      {job.required_languages &&
                        job.required_languages.length > 0 && (
                          <span className="flex items-center bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-medium">
                            🌐 {job.required_languages.length} Language
                            {job.required_languages.length > 1 ? "s" : ""}
                          </span>
                        )}
                    </div>

                    <p className="text-gray-600 line-clamp-2">
                      {job.description}
                    </p>

                    {/* <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </p>

                      {job.application_link && (
                        <a
                          href={job.application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-2"
                        >
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
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div> */}

                    <p className="text-sm text-gray-400 mt-3">
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
