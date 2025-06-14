
import { Link } from 'react-router-dom';
import { Car, Sparkles, Award, Zap, DollarSign, Gift } from 'lucide-react';
import './Homepage.css';
import Plans from './Plans';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title fade-in">
                Premium Car Wash
                <span className="highlight"> Experience</span>
              </h1>
              <p className="hero-subtitle slide-in">
                Transform your vehicle with our professional car wash services. 
                From basic wash to premium detailing, we make your car shine like new.
              </p>
              <div className="hero-actions">
                <Link to="/customer-login" className="btn btn-primary hero-btn">
                  Get Free Wash Coupon
                </Link>
                <Link to="/services" className="btn btn-secondary hero-btn">
                  View Services
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Service Available</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-container">
                <div className="car-icon">
                  <Car size={120} />
                  <Sparkles size={40} className="sparkle-icon" />
                </div>
                <div className="floating-elements">
                  <div className="bubble bubble-1">💧</div>
                  <div className="bubble bubble-2">🧽</div>
                  <div className="bubble bubble-3">✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose GoWash?</h2>
          <div className="grid grid-3">
            <div className="feature-card card">
              <div className="feature-icon">
                <Award size={48} />
              </div>
              <h3 className="feature-title">Premium Quality</h3>
              <p className="feature-description">
                Professional-grade equipment and eco-friendly products for the best results.
              </p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">
                <Zap size={48} />
              </div>
              <h3 className="feature-title">Quick Service</h3>
              <p className="feature-description">
                Fast and efficient service that respects your valuable time.
              </p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">
                <DollarSign size={48} />
              </div>
              <h3 className="feature-title">Best Prices</h3>
              <p className="feature-description">
                Competitive pricing with amazing offers and loyalty rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <Plans />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Give Your Car the Care It Deserves?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied customers and get your first wash FREE!
            </p>
            <Link to="/customer-login" className="btn btn-success cta-btn">
              <Gift size={20} style={{ marginRight: '8px' }} />
              Claim Your Free Wash Now!
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
