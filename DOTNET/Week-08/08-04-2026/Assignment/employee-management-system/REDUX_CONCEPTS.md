# Redux Concepts - Detailed Implementation Guide

## Table of Contents
1. [What is Redux](#what-is-redux)
2. [Store, Actions, and Reducers](#store-actions-and-reducers)
3. [Immutable State Principle](#immutable-state-principle)
4. [Redux Data Flow](#redux-data-flow-cycle)
5. [Reducer Examples](#reducer-examples)

---

## What is Redux

### Definition
Redux is a **predictable state container** for JavaScript applications that implements the Flux architecture pattern. It provides a centralized store for managing application state.

### Core Concepts

#### 1. Single Source of Truth
```javascript
// All app state in one place
const store = {
  employees: { employees: [], loading: false },
  auth: { isLoggedIn: false, user: null },
  ui: { theme: 'light', isLoading: false }
}
```

#### 2. State is Read-Only
```javascript
// ❌ WRONG - Cannot modify state directly
state.employees.push(newEmployee);

// ✅ CORRECT - Dispatch action to modify
dispatch(addEmployee(newEmployee));
```

#### 3. Changes via Pure Functions
```javascript
// ✅ Reducer is a pure function
function employeeReducer(state, action) {
  switch(action.type) {
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    default:
      return state;
  }
}
```

### When to Use Redux

#### ✅ Good Use Cases
- Complex state shared across many components
- Frequent state updates
- State changes triggered from multiple places
- Need for undo/redo functionality
- Performance optimization needed
- Application time-travel debugging required

#### ❌ Poor Use Cases
- Simple form with local component state
- Small app with minimal state
- Real-time collaborative editing
- Simple parent-child prop passing (<Context API is better)

---

## Store, Actions, and Reducers

### Store 🏪

The store is a single JavaScript object that holds the entire application state.

```javascript
// Store Configuration (src/redux/store.js)
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});

// Store Structure
{
  employees: {
    employees: [],
    error: null,
    loading: false
  },
  auth: {
    isLoggedIn: false,
    user: null,
    error: null
  },
  ui: {
    theme: 'light',
    isLoading: false,
    notification: null,
    sidebarOpen: true
  }
}
```

**Accessing Store State:**
```javascript
import { useSelector } from 'react-redux';

// Hook into store state
const employees = useSelector(state => state.employees.employees);
const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
const theme = useSelector(state => state.ui.theme);
```

### Actions 📤

Actions are plain JavaScript objects that describe **what happened** in the application.

```javascript
// Action Structure
{
  type: 'employees/addEmployee',    // Required: Action type
  payload: {                         // Optional: Data
    name: 'John Doe',
    email: 'john@company.com',
    department: 'Engineering',
    // ...
  }
}
```

**Creating and Dispatching Actions:**
```javascript
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/slices/employeeSlice';

function EmployeeForm() {
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    // Action is automatically created by Redux Toolkit
    dispatch(addEmployee(formData));
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Employee Actions:**
```javascript
// src/redux/slices/employeeSlice.js
reducers: {
  addEmployee: (state, action) => {
    state.employees.push({
      id: Date.now(),
      ...action.payload,
    });
  },
  updateEmployee: (state, action) => {
    const index = state.employees.findIndex(
      emp => emp.id === action.payload.id
    );
    if (index !== -1) {
      state.employees[index] = {
        ...state.employees[index],
        ...action.payload,
      };
    }
  },
  deleteEmployee: (state, action) => {
    state.employees = state.employees.filter(
      emp => emp.id !== action.payload
    );
  },
}
```

**Authentication Actions:**
```javascript
// src/redux/slices/authSlice.js
reducers: {
  login: (state, action) => {
    state.isLoggedIn = true;
    state.user = action.payload;
    state.error = null;
  },
  logout: (state) => {
    state.isLoggedIn = false;
    state.user = null;
    state.error = null;
  },
  setAuthError: (state, action) => {
    state.error = action.payload;
  },
}
```

### Reducers ⚙️

Reducers are **pure functions** that take current state and action, returning new state.

```javascript
// Reducer Rules:
// 1. Must be a pure function
// 2. Must not mutate original state
// 3. Must return new state
// 4. Must handle unknown action types

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [
          ...state.employees,
          { id: Date.now(), ...action.payload }
        ]
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload)
      };
    default:
      return state;
  }
}
```

**Redux Toolkit Simplifies:**
```javascript
// Redux Toolkit uses Immer under the hood
// Can write "mutative" code that is actually immutable

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      // This looks like mutation but is immutable!
      state.employees.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    deleteEmployee: (state, action) => {
      // Immer handles this efficiently
      state.employees = state.employees.filter(
        emp => emp.id !== action.payload
      );
    },
  },
});
```

---

## Immutable State Principle

### Why Immutability?

#### Problem with Mutable Code
```javascript
// ❌ WRONG - Direct mutation
const state = { employees: [{ id: 1, name: 'John' }] };
state.employees[0].name = 'Jane';

