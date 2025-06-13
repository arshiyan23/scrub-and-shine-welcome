
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [couponGenerated, setCouponGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const customerData = {
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    joinDate: "March 15, 2024",
    totalWashes: 0,
    loyaltyPoints: 0
  };

  const generateFreeCoupon = () => {
    setIsGenerating(true);
    
    // Simulate coupon generation and email sending
    setTimeout(() => {
      setCouponGenerated(true);
      setIsGenerating(false);
      
      // Simulate email sending
      console.log('Free wash coupon sent to:', customerData.email);
    }, 3000);
  };

  const upcomingOffers = [
    {
      id: 1,
      title: "Weekend Special",
      description: "20% off on Premium Wash",
      validUntil: "2024-06-30",
      code: "WEEKEND20"
    },
    {
      id: 2,
      title: "Loyalty Bonus",
      description: "Buy 3 washes, get 1 free",
      validUntil: "2024-07-15",
      code: "LOYAL3FOR1"
    }
  ];

  return (
    <div className="customer-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {customerData.name}! 👋</h1>
          <p className="dashboard-subtitle">
            Manage your account, track your washes, and redeem exclusive offers
          </p>
        </div>

        <div className="dashboard-grid">
          {/* Free Coupon Section */}
          <div className="dashboard-card coupon-card">
            <div className="card-header">
              <h2 className="card-title">🎁 Your Free Wash Coupon</h2>
            </div>
            <div className="card-content">
              {!couponGenerated ? (
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
                    Your free wash coupon has been sent to <strong>{customerData.email}</strong>
                  </p>
                  <div className="coupon-details">
                    <div className="coupon-code">
                      <span className="code-label">Coupon Code:</span>
                      <span className="code-value">FREEWASH2024</span>
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
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{customerData.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{customerData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{customerData.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Member Since:</span>
                  <span className="info-value">{customerData.joinDate}</span>
                </div>
              </div>
              <button className="btn btn-secondary edit-btn">
                Edit Profile
              </button>
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
                  <div className="stat-number">{customerData.totalWashes}</div>
                  <div className="stat-label">Total Washes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-number">{customerData.loyaltyPoints}</div>
                  <div className="stat-label">Loyalty Points</div>
                </div>
              </div>
              <div className="next-reward">
                <p>Get your first wash to start earning loyalty points!</p>
              </div>
            </div>
          </div>

          {/* Current Offers */}
          <div className="dashboard-card offers-card">
            <div className="card-header">
              <h2 className="card-title">🎉 Current Offers</h2>
            </div>
            <div className="card-content">
              <div className="offers-list">
                {upcomingOffers.map((offer) => (
                  <div key={offer.id} className="offer-item">
                    <div className="offer-info">
                      <h4 className="offer-title">{offer.title}</h4>
                      <p className="offer-description">{offer.description}</p>
                      <div className="offer-details">
                        <span className="offer-code">Code: {offer.code}</span>
                        <span className="offer-validity">Valid until: {offer.validUntil}</span>
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
          <Link to="/services" className="btn btn-primary action-btn">
            Book a Wash
          </Link>
          <Link to="/plans" className="btn btn-secondary action-btn">
            View Plans
          </Link>
          <Link to="/contact" className="btn btn-secondary action-btn">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
