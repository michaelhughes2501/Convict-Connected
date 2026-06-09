'use client'

import { useState, useEffect } from 'react'
import { updateProfile } from 'firebase/auth'
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/lib/firebase'

export default function ProfilePage() {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  // Sync local state with existing user data when the component mounts
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '')
      setPhotoURL(user.photoURL || '')
    }
  }, [user])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.currentUser) return

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL
      })
      setMessage({ type: 'success', text: 'Your profile has been updated successfully.' })
    } catch (error: any) {
      setMessage({ type: 'danger', text: error.message || 'Failed to update profile.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="glass-card p-5 mx-auto" style={{ maxWidth: '600px' }}>
        <h1 className="fw-bold mb-4 text-center text-primary">My Cell</h1>
        <p className="text-center text-muted mb-4">Update your Resident identity across the community</p>
        
        {message.text && (
          <div className={`alert alert-${message.type} mb-4 text-center`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="mb-4 text-center">
            {photoURL ? (
              <img 
                src={photoURL} 
                alt="Profile" 
                className="rounded-circle mb-3 border border-3 border-primary shadow-sm" 
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            ) : (
              <div 
                className="bg-info rounded-circle mb-3 d-inline-flex align-items-center justify-content-center text-white shadow-sm"
                style={{ width: '120px', height: '120px', fontSize: '3rem' }}
              >
                {displayName.charAt(0) || 'R'}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Display Name</label>
            <input
              type="text"
              className="form-control"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How others should address you"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Profile Picture URL</label>
            <input
              type="url"
              className="form-control"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/your-photo.jpg"
            />
            <div className="form-text">
              Provide a direct link to an image to update your avatar.
            </div>
          </div>

          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary py-2 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : 'Update My Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}