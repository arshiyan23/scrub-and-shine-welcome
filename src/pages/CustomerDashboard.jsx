import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ using context
import api from '../api/axios';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // ✅ use context for token
  const [user, setUser] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/customer-login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setCoupon(res.data.user.couponCode || null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        navigate('/customer-login');
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const generateFreeCoupon = async () => {
    setIsGenerating(true);
    try {
      const res = await api.post('/api/coupon/generate', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupon(res.data.couponCode);
    } catch (err) {
      console.error('Error generating coupon:', err);
      alert('Failed to generate coupon');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!user) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="customer-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user.name}! 👋</h1>
          <p className="dashboard-subtitle">
            Manage your account, track your washes, and redeem exclusive offers
          </p>
        </div>

        {/* Coupon card */}
        <div className="dashboard-grid">
          <div className="dashboard-card coupon-card">
            <div className="card-header">
              <h2 className="card-title">🎁 Your Free Wash Coupon</h2>
            </div>
            <div className="card-content">
              {!coupon ? (
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
              ) : (
                <div className="coupon-success">
                  <div className="success-icon">✅</div>
                  <h3>Coupon Sent Successfully!</h3>
                  <p>
                    Your free wash coupon has been sent to <strong>{user.email}</strong>
                  </p>
                  <div className="coupon-details">
                    <div className="coupon-code">
                      <span className="code-label">Coupon Code:</span>
                      <span className="code-value">{coupon}</span>
                    </div>
                    <div className="coupon-validity">
                      <span className="validity-label">Valid Until:</span>
                      <span className="validity-value">December 31, 2024</span>
                    </div>
                  </div>
                  <Link to="/contact" className="btn btn-primary redeem-btn">
                    Visit Us to Redeem
                  </Link>
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

          {/* Stats */}
          <div className="dashboard-card stats-card">
            <div className="card-header">
              <h2 className="card-title">📊 Your Stats</h2>
            </div>
            <div className="card-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">🚗</div>
                  <div className="stat-number">{user.totalWashes || 0}</div>
                  <div className="stat-label">Total Washes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-number">{user.loyaltyPoints || 0}</div>
                  <div className="stat-label">Loyalty Points</div>
                </div>
              </div>
              <div className="next-reward">
                <p>Get your first wash to start earning loyalty points!</p>
              </div>
            </div>
          </div>

          {/* Offers */}
          <div className="dashboard-card offers-card">
            <div className="card-header">
              <h2 className="card-title">🎉 Current Offers</h2>
            </div>
            <div className="card-content">
              <div className="offers-list">
                {[
                  { id: 1, title: "Weekend Special", description: "20% off on Premium Wash", validUntil: "2024-06-30", code: "WEEKEND20" },
                  { id: 2, title: "Loyalty Bonus", description: "Buy 3 washes, get 1 free", validUntil: "2024-07-15", code: "LOYAL3FOR1" }
                ].map((offer) => (
                  <div key={offer.id} className="offer-item">
                    <div className="offer-info">
                      <h4>{offer.title}</h4>
                      <p>{offer.description}</p>
                      <div className="offer-details">
                        <span>Code: {offer.code}</span>
                        <span>Valid until: {offer.validUntil}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/offers" className="btn btn-primary view-all-btn">
                View All Offers
              </Link>
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
