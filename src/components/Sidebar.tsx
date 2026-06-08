'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside
      className="sidebar-gradient text-white p-4"
      style={{ width: '280px' }}
    >
      <h2 className="fw-bold mb-4 text-center">ConvictConnect</h2>

      <nav className="d-flex flex-column gap-3 h-100">
        <Link href="/" className="btn btn-outline-light text-start">
          Home
        </Link>

        <Link href="/dashboard" className="btn btn-outline-light text-start">
          Dashboard
        </Link>

        <Link href="/resources" className="btn btn-outline-light text-start">
          Resources
        </Link>

        <Link href="/chatbot" className="btn btn-outline-light text-start">
          AI Assistant
        </Link>

        <div className="mt-auto pt-4 border-top border-secondary">
          {user ? (
            <div className="d-grid gap-2">
              <div className="small mb-2 text-info px-2">
                Logged in as {user.displayName || 'Resident'}
              </div>
              <Link href="/profile" className="btn btn-sm btn-link text-white text-start text-decoration-none">
                My Cell (Profile)
              </Link>
              <button onClick={logout} className="btn btn-danger btn-sm text-start">
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary w-100">
              Resident Login
            </Link>
          )}
        </div>
      </nav>
    </aside>
  )
}