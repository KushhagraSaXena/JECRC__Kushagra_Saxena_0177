import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  // Predefined users database (in-memory)
  const usersDatabase = [
    {
      id: 'admin1',
      username: 'admin',
      password: 'admin123',
      email: 'admin@company.com',
      name: 'Admin User',
      role: 'admin',
      department: 'Administration'
    },
    {
      id: 'emp001',
      username: 'emp001',
      password: 'pass123',
      email: 'john.doe@company.com',
      name: 'John Doe',
      role: 'employee',
      department: 'IT',
      employeeId: 'EMP001'
    },
    {
      id: 'emp002',
      username: 'emp002',
      password: 'pass123',
      email: 'jane.smith@company.com',
      name: 'Jane Smith',
      role: 'employee',
      department: 'HR',
      employeeId: 'EMP002'
    },
    {
      id: 'emp003',
      username: 'emp003',
      password: 'pass123',
      email: 'mike.johnson@company.com',
      name: 'Mike Johnson',
      role: 'employee',
      department: 'Finance',
      employeeId: 'EMP003'
    }
  ];

  const login = (username, password) => {
    setError(null);
    setLoading(true);

    try {
      // Simulate network delay
      setTimeout(() => {
        // Validate input
        if (!username || !password) {
          setError('Username and password are required');
          setLoading(false);
          return;
        }

        // Find user
        const foundUser = usersDatabase.find(
          u => u.username === username.trim() && u.password === password
        );

        if (!foundUser) {
          setError('Invalid username or password');
          setLoading(false);
          return;
        }

        // Remove password from stored user
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;

        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const isEmployee = () => {
    return user && user.role === 'employee';
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isEmployee,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
