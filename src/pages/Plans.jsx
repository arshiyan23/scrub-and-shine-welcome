import './Plans.css';

const Plans = () => {
  const plans = [
    {
      id: 1,
      name: "Pay Per Wash",
      type: "single",
      price: "Starting at $15",
      description: "Perfect for occasional car wash needs",
      features: [
        "Choose any service level",
        "No commitment required",
        "Standard pricing",
        "Walk-in friendly"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Monthly Unlimited",
      type: "monthly",
      price: "$49/month",
      originalPrice: "$75/month",
      description: "Best value for regular car wash enthusiasts",
      features: [
        "Unlimited Basic washes",
        "Priority service",
        "20% off upgrades",
        "Free air freshener",
        "Mobile app access",
        "Cancel anytime"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Premium Monthly",
      type: "monthly",
      price: "$89/month",
      originalPrice: "$120/month",
      description: "Ultimate car care for those who demand perfection",
      features: [
        "Unlimited Premium washes",
        "2 Deluxe washes included",
        "VIP lane access",
        "Free interior cleaning",
        "Loyalty rewards 2x",
        "Concierge service",
        "Cancel anytime"
      ],
      popular: false
    },
    {
      id: 4,
      name: "Annual Package",
      type: "annual",
      price: "$499/year",
      originalPrice: "$588/year",
      description: "Maximum savings with yearly commitment",
      features: [
        "Everything in Premium Monthly",
        "Save $89 per year",
        "1 free Ultimate Detail",
        "Priority booking",
        "Extended warranty",
        "Transferable membership"
      ],
      popular: false
    }
  ];

  const compareFeatures = [
    { name: "Basic Wash", payPerWash: "✓", monthly: "Unlimited", premium: "Unlimited", annual: "Unlimited" },
    { name: "Premium Wash", payPerWash: "✓", monthly: "20% Off", premium: "Unlimited", annual: "Unlimited" },
    { name: "Deluxe Detail", payPerWash: "✓", monthly: "20% Off", premium: "2/month", annual: "4/month" },
    { name: "Priority Service", payPerWash: "✗", monthly: "✓", premium: "✓", annual: "✓" },
    { name: "Mobile App", payPerWash: "✗", monthly: "✓", premium: "✓", annual: "✓" },
    { name: "Loyalty Rewards", payPerWash: "Standard", monthly: "1.5x", premium: "2x", annual: "2.5x" },
    { name: "Free Ultimate Detail", payPerWash: "✗", monthly: "✗", premium: "✗", annual: "1/year" }
  ];

  return (
    <div className="plans-page">
      <section className="plans-hero section">
        <div className="container">
          <h1 className="section-title fade-in">💎 Membership Plans</h1>
          <p className="section-subtitle">
            Choose the perfect plan that fits your lifestyle and budget. 
            Save money while keeping your car spotless all year round!
          </p>
        </div>
      </section>

      <section className="plans-main section">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`plan-card card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && <div className="popular-badge">🔥 Most Popular</div>}
                
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-pricing">
                    <div className="plan-price">{plan.price}</div>
                    {plan.originalPrice && (
                      <div className="plan-original-price">{plan.originalPrice}</div>
                    )}
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-features">
                  <ul className="features-list">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-actions">
                  <button className="btn btn-primary plan-btn">
                    {plan.type === 'single' ? 'Get Started' : 'Subscribe Now'}
                  </button>

                  {plan.type !== 'single' && (
                    <span className="savings-text">
                      💰 Save up to {plan.type === 'monthly' ? '35%' : '40%'} vs pay-per-wash
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison-section section">
        <div className="container">
          <h2 className="section-title">📊 Plan Comparison</h2>
          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-header">Features</th>
                  <th>Pay Per Wash</th>
                  <th>Monthly Unlimited</th>
                  <th>Premium Monthly</th>
                  <th>Annual Package</th>
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((feature, index) => (
                  <tr key={index}>
                    <td className="feature-name">{feature.name}</td>
                    <td className="feature-value">{feature.payPerWash}</td>
                    <td className="feature-value">{feature.monthly}</td>
                    <td className="feature-value">{feature.premium}</td>
                    <td className="feature-value">{feature.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="faq-section section">
        <div className="container">
          <h2 className="section-title">❓ Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item card">
              <h4 className="faq-question">Can I cancel my subscription anytime?</h4>
              <p className="faq-answer">
                Yes! Monthly plans can be canceled anytime with no penalty. 
                Annual plans have a 30-day money-back guarantee.
              </p>
            </div>
            <div className="faq-item card">
              <h4 className="faq-question">What happens if I don't use all my washes?</h4>
              <p className="faq-answer">
                Unused washes don't roll over to the next month, but you can always 
                upgrade your wash level or bring friends and family!
              </p>
            </div>
            <div className="faq-item card">
              <h4 className="faq-question">Are there any hidden fees?</h4>
              <p className="faq-answer">
                No hidden fees ever! The price you see is the price you pay. 
                Tax may apply based on your location.
              </p>
            </div>
            <div className="faq-item card">
              <h4 className="faq-question">Can I share my membership?</h4>
              <p className="faq-answer">
                Memberships are tied to your vehicle's license plate. 
                Annual plans are transferable to immediate family members.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;
