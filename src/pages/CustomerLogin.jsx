import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerLogin.css';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CustomerLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    name: '',
    email: '',
    otp: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      console.log('OTP sent to:', formData.phone); // mock OTP
    }, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        otp: formData.otp
      });
      login(res.data.token);
      navigate('/customer-dashboard');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/api/auth/login', {
        phone: formData.phone,
        password: formData.password
      });
      login(res.data.token);
      navigate('/customer-dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setOtpSent(false);
    setFormData({
      phone: '',
      password: '',
      name: '',
      email: '',
      otp: ''
    });
  };

  return (
    <div className="customer-login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1 className="login-title">{isSignup ? '🎉 Join GoWash' : '👋 Welcome Back'}</h1>
            <p className="login-subtitle">
              {isSignup
                ? 'Create your account and get your FREE wash coupon!'
                : 'Sign in to access your account and exclusive offers'}
            </p>
          </div>

          <div className="login-form-container">
            {isSignup && !otpSent && (
              <form onSubmit={handleSendOTP} className="login-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
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
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                  {isLoading ? 'Sending OTP...' : 'Send OTP 📱'}
                </button>
              </form>
            )}

            {isSignup && otpSent && (
              <form onSubmit={handleSignup} className="login-form">
                <div className="otp-message">
                  <h3>Enter the 6-digit OTP</h3>
                  <p>We sent it to your number: {formData.phone}</p>
                </div>
                <div className="form-group">
                  <label className="form-label">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    maxLength="6"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="form-input otp-input"
                    placeholder="000000"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success login-btn" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify & Create Account 🎁'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary resend-btn"
                  onClick={handleSendOTP}
                >
                  Resend OTP
                </button>
              </form>
            )}

            {!isSignup && (
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
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
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            )}

            <div className="login-divider"><span>or</span></div>

            <button
              type="button"
              className="btn btn-secondary toggle-btn"
              onClick={toggleMode}
            >
              {isSignup
                ? 'Already have an account? Sign In'
                : 'New customer? Sign Up & Get FREE Wash! 🎁'}
            </button>
          </div>

          <div className="login-benefits">
            <h3 className="benefits-title">Why Join GoWash?</h3>
            <div className="benefits-list">
              <div className="benefit-item">🎁 Free wash on signup</div>
              <div className="benefit-item">💰 Exclusive discounts</div>
              <div className="benefit-item">📅 Easy appointment booking</div>
              <div className="benefit-item">🏆 Loyalty rewards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
