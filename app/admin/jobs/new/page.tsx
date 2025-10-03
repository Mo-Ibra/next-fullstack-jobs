import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { JobForm } from "../job-form";

export default async function NewJobPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobForm />
      </div>
    </main>
  )
}