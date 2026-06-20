import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Nikah Hub</h1>
            <p className="text-xl mb-8">Halal • Trust • Rabta</p>
            <p className="text-lg text-emerald-100 mb-12 max-w-2xl mx-auto">
              The most trusted Islamic matrimonial platform connecting families worldwide
              through a secure, verified, and privacy-focused system.
            </p>
            
            {!isAuthenticated ? (
              <div className="flex gap-4 justify-center">
                <Link 
                  to="/signup"
                  className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition"
                >
                  Login
                </Link>
              </div>
            ) : (
              <Link 
                to="/dashboard"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Nikah Hub?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your information is protected. Contact details hidden until you approve.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Verified Profiles</h3>
              <p className="text-gray-600">
                All profiles manually approved by admins. Identity verification available.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold mb-2">Family Focused</h3>
              <p className="text-gray-600">
                Islamic values. Transparent. Designed for families seeking genuine connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Match?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of Muslims finding their soulmate on Nikah Hub.
          </p>
          {!isAuthenticated && (
            <Link 
              to="/signup"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Join Now - It's Free!
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Nikah Hub. All rights reserved.</p>
          <p className="text-gray-400 mt-2">
            <Link to="/about" className="hover:text-white">About</Link>
            {' '} | {' '}
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
