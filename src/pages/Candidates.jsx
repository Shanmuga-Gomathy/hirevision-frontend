import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap';

const Candidates = () => {
  const { user, isRecruiter } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shortlistMessage, setShortlistMessage] = useState('');
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [shortlistStatus, setShortlistStatus] = useState({});

  useEffect(() => {
    if (!isRecruiter() || !user?.id) return;
    fetchApplications();
    // eslint-disable-next-line
  }, [user?.id]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/jobs/applications/byRecruiter?recruiterId=${user.id}`);
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleShortlistClick = (appId) => {
    setSelectedAppId(appId);
    setShortlistMessage('');
    setShowModal(true);
  };

  const handleShortlistSubmit = async () => {
    if (!selectedAppId) return;
    try {
      const res = await fetch('http://localhost:8080/api/jobs/applications/shortlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: selectedAppId, message: shortlistMessage })
      });
      if (!res.ok) throw new Error('Failed to shortlist');
      setShortlistStatus((prev) => ({ ...prev, [selectedAppId]: 'Shortlisted and emailed!' }));
      setApplications(applications => applications.map(app => app.id === selectedAppId ? { ...app, status: 'SHORTLISTED' } : app));
      setShowModal(false);
    } catch (err) {
      setShortlistStatus((prev) => ({ ...prev, [selectedAppId]: 'Failed to shortlist.' }));
    }
  };

  const handleViewResume = (userId) => {
    if (!userId) return;
    window.open(`http://localhost:8080/api/resume/file?userId=${userId}`, '_blank');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-header bg-info text-white">
              <h3 className="mb-0"><i className="bi bi-people me-2"></i>Job Applications</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {loading ? (
                <div>Loading...</div>
              ) : applications.length === 0 ? (
                <div className="text-center text-muted">No applications found for your jobs.</div>
              ) : (
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Applicant</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td>{app.jobTitle || app.jobId}</td>
                        <td>{app.userFirstName || ''} {app.userLastName || ''}</td>
                        <td>{app.userEmail}</td>
                        <td>
                          <span className={`badge ${app.status === 'APPLIED' ? 'bg-secondary' : app.status === 'SHORTLISTED' ? 'bg-success' : 'bg-info'}`}>{app.status}</span>
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm me-2" onClick={() => handleViewResume(app.userId)} disabled={!app.userId}>
                            View Resume
                          </button>
                          <button className="btn btn-success btn-sm me-2" disabled={app.status === 'SHORTLISTED'} onClick={() => handleShortlistClick(app.id)}>
                            {app.status === 'SHORTLISTED' ? 'Shortlisted' : 'Shortlist'}
                          </button>
                          {shortlistStatus[app.id] && (
                            <div className="mt-1 small text-info">{shortlistStatus[app.id]}</div>
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
      {/* Shortlist Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shortlist Applicant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="shortlistMessage">
              <Form.Label>Message to Applicant</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={shortlistMessage}
                onChange={e => setShortlistMessage(e.target.value)}
                placeholder="Write a message to the applicant..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleShortlistSubmit} disabled={!shortlistMessage.trim()}>
            Send & Shortlist
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Candidates; 