// Issues:
// - Cannot detect changes with reference comparison
// - Breaks time-travel debugging
// - Makes undo/redo impossible
// - React may not re-render properly
```

#### Correct Immutable Approach
```javascript
// ✅ CORRECT - Create new objects
const state = { employees: [{ id: 1, name: 'John' }] };
const newState = {
  ...state,
  employees: [
    ...state.employees.slice(0, 0),
    { ...state.employees[0], name: 'Jane' },
    ...state.employees.slice(1)
  ]
};

// Better: Use map
const newState = {
  ...state,
  employees: state.employees.map(emp =>
    emp.id === 1 ? { ...emp, name: 'Jane' } : emp
  )
};
```

### Benefits of Immutability

#### 1. Time-Travel Debugging
```javascript
// Can go back to any previous state
dispatch(undo());  // Revert last action
dispatch(redo());  // Redo action
```

#### 2. Performance Optimization
```javascript
// React can use reference comparison
const prevState = state;
const newState = { ...state };
prevState === newState  // false - change detected
```

#### 3. Undo/Redo Implementation
```javascript
// Track state history
const history = [initialState];
let currentIndex = 0;

function undo() {
  if (currentIndex > 0) {
    currentIndex--;
    dispatch loadState(history[currentIndex]);
  }
}

function redo() {
  if (currentIndex < history.length - 1) {
    currentIndex++;
    dispatch loadState(history[currentIndex]);
  }
}
```

#### 4. Predictability
```javascript
// Same input always produces same output
const result1 = reducer({ employees: [] }, addEmployee(emp));
const result2 = reducer({ employees: [] }, addEmployee(emp));
result1 === result2  // true
```

#### 5. Redux DevTools
```javascript
// Inspect every state change
// Jump to any state in history
// Dispatch actions
// See exact diffs
```

### Immutability Patterns

#### Spread Operator
```javascript
// Copy object
const newState = { ...state, name: 'John' };

// Update nested property
const newState = {
  ...state,
  user: { ...state.user, email: 'new@email.com' }
};
```

#### Array Methods
```javascript
// Add item
const newArray = [...state.employees, newEmployee];

// Remove item
const newArray = state.employees.filter(emp => emp.id !== id);

// Update item
const newArray = state.employees.map(emp =>
  emp.id === id ? { ...emp, ...updates } : emp
);

// Insert at position
const newArray = [
  ...state.employees.slice(0, index),
  newEmployee,
  ...state.employees.slice(index)
];
```

#### Immer (Used by Redux Toolkit)
```javascript
// Redux Toolkit uses Immer internally
// Can write "mutable" code that becomes immutable

import produce from 'immer';

const newState = produce(state, draft => {
  draft.employees.push(newEmployee);
  draft.employees[0].name = 'Jane';
  // Immer automatically creates new immutable state
});
```

---

## Redux Data Flow Cycle

### The Unidirectional Flow

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃       Redux Unidirectional Flow        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. USER INTERACTION
   └─> Click button, submit form, etc.

2. DISPATCH ACTION
   └─> dispatch(actionCreator(payload))

3. ACTION OBJECT
   └─> { type: '...', payload: {...} }

4. MIDDLEWARE
   └─> Logger logs action and previous state

5. REDUCER
   └─> Receives (currentState, action)
       Returns newState

6. STORE UPDATES
   └─> store.state = newState

7. NOTIFY SUBSCRIBERS
   └─> useSelector subscribers re-evaluate

8. COMPONENT RE-RENDER
   └─> Component gets new props from useSelector

9. UI UPDATES
   └─> User sees the change
```

