import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './AdminLogin.css';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth(); // ✅ use context method to set token + state

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/api/admin/login', formData);
      const token = res.data?.token;

      if (!token) {
        throw new Error('No token received from backend');
      }

      loginAdmin(token); // ✅ update context
      navigate('/admin-dashboard'); // ✅ redirect after successful login
    } catch (err) {
      console.error('Admin login failed ❌:', err.response?.data || err.message);
      const backendMessage = err?.response?.data?.error || err?.response?.data?.message;
      setError(backendMessage || 'Invalid login credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-content">
          <div className="admin-login-header">
            <div className="admin-icon">🔐</div>
            <h1 className="admin-title">Admin Access</h1>
            <p className="admin-subtitle">
              Secure login for authorized personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter admin email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter admin password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary admin-login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="admin-info">
            <div className="info-item">
              <span className="info-icon">🛡️</span>
              <span>Secure encrypted connection</span>
            </div>
            <div className="info-item">
              <span className="info-icon">👁️</span>
              <span>All access logged and monitored</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏰</span>
              <span>Session timeout: 30 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
