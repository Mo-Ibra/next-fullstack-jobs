import { Job, supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to all jobs
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex gap-6 items-start mb-4">
              {job.company_logo && (
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-xl text-gray-700 font-medium mb-4">
                  {job.company}
                </p>

                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span className="flex items-center">📍 {job.location}</span>
                  <span className="flex items-center">💼 {job.job_type}</span>
                  {job.salary && (
                    <span className="text-green-600 font-semibold">
                      {job.salary}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Job Description
            </h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Posted on{" "}
              {new Date(job.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
