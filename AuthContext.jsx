import React, { createContext, useEffect, useState, useCallback } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // ============================================
  // SIGNUP - Create new user account
  // ============================================
  const signup = useCallback(async (email, password, displayName = '') => {
    try {
      setError(null)

      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // Create user in Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || email.split('@')[0],
        photoURL: null,
        role: 'user', // Default role
        status: 'active',
        emailVerified: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        privacySettings: {
          showEmail: false,
          allowMessages: true,
          allowProfileSharing: true,
        },
      })

      return user
    } catch (err) {
      const errorMessage = err.message || 'Signup failed'
      setError(errorMessage)
      throw err
    }
  }, [])

  // ============================================
  // LOGIN - Sign in with email/password
  // ============================================
  const login = useCallback(async (email, password) => {
    try {
      setError(null)

      if (!email || !password) {
        throw new Error('Email and password are required')
      }

      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (err) {
      const errorMessage = err.message || 'Login failed'
      setError(errorMessage)
      throw err
    }
  }, [])

  // ============================================
  // LOGOUT - Sign out current user
  // ============================================
  const logout = useCallback(async () => {
    try {
      setError(null)
      await signOut(auth)
      setCurrentUser(null)
      setUserRole(null)
      setIsAuthenticated(false)
    } catch (err) {
      const errorMessage = err.message || 'Logout failed'
      setError(errorMessage)
      throw err
    }
  }, [])

  // ============================================
  // PASSWORD RESET
  // ============================================
  const resetPassword = useCallback(async (email) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      const errorMessage = err.message || 'Password reset failed'
      setError(errorMessage)
      throw err
    }
  }, [])

  // ============================================
  // GET USER ROLE FROM FIRESTORE
  // ============================================
  const getUserRole = useCallback(async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        const role = userDoc.data().role || 'user'
        setUserRole(role)
        return role
      }
      return 'user'
    } catch (error) {
      console.error('Error fetching user role:', error)
      return 'user'
    }
  }, [])

  // ============================================
  // AUTH STATE LISTENER
  // ============================================
  useEffect(() => {
    // Set persistence before listening
    setPersistence(auth, browserLocalPersistence).catch(err => {
      console.warn('Persistence error:', err)
    })

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in
          setCurrentUser(user)
          setIsAuthenticated(true)

          // Get user role from Firestore
          const role = await getUserRole(user.uid)
          setUserRole(role)
        } else {
          // User is signed out
          setCurrentUser(null)
          setUserRole(null)
          setIsAuthenticated(false)
        }
      } catch (err) {
        console.error('Auth state change error:', err)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [getUserRole])

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    currentUser,
    userRole,
    loading,
    error,
    isAuthenticated,
    signup,
    login,
    logout,
    resetPassword,
    isAdmin: userRole === 'admin',
    isUser: userRole === 'user',
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      )}
    </AuthContext.Provider>
  )
}
