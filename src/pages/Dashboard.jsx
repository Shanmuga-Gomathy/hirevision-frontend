import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user, isUser, isRecruiter, isAdmin } = useAuth()
  const [resume, setResume] = useState(null)
  const [loadingResume, setLoadingResume] = useState(true)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isUser() && user?.id) {
      fetchResume()
    }
    // eslint-disable-next-line
  }, [user?.id])

  const fetchResume = async () => {
    setLoadingResume(true)
    try {
      const res = await fetch(`https://hirevision-backend.onrender.com/api/resume/me/parsed?userId=${user.id}`)
      if (!res.ok) throw new Error('No resume found')
      const data = await res.json()
      setResume(data)
    } catch {
      setResume(null)
    } finally {
      setLoadingResume(false)
    }
  }

  const handleDeleteResume = async () => {
    if (!window.confirm('Are you sure you want to delete your resume?')) return
    await fetch(`https://hirevision-backend.onrender.com/api/resume/me?userId=${user.id}`, { method: 'DELETE' })
    setResume(null)
    setShowResumeModal(false)
  }

  const handleUploadRedirect = () => {
    navigate('/upload-resume')
  }

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    return user?.email || 'User'
  }

  const getRoleDisplayName = () => {
    if (isUser()) return 'Job Seeker'
    if (isRecruiter()) return 'Recruiter'
    if (isAdmin()) return 'Administrator'
    return 'User'
  }

  const getWelcomeMessage = () => {
    if (isUser()) {
      return "Welcome to your job search dashboard! Upload your resume and discover AI-powered job recommendations tailored to your skills and experience."
    } else if (isRecruiter()) {
      return "Welcome to your recruitment dashboard! Post jobs, manage candidates, and find the perfect talent for your organization."
    } else if (isAdmin()) {
      return "Welcome to the admin dashboard! Manage users, monitor system performance, and oversee platform operations."
    }
    return "Welcome to your dashboard!"
  }

  const getQuickActions = () => {
    if (isUser()) {
      return [
        {
          title: resume ? 'View/Delete Resume' : 'Upload Resume',
          description: resume ? 'View or delete your uploaded resume' : 'Upload your resume for AI analysis',
          icon: resume ? 'bi-eye' : 'bi-upload',
          link: '/upload-resume',
          color: 'primary'
        },
        {
          title: 'Find Jobs',
          description: 'Browse and search for jobs',
          icon: 'bi-search',
          link: '/jobs',
          color: 'success'
        },
        {
          title: 'Job Recommendations',
          description: 'View AI-powered job matches',
          icon: 'bi-lightbulb',
          link: '/recommendations',
          color: 'info'
        },
        {
          title: 'Applied Jobs',
          description: 'View jobs you have applied to',
          icon: 'bi-clipboard-check',
          link: '/applied-jobs',
          color: 'warning'
        }
      ]
    } else if (isRecruiter()) {
      return [
        {
          title: 'Post Job',
          description: 'Create a new job posting',
          icon: 'bi-plus-circle',
          link: '/post-job',
          color: 'primary'
        },
        {
          title: 'Manage Jobs',
          description: 'View and edit your job postings',
          icon: 'bi-briefcase',
          link: '/manage-jobs',
          color: 'success'
        },
        {
          title: 'Candidates',
          description: 'Review job applications',
          icon: 'bi-people',
          link: '/candidates',
          color: 'info'
        },
        {
          title: 'Analytics',
          description: 'View recruitment analytics',
          icon: 'bi-graph-up',
          link: '/analytics',
          color: 'warning'
        }
      ]
    } else if (isAdmin()) {
      return [
        {
          title: 'User Management',
          description: 'Manage platform users',
          icon: 'bi-people',
          link: '/admin/users',
          color: 'primary'
        },
        {
          title: 'Approvals',
          description: 'Review pending approvals',
          icon: 'bi-check-circle',
          link: '/admin/approvals',
          color: 'success'
        },
        {
          title: 'System Analytics',
          description: 'View platform analytics',
          icon: 'bi-graph-up',
          link: '/admin/analytics',
          color: 'info'
        },
        {
          title: 'Settings',
          description: 'Platform configuration',
          icon: 'bi-gear',
          link: '/admin/settings',
          color: 'warning'
        }
      ]
    }
    return []
  }

  return (
    <div className="container py-5">
      {/* Welcome Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="dashboard-welcome-card">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="fw-bold mb-2">Welcome back, {getUserDisplayName()}!</h1>
                <p className="text-muted mb-0">{getWelcomeMessage()}</p>
              </div>
              <div className="col-md-4 text-md-end">
                <span className="role-badge">
                  <i className="bi bi-person-badge me-2"></i>
                  {getRoleDisplayName()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Quick Actions</h2>
          <div className="row">
            {getQuickActions().map((action, index) => (
              <div key={index} className="col-md-3 col-sm-6 mb-3">
                <Link to={action.link} className="text-decoration-none">
                  <div className="action-card shadow-sm" style={{ borderLeft: `5px solid var(--bs-${action.color})` }}>
                    <div className="feature-icon mb-2" style={{ background: `var(--bs-${action.color})`, borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`bi ${action.icon} fs-3`} style={{ color: 'white' }}></i>
                    </div>
                    <h5 className="fw-bold mb-2 text-center">{action.title}</h5>
                    <p className="text-muted mb-0 text-center small">{action.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="row">
        <div className="col-12">
          <div className="activity-card">
            <div className="card-header">
              <h3 className="fw-bold mb-0">Recent Activity</h3>
            </div>
            <div className="card-body">
              <div className="empty-state">
                <i className="bi bi-clock"></i>
                <h4>No recent activity</h4>
                <p>Your recent actions will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 