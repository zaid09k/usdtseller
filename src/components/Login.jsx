import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Login.css';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // if already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!id.trim() || !password) {
      setError('Please enter both user ID and password.');
      return;
    }
    login(id, password);
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-brand">
        <div className="brand-icon">💱</div>
        <div className="brand-name">USDT Seller</div>
        <div className="brand-tagline">Professional USDT Trading Platform</div>
      </div>
      
      <form className="login-form" onSubmit={submit}>
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account to continue</p>
        
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            type="text"
            placeholder="Enter your user ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="login-btn">Sign In</button>
        
        <div className="login-footer">
          <div className="footer-item">
            <span className="icon">✓</span>
            <span>Secure Login</span>
          </div>
          <div className="footer-item">
            <span className="icon">⚡</span>
            <span>Instant Access</span>
          </div>
          <div className="footer-item">
            <span className="icon">🔒</span>
            <span>Protected</span>
          </div>
        </div>
      </form>

      <div className="login-features">
        <div className="feature">
          <div className="feature-icon">💰</div>
          <h4>Best Rates</h4>
          <p>Competitive exchange rates</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h4>Fast Instant</h4>
          <p>Quick verification & payout</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🛡️</div>
          <h4>100% Safe</h4>
          <p>Secure transactions</p>
        </div>
      </div>
    </div>
  );
}
