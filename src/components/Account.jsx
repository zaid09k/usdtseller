import React from 'react';
import { useAuth } from './AuthProvider';
import './Account.css';

export default function Account() {
  const { user, orders } = useAuth();

  if (!user) {
    return <p>Please login to view account.</p>;
  }

  const totalOrders = orders.length;
  const totalUSDT = orders.reduce((sum, o) => sum + o.quantity, 0);
  const totalINR = (totalUSDT * 116.73).toFixed(2);

  return (
    <div className="account-container">
      <h2>Account Details</h2>

      <div className="account-grid">
        <div className="account-card">
          <label>User ID</label>
          <div className="value">{user.id}</div>
        </div>
        <div className="account-card">
          <label>Joined</label>
          <div className="value">{new Date(user.joined).toLocaleDateString()}</div>
        </div>
        <div className="account-card">
          <label>Total Orders</label>
          <div className="value">{totalOrders}</div>
        </div>
        <div className="account-card">
          <label>Total USDT Sold</label>
          <div className="value">{totalUSDT.toFixed(4)}</div>
        </div>
        <div className="account-card">
          <label>Total INR Received</label>
          <div className="value">₹ {totalINR}</div>
        </div>
      </div>

      <div className="chart-section">
        <h3>✓ Your Account Stats</h3>
        <p className="stats-text">Keep track of your USDT sales and earnings through this dashboard. All orders are securely stored and verified.</p>
      </div>

      <div className="support-section">
        <h3>Support</h3>
        <div className="support-content">
          <div className="chat-icon">💬</div>
          <p>
            Have questions about USDT market or your orders?<br />
            <strong>Get instant help from our team!</strong>
          </p>
          <div className="support-message">
            <strong>Need help? Contact us on Telegram</strong><br />
            <span>Include your order ID</span><br />
            <span className="contact">Our representative: @zaidtx</span>
          </div>
        </div>
      </div>
    </div>
  );
}
