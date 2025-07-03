import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'USER', // Default to USER
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const result = await login(formData)
      
      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Login successful! Redirecting to dashboard...'
        })

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      } else {
        // Handle specific error cases
        let errorMessage = 'Login failed. Please try again.'
        
        if (result.message.includes('Invalid credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials.'
        } else if (result.message.includes('Email not confirmed')) {
          errorMessage = 'Please confirm your email address before logging in. Check your inbox for the confirmation link.'
        } else if (result.message.includes('Account is disabled')) {
          errorMessage = 'Your account is disabled. Please contact support.'
        } else if (result.message.includes('User not found')) {
          errorMessage = 'No account found with this email address. Please register first.'
        } else if (result.message.includes('401')) {
          errorMessage = 'Invalid email or password. Please check your credentials.'
        } else if (result.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.'
        } else if (result.message.includes('Network')) {
          errorMessage = 'Network error. Please check your internet connection.'
        }

        setMessage({
          type: 'danger',
          text: errorMessage
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      setMessage({
        type: 'danger',
        text: 'An unexpected error occurred. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-form">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted">
                Sign in to your HireVision AI account
              </p>
            </div>

            {message.text && (
              <div className={`alert alert-${message.type} alert-dismissible fade show`}>
                {message.text}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMessage({ type: '', text: '' })}
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password *
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="userType" className="form-label">
                  User Type *
                </label>
                <select
                  className="form-select"
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="USER">Job Seeker</option>
                  <option value="RECRUITER">Recruiter</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-muted mb-0">
                Don't have an account?{' '}
                <Link to="/register" className="text-decoration-none">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 