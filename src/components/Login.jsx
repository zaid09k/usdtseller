import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Login.css';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // if already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!id.trim() || !password) {
      setError('Please enter both user ID and password.');
      return;
    }
    login(id, password);
    navigate('/');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <h2>Welcome Back</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
