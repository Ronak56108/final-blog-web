import React, { useState } from 'react';

function Login({ handleLogin, setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    // Dummy authentication wrapper
    handleLogin(email, password, isSignUp ? name : null);
  };

  return (
    <div className="center-container">
      <form className="auth-card glass-panel" onSubmit={submit}>
        <div className="card-header">
          <h2>{isSignUp ? 'Join the Community' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Create a free account to publish' : 'Log in to continue writing'}</p>
        </div>
        
        {isSignUp && (
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              minLength={3}
              maxLength={30}
            />
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="reader@example.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            maxLength={50}
          />
        </div>
        
        <div className="input-group">
          <label>Password</label>
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
        
        <button type="submit" className="primary-btn full-width">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          <span style={{ color: '#718096' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <br/>
          <button 
            type="button" 
            onClick={() => setIsSignUp(!isSignUp)} 
            className="nav-btn" 
            style={{ padding: '0', display: 'inline', color: '#4f46e5', marginTop: '5px' }}
          >
            {isSignUp ? 'Log In Here' : 'Create an account'}
          </button>
        </div>

        <div style={{ marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <button type="button" onClick={() => setPage('admin_login')} className="nav-btn" style={{ fontSize: '0.8rem', color: '#a0aec0' }}>
            Administrators Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
