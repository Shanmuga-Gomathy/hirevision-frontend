import React, { useState } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PostJob = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const recruiterId = user?.id;
      if (!recruiterId) throw new Error('Recruiter ID not found. Please log in.');
      await apiService.postJob({
        title,
        description,
        requiredSkills: requiredSkills.split(',').map(s => s.trim()),
        recruiterId,
        yearsOfExperience: parseInt(yearsOfExperience, 10)
      });
      setSuccess('Job posted successfully!');
      setTitle('');
      setDescription('');
      setRequiredSkills('');
      setYearsOfExperience('');
    } catch (err) {
      setError('Failed to post job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0"><i className="bi bi-plus-circle me-2"></i>Post New Job</h3>
            </div>
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Job Title</label>
                  <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} rows="4" required></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Required Skills <span className="text-muted">(comma separated)</span></label>
                  <input type="text" className="form-control" value={requiredSkills} onChange={e => setRequiredSkills(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Years of Experience Required</label>
                  <input type="number" className="form-control" value={yearsOfExperience} onChange={e => setYearsOfExperience(e.target.value)} min="0" required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Job'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob; 