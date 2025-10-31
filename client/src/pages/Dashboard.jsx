import React, { useEffect, useState } from 'react';
import { fetchAdminUsers, fetchTodos, updateUserRole } from '../api/api';
import './AdminDashboard.css'; // 👈 import CSS

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      const u = await fetchAdminUsers();
      setUsers(Array.isArray(u) ? u : []);
      const t = await fetchTodos();
      setTodos(Array.isArray(t) ? t : []);
    })();
  }, []);

  const changeRole = async (userId, role) => {
    const res = await updateUserRole(userId, role);
    if (res.user)
      setUsers(users.map(u => u._id === userId ? { ...u, role: res.user.role } : u));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="admin-section">
          <h3>Users</h3>
          <ul className="space-y-2 mt-2">
            {users.map(u => (
              <li key={u._id} className="user-card flex justify-between items-center">
                <div>
                  <div>{u.username} ({u.email})</div>
                  <div className="user-info">Role: {u.role}</div>
                </div>
                <button
                  onClick={() => changeRole(u._id, u.role === 'admin' ? 'user' : 'admin')}
                  className="role-button"
                >
                  {u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-section">
          <h3>Todos</h3>
          <ul className="space-y-2 mt-2">
            {todos.map(t => (
              <li key={t._id} className="todo-card">
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
