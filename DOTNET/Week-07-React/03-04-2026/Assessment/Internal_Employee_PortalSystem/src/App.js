import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeProfile from './pages/EmployeeProfile';
import { useAuth } from './context/AuthContext';
import './App.css';

// Main App Layout Component
const AppLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated() && <Header />}
      <div className="app-content">
        {children}
      </div>
    </>
  );
};

// Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Admin Only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Employee */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <EmployeeProfile />
          </ProtectedRoute>
        }
      />

      {/* Default Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
