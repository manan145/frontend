import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust URL as needed
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/'; 

    //   navigate('/');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
    </div>
  );
}

export default Login;
