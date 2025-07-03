import React, { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { apiService } from '../services/api'

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (token) {
      confirmEmail(token)
    } else {
      setStatus('error')
      setMessage('Invalid confirmation link. Please check your email for the correct link.')
    }
  }, [searchParams])

  const confirmEmail = async (token) => {
    try {
      const response = await apiService.confirmEmail(token)
      
      // Handle different response formats from backend
      let successMessage = ''
      let isSuccess = false
      
      if (typeof response === 'string') {
        // Handle string response
        if (response.includes('confirmed') || response.includes('successfully')) {
          successMessage = 'Your email has been confirmed successfully! Your account is now active.'
          isSuccess = true
        } else if (response.includes('already confirmed')) {
          successMessage = 'Your email was already confirmed. You can now login to your account.'
          isSuccess = true
        } else {
          successMessage = response
          isSuccess = false
        }
      } else if (response.message) {
        // Handle JSON response
        successMessage = response.message
        isSuccess = response.status === 'success'
      } else {
        successMessage = 'Your email has been confirmed successfully! Your account is now active.'
        isSuccess = true
      }
      
      if (isSuccess) {
        setStatus('success')
        setMessage(successMessage)
        
        // Auto-redirect to login after 5 seconds
        setTimeout(() => {
          navigate('/login')
        }, 5000)
      } else {
        setStatus('error')
        setMessage(successMessage)
      }
    } catch (error) {
      console.error('Confirmation error:', error)
      setStatus('error')
      
      // Handle specific error cases
      let errorMessage = 'Confirmation failed. Please try again.'
      
      if (error.message.includes('Token not found')) {
        errorMessage = 'Invalid confirmation link. Please check your email for the correct link.'
      } else if (error.message.includes('Token expired')) {
        errorMessage = 'This confirmation link has expired. Please register again to get a new link.'
      } else if (error.message.includes('Invalid token type')) {
        errorMessage = 'Invalid confirmation link. Please check your email for the correct link.'
      } else if (error.message.includes('Email already confirmed')) {
        errorMessage = 'Your email was already confirmed. You can now login to your account.'
        setStatus('success')
      } else if (error.message.includes('400')) {
        errorMessage = 'Invalid confirmation link. Please check your email for the correct link.'
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Please try again later.'
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your internet connection and try again.'
      }

      setMessage(errorMessage)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="registration-form text-center">
            {status === 'loading' && (
              <>
                <div className="spinner-border text-primary mb-4" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h2 className="fw-bold mb-3">Confirming Your Email</h2>
                <p className="text-muted">
                  Please wait while we confirm your email address...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="feature-icon mb-4">
                  <i className="bi bi-check-circle text-success" style={{ fontSize: '3rem' }}></i>
                </div>
                <h2 className="fw-bold mb-3 text-success">Email Confirmed!</h2>
                <p className="text-muted mb-4">
                  {message}
                </p>
                <p className="text-muted small mb-4">
                  You will be redirected to the login page in 5 seconds...
                </p>
                <div className="d-grid gap-2">
                  <Link to="/login" className="btn btn-primary">
                    Sign In Now
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary">
                    Go to Homepage
                  </Link>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="feature-icon mb-4">
                  <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '3rem' }}></i>
                </div>
                <h2 className="fw-bold mb-3 text-danger">Confirmation Failed</h2>
                <p className="text-muted mb-4">
                  {message}
                </p>
                <div className="d-grid gap-2">
                  <Link to="/register" className="btn btn-primary">
                    Try Registering Again
                  </Link>
                  <Link to="/login" className="btn btn-outline-primary">
                    Go to Login
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary">
                    Go to Homepage
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailConfirmation 