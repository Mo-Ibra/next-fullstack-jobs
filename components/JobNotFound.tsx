import Link from "next/link";

const JobNotFound = () => {
  return (
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
      <p className="text-gray-500 text-lg mb-4">No jobs posted yet.</p>
      <Link
        href="/submit-job"
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        Be the first to post a job →
      </Link>
    </div>
  );
};

export default JobNotFound;