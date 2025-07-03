import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EmailConfirmation from './pages/EmailConfirmation'
import PostJob from './pages/PostJob'
import Jobs from './pages/Jobs'
import ManageJobs from './pages/ManageJobs'
import UploadResume from './pages/UploadResume'
import Recommendations from './pages/Recommendations'
import AppliedJobs from './pages/AppliedJobs'
import Candidates from './pages/Candidates'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/confirm" element={<EmailConfirmation />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/upload-resume" element={<UploadResume />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/candidates" element={<Candidates />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 