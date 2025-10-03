"use client";

import { Job } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface JobFormProps {
  job?: Job;
}

export function JobForm({ job }: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(
    job?.company_logo || null
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let logoUrl = job?.company_logo || null;

      // Upload logo if a new file was selected
      if (logoFile) {
        const formData = new FormData();
        formData.append("file", logoFile);

        const uploadRes = await fetch("/api/admin/upload-logo", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload logo");
        }

        const { url } = await uploadRes.json();
        logoUrl = url;

        console.log(logoUrl);
      }

      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);

      console.log(formData);

      const jobData = {
        title: formData.get("title") as string,
        company: formData.get("company") as string,
        company_logo: logoUrl,
        location: formData.get("location") as string,
        description: formData.get("description") as string,
        salary: (formData.get("salary") as string) || null,
        job_type: formData.get("job_type") as string,
        status: "approved",
      };

      console.log(jobData);

      const url = job ? `/api/admin/jobs/${job.id}` : "/api/admin/jobs";
      const method = job ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      console.log(res);

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        console.log("Failed to save job");
        throw new Error("Failed to save job");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save job");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={job?.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            defaultValue={job?.company}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Acme Corp"
          />
        </div>

        <div>
          <label
            htmlFor="company_logo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Logo
          </label>
          <input
            id="company_logo"
            name="company_logo"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {logoPreview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <div className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                <Image
                  src={logoPreview}
                  alt="Company logo preview"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              defaultValue={job?.location}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. New York, NY (Remote)"
            />
          </div>

          <div>
            <label
              htmlFor="job_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Type *
            </label>
            <select
              id="job_type"
              name="job_type"
              required
              defaultValue={job?.job_type || "Full-time"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Salary (Optional)
          </label>
          <input
            id="salary"
            name="salary"
            type="text"
            defaultValue={job?.salary || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. $80,000 - $120,000"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={10}
            defaultValue={job?.description}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the role, responsibilities, requirements, etc."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : job ? "Update Job" : "Create Job"}
          </button>

          <Link
            href="/admin"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
