
import { Droplets, Sparkles, Gem, Crown, Check, Tire, Flower2, Dog, Shield, Lightbulb, Settings } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      name: "Basic Wash",
      price: "$15",
      duration: "15 min",
      icon: <Droplets size={48} />,
      features: [
        "Exterior rinse and soap",
        "Hand dry with clean towels",
        "Tire and rim cleaning",
        "Basic interior vacuum"
      ]
    },
    {
      id: 2,
      name: "Premium Wash",
      price: "$25",
      duration: "25 min",
      icon: <Sparkles size={48} />,
      features: [
        "Complete exterior wash",
        "Wax application",
        "Interior vacuum and wipe",
        "Window cleaning (inside & out)",
        "Dashboard treatment"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Deluxe Detail",
      price: "$45",
      duration: "45 min",
      icon: <Gem size={48} />,
      features: [
        "Full premium wash package",
        "Clay bar treatment",
        "Premium wax or sealant",
        "Deep interior cleaning",
        "Leather conditioning",
        "Engine bay cleaning"
      ]
    },
    {
      id: 4,
      name: "Ultimate Detail",
      price: "$75",
      duration: "90 min",
      icon: <Crown size={48} />,
      features: [
        "Complete deluxe package",
        "Paint correction",
        "Ceramic coating application",
        "Complete interior detailing",
        "Headlight restoration",
        "Undercarriage wash",
        "6-month protection guarantee"
      ]
    }
  ];

  const addOns = [
    { name: "Tire Shine", price: "$5", icon: <Tire size={32} /> },
    { name: "Air Freshener", price: "$3", icon: <Flower2 size={32} /> },
    { name: "Pet Hair Removal", price: "$10", icon: <Dog size={32} /> },
    { name: "Fabric Protection", price: "$15", icon: <Shield size={32} /> },
    { name: "Headlight Restoration", price: "$20", icon: <Lightbulb size={32} /> },
    { name: "Engine Detailing", price: "$25", icon: <Settings size={32} /> }
  ];

  return (
    <div className="services-page">
      <section className="services-hero section">
        <div className="container">
          <h1 className="section-title fade-in">Our Services</h1>
          <p className="section-subtitle">
            Professional car wash and detailing services tailored to keep your vehicle 
            looking its absolute best. Choose the package that's right for you.
          </p>
        </div>
      </section>

      <section className="services-main section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`service-card card ${service.popular ? 'popular' : ''}`}
              >
                {service.popular && <div className="popular-badge">Most Popular</div>}
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-name">{service.name}</h3>
                  <div className="service-price">{service.price}</div>
                  <div className="service-duration">{service.duration}</div>
                </div>
                <div className="service-features">
                  <ul className="features-list">
                    {service.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <Check className="check-icon" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="btn btn-primary service-btn">
                  Select Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="add-ons-section section">
        <div className="container">
          <h2 className="section-title">Add-On Services</h2>
          <p className="section-subtitle">
            Enhance your car wash experience with our premium add-on services
          </p>
          <div className="add-ons-grid">
            {addOns.map((addon, index) => (
              <div key={index} className="addon-card card">
                <div className="addon-icon">{addon.icon}</div>
                <h4 className="addon-name">{addon.name}</h4>
                <div className="addon-price">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section">
        <div className="container">
          <h2 className="section-title">Our Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Arrival & Inspection</h4>
                <p className="step-description">
                  We inspect your vehicle and discuss your specific needs and preferences.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Professional Cleaning</h4>
                <p className="step-description">
                  Our expert team performs the selected service using premium products.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Quality Check</h4>
                <p className="step-description">
                  Final inspection to ensure every detail meets our high standards.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Happy Customer</h4>
                <p className="step-description">
                  You drive away with a sparkling clean vehicle and a satisfied smile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
