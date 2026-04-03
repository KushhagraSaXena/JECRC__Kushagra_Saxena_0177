import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login, error, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    login(username, password);
    setIsSubmitting(false);
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('emp001');
      setPassword('pass123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1>🏢 Employee Portal</h1>
            <p>Secure Login</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className={`form-input ${validationErrors.username ? 'error' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={isSubmitting}
              />
              {validationErrors.username && (
                <span className="error-message">{validationErrors.username}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`form-input ${validationErrors.password ? 'error' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {validationErrors.password && (
                <span className="error-message">{validationErrors.password}</span>
              )}
            </div>

            {/* Server Error */}
            {error && <div className="error-alert">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-login"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="demo-section">
            <p className="demo-title">Quick Demo Access</p>
            <div className="demo-buttons">
              <button
                className="btn-demo admin-demo"
                onClick={() => handleDemoLogin('admin')}
                disabled={isSubmitting}
              >
                👤 Admin Demo
              </button>
              <button
                className="btn-demo employee-demo"
                onClick={() => handleDemoLogin('employee')}
                disabled={isSubmitting}
              >
                👥 Employee Demo
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <h3>📋 Demo Credentials</h3>
            <table className="credentials-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="role-badge admin">Admin</span></td>
                  <td><code>admin</code></td>
                  <td><code>admin123</code></td>
                </tr>
                <tr>
                  <td><span className="role-badge employee">Employee</span></td>
                  <td><code>emp001</code></td>
                  <td><code>pass123</code></td>
                </tr>
                <tr>
                  <td><span className="role-badge employee">Employee</span></td>
                  <td><code>emp002</code></td>
                  <td><code>pass123</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="features-section">
          <h2>✨ Key Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🔐</div>
              <h3>Secure Authentication</h3>
              <p>Login with your credentials</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👥</div>
              <h3>Role-Based Access</h3>
              <p>Admin and Employee roles</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Employee Management</h3>
              <p>Complete CRUD operations</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Real-Time Updates</h3>
              <p>Instant data synchronization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
