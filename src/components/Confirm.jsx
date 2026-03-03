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
    if (!upi.trim() || !hash.trim()) {
      setError('Please enter both UPI ID and transaction hash.');
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
        <form className="confirm-form" onSubmit={submit}>
          <h2>Confirm Order</h2>
          <div className="field">
            <label>Quantity</label>
            <div>{quantity}</div>
          </div>
          <div className="field">
            <label>Network</label>
            <div>{network}</div>
          </div>
          <div className="field">
            <label>Receive Address</label>
            <div className="address-row">
              <code className="receive-address">{addressForNetwork}</code>
              <button type="button" className="copy-btn" onClick={copyAddress}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          {error && <div className="error">{error}</div>}
          <input
            type="text"
            placeholder="UPI ID"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
          />
          <input
            type="text"
            placeholder="Hash Tx"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
          />
          <button type="submit">Confirm Order</button>
        </form>
      ) : (
        <div className="success-box">
          <h2>Congrats!</h2>
          <p>Your order has been placed successfully.</p>
          <div className="order-id-box">
            <span>Order ID:</span>
            <div className="order-id">{orderId}</div>
          </div>
          <div className="status-badge">Status: Pending Verification</div>
          <div className="telegram-message">
            <strong>Verification Done?</strong> You will receive a message on Telegram
          </div>
          <div className="receive-section">
            <label>Send USDT to</label>
            <div className="address-row">
              <code className="receive-address">{addressForNetwork}</code>
              <button type="button" className="copy-btn" onClick={copyAddress}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      )}
    </div>
  );
}
