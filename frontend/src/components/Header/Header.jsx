import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile'; // Adjust path as needed
import '../Header/Header.css'; // Import the existing Header CSS

// Receive props from App.jsx
function Header({ isLoggedIn, user, handleLogout, cartItems }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to add 'active' class to the current link
  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header>
      {/* Wrap header content */}
      <div className="header-content-wrapper">
        {/* Logo - Always visible */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="logo" className="logo-img" />
            <p>Bharat Agro Fresh</p>
          </Link>
        </div>

        {/* Container for elements on the right side (Desktop View) */}
        <div className="header-right-desktop">
          {/* Desktop Navigation Links */}
          <ul className="nav-links desktop-nav">
            <li><Link to="/" className={getNavLinkClass('/')}>Home</Link></li>
            <li><Link to="/products" className={getNavLinkClass('/products')}>Products</Link></li>
            <li><Link to="/about" className={getNavLinkClass('/about')}>About</Link></li>
            <li><Link to="/blog" className={getNavLinkClass('/blog')}>Blog</Link></li>
          </ul>

          {/* Desktop Auth Buttons (Logged Out) */}
          {!isLoggedIn && (
             <div className="auth-buttons desktop-auth">
               <Link to="/login" className="login-btn">Login</Link>
               <Link to="/signup" className="signup-btn">Sign Up</Link>
             </div>
          )}
        </div>

        {/* User Menu / Cart (Always visible on right when logged in) */}
        {/* Positioned outside header-right-desktop for easier mobile layout */}
        {isLoggedIn && (
          <div className="user-menu-container always-visible">
            <UserProfile user={user} handleLogout={handleLogout} />
            <Link to="/cart" className="cart-icon">
              <span className="material-icons">shopping_cart</span>
              {Array.isArray(cartItems) && cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
          </div>
        )}

        {/* Hamburger Menu Button (Mobile Only) */}
        <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
          <span className="material-icons">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Mobile Menu Dropdown Container */}
        <div className={`mobile-menu-container ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          {/* Mobile Navigation Links */}
          <ul className="nav-links mobile-nav">
            <li><Link to="/" className={getNavLinkClass('/')}>Home</Link></li>
            <li><Link to="/products" className={getNavLinkClass('/products')}>Products</Link></li>
            <li><Link to="/about" className={getNavLinkClass('/about')}>About</Link></li>
            <li><Link to="/blog" className={getNavLinkClass('/blog')}>Blog</Link></li>
          </ul>

          {/* Mobile Auth Buttons (Logged Out) */}
          {!isLoggedIn && (
            <div className="user-auth-section"> {/* Wrapper for padding/border */}
              <div className="auth-buttons mobile-auth">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
              </div>
            </div>
          )}
        </div> {/* End of mobile-menu-container */}

      </div> {/* End of header-content-wrapper */}
    </header>
  );
}

export default Header;