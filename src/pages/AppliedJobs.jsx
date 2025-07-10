import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AppliedJobs = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    fetchApplications();
    // eslint-disable-next-line
  }, [user?.id]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://hirevision-backend.onrender.com/api/jobs/applications/byUser?userId=${user.id}`);
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header bg-info text-white">
              <h3 className="mb-0"><i className="bi bi-clipboard-check me-2"></i>Applied Jobs</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {loading ? (
                <div>Loading...</div>
              ) : applications.length === 0 ? (
                <div className="text-center text-muted">You have not applied to any jobs yet.</div>
              ) : (
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td>{app.jobTitle || app.jobId}</td>
                        <td>{app.jobDescription || ''}</td>
                        <td>
                          <span className={`badge ${app.status === 'APPLIED' ? 'bg-secondary' : app.status === 'SHORTLISTED' ? 'bg-success' : 'bg-info'}`}>{app.status}</span>
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

export default AppliedJobs; 