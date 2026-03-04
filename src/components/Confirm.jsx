import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Confirm.css';

export default function Confirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addOrder, user } = useAuth();
  const quantity = state?.quantity;
  const network = state?.network || 'BEP20';
  const [upi, setUpi] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  const ADDRESSES = {
    BEP20: '0x8e98731e7b7786f21713e0ebb0681dc0f34cb585',
    TRC20: 'TPt6WUZS16dvKw2pjxES44kezmYX2HSJMt',
  };

  const addressForNetwork = ADDRESSES[network] || '';

  const copyAddress = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(addressForNetwork);
      } else {
        const ta = document.createElement('textarea');
        ta.value = addressForNetwork;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // ignore copy errors
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!quantity) {
    navigate('/');
    return null;
  }

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!upi.trim()) {
      setError('Please enter your UPI ID.');
      return;
    }

    const order = {
      id: Date.now(),
      quantity,
      network,
      upi,
      hash,
      date: new Date().toISOString(),
    };
    const newOrderId = addOrder(order);
    setOrderId(newOrderId);
    setDone(true);
  };

  return (
    <div className="confirm-container">
      {!done ? (
        <div className="confirm-wrapper">
          <div className="confirm-left">
            <h2>Order Summary</h2>
            <div className="order-summary">
              <div className="summary-row">
                <span className="label">Quantity</span>
                <span className="value">{quantity} USDT</span>
              </div>
              <div className="summary-row">
                <span className="label">Payment Network</span>
                <span className="network-badge">{network}</span>
              </div>
              <div className="divider"></div>
              <div className="summary-row highlight">
                <span className="label">You Send</span>
                <span className="value price">{quantity} USDT</span>
              </div>
            </div>

            <div className="payment-steps">
              <h3>Payment Instructions</h3>
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Copy Address</strong>
                  <p>Copy the wallet address below</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>Send USDT</strong>
                  <p>Send {quantity} USDT to provided address</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>Verify Payment</strong>
                  <p>Enter transaction hash and confirm</p>
                </div>
              </div>
            </div>
          </div>

          <form className="confirm-form" onSubmit={submit}>
            <div className="form-title">
              <h2>Complete Payment</h2>
              <p className="subtitle">Secure & Encrypted Transfer</p>
            </div>

            <div className="address-section">
              <label>Send USDT to this address</label>
              <div className="address-box">
                <code className="receive-address">{addressForNetwork}</code>
                <button type="button" className="copy-btn" onClick={copyAddress} title="Copy to clipboard">
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
              <small className="network-info">Network: {network}</small>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="form-group">
              <label htmlFor="upi">Your UPI ID</label>
              <input
                id="upi"
                type="text"
                placeholder="Enter your UPI ID (e.g., name@upi)"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hash">Transaction Hash (TX ID) <span className="optional">(Optional)</span></label>
              <input
                id="hash"
                type="text"
                placeholder="Paste transaction hash (optional)"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                className="form-input"
              />
            </div>

            <button type="submit" className="confirm-btn">Confirm Order</button>

            <div className="security-footer">
              <span className="lock-icon">🔒</span>
              <p>Your transaction is encrypted and secure</p>
            </div>
          </form>
        </div>
      ) : (
        <div className="success-container">
          <div className="success-card">
            <div className="success-animation">✓</div>
            <h2>Order Confirmed!</h2>
            <p className="success-message">Your USDT order has been successfully placed</p>

            <div className="order-details">
              <div className="detail-item">
                <span className="label">Order ID</span>
                <span className="order-id">{orderId}</span>
              </div>
              <div className="detail-item">
                <span className="label">Amount</span>
                <span className="amount">{quantity} USDT</span>
              </div>
              <div className="detail-item">
                <span className="label">Network</span>
                <span className="network">{network}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status</span>
                <span className="status-badge">⏳ Pending Verification</span>
              </div>
            </div>

            <div className="payment-address-section">
              <h3>Payment Received At</h3>
              <div className="address-box">
                <code className="receive-address">{addressForNetwork}</code>
                <button type="button" className="copy-btn" onClick={copyAddress}>
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
            </div>

            <div className="next-steps">
              <h3>What Happens Next?</h3>
              <div className="step-item">
                <div className="check">✓</div>
                <p>Our team will verify your payment</p>
              </div>
              <div className="step-item">
                <div className="check">✓</div>
                <p>You'll receive confirmation via Telegram</p>
              </div>
              <div className="step-item">
                <div className="check">✓</div>
                <p>USDT will be processed immediately</p>
              </div>
            </div>

            <div className="telegram-info">
              <span className="icon">📱</span>
              <div className="info-text">
                <strong>Join Our Telegram</strong>
                <p>@usdtseller_support - For real-time updates</p>
              </div>
            </div>

            <button onClick={() => navigate('/')} className="home-btn">Back to Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
}
