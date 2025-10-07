"use client";

import { Job } from "@/lib/supabase";
import JobCard from "./JobCard";
import { motion } from "framer-motion";
import { useState } from "react";

type JobsSectionProps = {
  jobs: Job[];
};

const JobsSection = ({ jobs }: JobsSectionProps) => {
  const [filter, setFilter] = useState<"all" | "remote" | "hybrid" | "on-site">(
    "all"
  );

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    return job.work_location_type === filter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="jobs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Latest Opportunities
              </h2>
              <p className="text-lg text-gray-600">
                {filteredJobs.length} full-stack position
                {filteredJobs.length !== 1 ? "s" : ""} waiting for you
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Jobs
              </button>
              <button
                onClick={() => setFilter("remote")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "remote"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                }`}
              >
                🏠 Remote
              </button>
              <button
                onClick={() => setFilter("hybrid")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "hybrid"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                }`}
              >
                🔄 Hybrid
              </button>
              <button
                onClick={() => setFilter("on-site")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "on-site"
                    ? "bg-gray-700 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                🏢 On-site
              </button>
            </div>
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <motion.div
            className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-6">
              {filter !== "all"
                ? `No ${filter} positions available right now. Try different filters.`
                : "No jobs posted yet. Check back soon!"}
            </p>
            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View all jobs →
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredJobs.map((job, index) => (
              <JobCard job={job} key={job.id} index={index} />
            ))}
          </motion.div>
        )}

        {/* Load More Button (if you want to add pagination later) */}
        {filteredJobs.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-500 text-sm">
              Showing all {filteredJobs.length} position
              {filteredJobs.length !== 1 ? "s" : ""}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default JobsSection;
