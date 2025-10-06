import { Job } from "@/lib/supabase";
import Link from "next/link";

type HeroProps = {
  jobs: Job[];
  companies: number;
  remoteJobs: number;
};

const Hero = ({ jobs, companies, remoteJobs }: HeroProps) => {
  return (
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
              <p className="text-3xl font-bold text-gray-900">{jobs.length}+</p>
              <p className="text-sm text-gray-600">Active Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{companies}+</p>
              <p className="text-sm text-gray-600">Companies</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{remoteJobs}+</p>
              <p className="text-sm text-gray-600">Remote Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;