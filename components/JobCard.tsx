import { Job } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

const JobCard = ({ job }: { job: Job }) => {
  return (
    <div
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

          <p className="text-gray-900 font-semibold mb-3">{job.company}</p>

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
            {job.required_languages && job.required_languages.length > 0 && (
              <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-lg font-medium">
                🌐 {job.required_languages.length} Language
                {job.required_languages.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

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
  );
};

export default JobCard;