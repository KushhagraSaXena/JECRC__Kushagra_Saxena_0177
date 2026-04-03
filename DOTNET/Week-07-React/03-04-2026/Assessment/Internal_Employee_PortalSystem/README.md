# Internal Employee Portal System

A comprehensive React-based Employee Management System with role-based access control, authentication, and CRUD operations.

## ✨ Key Features

### 1. **Authentication System**
- Secure login/logout functionality
- Session management with localStorage
- Pre-defined user roles (Admin & Employee)
- Password validation

### 2. **Role-Based Access Control**
- **Admin Role**: Full access to employee management
- **Employee Role**: Can only view their own profile
- Protected routes prevent unauthorized access
- Automatic redirect based on user role

### 3. **Employee Management (CRUD)**
- **Create**: Add new employee records
- **Read**: View employee details
- **Update**: Edit employee information
- **Delete**: Remove employee records
- In-memory data storage with localStorage persistence

### 4. **Admin Dashboard**
- View all employees in a dynamic table
- Search employees by name, email, or ID
- Filter by department
- Add new employee with validation
- Edit existing employee records
- Delete employee records
- Employee statistics (total, active, departments, payroll)

### 5. **Employee Profile**
- View personal profile information
- Access restrictions clearly shown
- Employment details display
- Compensation information
- Account access indicators

### 6. **User Experience**
- Real-time search and filtering
- Form validation with error messages
- Loading states and spinners
- Success/error alerts
- Responsive design for all devices
- Modern, professional UI

## 📋 Task Completion

### ✅ Task 1: Implement full CRUD using Context API
- Created `EmployeeContext.js` with all CRUD operations
- Add, Read, Update, Delete functionality implemented
- Promise-based async operations
- Validation for all inputs

### ✅ Task 2: Restrict CRUD access only to Admin
- `AdminDashboard.js` accessible only to admin users
- `ProtectedRoute` component enforces role-based access
- Employee users redirected to profile page
- Unauthorized access prevented

### ✅ Task 3: Add Edit functionality (Update employee)
- Modal form for editing employees
- All fields can be updated
- Form validation before save
- Email uniqueness check
- Success confirmation message

### ✅ Task 4: Show only logged-in user data for Employee role
- `EmployeeProfile.js` displays only current user's data
- Employee cannot access other profiles
- Profile restrictions clearly displayed
- Role-based access information

### ✅ Task 5: Improve UI (validation, loading, alerts)
- Comprehensive form validation
- Loading spinners for async operations
- Success and error alerts
- Input error highlighting
- Responsive mobile design
- Keyboard navigation support

## 🔑 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Employee | `emp001` | `pass123` |
| Employee | `emp002` | `pass123` |
| Employee | `emp003` | `pass123` |

## 📁 Project Structure

```
Internal_Employee_PortalSystem/
├── src/
│   ├── context/
│   │   ├── AuthContext.js          # Authentication & authorization
│   │   └── EmployeeContext.js      # Employee CRUD operations
│   ├── components/
│   │   ├── ProtectedRoute.js       # Route protection wrapper
│   │   ├── Header.js               # Navigation header
│   │   └── Header.css              # Header styles
│   ├── pages/
│   │   ├── Login.js                # Login page with demo access
│   │   ├── Login.css               # Login styles
│   │   ├── AdminDashboard.js       # Admin employee management
│   │   ├── AdminDashboard.css      # Admin dashboard styles
│   │   ├── EmployeeProfile.js      # Employee profile view
│   │   └── EmployeeProfile.css     # Employee profile styles
│   ├── App.js                      # Main routing
│   ├── App.css                     # Global styles
│   ├── index.js                    # Entry point
│   ├── setupTests.js               # Test setup
│   └── reportWebVitals.js          # Performance tracking
├── public/
│   └── index.html                  # HTML template
├── package.json                    # Dependencies
└── README.md                       # Documentation
```

## 🚀 Installation & Running

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Navigate to project directory**
   ```bash
   cd Internal_Employee_PortalSystem
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Application will open at `http://localhost:3000`
   - You'll be redirected to login page

## 🔐 Security Features

- Password validation
- Session management with localStorage
- Protected routes for authenticated users
- Role-based access control
- Input validation and sanitization
- Error handling with user-friendly messages

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds and smooth transitions
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigation and focus indicators
- **Animations**: Smooth page transitions and alerts
- **Color Scheme**: Professional purple and blue gradients
- **Loading States**: Visual feedback during operations

## 🔄 Data Flow

1. **Login**: User credentials validated against predefined database
2. **Context**: User stored in AuthContext and localStorage
3. **Routing**: React Router directs to appropriate page based on role
4. **CRUD**: EmployeeContext manages employee data
5. **Persistence**: Data persisted to localStorage

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🛠️ Technologies Used

- **React**: v19.2.4 - UI library
- **React Router**: v6 - Client-side routing
- **Context API**: State management
- **CSS3**: Styling and animations
- **localStorage**: Data persistence
- **Jest & React Testing Library**: Testing

## 💡 Usage Examples

### Admin User
1. Login with `admin` / `admin123`
2. Access admin dashboard at `/admin`
3. Create, Update, Read, Delete employees
4. Search and filter employees
5. View statistics and payroll

### Employee User
1. Login with `emp001` / `pass123`
2. View personal profile
3. Cannot access other employees
4. Cannot access admin functions
5. See access restrictions

## ⚠️ Important Notes

- Data is stored in-memory and localStorage
- Data persists across browser refreshes
- Data resets when localStorage is cleared
- This is a demo application without backend API

## 🔄 Future Enhancements

- Backend API integration
- Database support (SQL/MongoDB)
- Email notifications
- File uploads
- Advanced reporting
- Department management
- User permissions
- Audit logging

## 📧 Support

For issues or questions, contact: hr@company.com

---

**Created**: April 3, 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
