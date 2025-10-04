"use client";

import { Job } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface JobFormProps {
  job?: Job;
}

type LanguageRequirement = {
  language: string;
  level: "Basic" | "Intermediate" | "Advanced" | "Native";
};

export function JobForm({ job }: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(
    job?.company_logo || null
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [languages, setLanguages] = useState<LanguageRequirement[]>(
    job?.required_languages || []
  );

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

  function addLanguage() {
    setLanguages([...languages, { language: "", level: "Intermediate" }]);
  }

  function removeLanguage(index: number) {
    setLanguages(languages.filter((_, i) => i !== index));
  }

  function updateLanguage(
    index: number,
    field: "language" | "level",
    value: string
  ) {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  }

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

      // Filter out empty languages
      const validLanguages = languages.filter(
        (lang) => lang.language.trim() !== ""
      );

      const jobData = {
        title: formData.get("title") as string,
        company: formData.get("company") as string,
        company_logo: logoUrl,
        location: formData.get("location") as string,
        description: formData.get("description") as string,
        salary: (formData.get("salary") as string) || null,
        salary_min: formData.get("salary_min")
          ? parseInt(formData.get("salary_min") as string)
          : null,
        salary_max: formData.get("salary_max")
          ? parseInt(formData.get("salary_max") as string)
          : null,
        salary_currency: (formData.get("salary_currency") as string) || "USD",
        visa_sponsorship: formData.get("visa_sponsorship") === "on",
        required_languages: validLanguages,
        job_type: formData.get("job_type") as string,
        status: formData.get("status") as string,
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
            Salary (Optional - Legacy Field)
          </label>
          <input
            id="salary"
            name="salary"
            type="text"
            defaultValue={job?.salary || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. $80,000 - $120,000"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use the fields below for structured salary data
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Salary Range (Optional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="salary_min"
                className="block text-xs text-gray-600 mb-1"
              >
                Minimum
              </label>
              <input
                id="salary_min"
                name="salary_min"
                type="number"
                defaultValue={job?.salary_min || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50000"
              />
            </div>
            <div>
              <label
                htmlFor="salary_max"
                className="block text-xs text-gray-600 mb-1"
              >
                Maximum
              </label>
              <input
                id="salary_max"
                name="salary_max"
                type="number"
                defaultValue={job?.salary_max || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100000"
              />
            </div>
            <div>
              <label
                htmlFor="salary_currency"
                className="block text-xs text-gray-600 mb-1"
              >
                Currency
              </label>
              <select
                id="salary_currency"
                name="salary_currency"
                defaultValue={job?.salary_currency || "USD"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
                <option value="EGP">EGP (E£)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="visa_sponsorship"
              defaultChecked={job?.visa_sponsorship || false}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Visa Sponsorship Available
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            Check if the company provides visa sponsorship for this role
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Required Languages (Optional)
          </label>
          <div className="space-y-3">
            {languages.map((lang, index) => (
              <div key={index} className="flex gap-3 items-start">
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) =>
                    updateLanguage(index, "language", e.target.value)
                  }
                  placeholder="e.g. English, Spanish, Arabic"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={lang.level}
                  onChange={(e) =>
                    updateLanguage(index, "level", e.target.value)
                  }
                  className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Native">Native</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLanguage}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              + Add Language Requirement
            </button>
          </div>
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

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={job?.status || "pending"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
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
