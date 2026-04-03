import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">
          <h1>🏢 Employee Portal</h1>
        </div>

        {user && (
          <div className="header-content">
            <div className="user-info">
              <span className="role-badge" style={{
                backgroundColor: isAdmin() ? '#dc3545' : '#28a745'
              }}>
                {isAdmin() ? 'ADMIN' : 'EMPLOYEE'}
              </span>
              <div className="user-details">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
