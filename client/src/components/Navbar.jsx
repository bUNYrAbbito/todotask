import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }){
  return (
    <nav className="bg-gray-100 p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="font-bold">TodoApp</Link>
        </div>
        <div className="space-x-3">
          {user ? (
            <>
              <span className="mr-2">Hi, {user.username} ({user.role})</span>
              <Link to="/dashboard" className="mr-2">Dashboard</Link>
              {user.role === 'admin' && <Link to="/admin" className="mr-2">Admin</Link>}
              <button onClick={onLogout} className="bg-red-500 text-white px-2 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="ml-2">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
