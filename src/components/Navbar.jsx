import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Navbar.css';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <span className="logo-icon">💰</span>
          <span className="logo-text">USDT</span>
        </div>
        {/* status indicator removed for cleaner look */}
      </div>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="link-icon">🏠</span> Home
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="link-icon">📋</span> Orders
        </NavLink>
        <NavLink to="/account" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="link-icon">👤</span> Account
        </NavLink>
      </div>

      <div className="navbar-right">
        <div className="navbar-stats">
          <div className="stat-item">
            <span className="stat-label">24h Volume</span>
            <span className="stat-value">$125K+</span>
          </div>
        </div>
        <button className="signout-button" onClick={handleSignout}>
          <span>🚪</span> Sign Out
        </button>
      </div>
    </nav>
  );
}
