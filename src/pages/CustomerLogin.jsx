
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    name: '',
    email: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      console.log('OTP sent to:', formData.phone);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      console.log('Form submitted:', formData);
      // Redirect to customer dashboard
      window.location.href = '/customer-dashboard';
    }, 2000);
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
            <h1 className="login-title">
              {isSignup ? '🎉 Join AquaWash' : '👋 Welcome Back'}
            </h1>
            <p className="login-subtitle">
              {isSignup 
                ? 'Create your account and get your FREE wash coupon!' 
                : 'Sign in to access your account and exclusive offers'
              }
            </p>
          </div>

          <div className="login-form-container">
            {isSignup && !otpSent ? (
              <form onSubmit={handleSendOTP} className="login-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your phone number"
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
                    placeholder="Create a password"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP 📱'}
                </button>
              </form>
            ) : isSignup && otpSent ? (
              <form onSubmit={handleSubmit} className="login-form">
                <div className="otp-message">
                  <div className="otp-icon">📱</div>
                  <h3>OTP Sent!</h3>
                  <p>Please enter the 6-digit code sent to {formData.phone}</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="form-input otp-input"
                    placeholder="000000"
                    maxLength="6"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-success login-btn"
                  disabled={isLoading}
                >
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
            ) : (
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your phone number"
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
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </form>
            )}

            <div className="login-divider">
              <span>or</span>
            </div>

            <button 
              type="button" 
              className="btn btn-secondary toggle-btn"
              onClick={toggleMode}
            >
              {isSignup ? 'Already have an account? Sign In' : 'New customer? Sign Up & Get FREE Wash! 🎁'}
            </button>
          </div>

          <div className="login-benefits">
            <h3 className="benefits-title">Why Join AquaWash?</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">🎁</span>
                <span>Free wash coupon on signup</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <span>Exclusive discounts & offers</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📅</span>
                <span>Easy appointment booking</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🏆</span>
                <span>Loyalty reward points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
