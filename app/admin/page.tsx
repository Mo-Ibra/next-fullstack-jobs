import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { supabaseAdmin, Job } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { SignOutButton } from "./signout-btn";
import { DeleteButton } from './delete-btn';
// import { ApproveRejectButtons } from './approve-reject-buttons'

async function getJobs() {
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .order('status', { ascending: true })
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
  
  return data as Job[]
}

export default async function AdminDashboard() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const jobs = await getJobs()
  const pendingJobs = jobs.filter(j => j.status === 'pending')
  const approvedJobs = jobs.filter(j => j.status === 'approved')
  const rejectedJobs = jobs.filter(j => j.status === 'rejected')

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <Link 
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Public Site
              </Link>
            </div>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Pending Review</h3>
            <p className="text-3xl font-bold text-yellow-900">{pendingJobs.length}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-green-800 mb-1">Approved</h3>
            <p className="text-3xl font-bold text-green-900">{approvedJobs.length}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-red-800 mb-1">Rejected</h3>
            <p className="text-3xl font-bold text-red-900">{rejectedJobs.length}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Manage Jobs ({jobs.length})
          </h2>
          <Link
            href="/admin/jobs/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            + Create Job
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {jobs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No jobs yet. Create your first job posting!
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id} className={job.status === 'pending' ? 'bg-yellow-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.status === 'pending' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                      {job.status === 'approved' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      )}
                      {job.status === 'rejected' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.company_logo ? (
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100">
                          <Image
                            src={job.company_logo}
                            alt={`${job.company} logo`}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                          No logo
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{job.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {job.job_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/jobs/${job.id}/edit`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <DeleteButton jobId={job.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}