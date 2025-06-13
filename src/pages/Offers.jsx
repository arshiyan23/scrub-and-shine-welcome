
import { PartyPopper, Copy, Calendar, FileText } from 'lucide-react';
import './Offers.css';

const Offers = () => {
  const activeOffers = [
    {
      id: 1,
      title: "New Customer Special",
      description: "Get your first wash absolutely FREE!",
      discount: "100% OFF",
      code: "NEWBIE2024",
      validUntil: "2024-12-31",
      terms: "Valid for new customers only. One-time use.",
      featured: true
    },
    {
      id: 2,
      title: "Weekend Warrior",
      description: "20% off on all Premium and Deluxe services during weekends",
      discount: "20% OFF",
      code: "WEEKEND20",
      validUntil: "2024-06-30",
      terms: "Valid on Saturday and Sunday only."
    },
    {
      id: 3,
      title: "Loyalty Triple",
      description: "Buy 3 Basic washes, get the 4th one completely free",
      discount: "Buy 3 Get 1 FREE",
      code: "LOYAL3FOR1",
      validUntil: "2024-07-15",
      terms: "Must be used within 90 days of first wash."
    },
    {
      id: 4,
      title: "Premium Package Deal",
      description: "Upgrade to Premium wash for just $5 more on any service",
      discount: "$5 Upgrade",
      code: "UPGRADE5",
      validUntil: "2024-08-31",
      terms: "Cannot be combined with other offers."
    },
    {
      id: 5,
      title: "Monthly Unlimited",
      description: "Unlimited Basic washes for an entire month",
      discount: "$49/month",
      code: "UNLIMITED49",
      validUntil: "2024-09-30",
      terms: "Auto-renewal subscription. Cancel anytime."
    }
  ];

  return (
    <div className="offers-page">
      <section className="offers-hero section">
        <div className="container">
          <h1 className="section-title fade-in">
            <PartyPopper size={40} style={{ marginRight: '10px', display: 'inline' }} />
            Special Offers
          </h1>
          <p className="section-subtitle">
            Save more on our premium car wash services with these exclusive deals!
            Don't miss out on these limited-time offers.
          </p>
        </div>
      </section>

      <section className="offers-main section">
        <div className="container">
          <div className="offers-grid">
            {activeOffers.map((offer) => (
              <div 
                key={offer.id} 
                className={`offer-card card ${offer.featured ? 'featured' : ''}`}
              >
                {offer.featured && (
                  <div className="featured-badge">
                    <PartyPopper size={16} style={{ marginRight: '5px' }} />
                    Featured Deal
                  </div>
                )}
                
                <div className="offer-header">
                  <div className="offer-discount">{offer.discount}</div>
                  <h3 className="offer-title">{offer.title}</h3>
                  <p className="offer-description">{offer.description}</p>
                </div>

                <div className="offer-details">
                  <div className="offer-code-section">
                    <span className="code-label">Coupon Code</span>
                    <div className="code-container">
                      <span className="code-value">{offer.code}</span>
                      <button className="copy-btn" onClick={() => navigator.clipboard.writeText(offer.code)}>
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="offer-validity">
                    <Calendar size={16} style={{ marginRight: '5px' }} />
                    <span className="validity-label">Valid Until:</span>
                    <span className="validity-date">{offer.validUntil}</span>
                  </div>

                  <div className="offer-terms">
                    <FileText size={16} style={{ marginRight: '5px' }} />
                    <span className="terms-label">Terms:</span>
                    <p className="terms-text">{offer.terms}</p>
                  </div>
                </div>

                <button className="btn btn-primary offer-btn">
                  Redeem Offer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-to-redeem section">
        <div className="container">
          <h2 className="section-title">How to Redeem Offers</h2>
          <div className="redemption-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Choose Your Offer</h4>
                <p>Select the offer you want to use and copy the coupon code</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Visit Our Location</h4>
                <p>Come to our car wash facility with your vehicle</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Present Your Code</h4>
                <p>Show the coupon code to our staff before service begins</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Enjoy Your Discount</h4>
                <p>Get your car washed at the discounted price!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-signup section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Never Miss a Deal!</h2>
            <p className="newsletter-subtitle">
              Subscribe to our newsletter and be the first to know about new offers and exclusive discounts.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Enter your email address"
              />
              <button className="btn btn-primary newsletter-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;
