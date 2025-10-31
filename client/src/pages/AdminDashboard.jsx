import React, { useEffect, useState } from 'react';
import { fetchAdminUsers, fetchTodos, updateUserRole } from '../api/api';
import './AdminDashboard.css'

export default function AdminDashboard(){
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const u = await fetchAdminUsers();
      setUsers(Array.isArray(u) ? u : []);
      const t = await fetchTodos(); // admin endpoint returns all todos
      setTodos(Array.isArray(t) ? t : []);
    })();
  }, []);

  const changeRole = async (userId, role) => {
    const res = await updateUserRole(userId, role);
    if (res.user) setUsers(users.map(u => u._id === userId ? { ...u, role: res.user.role } : u));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold">Users</h3>
          <ul className="space-y-2 mt-2">
            {users.map(u => (
              <li key={u._id} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <div>{u.username} ({u.email})</div>
                  <div className="text-sm text-gray-500">Role: {u.role}</div>
                </div>
                <div className="space-x-2">
                  <button onClick={()=>changeRole(u._id, u.role === 'admin' ? 'user' : 'admin')} className="px-2 py-1 border rounded text-sm">
                    {u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Todos</h3>
          <ul className="space-y-2 mt-2">
            {todos.map(t => (
              <li key={t._id} className="border p-3 rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-sm">{t.description}</div>
                    <div className="text-xs text-gray-500">by {t.user?.username}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
