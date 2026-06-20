import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Error boundary for production
if (import.meta.env.PROD) {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
  })
}

// Warn about unsecured local storage in development
if (import.meta.env.DEV) {
  console.log(`
    ╔════════════════════════════════════════╗
    ║     🚀 Nikah Hub - Development Mode    ║
    ║                                        ║
    ║  • Firebase Emulators Active           ║
    ║  • DevTools Available                  ║
    ║  • Local Storage Active                ║
    ║                                        ║
    ║  Never use .env with real credentials  ║
    ║  in development!                       ║
    ╚════════════════════════════════════════╝
  `)
}

// Create root and render app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
