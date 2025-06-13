
import { Building2, Leaf, Users, Trophy, Gem, Globe, Smile, Rocket, User } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero section">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="section-title fade-in">About AquaWash</h1>
            <p className="section-subtitle">
              Your trusted partner in premium car care since 2013. We're passionate about 
              making every vehicle shine with professional quality and exceptional service.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="story-title">Our Story</h2>
              <p className="story-paragraph">
                AquaWash began with a simple mission: to provide the highest quality car wash 
                services while caring for our environment and community. What started as a 
                small family business has grown into the region's most trusted car care center.
              </p>
              <p className="story-paragraph">
                Our commitment to excellence, eco-friendly practices, and customer satisfaction 
                has made us the preferred choice for thousands of car owners. We use only the 
                finest biodegradable soaps and latest equipment to ensure your vehicle gets 
                the care it deserves.
              </p>
              <div className="story-highlights">
                <div className="highlight-item">
                  <Leaf className="highlight-icon" size={24} />
                  <span className="highlight-text">Eco-Friendly Products</span>
                </div>
                <div className="highlight-item">
                  <Users className="highlight-icon" size={24} />
                  <span className="highlight-text">Expert Team</span>
                </div>
                <div className="highlight-item">
                  <Trophy className="highlight-icon" size={24} />
                  <span className="highlight-text">Award Winning Service</span>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <Building2 className="placeholder-icon" size={64} />
                <p>Our Modern Facility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="grid grid-2">
            <div className="value-card card">
              <div className="value-icon">
                <Gem size={48} />
              </div>
              <h3 className="value-title">Quality Excellence</h3>
              <p className="value-description">
                We never compromise on quality. Every wash is performed with meticulous 
                attention to detail using premium products and equipment.
              </p>
            </div>
            <div className="value-card card">
              <div className="value-icon">
                <Globe size={48} />
              </div>
              <h3 className="value-title">Environmental Care</h3>
              <p className="value-description">
                Our water recycling system and biodegradable products ensure we protect 
                the environment while caring for your vehicle.
              </p>
            </div>
            <div className="value-card card">
              <div className="value-icon">
                <Smile size={48} />
              </div>
              <h3 className="value-title">Customer First</h3>
              <p className="value-description">
                Your satisfaction is our priority. We go above and beyond to ensure 
                every customer leaves with a smile and a sparkling clean car.
              </p>
            </div>
            <div className="value-card card">
              <div className="value-icon">
                <Rocket size={48} />
              </div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-description">
                We continuously invest in the latest technology and techniques to 
                provide faster, better, and more efficient services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Our experienced professionals are dedicated to providing exceptional service
          </p>
          <div className="grid grid-3">
            <div className="team-member card">
              <div className="member-avatar">
                <User size={64} />
              </div>
              <h3 className="member-name">Mike Johnson</h3>
              <p className="member-role">General Manager</p>
              <p className="member-bio">
                10+ years in automotive care industry, passionate about customer service excellence.
              </p>
            </div>
            <div className="team-member card">
              <div className="member-avatar">
                <User size={64} />
              </div>
              <h3 className="member-name">Sarah Wilson</h3>
              <p className="member-role">Operations Manager</p>
              <p className="member-bio">
                Expert in car detailing with certification in advanced cleaning techniques.
              </p>
            </div>
            <div className="team-member card">
              <div className="member-avatar">
                <User size={64} />
              </div>
              <h3 className="member-name">David Lee</h3>
              <p className="member-role">Lead Technician</p>
              <p className="member-bio">
                Specialist in premium detailing services and customer relations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
