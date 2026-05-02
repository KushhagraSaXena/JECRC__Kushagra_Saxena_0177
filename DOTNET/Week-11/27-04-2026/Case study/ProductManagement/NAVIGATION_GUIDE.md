# Product Management System - Navigation Guide

## 🏠 Home Page
**URL:** `http://localhost:xxxx/` or `http://localhost:xxxx/Home/Index`

Features:
- Welcome dashboard with quick access cards
- Links to all main features
- System overview and statistics
- Quick navigation panels

---

## 📦 Products Section

### 1. **View All Products** (Index)
**URL:** `http://localhost:xxxx/Products/Index`
**HTTP Method:** GET

Features:
- Display all products in a table
- View product details (ID, Name, Price, Category, Description)
- Action buttons for each product:
  - **View** - Go to product details
  - **Edit** - Modify product information
  - **Delete** - Remove product
- Create New Product button at the top

---

### 2. **Product Details** (GetById)
**URL:** `http://localhost:xxxx/Products/Details/{id}`
**HTTP Method:** GET
**Example:** `http://localhost:xxxx/Products/Details/1`

Features:
- Display complete product information:
  - Product ID
  - Product Name
  - Price (formatted as currency)
  - Category Name
  - Full Description
  - Associated Tags
- Action buttons:
  - **Edit** - Modify the product
  - **Delete** - Remove the product
  - **Back to List** - Return to products list

---

### 3. **Create New Product**
**URL:** `http://localhost:xxxx/Products/Create`
**HTTP Method:** GET (form display) / POST (submission)

Form Fields:
- **Product Name** (Required) - Text input
- **Price** (Required) - Decimal number (0-10000)
- **Category ID** (Required) - Integer
- **Description** - Text area
- **Tags** - Comma-separated IDs (e.g., "1,2,3")

Actions:
- **Create** button - Save new product
- **Cancel** button - Return to products list

Sample data to try:
- Name: "Gaming Mouse"
- Price: 59.99
- Category ID: 1
- Description: "High-precision gaming mouse with RGB lighting"
- Tags: "1,2"

---

### 4. **Edit Product** (Update)
**URL:** `http://localhost:xxxx/Products/Edit/{id}`
**HTTP Method:** GET (form display) / POST (submission)
**Example:** `http://localhost:xxxx/Products/Edit/1`

Features:
- Pre-filled form with current product data
- Modify any product field:
  - Product Name
  - Price
  - Category ID
  - Description
  - Tags
- Save changes or cancel

---

### 5. **Delete Product**
**URL:** `http://localhost:xxxx/Products/Delete/{id}`
**HTTP Method:** GET (confirmation) / POST (deletion)
**Example:** `http://localhost:xxxx/Products/Delete/1`

Features:
- Confirmation page showing product details
- Confirm deletion message
- Action buttons:
  - **Delete** button - Permanently remove product
  - **Cancel** button - Return to products list

---

## 🔗 Navigation Structure

### Top Navigation Bar (All Pages)
```
ProductManagement (Logo/Brand)
├── Home
├── Products (Dropdown)
│   ├── View All Products
│   ├── Create Product
│   └── Privacy
└── Privacy
```

### Main Menu Flow
```
Home
├── Dashboard Cards
│   ├── View All Products → Products/Index
│   ├── Create Product → Products/Create
│   └── Statistics → Products/Index
├── Quick Access Links
│   ├── View All Products → Products/Index
│   └── Create Product → Products/Create
└── Features List
```

---

## 📊 Sample Data Included

### Categories
1. Electronics
2. Clothing
3. Books

### Products (Pre-loaded)
1. **Laptop** - $999.99 (Electronics)
   - Description: High-performance laptop with Intel i7 processor
   - Tags: New, Popular

2. **T-Shirt** - $29.99 (Clothing)
   - Description: Comfortable cotton t-shirt available in multiple colors
   - Tags: Sale

3. **C# Programming Book** - $49.99 (Books)
   - Description: Learn C# programming from beginner to advanced level
   - Tags: Featured

### Tags
- New
- Sale
- Popular
- Featured

---

## 🔄 User Journey Examples

### Journey 1: View All Products
1. Navigate to `http://localhost:xxxx/` (Home)
2. Click "View All Products" card or link
3. See all products in table format
4. Click "View" to see product details

### Journey 2: Create New Product
1. Navigate to `http://localhost:xxxx/`
2. Click "Create Product" card or use Products → Create Product menu
3. Fill in product details
4. Enter tags as comma-separated numbers
5. Click "Create"
6. Redirected to product details page

### Journey 3: Edit Product
1. Go to Products/Index
2. Find the product to edit
3. Click "Edit" button
4. Modify fields
5. Click "Save"
6. Redirected to products list

### Journey 4: Delete Product
1. Go to Products/Index
2. Click "Delete" button for product
3. Confirm product details on delete page
4. Click "Delete" to confirm
5. Product removed from database
6. Redirected back to products list

---

## 🎨 Bootstrap Styling
All pages use Bootstrap 5 styling with:
- Responsive design
- Professional cards and tables
- Dropdown menus
- Form validation
- Hover effects on cards
- Color-coded buttons (Primary, Success, Warning, Danger, Info)

---

## 📱 Device Compatibility
- Desktop (Full navigation)
- Tablet (Responsive layout with toggleable menu)
- Mobile (Hamburger menu for navigation)

---

## 🚀 Quick Links for Testing

| Feature | URL |
|---------|-----|
| Home | `/` or `/Home/Index` |
| All Products | `/Products/Index` |
| Product Details | `/Products/Details/1` |
| Create Product | `/Products/Create` |
| Edit Product | `/Products/Edit/1` |
| Delete Product | `/Products/Delete/1` |
| Privacy | `/Home/Privacy` |

---

## 💡 Tips
- Use the dropdown menu in the navbar to quickly access products
- Sample products are pre-loaded, so you can immediately test the views
- Try creating, editing, and deleting products to see the full functionality
- All data persists in the SQLite database
