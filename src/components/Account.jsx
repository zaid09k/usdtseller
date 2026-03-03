import React from 'react';
import { useAuth } from './AuthProvider';
import './Account.css';

export default function Account() {
  const { user, orders, logout } = useAuth();

  if (!user) {
    return <p>Please login to view account.</p>;
  }

  const totalOrders = orders.length;
  const totalUSDT = orders.reduce((sum, o) => sum + o.quantity, 0);
  const totalINR = (totalUSDT * 116.73).toFixed(2);

  return (
    <div className="account-container">
      <div className="account-header">
        <h2>Account Dashboard</h2>
        <p className="subtitle">Overview of your USDT transactions & profile</p>
      </div>

      <div className="account-main">
        <div className="profile-section">
          <div className="profile-card">
            <div className="avatar">👤</div>
            <h3>#{user.id}</h3>
            <p>Member since {new Date(user.joined).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-grid">
            <div className="stats-card">
              <span className="icon">📦</span>
              <div className="details">
                <label>Total Orders</label>
                <div className="value">{totalOrders}</div>
              </div>
            </div>

            <div className="stats-card">
              <span className="icon">💱</span>
              <div className="details">
                <label>USDT Sold</label>
                <div className="value">{totalUSDT.toFixed(4)}</div>
              </div>
            </div>

            <div className="stats-card">
              <span className="icon">💰</span>
              <div className="details">
                <label>INR Received</label>
                <div className="value">₹ {totalINR}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3>Sales Summary</h3>
        <p className="stats-text">Visualize your USDT selling performance over time. (Chart placeholder)</p>
      </div>

      <div className="support-section">
        <h3>Need Support?</h3>
        <div className="support-content">
          <div className="chat-icon">💬</div>
          <p>
            Questions about orders or rates?<br />
            <strong>We're here to help 24/7!</strong>
          </p>
          <div className="support-message">
            <strong>Contact us on Telegram</strong><br />
            <span>Include your order ID</span><br />
            <span className="contact">@zaidtx</span>
          </div>
        </div>
      </div>

      <div className="account-action">
        <button className="logout-btn" onClick={logout}>
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}
