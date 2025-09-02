import '../css/login.css'
import React, { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(!show);
  };

  const handleSave = async (email, password) => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    const user = {
      emails: email,
      passwords: password,
      loginTime: new Date().toISOString(),
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Lưu vào localStorage
      localStorage.setItem('users', JSON.stringify(user));

      // Sau khi lưu, chuyển trang
      navigate('/home');
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(email, password);
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <FaRegUser className="login-icon icon-email" />
            <input
              className="input input-email"
              value={email}
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-wrap">
            <FaLock className="login-icon icon-password" />
            <input
              className="input input-password"
              value={password}
              type={show ? "password" : "text"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </form>
        <div className="login-handle">
          <p className="text-showpass" onClick={handleShow}>
            {show ? "Show password" : "Hide password"}
          </p>
          <button
            className="button-login"
            onClick={() => handleSave(email, password)}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
