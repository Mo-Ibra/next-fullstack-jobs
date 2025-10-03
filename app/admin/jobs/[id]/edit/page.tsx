import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { supabaseAdmin, Job } from "@/lib/supabase";
import { JobForm } from "../../job-form";

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

export default async function EditJobPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Edit Job</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobForm job={job} />
      </div>
    </main>
  );
}
