import React from 'react';
import { useAuth } from './AuthProvider';
import './OrderHistory.css';

export default function OrderHistory() {
  const { orders, user } = useAuth();

  if (!user) {
    return <p>Please login to see orders.</p>;
  }

  return (
    <div className="history-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Network</th>
              <th>UPI ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="order-id-cell">{o.orderId}</td>
                <td>{new Date(o.date).toLocaleString()}</td>
                <td>{o.quantity}</td>
                <td><span className="network-badge">{o.network}</span></td>
                <td>{o.upi}</td>
                <td>
                  <span className="status-badge">{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
