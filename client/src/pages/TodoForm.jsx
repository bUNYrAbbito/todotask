import React, { useState, useEffect } from 'react';
import { createTodo, updateTodo, fetchTodos } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import './TodoForm.css'; // 👈 import custom CSS

export default function TodoForm({ user }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'Non-Urgent',
    completed: false
  });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        const todos = await fetchTodos();
        const todo = todos.find(t => t._id === id);
        if (!todo) return setMsg('Todo not found');
        setForm({
          title: todo.title || '',
          description: todo.description || '',
          dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().substring(0, 10) : '',
          category: todo.category || 'Non-Urgent',
          completed: !!todo.completed
        });
      })();
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title) return setMsg('Title required');
    const payload = { ...form, dueDate: form.dueDate || null };
    if (id) {
      await updateTodo(id, payload);
    } else {
      await createTodo(payload);
    }
    nav('/dashboard');
  };

  return (
    <div className="todo-form-page">
      <div className="todo-form-card">
        <h2 className="todo-form-title">{id ? 'Edit Todo' : 'New Todo'}</h2>
        <form onSubmit={submit} className="space-y-3">
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="todo-input"
          />
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="todo-textarea"
          />
          <input
            type="date"
            value={form.dueDate}
            onChange={e => setForm({ ...form, dueDate: e.target.value })}
            className="todo-input"
          />
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="todo-select"
          >
            <option>Non-Urgent</option>
            <option>Urgent</option>
          </select>

          <label className="todo-checkbox-label">
            <input
              type="checkbox"
              checked={form.completed}
              onChange={e => setForm({ ...form, completed: e.target.checked })}
            />
            <span>Completed</span>
          </label>

          <button className="todo-btn">{id ? 'Update Todo' : 'Create Todo'}</button>
        </form>
        {msg && <p className="todo-msg">{msg}</p>}
      </div>
    </div>
  );
}
