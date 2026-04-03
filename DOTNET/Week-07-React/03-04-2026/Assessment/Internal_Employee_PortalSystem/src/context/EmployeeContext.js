import React, { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize default employees
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      try {
        setEmployees(JSON.parse(storedEmployees));
      } catch (err) {
        console.error('Failed to parse stored employees:', err);
        initializeDefaultEmployees();
      }
    } else {
      initializeDefaultEmployees();
    }
  }, []);

  // Save to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const initializeDefaultEmployees = () => {
    const defaultEmployees = [
      {
        id: 'emp001',
        employeeId: 'EMP001',
        name: 'John Doe',
        email: 'john.doe@company.com',
        position: 'Software Engineer',
        department: 'IT',
        salary: 75000,
        joinDate: '2021-05-15',
        status: 'Active'
      },
      {
        id: 'emp002',
        employeeId: 'EMP002',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        position: 'HR Manager',
        department: 'HR',
        salary: 65000,
        joinDate: '2020-03-20',
        status: 'Active'
      },
      {
        id: 'emp003',
        employeeId: 'EMP003',
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        position: 'Financial Analyst',
        department: 'Finance',
        salary: 72000,
        joinDate: '2022-01-10',
        status: 'Active'
      }
    ];
    setEmployees(defaultEmployees);
    localStorage.setItem('employees', JSON.stringify(defaultEmployees));
  };

  // Validation helper
  const validateEmployee = (employee) => {
    const errors = {};

    if (!employee.name || employee.name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (!employee.email || employee.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
      errors.email = 'Invalid email format';
    }

    if (!employee.position || employee.position.trim() === '') {
      errors.position = 'Position is required';
    }

    if (!employee.department || employee.department.trim() === '') {
      errors.department = 'Department is required';
    }

    if (!employee.salary || employee.salary < 0) {
      errors.salary = 'Valid salary is required';
    }

    if (!employee.joinDate) {
      errors.joinDate = 'Join date is required';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // CREATE - Add new employee
  const addEmployee = (employeeData) => {
    return new Promise((resolve, reject) => {
      setError(null);
      setLoading(true);

      setTimeout(() => {
        const validationErrors = validateEmployee(employeeData);
        if (validationErrors) {
          setError('Validation failed');
          setLoading(false);
          reject(validationErrors);
          return;
        }

        // Check for duplicate email
        if (employees.some(emp => emp.email === employeeData.email)) {
          const error = { email: 'Employee with this email already exists' };
          setError('Email already exists');
          setLoading(false);
          reject(error);
          return;
        }

        const newEmployee = {
          ...employeeData,
          id: `emp_${Date.now()}`,
          employeeId: `EMP${String(employees.length + 1).padStart(3, '0')}`,
          status: 'Active'
        };

        setEmployees([...employees, newEmployee]);
        setLoading(false);
        resolve(newEmployee);
      }, 500);
    });
  };

  // READ - Get all employees
  const getAllEmployees = () => {
    return employees;
  };

  // READ - Get single employee by ID
  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id);
  };

  // UPDATE - Update employee
  const updateEmployee = (id, updatedData) => {
    return new Promise((resolve, reject) => {
      setError(null);
      setLoading(true);

      setTimeout(() => {
        const validationErrors = validateEmployee(updatedData);
        if (validationErrors) {
          setError('Validation failed');
          setLoading(false);
          reject(validationErrors);
          return;
        }

        // Check for duplicate email (excluding current employee)
        if (employees.some(emp => emp.email === updatedData.email && emp.id !== id)) {
          const error = { email: 'Another employee with this email already exists' };
          setError('Email already exists');
          setLoading(false);
          reject(error);
          return;
        }

        const updatedEmployees = employees.map(emp =>
          emp.id === id ? { ...emp, ...updatedData } : emp
        );

        const updatedEmployee = updatedEmployees.find(emp => emp.id === id);
        if (!updatedEmployee) {
          setError('Employee not found');
          setLoading(false);
          reject(new Error('Employee not found'));
          return;
        }

        setEmployees(updatedEmployees);
        setLoading(false);
        resolve(updatedEmployee);
      }, 500);
    });
  };

  // DELETE - Delete employee
  const deleteEmployee = (id) => {
    return new Promise((resolve, reject) => {
      setError(null);
      setLoading(true);

      setTimeout(() => {
        const employee = employees.find(emp => emp.id === id);
        if (!employee) {
          setError('Employee not found');
          setLoading(false);
          reject(new Error('Employee not found'));
          return;
        }

        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
        setLoading(false);
        resolve(employee);
      }, 500);
    });
  };

  const value = {
    employees,
    loading,
    error,
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    setError
  };

  return (
    <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within EmployeeProvider');
  }
  return context;
};
