import React, { useRef, useEffect } from "react";

const RESUME_LINK =
  "https://docs.google.com/document/d/13jmn42IOsJsWuo09mv2RmdXEuXBZpg_jsu3Zuu6j4Jg/edit?usp=sharing";
const Home = () => {
  const howItWorksRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to section if navigated with scrollTo state
  useEffect(() => {
    if (
      window.history.state &&
      window.history.state.usr &&
      window.history.state.usr.scrollTo
    ) {
      const sectionId = window.history.state.usr.scrollTo;
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      {/* Simple Hero Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">HireVision Demo</h1>
          <p className="lead mb-4">
            <span className="text-primary fw-bold">AI-powered job portal</span>{" "}
            for learning and demonstration.
            <br />
            Upload your resume, get smart job recommendations, and experience
            recruiter tools.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
            <button
              className="btn btn-primary btn-lg px-4"
              onClick={() => scrollToSection(howItWorksRef)}
            >
              How It Works
            </button>
            <button
              className="btn btn-outline-primary btn-lg px-4"
              onClick={() => scrollToSection(aboutRef)}
            >
              About
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-4">Key Features</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-robot display-4 text-primary mb-3"></i>
                  <h5 className="fw-bold">AI Resume Parsing</h5>
                  <p>
                    Upload your resume (PDF/DOCX) and let our AI extract your
                    skills, experience, and education for smarter job matching.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-lightbulb display-4 text-warning mb-3"></i>
                  <h5 className="fw-bold">Personalized Recommendations</h5>
                  <p>
                    Get job matches with skill and experience compatibility
                    scores, and see why each job is recommended for you.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-person-check display-4 text-success mb-3"></i>
                  <h5 className="fw-bold">Easy Applications</h5>
                  <p>
                    Apply to jobs in one click, track your application status,
                    and get notified when you are shortlisted.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-people display-4 text-info mb-3"></i>
                  <h5 className="fw-bold">Recruiter Tools</h5>
                  <p>
                    Post jobs, view applicants, shortlist with custom messages,
                    and manage your hiring pipeline with ease.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-shield-lock display-4 text-secondary mb-3"></i>
                  <h5 className="fw-bold">Role-Based Access</h5>
                  <p>
                    Separate dashboards and features for job seekers,
                    recruiters, and admins for a secure, tailored experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-envelope-check display-4 text-danger mb-3"></i>
                  <h5 className="fw-bold">Shortlist & Notify</h5>
                  <p>
                    Recruiters can shortlist applicants and send custom messages
                    via email, all from the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5 bg-white" ref={howItWorksRef} id="how-it-works">
        <div className="container">
          <h2 className="h2 fw-bold mb-4 text-center text-primary">
            <i className="bi bi-lightbulb me-2"></i>How It Works
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <ol className="list-group list-group-numbered border-0">
                <li className="list-group-item py-3 border-0 d-flex align-items-center bg-transparent">
                  <i className="bi bi-person-plus text-primary fs-4 me-3"></i>
                  <span>Register as a job seeker or recruiter</span>
                </li>
                <li className="list-group-item py-3 border-0 d-flex align-items-center bg-transparent">
                  <i className="bi bi-file-earmark-arrow-up text-success fs-4 me-3"></i>
                  <span>Upload your resume (PDF/DOCX)</span>
                </li>
                <li className="list-group-item py-3 border-0 d-flex align-items-center bg-transparent">
                  <i className="bi bi-robot text-warning fs-4 me-3"></i>
                  <span>AI analyzes your skills and experience</span>
                </li>
                <li className="list-group-item py-3 border-0 d-flex align-items-center bg-transparent">
                  <i className="bi bi-graph-up-arrow text-info fs-4 me-3"></i>
                  <span>Get instant job recommendations</span>
                </li>
                <li className="list-group-item py-3 border-0 d-flex align-items-center bg-transparent">
                  <i className="bi bi-send-check text-success fs-4 me-3"></i>
                  <span>Apply to jobs or manage applications</span>
                </li>
                <li className="list-group-item py-3 border-0 d-flex align-items-center bg-transparent">
                  <i className="bi bi-people text-secondary fs-4 me-3"></i>
                  <span>
                    Recruiters can view, shortlist, and message applicants
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features & Code Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h2 fw-bold mb-4 text-center text-primary">
            <i className="bi bi-stars me-2"></i>About the Code & Unique Features
          </h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-cpu-fill display-5 text-primary mb-3"></i>
                  <h5 className="fw-bold">Full-Stack Architecture</h5>
                  <p>
                    React.js (frontend), Spring Boot (backend), MySQL, and
                    Bootstrap for a robust, scalable, and modern web app.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-diagram-3-fill display-5 text-success mb-3"></i>
                  <h5 className="fw-bold">Role-Based Access</h5>
                  <p>
                    Separate flows and dashboards for job seekers, recruiters,
                    and admins. Secure endpoints and custom UI for each role.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-file-earmark-code-fill display-5 text-warning mb-3"></i>
                  <h5 className="fw-bold">Clean, Modular Code</h5>
                  <p>
                    Organized codebase with context, services, and reusable
                    components. Easy to extend and maintain for learning or
                    demo.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-envelope-paper-fill display-5 text-danger mb-3"></i>
                  <h5 className="fw-bold">Smart Notifications</h5>
                  <p>
                    Email notifications for shortlisted candidates, with
                    recruiter's custom message and job details.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-shield-lock-fill display-5 text-secondary mb-3"></i>
                  <h5 className="fw-bold">Security & Privacy</h5>
                  <p>
                    JWT authentication, CORS, and secure file handling. User
                    data and resumes are protected and never shared.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-lightning-charge-fill display-5 text-info mb-3"></i>
                  <h5 className="fw-bold">AI-Powered Matching</h5>
                  <p>
                    Resume parsing and job recommendations powered by Affinda
                    API and custom algorithms for real skill matching.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h2 fw-bold mb-4 text-center text-primary">
            <i className="bi bi-shield-lock me-2"></i>Practical Security
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4">
                <ul className="list-unstyled fs-5 mb-3">
                  <li className="mb-2">
                    <i className="bi bi-person-badge text-info me-2"></i>{" "}
                    <b>Recruiter Approval:</b> Recruiter accounts must be
                    approved by an admin before they can log in and access
                    recruiter features. This prevents unauthorized access and
                    ensures only verified recruiters can post jobs or view
                    applicants.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-lock text-secondary me-2"></i>{" "}
                    <b>Role-Based Access:</b> All sensitive actions and pages
                    are protected by user roles (Job Seeker, Recruiter, Admin).
                    Only authorized users can access their respective dashboards
                    and features.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-envelope-check text-success me-2"></i>{" "}
                    <b>Email Verification:</b> New users must confirm their
                    email address before activating their account, reducing spam
                    and fake registrations.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-shield-check text-primary me-2"></i>{" "}
                    <b>JWT Authentication:</b> All API requests are secured with
                    JWT tokens, ensuring only authenticated users can perform
                    actions.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-database-lock text-warning me-2"></i>{" "}
                    <b>Data Privacy:</b> User data and resumes are securely
                    stored and never shared with third parties.
                  </li>
                </ul>
                <p className="text-muted mb-0">
                  <b>Note:</b> In a real-world deployment, additional security
                  best practices would be implemented (rate limiting, audit
                  logs, etc.).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-white" ref={aboutRef} id="about">
        <div className="container">
          <h2 className="h2 fw-bold mb-4 text-center text-primary">
            <i className="bi bi-person-circle me-2"></i>About
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4">
                <p className="lead mb-3">
                  <b>HireVision</b> is a <b>demo project</b> built by{" "}
                  <b>Shanmuga Gomathy P</b> for learning and demonstration
                  purposes.
                  <br />
                  It showcases a full-stack job portal using React, Spring Boot,
                  MySQL, Bootstrap, and AI resume parsing.
                </p>
                <ul className="list-unstyled mb-3 fs-5">
                  <li>
                    <i className="bi bi-check-circle text-success me-2"></i>{" "}
                    AI-powered resume parsing and job matching
                  </li>
                  <li>
                    <i className="bi bi-check-circle text-success me-2"></i>{" "}
                    Role-based login and registration (Job Seeker, Recruiter,
                    Admin)
                  </li>
                  <li>
                    <i className="bi bi-check-circle text-success me-2"></i>{" "}
                    Resume upload, application tracking, recruiter shortlisting
                  </li>
                  <li>
                    <i className="bi bi-check-circle text-success me-2"></i>{" "}
                    Email notifications for shortlisted candidates
                  </li>
                  <li>
                    <i className="bi bi-check-circle text-success me-2"></i>{" "}
                    Modern, responsive UI with Bootstrap
                  </li>
                  <li>
                    <i className="bi bi-check-circle text-success me-2"></i>{" "}
                    Clean, modular code for easy learning
                  </li>
                </ul>
                <p className="text-muted">
                  <b>Note:</b> This is a learning/demo project. Not for
                  production use.
                </p>
                <a
                  href={RESUME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark mt-2"
                >
                  <i className="bi bi-file-earmark-person me-2"></i>View My
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
