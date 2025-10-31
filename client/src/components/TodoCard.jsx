import React from 'react';
import { Link } from 'react-router-dom';

export default function TodoCard({ todo, onDelete, onToggle }) {
  return (
    <div className="border p-3 rounded shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-bold ${todo.completed ? 'line-through' : ''}`}>{todo.title}</h3>
          <p className="text-sm">{todo.description}</p>
          <p className="text-xs mt-1">{todo.category} {todo.dueDate ? `• Due: ${new Date(todo.dueDate).toLocaleDateString()}` : ''}</p>
          {todo.user && <p className="text-xs text-gray-500">by {todo.user.username || todo.user}</p>}
        </div>
        <div className="space-y-2">
          <button onClick={onToggle} className="px-2 py-1 border rounded text-sm">{todo.completed ? 'Undo' : 'Complete'}</button>
          <Link to={`/todos/${todo._id}/edit`} className="px-2 py-1 border rounded text-sm block">Edit</Link>
          <button onClick={()=>onDelete(todo._id)} className="px-2 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
        </div>
      </div>
    </div>
  );
}
