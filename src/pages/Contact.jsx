
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Contact form submitted:', formData);
    }, 2000);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero section">
        <div className="container">
          <h1 className="section-title fade-in">📞 Contact Us</h1>
          <p className="section-subtitle">
            Have questions or need assistance? We're here to help! 
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      <section className="contact-main section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="info-title">Get in Touch</h2>
              <p className="info-description">
                Our friendly team is always ready to assist you with any questions 
                about our services, memberships, or to help you redeem your coupons.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-details">
                    <h4>Visit Our Location</h4>
                    <p>123 Clean Street<br />Car Wash City, CW 12345</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-details">
                    <h4>Call Us</h4>
                    <p>(555) 123-WASH<br />Monday - Sunday: 7 AM - 8 PM</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">✉️</div>
                  <div className="method-details">
                    <h4>Email Us</h4>
                    <p>info@aquawash.com<br />We respond within 24 hours</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">🕒</div>
                  <div className="method-details">
                    <h4>Business Hours</h4>
                    <p>Monday - Friday: 7 AM - 8 PM<br />
                       Saturday - Sunday: 8 AM - 7 PM</p>
                  </div>
                </div>
              </div>

              <div className="coupon-redeem-info">
                <h3 className="redeem-title">🎫 Redeeming Your Coupon?</h3>
                <p className="redeem-description">
                  Bring your digital coupon or coupon code with you when you visit. 
                  Our staff will apply the discount before processing your service.
                </p>
                <div className="redeem-tips">
                  <div className="tip">
                    <span className="tip-icon">💡</span>
                    <span>Have your coupon code ready</span>
                  </div>
                  <div className="tip">
                    <span className="tip-icon">🚗</span>
                    <span>Arrive with a reasonably clean interior</span>
                  </div>
                  <div className="tip">
                    <span className="tip-icon">⏰</span>
                    <span>Check expiration dates before visiting</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="contact-form card">
                  <h3 className="form-title">Send us a Message</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      >
                        <option value="">Select a topic</option>
                        <option value="coupon-redemption">Coupon Redemption</option>
                        <option value="membership">Membership Questions</option>
                        <option value="service-inquiry">Service Inquiry</option>
                        <option value="complaint">Complaint</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              ) : (
                <div className="success-message card">
                  <div className="success-icon">✅</div>
                  <h3 className="success-title">Message Sent Successfully!</h3>
                  <p className="success-description">
                    Thank you for contacting us! We've received your message and 
                    will get back to you within 24 hours.
                  </p>
                  <button 
                    className="btn btn-secondary reset-btn"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '', email: '', phone: '', subject: '', message: ''
                      });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="map-section section">
        <div className="container">
          <h2 className="section-title">📍 Find Us</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-icon">🗺️</div>
              <h3>Interactive Map Coming Soon</h3>
              <p>We're located at 123 Clean Street, Car Wash City</p>
              <p>Easy parking and convenient access from the main road</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
