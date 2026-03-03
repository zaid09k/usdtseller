import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Sell.css';

export default function Sell() {
  const [quantity, setQuantity] = useState('');
  const [network, setNetwork] = useState('BEP20');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const rate = 116.73; // INR per USDT
  const minAmount = 50;

  const converted = () => {
    const q = parseFloat(quantity);
    if (isNaN(q) || q <= 0) return '';
    return (q * rate).toFixed(2);
  };

  const submit = (e) => {
    e.preventDefault();
    setError('');
    const q = parseFloat(quantity);
    if (isNaN(q) || q <= 0) {
      setError('Please enter a valid quantity');
      return;
    }
    if (q < minAmount) {
      setError(`Minimum ${minAmount} USDT required`);
      return;
    }
    // pass quantity and network via state
    navigate('/confirm', { state: { quantity: q, network } });
  };

  // redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="sell-container">
      <form className="sell-form" onSubmit={submit}>
        <h2>Sell USDT</h2>
        {error && <div className="error">{error}</div>}
        
        <div className="network-selector">
          <label>Select Network</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="network"
                value="BEP20"
                checked={network === 'BEP20'}
                onChange={(e) => setNetwork(e.target.value)}
              />
              BEP20 (BSC)
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="network"
                value="TRC20"
                checked={network === 'TRC20'}
                onChange={(e) => setNetwork(e.target.value)}
              />
              TRC20 (Tron)
            </label>
          </div>
        </div>

        <input
          type="number"
          step="0.0001"
          placeholder="Quantity (min. 50 USDT)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        {quantity && !isNaN(parseFloat(quantity)) && (
          <div className="conversion">
            ≈ ₹ {converted()} INR
          </div>
        )}
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
