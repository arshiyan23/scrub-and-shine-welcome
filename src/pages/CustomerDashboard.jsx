import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { token, user, loading } = useAuth();
  const [coupon, setCoupon] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // ✅ Protect route if not logged in
  useEffect(() => {
    if (!token && !loading) {
      navigate('/customer-login');
    }
  }, [token, loading, navigate]);

  // ✅ Update coupon when user data is available
  useEffect(() => {
    if (user?.coupon_code || user?.couponCode) {
      setCoupon(user.coupon_code || user.couponCode);
    }
  }, [user]);

  const generateFreeCoupon = async () => {
    setIsGenerating(true);
    try {
      const res = await api.post('/api/coupon/generate', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupon(res.data.coupon);
    } catch (err) {
      console.error('Error generating coupon:', err);
      alert('Failed to generate coupon');
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="dashboard-loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="customer-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user.name}! 👋</h1>
          <p className="dashboard-subtitle">
            Manage your account, track your washes, and redeem exclusive offers
          </p>
        </div>

        <div className="dashboard-grid">
          {/* Coupon Card */}
          <div className="dashboard-card coupon-card">
            <div className="card-header">
              <h2 className="card-title">🎁 Your Free Wash Coupon</h2>
            </div>
            <div className="card-content">
              {coupon ? (
                <div className="coupon-success">
                  <div className="success-icon">✅</div>
                  <h3>Coupon Generated Successfully!</h3>
                  <p>Your coupon code has been sent to <strong>{user.email}</strong></p>
                  <div className="coupon-details">
                    <div className="coupon-code">
                      <span className="code-label">Coupon Code:</span>
                      <span className="code-value">{coupon}</span>
                    </div>
                    <p className="coupon-note">
                      🚗 You’ll be able to avail this coupon once our app services go live.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="coupon-generate">
                  <div className="coupon-info">
                    <div className="coupon-icon">🎫</div>
                    <h3>Claim Your FREE Basic Wash!</h3>
                    <p>
                      As a new member, you're entitled to one complimentary basic wash service.
                      Click below to generate your coupon and we'll send it to your email.
                    </p>
                  </div>
                  <button
                    className="btn btn-success coupon-btn"
                    onClick={generateFreeCoupon}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating Coupon...' : 'Generate Free Coupon'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Info */}
          <div className="dashboard-card account-card">
            <div className="card-header">
              <h2 className="card-title">👤 Account Information</h2>
            </div>
            <div className="card-content">
              <div className="account-info">
                <div className="info-item"><span>Name:</span> <span>{user.name}</span></div>
                <div className="info-item"><span>Phone:</span> <span>{user.phone}</span></div>
                <div className="info-item"><span>Email:</span> <span>{user.email}</span></div>
                <div className="info-item"><span>Member Since:</span> <span>{user.createdAt?.split('T')[0]}</span></div>
              </div>
              <button className="btn btn-secondary edit-btn">Edit Profile</button>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/services" className="btn btn-primary action-btn">Book a Wash</Link>
          <Link to="/plans" className="btn btn-secondary action-btn">View Plans</Link>
          <Link to="/contact" className="btn btn-secondary action-btn">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
