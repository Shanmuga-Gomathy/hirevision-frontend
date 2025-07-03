import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiService } from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [registeredEmail, setRegisteredEmail] = useState('')

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
      const response = await apiService.register(formData)
      
      // Handle different response formats from backend
      let successMessage = ''
      let isSuccess = false
      
      if (typeof response === 'string') {
        // Handle string response
        if (response.includes('successful')) {
          isSuccess = true
          // Create role-specific success message
          if (formData.userType === 'USER') {
            successMessage = 'job-seeker-success'
          } else if (formData.userType === 'RECRUITER') {
            successMessage = 'recruiter-success'
          } else {
            successMessage = 'Registration successful! Please check your email to confirm your account.'
          }
        } else {
          successMessage = response
          isSuccess = false
        }
      } else if (response.message) {
        // Handle JSON response
        successMessage = response.message
        isSuccess = response.status === 'success'
      } else {
        successMessage = 'Registration successful! Please check your email to confirm your account.'
        isSuccess = true
      }
      
      if (isSuccess) {
        // Store the email for display in success message
        setRegisteredEmail(formData.email)
        
        setMessage({
          type: 'success',
          text: successMessage
        })
        
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          userType: ''
        })
        
        // Don't auto-redirect, let user see the success message
      } else {
        setMessage({
          type: 'info',
          text: successMessage
        })
      }
    } catch (error) {
      console.error('Registration error:', error)
      
      // Handle specific error cases
      let errorMessage = 'Registration failed. Please try again.'
      
      if (error.message.includes('Email already confirmed and in use')) {
        errorMessage = 'This email is already registered and confirmed. Please login instead.'
      } else if (error.message.includes('Email already registered for this role')) {
        errorMessage = 'This email is already registered for this role. Please login or choose a different role.'
      } else if (error.message.includes('Invalid email format')) {
        errorMessage = 'Please enter a valid email address.'
      } else if (error.message.includes('Invalid user type')) {
        errorMessage = 'Please select a valid user type.'
      } else if (error.message.includes('Admin registration is not allowed')) {
        errorMessage = 'Admin registration is not allowed. Please select a different role.'
      } else if (error.message.includes('confirmation email has already been sent')) {
        errorMessage = 'A confirmation email has already been sent. Please check your inbox or wait for the token to expire.'
      } else if (error.message.includes('400')) {
        errorMessage = 'Invalid registration data. Please check your information and try again.'
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Please try again later.'
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your internet connection.'
      }

      setMessage({
        type: 'danger',
        text: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }

  const renderSuccessMessage = (messageType) => {
    if (messageType === 'job-seeker-success') {
      return (
        <div className="alert alert-success registration-success">
          <div className="d-flex align-items-start">
            <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.5rem', marginTop: '2px' }}></i>
            <div>
              <h5 className="alert-heading mb-3">Registration Successful! 🎉</h5>
              <p className="mb-3">Your account has been created successfully. Here's what happens next:</p>
              
              <div className="bg-light p-3 rounded mb-3">
                <h6 className="fw-bold mb-2">📧 Email Confirmation Process:</h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    <strong>Check your email</strong> - We've sent a confirmation link to <strong>{registeredEmail}</strong>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-clock text-warning me-2"></i>
                    <strong>15 minutes</strong> - The confirmation link will expire in <strong>15 minutes</strong>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-shield-check text-info me-2"></i>
                    <strong>Secure verification</strong> - Click the link to verify your email and activate your account
                  </li>
                  <li>
                    <i className="bi bi-arrow-right text-primary me-2"></i>
                    <strong>Ready to login</strong> - Once confirmed, you can login and start using HireVision AI
                  </li>
                </ul>
              </div>
              
              <div className="d-grid gap-2">
                <Link to="/login" className="btn btn-primary">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (messageType === 'recruiter-success') {
      return (
        <div className="alert alert-success registration-success">
          <div className="d-flex align-items-start">
            <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.5rem', marginTop: '2px' }}></i>
            <div>
              <h5 className="alert-heading mb-3">Registration Successful! 🎉</h5>
              <p className="mb-3">Your recruiter account has been created successfully. Here's what happens next:</p>
              
              <div className="bg-light p-3 rounded mb-3">
                <h6 className="fw-bold mb-2">🔒 Admin Approval Process:</h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-shield-check text-success me-2"></i>
                    <strong>Security first</strong> - All recruiter accounts require admin approval to prevent scams
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-clock text-warning me-2"></i>
                    <strong>48 hours</strong> - The confirmation link will expire in <strong>48 hours</strong> (admin review may take up to 48 hours)
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-envelope text-info me-2"></i>
                    <strong>Email notification</strong> - You'll receive an email once your account is approved
                  </li>
                  <li>
                    <i className="bi bi-arrow-right text-primary me-2"></i>
                    <strong>Ready to recruit</strong> - After approval, you can post jobs and manage candidates
                  </li>
                </ul>
              </div>
              <div className="d-grid gap-2">
                <Link to="/login" className="btn btn-primary">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={`alert alert-${message.type} alert-dismissible fade show`}>
          {message.text}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMessage({ type: '', text: '' })}
          ></button>
        </div>
      )
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="registration-form">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Create Your Account</h2>
              <p className="text-muted">
                Join HireVision AI and get AI-powered job recommendations
              </p>
            </div>

            {message.text && renderSuccessMessage(message.text)}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                />
                <div className="form-text">
                  We'll send a confirmation email to this address
                </div>
              </div>

              <div className="mb-3">
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
                  minLength="6"
                />
                <div className="form-text">
                  Password must be at least 6 characters long
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="userType" className="form-label">
                  I want to join as *
                </label>
                <select
                  className="form-select"
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="USER">Job Seeker - Upload resume & find jobs</option>
                  <option value="RECRUITER">Recruiter - Post jobs & manage candidates</option>
                  <option value="ADMIN">Admin - Manage platform</option>
                </select>
                <div className="form-text">
                  Choose the role that best describes how you'll use the platform
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                Already have an account?{' '}
                <Link to="/login" className="text-decoration-none">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register 