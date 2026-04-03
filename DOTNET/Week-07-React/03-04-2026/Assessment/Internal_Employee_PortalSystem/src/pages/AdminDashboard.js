import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { employees, loading, error, addEmployee, updateEmployee, deleteEmployee, setError } = useEmployee();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    joinDate: '',
    status: 'Active'
  });

  // Edit employee
  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingId(emp.id);
    setShowForm(true);
    setValidationErrors({});
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      position: '',
      department: '',
      salary: '',
      joinDate: '',
      status: 'Active'
    });
    setEditingId(null);
    setShowForm(false);
    setValidationErrors({});
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
        setSuccessMessage('✅ Employee updated successfully!');
      } else {
        await addEmployee(formData);
        setSuccessMessage('✅ Employee added successfully!');
      }
      resetForm();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      if (typeof err === 'object') {
        setValidationErrors(err);
      } else {
        setValidationErrors({ general: err.message });
      }
    }
  };

  // Delete employee
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteEmployee(id);
        setSuccessMessage('✅ Employee deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === '' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>📊 Admin Dashboard</h2>
          <p>Manage all employee records</p>
        </div>
        <button 
          className="btn-add-employee" 
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          ➕ Add New Employee
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-alert">
          {successMessage}
          <button className="close-alert" onClick={() => setSuccessMessage('')}>×</button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-alert">
          {error}
          <button className="close-alert" onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? '✏️ Edit Employee' : '➕ Add New Employee'}</h3>
              <button className="btn-close" onClick={resetForm}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="employee-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={validationErrors.name ? 'input-error' : ''}
                    placeholder="Enter full name"
                  />
                  {validationErrors.name && <span className="error-text">{validationErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={validationErrors.email ? 'input-error' : ''}
                    placeholder="Enter email"
                  />
                  {validationErrors.email && <span className="error-text">{validationErrors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className={validationErrors.position ? 'input-error' : ''}
                    placeholder="e.g., Software Engineer"
                  />
                  {validationErrors.position && <span className="error-text">{validationErrors.position}</span>}
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className={validationErrors.department ? 'input-error' : ''}
                  >
                    <option value="">Select department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  {validationErrors.department && <span className="error-text">{validationErrors.department}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Salary *</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value)})}
                    className={validationErrors.salary ? 'input-error' : ''}
                    placeholder="Enter salary"
                    min="0"
                  />
                  {validationErrors.salary && <span className="error-text">{validationErrors.salary}</span>}
                </div>

                <div className="form-group">
                  <label>Join Date *</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                    className={validationErrors.joinDate ? 'input-error' : ''}
                  />
                  {validationErrors.joinDate && <span className="error-text">{validationErrors.joinDate}</span>}
                </div>
              </div>

              {validationErrors.general && (
                <div className="error-alert" style={{marginTop: '15px'}}>
                  {validationErrors.general}
                </div>
              )}

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          className="filter-select"
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <div className="results-count">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>

      {/* Employees Table */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading employees...</p>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="empty-state">
          <p>📭 No employees found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td><span className="emp-id">{emp.employeeId}</span></td>
                  <td className="emp-name">{emp.name}</td>
                  <td className="emp-email">{emp.email}</td>
                  <td>{emp.position}</td>
                  <td>
                    <span className="dept-badge" style={{
                      backgroundColor: getDeptColor(emp.department)
                    }}>
                      {emp.department}
                    </span>
                  </td>
                  <td className="emp-salary">${emp.salary.toLocaleString()}</td>
                  <td>{new Date(emp.joinDate).toLocaleDateString()}</td>
                  <td>
                    <span className="status-badge active">{emp.status}</span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn-action btn-edit"
                      onClick={() => handleEdit(emp)}
                      disabled={loading}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDelete(emp.id, emp.name)}
                      disabled={loading}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Statistics */}
      <div className="statistics-section">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div>
            <p className="stat-label">Total Employees</p>
            <p className="stat-value">{employees.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <p className="stat-label">Active</p>
            <p className="stat-value">{employees.filter(e => e.status === 'Active').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div>
            <p className="stat-label">Departments</p>
            <p className="stat-value">{departments.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div>
            <p className="stat-label">Total Payroll</p>
            <p className="stat-value">${employees.reduce((sum, e) => sum + e.salary, 0).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get department color
const getDeptColor = (dept) => {
  const colors = {
    'IT': '#e3f2fd',
    'HR': '#f3e5f5',
    'Finance': '#e8f5e9',
    'Operations': '#fff3e0',
    'Sales': '#fce4ec',
    'Marketing': '#f1f8e9'
  };
  return colors[dept] || '#f5f5f5';
};

export default AdminDashboard;
