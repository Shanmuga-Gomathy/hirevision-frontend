import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ManageJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editJobId, setEditJobId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', requiredSkills: '', yearsOfExperience: '' });

  const recruiterId = user?.id; // Get recruiterId from user context

  useEffect(() => {
    console.log('Logged-in user:', user);
    console.log('Recruiter ID used for fetching jobs:', recruiterId);
  }, [user, recruiterId]);

  const fetchJobs = async () => {
    if (!recruiterId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getMyJobs(recruiterId);
      setJobs(data);
    } catch (err) {
      setError('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [recruiterId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await apiService.deleteJob(id);
      setSuccess('Job deleted successfully.');
      fetchJobs();
    } catch (err) {
      setError('Failed to delete job.');
    }
  };

  const handleEdit = (job) => {
    setEditJobId(job.id);
    setEditForm({
      title: job.title,
      description: job.description,
      requiredSkills: job.requiredSkills.join(', '),
      yearsOfExperience: job.yearsOfExperience || ''
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.editJob(editJobId, {
        ...editForm,
        requiredSkills: editForm.requiredSkills.split(',').map(s => s.trim()),
        yearsOfExperience: parseInt(editForm.yearsOfExperience, 10)
      });
      setSuccess('Job updated successfully.');
      setEditJobId(null);
      fetchJobs();
    } catch (err) {
      setError('Failed to update job.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0"><i className="bi bi-briefcase me-2"></i>Manage Jobs</h3>
            </div>
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              {loading ? (
                <div>Loading...</div>
              ) : jobs.length === 0 ? (
                <div className="text-center text-muted">No jobs found.</div>
              ) : (
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Required Skills</th>
                      <th>Years of Experience</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(job => (
                      <tr key={job.id}>
                        <td>{editJobId === job.id ? (
                          <input type="text" name="title" className="form-control" value={editForm.title} onChange={handleEditChange} />
                        ) : job.title}</td>
                        <td>{editJobId === job.id ? (
                          <textarea name="description" className="form-control" value={editForm.description} onChange={handleEditChange} />
                        ) : job.description}</td>
                        <td>{editJobId === job.id ? (
                          <input type="text" name="requiredSkills" className="form-control" value={editForm.requiredSkills} onChange={handleEditChange} />
                        ) : job.requiredSkills.join(', ')}</td>
                        <td>{editJobId === job.id ? (
                          <input type="number" name="yearsOfExperience" className="form-control" value={editForm.yearsOfExperience} onChange={handleEditChange} min="0" />
                        ) : (job.yearsOfExperience === 0 ? 'Open to Freshers' : job.yearsOfExperience + ' years')}</td>
                        <td>
                          {editJobId === job.id ? (
                            <>
                              <button className="btn btn-sm btn-success me-2" onClick={handleEditSubmit}><i className="bi bi-check-circle"></i></button>
                              <button className="btn btn-sm btn-secondary" onClick={() => setEditJobId(null)}><i className="bi bi-x-circle"></i></button>
                            </>
                          ) : (
                            <>
                              <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(job)}><i className="bi bi-pencil"></i></button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(job.id)}><i className="bi bi-trash"></i></button>
                            </>
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

export default ManageJobs; 