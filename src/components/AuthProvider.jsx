import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedOrders = localStorage.getItem('orders');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const login = (id, password) => {
    // simply accept any credentials for demo
    const now = new Date().toISOString();
    const newUser = { id, joined: now };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('orders');
  };

  const addOrder = (order) => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const orderWithStatus = {
      ...order,
      orderId,
      status: 'pending verification',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, orderWithStatus]);
    return orderId;
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
