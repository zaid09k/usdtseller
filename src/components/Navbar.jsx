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
      </div>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          🏠 Home
        </NavLink>

        <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
          📋 Orders
        </NavLink>

        <NavLink to="/account" className={({ isActive }) => isActive ? 'active' : ''}>
          👤 Account
        </NavLink>
      </div>

      <div className="navbar-right">
        <button className="signout-button" onClick={handleSignout}>
          🚪 Sign Out
        </button>
      </div>

    </nav>
  );
}