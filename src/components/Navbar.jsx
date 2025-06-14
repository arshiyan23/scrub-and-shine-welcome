
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Car className="brand-icon" size={24} />
            <span className="brand-text">AquaWash</span>
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link
              to="/"
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`navbar-link ${isActive('/services') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/offers"
              className={`navbar-link ${isActive('/offers') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Offers
            </Link>
            <a href='#plans'
              className={`navbar-link ${isActive('#plans') ? 'active' : ''}`}
            >
              Plans
            </a>
            <Link
              to="/contact"
              className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div className="navbar-actions">
            <Link to="/customer-login" className="btn btn-secondary navbar-btn">
              Login
            </Link>
            {/* <Link to="/admin-login" className="btn btn-primary navbar-btn">
              Admin
            </Link> */}
          </div>

          <button 
            className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
