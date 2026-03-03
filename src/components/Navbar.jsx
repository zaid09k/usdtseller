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
      <div className="navbar-logo">USDT Seller</div>
      <div className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/history">Order History</NavLink>
        <NavLink to="/account">Account</NavLink>
      </div>
      <button className="signout-button" onClick={handleSignout}>
        Sign out
      </button>
    </nav>
  );
}
