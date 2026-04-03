import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployee } from '../context/EmployeeContext';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const { employees } = useEmployee();
  const [successMessage, setSuccessMessage] = useState('');

  // Find current employee
  const currentEmployee = employees.find(emp => emp.id === user?.id);

  // If employee not found, create a basic profile view
  if (!currentEmployee) {
    return (
      <div className="emp-profile">
        <div className="profile-header">
          <div>
            <h2>👤 My Profile</h2>
            <p>Your employee information</p>
          </div>
          <span className="role-indicator">Employee</span>
        </div>
        <div className="profile-container">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user?.name?.charAt(0).toUpperCase() || 'E'}
            </div>
            <div className="profile-summary">
              <h1>{user?.name || 'Employee'}</h1>
              <p className="position">{user?.role || 'Employee'}</p>
            </div>
          </div>
          <div className="profile-section">
            <h3>ℹ️ Profile Information</h3>
            <div className="info-message">
              <p>🔒 <strong>Your profile is being loaded.</strong> Your personal information is secured and only visible to HR personnel and yourself.</p>
              <p>📝 <strong>Profile Information:</strong> Name: {user?.name}, Email: {user?.email}, Department: {user?.department}</p>
              <p>❓ <strong>Need Help?</strong> Reach out to <strong>hr@company.com</strong> for any queries.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="emp-profile">
      <div className="profile-header">
        <div>
          <h2>👤 My Profile</h2>
          <p>Your employee information</p>
        </div>
        <span className="role-indicator">Employee</span>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-alert">
          {successMessage}
          <button className="close-alert" onClick={() => setSuccessMessage('')}>×</button>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="profile-container">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {currentEmployee.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-summary">
            <h1>{currentEmployee.name}</h1>
            <p className="position">{currentEmployee.position}</p>
            <p className="department">{currentEmployee.department} Department</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="profile-section">
          <h3>📧 Contact Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Email Address</label>
              <p>{currentEmployee.email}</p>
            </div>
            <div className="info-item">
              <label>Employee ID</label>
              <p>{currentEmployee.employeeId}</p>
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div className="profile-section">
          <h3>💼 Employment Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Position</label>
              <p>{currentEmployee.position}</p>
            </div>
            <div className="info-item">
              <label>Department</label>
              <p>{currentEmployee.department}</p>
            </div>
            <div className="info-item">
              <label>Join Date</label>
              <p>{new Date(currentEmployee.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            <div className="info-item">
              <label>Status</label>
              <p>
                <span className="status-badge active">{currentEmployee.status}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Compensation */}
        <div className="profile-section">
          <h3>💰 Compensation</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Annual Salary</label>
              <p className="salary-value">${currentEmployee.salary.toLocaleString()}</p>
            </div>
            <div className="info-item">
              <label>Pay Frequency</label>
              <p>Monthly</p>
            </div>
          </div>
        </div>

        {/* Account Access */}
        <div className="profile-section">
          <h3>🔐 Account Access</h3>
          <div className="access-info">
            <div className="access-item">
              <span>View Personal Profile</span>
              <span className="badge-allowed">✅ Allowed</span>
            </div>
            <div className="access-item">
              <span>View Other Employees</span>
              <span className="badge-denied">❌ Denied</span>
            </div>
            <div className="access-item">
              <span>Manage Employees</span>
              <span className="badge-denied">❌ Denied</span>
            </div>
            <div className="access-item">
              <span>Admin Dashboard</span>
              <span className="badge-denied">❌ Denied</span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="profile-section">
          <h3>ℹ️ Additional Information</h3>
          <div className="info-message">
            <p>🔒 <strong>Privacy Protected:</strong> Your personal information is secured and only visible to HR personnel and yourself.</p>
            <p>📝 <strong>Profile Updates:</strong> To update your information, please contact the HR department.</p>
            <p>❓ <strong>Need Help?</strong> Reach out to <strong>hr@company.com</strong> for any queries.</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div>
            <p className="stat-label">Years with Company</p>
            <p className="stat-value">{Math.floor((new Date() - new Date(currentEmployee.joinDate)) / (1000 * 60 * 60 * 24 * 365))}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <p className="stat-label">Status</p>
            <p className="stat-value">Active</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div>
            <p className="stat-label">Department</p>
            <p className="stat-value">{currentEmployee.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
