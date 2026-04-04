# Multi-Catalog Bill Generator System - Frontend

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
npm start
```

The frontend will run on `http://localhost:3000`

### 3. Configure Backend API URL

If your backend is running on a different port, update the `API_BASE_URL` in:
- [src/App.js](src/App.js#L5)
- [src/components/BillGenerator.js](src/components/BillGenerator.js#L6)
- [src/components/BillHistory.js](src/components/BillHistory.js#L5)
- [src/components/CatalogManager.js](src/components/CatalogManager.js#L5)

Change:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Project Structure

- **public/** - HTML template
- **src/** - React source code
  - **components/** - React components
    - `BillGenerator.js` - Create and manage bills
    - `BillHistory.js` - View and search past bills
    - `CatalogManager.js` - Manage catalogs
    - `BillItems.js` - Display bill items table
    - `BillSummary.js` - Bill summary with totals
  - **utils/** - Helper functions
  - `App.js` - Main application component
  - `index.js` - React entry point

## Key Features Implemented

1. **Multi-Catalog Management** - Switch between Entrance, Donation, and Product catalogs
2. **Dynamic Bill Creation** - Add/remove items in real-time
3. **Discount & Tax Calculation** - Percentage or fixed amount discounts
4. **Invoice Management** - Unique invoice numbers and timestamps
5. **Bill History** - Search, filter, and view past bills
6. **Local Storage Fallback** - Works without backend connection
7. **Print-friendly Layout** - Professional invoice printing
8. **Responsive Design** - Works on tablets and mobile devices

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Notes

- The application has built-in fallback to localStorage if the backend is unavailable
- All bill data is automatically saved to both backend and localStorage
- The invoice number is automatically generated with a unique format: `INV-XXXXXX-XXXX`
