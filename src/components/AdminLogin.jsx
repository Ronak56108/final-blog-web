import React, { useState } from 'react';

function AdminLogin({ handleAdminLogin, setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    handleAdminLogin(email, password);
  };

  return (
    <div className="center-container">
      <form className="auth-card glass-panel" onSubmit={submit} style={{ borderColor: '#e11d48', borderTopWidth: '4px' }}>
        <div className="card-header">
          <h2>Admin Portal</h2>
          <p>Authorized personnel only</p>
        </div>
        
        <div className="input-group">
          <label>Admin Email</label>
          <input 
            type="email" 
            placeholder="admin@blog.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            maxLength={50}
          />
        </div>
        
        <div className="input-group">
          <label>Secret Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            minLength={6}
            maxLength={30}
          />
        </div>
        
        <button type="submit" className="primary-btn full-width" style={{ backgroundColor: '#e11d48' }}>Access Dashboard</button>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button type="button" onClick={() => setPage('login')} className="nav-btn" style={{ fontSize: '0.85rem' }}>
            &larr; Back to Regular Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
