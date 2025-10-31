import React, { useState } from 'react';
import { register } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ email:'', username:'', password:'' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.message === 'User registered') {
      setMsg('Registered! Please login.');
      setTimeout(()=>nav('/login'), 1000);
    } else if (res.errors) {
      setMsg(res.errors.map(e=>e.msg).join(', '));
    } else setMsg(res.message || 'Error');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 border rounded"/>
        <input placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} className="w-full p-2 border rounded"/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full p-2 border rounded"/>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Register</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
