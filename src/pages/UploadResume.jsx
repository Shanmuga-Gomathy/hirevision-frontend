import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const UploadResume = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [resume, setResume] = useState(null);
  const [loadingResume, setLoadingResume] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Fetch user's resume on mount
  useEffect(() => {
    if (!user?.id) return;
    fetchResume();
    // eslint-disable-next-line
  }, [user?.id]);

  const fetchResume = async () => {
    setLoadingResume(true);
    setResume(null);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/resume/me?userId=${user.id}`);
      if (!res.ok) throw new Error('No resume found');
      const data = await res.json();
      setResume(data);
    } catch (err) {
      setResume(null);
    } finally {
      setLoadingResume(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(null);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      setError('You must be logged in to upload a resume.');
      return;
    }
    setSuccess(null);
    setError(null);
    if (!file) {
      setError('Please select a file.');
      return;
    }
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF or DOCX files are allowed.');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      // Send userId as query param
      const res = await fetch(`http://localhost:8080/api/resume/upload?userId=${user.id}`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      setSuccess('Resume uploaded successfully!');
      setFile(null);
      fetchResume();
    } catch (err) {
      setError('Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your resume?')) return;
    setDeleting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`http://localhost:8080/api/resume/me?userId=${user.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Delete failed');
      setSuccess('Resume deleted.');
      setResume(null);
    } catch (err) {
      setError('Failed to delete resume.');
    } finally {
      setDeleting(false);
    }
  };

  // Helper to show a snippet of parsed data
  const getParsedSnippet = () => {
    if (!resume?.parsedData) return null;
    try {
      const parsed = typeof resume.parsedData === 'string' ? JSON.parse(resume.parsedData) : resume.parsedData;
      // Show name, email, and first 2 skills if available
      const name = parsed.data?.name?.raw || '';
      const email = parsed.data?.emails?.[0] || '';
      const skills = parsed.data?.skills?.slice(0, 2).map(s => s.name).join(', ');
      return (
        <>
          {name && <div><b>Name:</b> {name}</div>}
          {email && <div><b>Email:</b> {email}</div>}
          {skills && <div><b>Skills:</b> {skills}</div>}
        </>
      );
    } catch {
      return <div>Could not parse resume data.</div>;
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0"><i className="bi bi-upload me-2"></i>Resume</h3>
            </div>
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              {loadingResume ? (
                <div>Loading...</div>
              ) : resume ? (
                <>
                  <div className="mb-3">
                    <b>File Name:</b> {resume.originalFileName}<br />
                    <b>Uploaded:</b> {resume.createdAt ? new Date(resume.createdAt).toLocaleString() : ''}
                  </div>
                  <div className="mb-3">
                    <b>Resume Preview:</b>
                    <div className="border rounded p-2 bg-light mt-1 small">
                      {getParsedSnippet()}
                    </div>
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <a
                      className="btn btn-outline-primary"
                      href={`http://localhost:8080/api/resume/file?userId=${user.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-file-earmark-pdf"></i> View Resume PDF
                    </a>
                    <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete Resume'}</button>
                    <label className="btn btn-outline-primary mb-0">
                      Replace Resume
                      <input type="file" className="d-none" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} disabled={uploading} />
                    </label>
                    {file && <button className="btn btn-success" onClick={handleUpload} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload New'}</button>}
                  </div>
                </>
              ) : (
                <form onSubmit={handleUpload}>
                  <div className="mb-3">
                    <label className="form-label">Select Resume (PDF or DOCX)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Resume'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume; 