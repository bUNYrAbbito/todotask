import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 👈 import custom CSS

export default function Login({ onLogin }) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(credential, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      onLogin(res.user);
      nav('/dashboard');
    } else {
      setMsg(res.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={submit} className="space-y-3">
          <input
            placeholder="Email or Username"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            className="login-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        {msg && <p className="login-msg error">{msg}</p>}
      </div>
    </div>
  );
}
