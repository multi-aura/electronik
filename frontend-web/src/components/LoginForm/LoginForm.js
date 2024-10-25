import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import CustomInput from '../Input/CustomInput';
import './LoginForm.css';

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="custom-login-form">
      <h2 className="form-title text-center mb-4">Login</h2>
      <CustomInput 
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        icon={faUser} 
      />
      <CustomInput 
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={faLock} 
      />
      <div className="form-group form-check mb-3">
        <input 
          type="checkbox" 
          id="rememberMe" 
          className="form-check-input" 
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)} 
        />
        <label htmlFor="rememberMe" className="form-check-label">Remember Me</label>
      </div>

      <button type="submit" className="custom-button w-100">Login</button>
      <div className="text-center my-3">or</div>
      <button className="btn btn-outline-danger btn-block custom-btn-google">
        <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign in with Google
      </button>
      <div className="text-center mt-3">
        <span>Don't have an account? <a href="/mulregister" className="form-link">Sign Up</a></span>
      </div>
    </form>
  );
}

export default LoginForm;
