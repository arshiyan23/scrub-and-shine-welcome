import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // close menu after logout
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">GoWash</span>
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            {/* Show Dashboard FIRST if logged in */}
            {isAuthenticated && (
              <Link
                to="/customer-dashboard"
                className={`navbar-link ${isActive('/customer-dashboard') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                to="/"
                className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            )}

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
            {/* <Link
              to="/offers"
              className={`navbar-link ${isActive('/offers') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Offers
            </Link> */}
            {/* <a
              href="#plans"
              className={`navbar-link`}
              onClick={() => setIsMenuOpen(false)}
            >
              Plans
            </a> */}
            <Link
              to="/contact"
              className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Show Logout LAST if logged in */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="navbar-link logout-btn"
              >
                Logout
              </button>
            )}
          </div>

          {/* Optional: show nothing in desktop navbar-actions, or show buttons if you want */}
          <div className="navbar-actions desktop-only">
            {!isAuthenticated ? (
              <Link to="/customer-login" className="btn btn-secondary navbar-btn">
                Login
              </Link>
            ) : null}
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
