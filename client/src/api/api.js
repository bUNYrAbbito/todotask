const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const register = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const login = async (credential, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, password })
  });
  return res.json();
};

export const fetchTodos = async () => {
  const res = await fetch(`${API_BASE}/todos`, { headers: { ...getAuthHeaders() } });
  return res.json();
};

export const createTodo = async (todo) => {
  const res = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(todo)
  });
  return res.json();
};

export const updateTodo = async (id, todo) => {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(todo)
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() }
  });
  return res.json();
};

export const fetchAdminUsers = async () => {
  const res = await fetch(`${API_BASE}/admin/users`, { headers: { ...getAuthHeaders() } });
  return res.json();
};

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${API_BASE}/admin/users/${id}/role`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ role })
  });
  return res.json();
};
