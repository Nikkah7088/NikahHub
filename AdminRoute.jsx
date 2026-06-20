import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

/**
 * AdminRoute Component
 * 
 * Wraps routes that require admin role.
 * Only users with role === 'admin' can access.
 */
export default function AdminRoute({ children }) {
  const { isAuthenticated, userRole, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (userRole !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
