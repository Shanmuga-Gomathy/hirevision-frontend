import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const [applyStatus, setApplyStatus] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        // If /api/jobs/all does not exist yet, you can mock this or add it to the backend
        const res = await fetch('https://hirevision-backend.onrender.com/api/jobs/all');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title && job.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = async (jobId) => {
    if (!user?.id) {
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'Please login to apply.' }));
      return;
    }
    try {
      const res = await fetch('https://hirevision-backend.onrender.com/api/jobs/applications/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, jobId })
      });
      if (!res.ok) throw new Error('Failed to apply');
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'Applied successfully!' }));
    } catch (err) {
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'Failed to apply.' }));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0"><i className="bi bi-briefcase me-2"></i>Available Jobs</h3>
              <input
                type="text"
                className="form-control w-auto"
                placeholder="Search job roles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ minWidth: 200 }}
              />
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {loading ? (
                <div>Loading...</div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center text-muted">No jobs found.</div>
              ) : (
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Required Skills</th>
                      <th>Years of Experience</th>
                      <th>Recruiter</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map(job => (
                      <tr key={job.id}>
                        <td>{job.title}</td>
                        <td>{job.description}</td>
                        <td>{Array.isArray(job.requiredSkills) ? job.requiredSkills.join(', ') : job.requiredSkills}</td>
                        <td>{job.yearsOfExperience === 0 ? 'Open to Freshers' : job.yearsOfExperience + ' years'}</td>
                        <td>{job.recruiterId}</td>
                        <td>
                          <button className="btn btn-primary btn-sm" onClick={() => handleApply(job.id)}>
                            Apply
                          </button>
                          {applyStatus[job.id] && (
                            <div className="mt-1 small text-info">{applyStatus[job.id]}</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs; 