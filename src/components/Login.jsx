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

  async function submitLogin(userUid, userPassword) {
    try {
      const response = await fetch('https://earnest-heart-production-adc7.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userUid,
          password: userPassword 
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Yay! You are logged in:', data.message);
        login(userUid, userPassword);
      } else {
        console.error('Login failed:', data.message);
        setError(data.message || 'Login failed. Please try again.');
      }

    } catch (error) {
      console.error('Network or server error occurred:', error);
      setError('Network or server error occurred. Please try again.');
    }
  }

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!id.trim() || !password) {
      setError('Please enter both user ID and password.');
      return;
    }
    submitLogin(id, password);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-brand">
            <div className="brand-logo">💰</div>
            <h1>USDT Seller Pro</h1>
            <p className="brand-tagline">Fast, Safe & Secure USDT Trading</p>
          </div>

          <div className="trust-badges">
            <div className="badge">
              <span className="badge-icon">🔒</span>
              <span className="badge-text">SSL Encrypted</span>
            </div>
            <div className="badge">
              <span className="badge-icon">✓</span>
              <span className="badge-text">Verified Seller</span>
            </div>
            <div className="badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">Instant Confirmation</span>
            </div>
          </div>

          <div className="info-section">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>✓ Lowest rates guaranteed</li>
              <li>✓ 24/7 customer support</li>
              <li>✓ Fast transaction processing</li>
              <li>✓ Secure & encrypted platform</li>
            </ul>
          </div>
        </div>

        <form className="login-form" onSubmit={submit}>
          <div className="form-header">
            <h2>Secure Login</h2>
            <p>Access your USDT selling dashboard</p>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label htmlFor="id">User ID</label>
            <input
              id="id"
              type="text"
              placeholder="Enter your user ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="form-input"
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
              className="form-input"
            />
          </div>

          <button type="submit" className="login-btn">Login to Dashboard</button>

          <div className="security-info">
            <span className="security-icon">🛡️</span>
            <small>Your data is encrypted and secured</small>
          </div>

          <div className="form-footer">
            <p>First time? Contact support to create an account</p>
          </div>
        </form>
      </div>
    </div>
  );
}
