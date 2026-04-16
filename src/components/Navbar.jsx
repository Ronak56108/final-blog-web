import React from 'react';

function Navbar({ user, handleLogout, setPage }) {
  return (
    <nav className="navbar">
      <h2 onClick={() => setPage('home')} className="logo">My Blog</h2>
      <div className="nav-links">
        <button onClick={() => setPage('home')} className="nav-btn">Home</button>
        {user ? (
          <>
            {user.role === 'admin' && (
              <button onClick={() => setPage('admin')} className="nav-btn">Admin Panel</button>
            )}
            <button onClick={() => setPage('create')} className="nav-btn">New Post</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')} className="primary-btn">Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
