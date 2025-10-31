import React from 'react';
import { Link } from 'react-router-dom';
import './TodoCard.css'; // Import your custom CSS file

export default function TodoCard({ todo, onDelete, onToggle }) {
  return (
    <div className="todo-card">
      <div className="todo-content">
        <div className="todo-info">
          <h3 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </h3>
          <p className="todo-description">{todo.description}</p>
          <p className="todo-meta">
            {todo.category}
            {todo.dueDate ? ` • Due: ${new Date(todo.dueDate).toLocaleDateString()}` : ''}
          </p>
          {todo.user && (
            <p className="todo-user">by {todo.user.username || todo.user}</p>
          )}
        </div>

        <div className="todo-actions">
          <button
            onClick={onToggle}
            className={`btn ${todo.completed ? 'btn-secondary' : 'btn-success'}`}
          >
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <Link to={`/todos/${todo._id}/edit`} className="btn btn-edit">
            Edit
          </Link>
          <button onClick={() => onDelete(todo._id)} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
