import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OrderHistory from './components/OrderHistory';
import Account from './components/Account';
import Sell from './components/Sell';
import Confirm from './components/Confirm';
import Navbar from './components/Navbar';
import './App.css';

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <RequireAuth>
                <AuthLayout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/account" element={<Account />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/confirm" element={<Confirm />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
