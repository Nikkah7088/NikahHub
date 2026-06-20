import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Dashboard() {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome, {currentUser?.displayName || currentUser?.email}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Profile Status</h3>
            <p className="text-2xl font-bold text-gray-900">Pending</p>
            <p className="text-gray-500 text-sm mt-2">Awaiting admin approval</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Interests Received</h3>
            <p className="text-2xl font-bold text-emerald-600">0</p>
            <p className="text-gray-500 text-sm mt-2">No interests yet</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Verification</h3>
            <p className="text-2xl font-bold text-orange-600">Not Verified</p>
            <p className="text-gray-500 text-sm mt-2">Get verified badge</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-600">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Account Created</h3>
                <p className="text-gray-600 text-sm">Your account is ready to use</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600">2</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Complete Your Profile</h3>
                <p className="text-gray-600 text-sm">Add your details and photos. It takes about 5 minutes.</p>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold mt-2">
                  Start Profile Setup →
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600">3</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Wait for Admin Approval</h3>
                <p className="text-gray-600 text-sm">Our team will review your profile and approve it within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
