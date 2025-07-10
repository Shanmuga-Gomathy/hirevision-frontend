// API Configuration and base setup
const API_BASE_URL = 'https://hirevision-backend.onrender.com/api';
const API_V1_BASE_URL = 'https://hirevision-backend.onrender.com/api/v1';

// Get stored token for authenticated requests
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Common headers for API requests
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Generic API request function with error handling
const apiRequest = async (endpoint, options = {}, useV1 = false) => {
  try {
    const url = `${useV1 ? API_V1_BASE_URL : API_BASE_URL}${endpoint}`;
    const config = {
      headers: getHeaders(),
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle text responses (like registration confirmation)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// API service object - Updated to match our backend endpoints
export const apiService = {
  // Registration - POST /api/v1/registration
  register: async (userData) => {
    return apiRequest('/registration', {
      method: 'POST',
      body: JSON.stringify(userData),
    }, true);
  },

  // Email confirmation - GET /api/v1/registration/confirm?token={token}
  confirmEmail: async (token) => {
    return apiRequest(`/registration/confirm?token=${token}`, {
      method: 'GET',
    }, true);
  },

  // Login - POST /api/v1/auth/login
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, true);
  },

  // Refresh token - POST /api/v1/auth/refresh-token
  refreshToken: async (refreshToken) => {
    return apiRequest('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }, true);
  },

  // Check if user is authenticated (optional endpoint)
  checkAuth: async () => {
    return apiRequest('/auth/check', {
      method: 'GET',
    }, true);
  },

  // Public job listing
  getAllJobs: async () => {
    return apiRequest('/jobs/all', { method: 'GET' });
  },

  // Recruiter job management
  getMyJobs: async (recruiterId) => {
    return apiRequest(`/jobs/my?recruiterId=${recruiterId}`, { method: 'GET' });
  },
  postJob: async (jobData) => {
    return apiRequest('/jobs/create', { method: 'POST', body: JSON.stringify(jobData) });
  },
  editJob: async (id, jobData) => {
    return apiRequest(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(jobData) });
  },
  deleteJob: async (id) => {
    return apiRequest(`/jobs/${id}`, { method: 'DELETE' });
  },

  // Recruiter analytics
  getRecruiterStats: async (recruiterId) => {
    return apiRequest(`/recruiter/analytics?recruiterId=${recruiterId}`, { method: 'GET' });
  },

  // Application management
  getApplicationsByJob: async (jobId) => {
    return apiRequest(`/applications/job/${jobId}`, { method: 'GET' });
  },
  updateApplicationStatus: async (applicationId, status) => {
    return apiRequest(`/applications/${applicationId}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
  },
  applyToJob: async (jobId, userId) => {
    return apiRequest('/applications/apply', { method: 'POST', body: JSON.stringify({ jobId, userId }) });
  },
  getUserApplications: async (userId) => {
    return apiRequest(`/applications/user/${userId}`, { method: 'GET' });
  },

  // Resume management
  uploadResume: async (file, userId) => {
    const formData = new FormData();
    formData.append('resume', file);
    const res = await fetch(`${API_BASE_URL}/resume/upload?userId=${userId}`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Upload failed');
    return await res.json();
  },
  getMyResume: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/resume/me?userId=${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('No resume found');
    return await res.json();
  },
  deleteMyResume: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/resume/me?userId=${userId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Delete failed');
    return await res.text();
  },
};

export default apiService; 