### Step-by-Step Example

```javascript
// Step 1: User clicks button
<button onClick={() => dispatch(addEmployee(formData))}>
  Add Employee
</button>

// Step 2: Action created (Redux Toolkit does this)
action = {
  type: 'employees/addEmployee',
  payload: {
    name: 'John Doe',
    email: 'john@company.com',
    department: 'Engineering',
    position: 'Developer',
    salary: 50000,
    joinDate: '2024-01-15'
  }
}

// Step 3: Middleware processes (logger middleware)
console.group(`🔴 Action: employees/addEmployee`);
console.log('Pre-state:', store.getState());

// Step 4: Reducer processes action
reducerState = {
  employees: [
    {
      id: 1704067200000,
      name: 'John Doe',
      email: 'john@company.com',
      department: 'Engineering',
      position: 'Developer',
      salary: 50000,
      joinDate: '2024-01-15'
    }
  ]
}

// Step 5: Store updates
store.subscribers.forEach(subscriber => subscriber());

// Step 6: Component re-renders
const employees = useSelector(state => state.employees.employees);
// employees is now [{ id: 1704067200000, ... }]

// Step 7: UI reflects change
<tr key={1704067200000}>
  <td>John Doe</td>
  <td>john@company.com</td>
  ...
</tr>
```

### Complete Code Example

```javascript
// Component dispatching
function EmployeeForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Dispatch ADD action
    dispatch(addEmployee({
      name: 'John',
      email: 'john@company.com',
      department: 'Engineering',
      position: 'Developer',
      salary: 50000,
      joinDate: '2024-01-15'
    }));

    // 2. Dispatch NOTIFICATION action
    dispatch(showNotification({
      type: 'success',
      message: 'Employee added!'
    }));
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// Reducer handling
const employeeSlice = createSlice({
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push({
        id: Date.now(),
        ...action.payload
      });
    }
  }
});

// Component reading
function EmployeeList() {
  const employees = useSelector(state => state.employees.employees);
  return (
    <table>
      <tbody>
        {employees.map(emp => <tr key={emp.id}>...</tr>)}
      </tbody>
    </table>
  );
}
```

---

## Reducer Examples

### Employee Reducer
```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  error: null,
  loading: false,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Add new employee
    addEmployee: (state, action) => {
      state.employees.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    // Update existing employee
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        emp => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...action.payload,
        };
      }
    },

    // Delete employee
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        emp => emp.id !== action.payload
      );
    },

    // Bulk load employees
    loadEmployees: (state, action) => {
      state.employees = action.payload;
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  loadEmployees,
  setLoading,
  setError,
} = employeeSlice.actions;

export default employeeSlice.reducer;
```

### Authentication Reducer
```javascript
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },

    setAuthError: (state, action) => {
      state.error = action.payload;
    },

    restoreSession: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
});
```

### UI Reducer
```javascript
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    isLoading: false,
    notification: null,
    sidebarOpen: true,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    showNotification: (state, action) => {
      state.notification = action.payload;
    },

    clearNotification: (state) => {
      state.notification = null;
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});
```

---

## Summary

| Concept | Purpose | Example |
|---------|---------|---------|
| **Redux** | Predictable state management | Single source of truth for all app state |
| **Store** | Holds entire app state | `store.getState()` returns all state |
| **Action** | Describes what happened | `{ type: 'addEmployee', payload: {...} }` |
| **Reducer** | Specifies state changes | `(state, action) => newState` |
| **Dispatch** | Triggers action | `dispatch(addEmployee(data))` |
| **Selector** | Reads from store | `useSelector(state => state.employees)` |
| **Immutability** | New state objects each time | `[...state, newItem]` |
| **Middleware** | Intercepts actions | Logger, analytics, etc. |

