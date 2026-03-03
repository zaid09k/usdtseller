import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const rate = 116.73;

  const startSell = () => {
    navigate('/sell');
  };

  return (
    <div className="dashboard">
      <div className="rate-box">
        <div className="rate-label">USDT Live Rate</div>
        <div className="rate-value">₹ {rate.toFixed(2)}</div>
      </div>
      <button className="sell-button" onClick={startSell}>
        Sell USDT
      </button>



      <div className="info-card">
        <h3>About USDT</h3>
        <p>
          Tether (USDT) is a popular stablecoin pegged to the US dollar. It is
          widely used for trading and remittances. Use the calculator below to
          see how much INR you'll receive when selling your USDT.
        </p>
      </div>

      <div className="how-it-works">
        <h3>How It Works</h3>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Select Network</h4>
              <p>Choose between BEP20 or TRC20</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Enter Amount</h4>
              <p>Minimum 50 USDT required</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Confirm Details</h4>
              <p>Provide UPI ID & transaction hash</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Get Notified</h4>
              <p>Receive Telegram message on verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
