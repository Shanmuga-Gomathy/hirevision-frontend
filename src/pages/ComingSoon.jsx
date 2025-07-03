import React from 'react'
import { Link } from 'react-router-dom'

const ComingSoon = ({ title = "Feature" }) => {
  return (
    <div className="coming-soon">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="coming-soon-icon">
              <i className="bi bi-tools"></i>
            </div>
            <h1 className="display-4 fw-bold mb-4">
              {title} Coming Soon!
            </h1>
            <p className="lead text-muted mb-4">
              We're working hard to bring you amazing features. 
              This {title.toLowerCase()} is currently under development and will be available soon.
            </p>
            
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="bi bi-gear"></i>
                  </div>
                  <h5>In Development</h5>
                  <p className="text-muted small">
                    Our team is actively building this feature with the latest technologies.
                  </p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="bi bi-test-tube"></i>
                  </div>
                  <h5>Testing</h5>
                  <p className="text-muted small">
                    We're thoroughly testing to ensure everything works perfectly for you.
                  </p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="bi bi-rocket"></i>
                  </div>
                  <h5>Launch Ready</h5>
                  <p className="text-muted small">
                    We'll notify you as soon as this feature is ready to use.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/" className="btn btn-primary">
                Go to Homepage
              </Link>
              <Link to="/register" className="btn btn-outline-primary">
                Get Early Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon 