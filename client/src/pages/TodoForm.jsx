import React, { useState, useEffect } from 'react';
import { createTodo, updateTodo, fetchTodos } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function TodoForm({ user }) {
  const [form, setForm] = useState({ title:'', description:'', dueDate:'', category:'Non-Urgent', completed:false });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // fetch all todos and find the one we need (quick approach)
      (async () => {
        const todos = await fetchTodos();
        const todo = todos.find(t => t._id === id);
        if (!todo) return setMsg('Todo not found');
        setForm({
          title: todo.title || '',
          description: todo.description || '',
          dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().substring(0,10) : '',
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
      nav('/dashboard');
    } else {
      await createTodo(payload);
      nav('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">{id ? 'Edit Todo' : 'New Todo'}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" className="w-full p-2 border rounded"/>
        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded"/>
        <input type="date" value={form.dueDate} onChange={e=>setForm({...form, dueDate:e.target.value})} className="w-full p-2 border rounded"/>
        <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="w-full p-2 border rounded">
          <option>Non-Urgent</option>
          <option>Urgent</option>
        </select>
        <label className="inline-flex items-center space-x-2">
          <input type="checkbox" checked={form.completed} onChange={e=>setForm({...form, completed:e.target.checked})}/>
          <span>Completed</span>
        </label>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">{id ? 'Update' : 'Create'}</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
