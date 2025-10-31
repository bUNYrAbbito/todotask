import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">TodoApp</Link>
        </div>
        <div className="navbar-links">
          {user ? (
            <>
              <span className="navbar-user">Hi, {user.username} ({user.role})</span>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              {user.role === 'admin' && <Link to="/admin" className="navbar-link">Admin</Link>}
              <button onClick={onLogout} className="navbar-btn logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
