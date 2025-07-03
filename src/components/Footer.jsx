import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-eye me-2"></i>
              HireVision AI
            </h5>
            <p className="text-muted">
              Smart resume analyzer and job recommender powered by AI. 
              Transform your job search with intelligent skill matching and 
              personalized recommendations.
            </p>
            <div className="social-links">
              <a href="#" className="text-muted me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-muted me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-muted me-3">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Platform</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/how-it-works" className="text-muted text-decoration-none">
                  How It Works
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-muted text-decoration-none">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Features</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Resume Upload
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  AI Analysis
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Job Matching
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Application Tracking
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">For Employers</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Post Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  View Candidates
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Match Analytics
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Hiring Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/coming-soon" className="text-muted text-decoration-none">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              © 2024 HireVision AI. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted mb-0">
              Powered by <i className="bi bi-robot text-primary"></i> AI Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 