import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }){
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
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Email or Username" value={credential} onChange={e=>setCredential(e.target.value)} className="w-full p-2 border rounded"/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded"/>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Login</button>
      </form>
      {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
    </div>
  );
}
