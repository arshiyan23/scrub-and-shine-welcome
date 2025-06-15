import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth(); // Customer auth
  const { isAuthenticated: isAdminAuthenticated, logoutAdmin } = useAdminAuth(); // Admin auth

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (isAdminAuthenticated) {
      logoutAdmin();
      navigate('/');
    } else if (isAuthenticated) {
      logout();
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">GoWash</span>
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            {/* Show Dashboard FIRST */}
            {isAuthenticated && (
              <Link
                to="/customer-dashboard"
                className={`navbar-link ${isActive('/customer-dashboard') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {isAdminAuthenticated && (
              <Link
                to="/admin-dashboard"
                className={`navbar-link ${isActive('/admin-dashboard') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {/* Default Links */}
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
              to="/contact"
              className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Show Logout LAST if logged in */}
            {(isAuthenticated || isAdminAuthenticated) && (
              <button
                onClick={handleLogout}
                className="navbar-link logout-btn"
              >
                Logout
              </button>
            )}
          </div>

          {/* Right-side button */}
          <div className="navbar-actions desktop-only">
            {!isAuthenticated && !isAdminAuthenticated && (
              <Link to="/customer-login" className="btn btn-secondary navbar-btn">
                Login
              </Link>
            )}
          </div>

          {/* Hamburger toggle */}
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
