import React, { useState, useEffect } from 'react';
import { fetchTodos, deleteTodo, updateTodo } from '../api/api';
import { Link } from 'react-router-dom';
import TodoCard from '../components/TodoCard';


export default function Dashboard({ user }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetchTodos();
    if (Array.isArray(res)) setTodos(res);
    else console.error(res);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t=>t._id !== id));
  };

  const toggleCompleted = async (todo) => {
    const updated = await updateTodo(todo._id, { completed: !todo.completed, title: todo.title });
    setTodos(todos.map(t => t._id === todo._id ? updated : t));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Todos</h2>
        <Link to="/todos/new" className="bg-blue-600 text-white px-3 py-1 rounded">+ New Todo</Link>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todos.length === 0 ? <p>No todos yet.</p> :
            todos.map(todo => (
              <TodoCard key={todo._id} todo={todo} onDelete={handleDelete} onToggle={() => toggleCompleted(todo)} />
            ))
          }
        </div>
      )}
    </div>
  );
}
