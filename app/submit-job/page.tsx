import { PublicJobForm } from "./public-job-form";
import Link from "next/link";

export default function SubmitJobPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to job board
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">
            Submit your job posting for review. Once approved by our team, it
            will be visible to all job seekers.
          </p>
        </div>

        <PublicJobForm />
      </div>
    </main>
  );
}
