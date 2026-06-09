'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Newspaper, Calendar, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const { user } = useAuth()

  const newsUpdates = [
    {
      id: 1,
      date: 'Oct 24, 2023',
      title: 'New Vocational Training Program',
      description: 'A local construction firm is partnering with us to offer certifications starting next month. Get ready to build your future.',
      category: 'Employment'
    },
    {
      id: 2,
      date: 'Oct 22, 2023',
      title: 'Community Yard Meetup',
      description: 'Join us this Saturday for a virtual peer-support circle in "The Yard" focusing on family reconnection and shared growth.',
      category: 'Community'
    }
  ]

  return (
    <div className="container py-4">
      <div className="glass-card p-5 text-center shadow-lg mb-5">
        <h1 className="display-4 fw-bold mb-3 text-primary">
          Reconnect. Rebuild. Rise.
        </h1>
        <p className="lead mb-4 text-muted mx-auto" style={{ maxWidth: '700px' }}>
          Welcome to ConvictConnected, a dignified community space for Residents navigating the journey of reentry. 
          {user ? ` Glad to have you back, ${user.displayName || 'Resident'}.` : ' Join us to find support and build your future.'}
        </p>
        {!user && (
          <div className="d-flex gap-3 justify-content-center">
            <Link href="/register" className="btn btn-primary btn-lg px-4 fw-bold">Join the Community</Link>
            <Link href="/login" className="btn btn-outline-dark btn-lg px-4">Resident Login</Link>
          </div>
        )}
      </div>

      <div className="mb-5">
        <div className="d-flex align-items-center mb-4 px-2">
          <Newspaper className="text-primary me-2" size={28} />
          <h2 className="fw-bold m-0">News from the Yard</h2>
        </div>
        <div className="row g-4">
          {newsUpdates.map((news) => (
            <div key={news.id} className="col-lg-6">
              <div className="glass-card p-4 h-100 border-start border-4 border-accent">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-light text-dark border">{news.category}</span>
                  <div className="small text-muted d-flex align-items-center">
                    <Calendar size={14} className="me-1" />
                    {news.date}
                  </div>
                </div>
                <h4 className="fw-bold h5 mb-2">{news.title}</h4>
                <p className="text-muted small mb-3">{news.description}</p>
                <button className="btn btn-link p-0 text-primary text-decoration-none fw-semibold small d-flex align-items-center">
                  Read more <ArrowRight size={16} className="ms-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <Link href="/resources" className="text-decoration-none text-dark">
            <div className="glass-card p-4 h-100 transition hover-shadow border-top border-4 border-info">
              <h3 className="fw-bold h5">The Commissary</h3>
              <p className="small text-muted mb-0">Access housing assistance, legal aid, and employment opportunities tailored for you.</p>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link href="/chatbot" className="text-decoration-none text-dark">
            <div className="glass-card p-4 h-100 transition hover-shadow border-top border-4 border-primary">
              <h3 className="fw-bold h5">AI Assistant</h3>
              <p className="small text-muted mb-0">Get instant guidance on program eligibility and community navigation from our AI navigator.</p>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link href="/profile" className="text-decoration-none text-dark">
            <div className="glass-card p-4 h-100 transition hover-shadow border-top border-4 border-secondary">
              <h3 className="fw-bold h5">My Cell</h3>
              <p className="small text-muted mb-0">Update your Resident profile, manage your settings, and check your progress.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}