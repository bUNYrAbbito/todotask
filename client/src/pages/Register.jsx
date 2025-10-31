import React, { useState } from 'react';
import { register } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // 👈 import custom CSS

export default function Register() {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.message === 'User registered') {
      setMsg('Registered! Please login.');
      setTimeout(() => nav('/login'), 1000);
    } else if (res.errors) {
      setMsg(res.errors.map(e => e.msg).join(', '));
    } else {
      setMsg(res.message || 'Error');
    }
  };

  const isSuccess = msg.includes('Registered');

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={submit} className="space-y-3">
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="register-input"
          />
          <input
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            className="register-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="register-input"
          />
          <button type="submit" className="register-btn">Register</button>
        </form>
        {msg && (
          <p className={`register-msg ${isSuccess ? 'success' : 'error'}`}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
