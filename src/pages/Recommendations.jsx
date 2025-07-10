import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Recommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyStatus, setApplyStatus] = useState({});
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    fetchRecommendations();
    fetchUserApplications();
    // eslint-disable-next-line
  }, [user?.id]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://hirevision-backend.onrender.com/api/jobs/recommendations?userId=${user.id}`);
      if (!res.ok) throw new Error('Failed to fetch recommendations');
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      setError('Failed to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const res = await fetch(`https://hirevision-backend.onrender.com/api/jobs/applications/byUser?userId=${user.id}`);
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setUserApplications(data);
    } catch (err) {
      setUserApplications([]);
    }
  };

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
      if (res.status === 409) {
        setApplyStatus((prev) => ({ ...prev, [jobId]: 'Already applied.' }));
        return;
      }
      if (!res.ok) throw new Error('Failed to apply');
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'Applied successfully!' }));
      fetchUserApplications(); // Refresh applications
    } catch (err) {
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'Failed to apply.' }));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header bg-info text-white">
              <h3 className="mb-0"><i className="bi bi-lightbulb me-2"></i>Job Recommendations</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {loading ? (
                <div>Loading...</div>
              ) : recommendations.length === 0 ? (
                <div className="text-center text-muted">No recommendations found.</div>
              ) : (
                <div className="row g-4">
                  {recommendations.map((rec, idx) => (
                    <div className="col-md-6" key={rec.job.id}>
                      <div className="card h-100 border-primary">
                        <div className="card-body">
                          <h5 className="card-title">{rec.job.title}</h5>
                          <p className="card-text">{rec.job.description}</p>
                          <div className="mb-2">
                            <b>Required Skills:</b> {rec.job.requiredSkills && rec.job.requiredSkills.length > 0 ? rec.job.requiredSkills.join(', ') : 'None'}
                          </div>
                          <div className="mb-2">
                            <b>Years of Experience:</b> {rec.job.yearsOfExperience === 0 ? 'Open to Freshers' : rec.job.yearsOfExperience + ' years'}
                          </div>
                          <div className="mb-2">
                            <b>Match:</b> <span className="badge bg-success fs-6">{rec.matchPercentage}%</span>
                            <div className="progress mt-1" style={{ height: 8 }}>
                              <div className="progress-bar bg-success" role="progressbar" style={{ width: `${rec.matchPercentage}%` }} aria-valuenow={rec.matchPercentage} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                          </div>
                          <div className="mb-2">
                            <b>Matched Skills:</b> {rec.matchedSkills.length > 0 ? (
                              <span className="text-success">{rec.matchedSkills.join(', ')}</span>
                            ) : <span className="text-muted">None</span>}
                          </div>
                          <div className="mb-2">
                            <b>Missing Skills:</b> {rec.missingSkills.length > 0 ? (
                              <span className="text-danger">{rec.missingSkills.join(', ')}</span>
                            ) : <span className="text-success">None</span>}
                          </div>
                          <div className="mb-2">
                            <b>Experience Match:</b> {rec.experienceMatch ? <span className="text-success">Yes</span> : <span className="text-danger">No</span>}
                          </div>
                          <button className="btn btn-primary btn-sm mt-2" onClick={() => handleApply(rec.job.id)}
                            disabled={userApplications.some(app => app.jobId === rec.job.id)}>
                            {userApplications.some(app => app.jobId === rec.job.id) ? 'Applied' : 'Apply'}
                          </button>
                          {applyStatus[rec.job.id] && (
                            <div className="mt-1 small text-info">{applyStatus[rec.job.id]}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations; 