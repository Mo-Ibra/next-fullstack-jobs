'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ApproveRejectButtons({ jobId }: { jobId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleStatusChange(status: 'approved' | 'rejected') {
    setLoading(true)
    
    const res = await fetch(`/api/admin/jobs/${jobId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to update job status')
      setLoading(false)
    }
  }

  return (
    <div className="gap-2 mr-4 inline-flex">
      <button
        onClick={() => handleStatusChange('approved')}
        disabled={loading}
        className="text-green-600 hover:text-green-900 disabled:opacity-50 font-medium"
      >
        ✓ Approve
      </button>
      <button
        onClick={() => handleStatusChange('rejected')}
        disabled={loading}
        className="text-red-600 hover:text-red-900 disabled:opacity-50 font-medium"
      >
        ✗ Reject
      </button>
    </div>
  )
}