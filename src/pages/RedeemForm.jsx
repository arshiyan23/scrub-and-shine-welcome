
import { useState } from 'react';
import './RedeemForm.css';

const RedeemForm = () => {
  const [formData, setFormData] = useState({
    couponCode: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    serviceType: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [couponDetails, setCouponDetails] = useState(null);

  const serviceTypes = [
    { value: 'basic', label: 'Basic Wash ($15)', price: 15 },
    { value: 'premium', label: 'Premium Wash ($25)', price: 25 },
    { value: 'deluxe', label: 'Deluxe Detail ($45)', price: 45 },
    { value: 'ultimate', label: 'Ultimate Detail ($75)', price: 75 }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateCoupon = () => {
    // Simulate coupon validation
    const validCoupons = {
      'FREEWASH2024': {
        type: 'Free Basic Wash',
        discount: 100,
        validUntil: '2024-12-31',
        description: 'Complimentary basic wash service'
      },
      'WEEKEND20': {
        type: '20% Off Any Service',
        discount: 20,
        validUntil: '2024-06-30',
        description: '20% discount on selected service'
      },
      'NEWBIE2024': {
        type: 'New Customer Free Wash',
        discount: 100,
        validUntil: '2024-12-31',
        description: 'Free basic wash for new customers'
      }
    };

    return validCoupons[formData.couponCode.toUpperCase()] || null;
  };

  const calculateTotal = () => {
    const selectedService = serviceTypes.find(service => service.value === formData.serviceType);
    if (!selectedService || !couponDetails) return 0;

    const basePrice = selectedService.price;
    const discountAmount = (basePrice * couponDetails.discount) / 100;
    return Math.max(0, basePrice - discountAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const coupon = validateCoupon();
    if (!coupon) {
      alert('Invalid coupon code. Please check and try again.');
      setIsSubmitting(false);
      return;
    }

    setCouponDetails(coupon);

    // Simulate redemption process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRedeemed(true);
      console.log('Coupon redeemed:', { ...formData, couponDetails: coupon });
    }, 3000);
  };

  const resetForm = () => {
    setFormData({
      couponCode: '',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      serviceType: '',
      notes: ''
    });
    setIsRedeemed(false);
    setCouponDetails(null);
  };

  return (
    <div className="redeem-page">
      <section className="redeem-hero section">
        <div className="container">
          <h1 className="section-title fade-in">🎫 Redeem Your Coupon</h1>
          <p className="section-subtitle">
            Use this form to redeem your coupon and process your car wash service
          </p>
        </div>
      </section>

      <section className="redeem-main section">
        <div className="container">
          <div className="redeem-content">
            {!isRedeemed ? (
              <form onSubmit={handleSubmit} className="redeem-form card">
                <h2 className="form-title">Coupon Redemption Form</h2>
                
                <div className="form-section">
                  <h3 className="section-title">Coupon Information</h3>
                  <div className="form-group">
                    <label className="form-label">Coupon Code *</label>
                    <input
                      type="text"
                      name="couponCode"
                      value={formData.couponCode}
                      onChange={handleInputChange}
                      className="form-input coupon-input"
                      placeholder="Enter your coupon code"
                      required
                    />
                    <div className="coupon-examples">
                      <span className="examples-label">Example codes:</span>
                      <span className="example-code">FREEWASH2024</span>
                      <span className="example-code">WEEKEND20</span>
                      <span className="example-code">NEWBIE2024</span>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Customer Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Customer's full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="customer@email.com"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Service Selection</h3>
                  <div className="form-group">
                    <label className="form-label">Choose Service *</label>
                    <div className="service-options">
                      {serviceTypes.map((service) => (
                        <label key={service.value} className="service-option">
                          <input
                            type="radio"
                            name="serviceType"
                            value={service.value}
                            checked={formData.serviceType === service.value}
                            onChange={handleInputChange}
                            required
                          />
                          <span className="service-label">{service.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Additional Notes</h3>
                  <div className="form-group">
                    <label className="form-label">Special Instructions</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Any special instructions or requests..."
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing Redemption...' : 'Redeem Coupon'}
                </button>
              </form>
            ) : (
              <div className="redemption-success card">
                <div className="success-header">
                  <div className="success-icon">🎉</div>
                  <h2 className="success-title">Coupon Redeemed Successfully!</h2>
                  <p className="success-subtitle">
                    Your coupon has been validated and applied to the service
                  </p>
                </div>

                <div className="redemption-details">
                  <div className="detail-section">
                    <h3>Customer Information</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Name:</span>
                        <span className="detail-value">{formData.customerName}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">{formData.customerPhone}</span>
                      </div>
                      {formData.customerEmail && (
                        <div className="detail-item">
                          <span className="detail-label">Email:</span>
                          <span className="detail-value">{formData.customerEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Service & Coupon Details</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Service:</span>
                        <span className="detail-value">
                          {serviceTypes.find(s => s.value === formData.serviceType)?.label}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Coupon:</span>
                        <span className="detail-value">{formData.couponCode}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Discount:</span>
                        <span className="detail-value">{couponDetails?.type}</span>
                      </div>
                      <div className="detail-item total-item">
                        <span className="detail-label">Total Amount:</span>
                        <span className="detail-value total-amount">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {formData.notes && (
                    <div className="detail-section">
                      <h3>Special Instructions</h3>
                      <p className="notes-text">{formData.notes}</p>
                    </div>
                  )}
                </div>

                <div className="success-actions">
                  <button className="btn btn-primary print-btn">
                    Print Receipt
                  </button>
                  <button className="btn btn-secondary" onClick={resetForm}>
                    Redeem Another Coupon
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RedeemForm;
