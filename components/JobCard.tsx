"use client";

import { Job } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const JobCard = ({ job, index }: { job: Job; index?: number }) => {

  // Check if job is new (posted in last 7 days)
  const isNew = () => {
    const jobDate = new Date(job.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - jobDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index ? index * 0.1 : 0 }}
    >
      <Link href={`/jobs/${job.id}`}>
        <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 p-6 transition-all hover:shadow-lg cursor-pointer">
          <div className="flex gap-4">
            {/* Company Logo */}
            {job.company_logo && (
              <div className="flex-shrink-0">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
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
              {/* Title and Badge Row */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {job.title}
                    </h3>
                    {isNew() && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    {job.company}
                  </p>
                </div>

                {/* Salary */}
                {job.salary_min && job.salary_max ? (
                  <span className="text-gray-900 font-semibold text-sm whitespace-nowrap">
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
                    <span className="text-gray-900 font-semibold text-sm whitespace-nowrap">
                      {job.salary}
                    </span>
                  )
                )}
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap gap-2 mb-3">
                {/* Work Location Type */}
                {job.work_location_type === "remote" && (
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-md text-xs font-medium">
                    🏠 Remote
                  </span>
                )}
                {job.work_location_type === "hybrid" && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md text-xs font-medium">
                    🔄 Hybrid
                  </span>
                )}
                {job.work_location_type === "on-site" && (
                  <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 border border-gray-200 px-2.5 py-1 rounded-md text-xs font-medium">
                    🏢 On-site
                  </span>
                )}

                {/* Location */}
                <span className="inline-flex items-center gap-1 text-gray-600 text-xs">
                  📍 {job.location}
                </span>

                {/* Job Type */}
                <span className="inline-flex items-center gap-1 text-gray-600 text-xs">
                  💼 {job.job_type}
                </span>

                {/* Visa Sponsorship */}
                {job.visa_sponsorship && (
                  <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-md text-xs font-medium">
                    ✈️ Visa
                  </span>
                )}

                {/* Languages */}
                {job.required_languages &&
                  job.required_languages.length > 0 && (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-md text-xs font-medium">
                      🌐 {job.required_languages.length} Lang
                      {job.required_languages.length > 1 ? "s" : ""}
                    </span>
                  )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  Posted {new Date(job.created_at).toLocaleDateString()}
                </span>

                {job.application_link && (
                  <span className="text-blue-600 font-medium group-hover:text-blue-700 inline-flex items-center gap-1">
                    Apply now
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default JobCard;
