import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, orders } = useAuth();
  const rate = 116.73;

  const startSell = () => {
    navigate('/sell');
  };

  // Calculate stats
  const totalOrders = orders.length;
  const totalUSDT = orders.reduce((sum, order) => sum + order.quantity, 0);
  const totalINR = (totalUSDT * rate).toFixed(2);

  return (
    <div className="dashboard">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Sell Your USDT Today</h1>
          <p>Fast, secure, and reliable USDT to INR conversion</p>
        </div>
        <div className="hero-rate-display">
          <div className="rate-text">Current Rate</div>
          <div className="rate-number">₹ {rate.toFixed(2)}/USDT</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <div className="stat-label">Total Orders</div>
            <div className="stat-value">{totalOrders}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-label">Total USDT</div>
            <div className="stat-value">{totalUSDT.toFixed(2)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">₹</div>
          <div className="stat-info">
            <div className="stat-label">Total INR</div>
            <div className="stat-value">{totalINR}</div>
          </div>
        </div>
      </div>

      {/* Main CTA */}
      <button className="sell-button-primary" onClick={startSell}>
        <span className="button-icon">+</span>
        Start Selling USDT Now
      </button>

      {/* Trust Badges */}
      <div className="trust-section">
        <div className="trust-badge">
          <span className="trust-icon">✓</span>
          <span>24/7 Support</span>
        </div>
        <div className="trust-badge">
          <span className="trust-icon">⚡</span>
          <span>Instant Verification</span>
        </div>
        <div className="trust-badge">
          <span className="trust-icon">🔒</span>
          <span>Secure & Safe</span>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-circle">
              <div className="step-number">1</div>
            </div>
            <div className="step-content">
              <h4>Select Network</h4>
              <p>Choose BEP20 or TRC20 blockchain network</p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-circle">
              <div className="step-number">2</div>
            </div>
            <div className="step-content">
              <h4>Enter Amount</h4>
              <p>Minimum 50 USDT per transaction</p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-circle">
              <div className="step-number">3</div>
            </div>
            <div className="step-content">
              <h4>Verify Details</h4>
              <p>Provide UPI ID & transaction hash</p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-circle">
              <div className="step-number">4</div>
            </div>
            <div className="step-content">
              <h4>Get Paid</h4>
              <p>Receive funds to your bank account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="why-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Lightning Fast</h4>
            <p>Get verified within 5-15 minutes via Telegram</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h4>Best Rates</h4>
            <p>Competitive exchange rates with no hidden fees</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h4>100% Secure</h4>
            <p>Your transactions are encrypted and protected</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h4>Expert Support</h4>
            <p>Dedicated support team available 24/7</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h4>Multi-Network</h4>
            <p>Support for BEP20 and TRC20 networks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h4>No Hassle</h4>
            <p>Simple and straightforward process</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h3>About USDT</h3>
        <p>
          Tether (USDT) is a leading stablecoin backed 1:1 by US dollars. It provides
          stability and global liquidity for traders and businesses. Our platform makes
          converting your USDT to INR quick, safe, and profitable.
        </p>
      </div>
    </div>
  );
}
