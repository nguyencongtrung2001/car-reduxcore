import '../css/login.css'
import React, { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(!show);
  };

  const handleSave = (email, password) => {
    const user = {
      emails: email,
      passwords: password,
    };

    // Lưu vào localStorage
    localStorage.setItem('users', JSON.stringify(user));

    // Sau khi lưu, chuyển trang
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-title">Login</h1>
        <form className="login-form">
          <div className="input-wrap">
            <FaRegUser className="login-icon icon-email" />
            <input
              className="input input-email"
              value={email}
              type="email"
              placeholder="Nhập Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <FaLock className="login-icon icon-password" />
            <input
              className="input input-password"
              value={password}
              type={show ? "password" : "text"}
              placeholder="Nhập Password"
              onChange={(e) => setPassword(e.target.value)}
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
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
