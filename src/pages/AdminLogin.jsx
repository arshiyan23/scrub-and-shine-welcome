
import { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
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

    // Simulate authentication
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        setIsLoading(false);
        console.log('Admin login successful');
        window.location.href = '/admin-dashboard';
      } else {
        setIsLoading(false);
        setError('Invalid username or password');
      }
    }, 2000);
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
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter admin username"
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

          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
