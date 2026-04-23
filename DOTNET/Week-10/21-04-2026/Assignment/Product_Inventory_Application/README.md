# Product Inventory Application

A modern Angular 19 application for managing and displaying product inventory with advanced filtering and sorting capabilities.

## Features

✅ **Display All Products** - View complete product inventory in a structured table format  
✅ **Category Filtering** - Filter products by category using dropdown selector  
✅ **Price Sorting** - Sort products by price in ascending order  
✅ **Stock Status Toggle** - Show only in-stock products with a simple checkbox  
✅ **Responsive Design** - Works seamlessly on desktop and mobile devices  
✅ **Real-time Updates** - Instant filter and sort application  

## Product Structure

Each product contains:
- **id**: Unique product identifier
- **name**: Product name
- **category**: Product category
- **price**: Product price (float)
- **stock**: Available stock quantity (number)

Example:
```json
{
  "id": 1,
  "name": "Laptop",
  "category": "Electronics",
  "price": 850.50,
  "stock": 10
}
```

## How to Use

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
```
Navigates to `http://localhost:4200/`

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Using the Application

1. **Filter by Category**
   - Select a category from the dropdown
   - Click "Filter" to apply
   - Leave blank to see all products

2. **Sort by Price**
   - Click the "Price ($)" column header
   - Products sort by ascending price
   - Click again to remove sorting

3. **Show In-Stock Only**
   - Check the "Show In-Stock Only" checkbox
   - Only products with stock > 0 will display
   - Uncheck to see all products

4. **Reset Filters**
   - Click "Reset Filters" to clear all active filters
   - Returns to viewing all products

## Technology Stack

- **Angular**: 19.0.0+
- **TypeScript**: 5.4+
- **Node.js**: 22 (LTS)+
- **Angular CLI**: 19.0.0+

## Project Structure

```
Product_Inventory_Application/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── product.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.css
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── tsconfig.json
├── package.json
└── README.md
```

## Sample Products

The application includes 10 sample products across different categories:
- **Electronics**: Laptop, Mouse, Keyboard, Monitor
- **Furniture**: Desk Chair, Office Desk
- **Stationery**: Notebook, Pen Set
- **Accessories**: Laptop Stand, USB Cable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this application for learning and development purposes.

## Notes

- All product data is simulated in the service
- No backend API is required for this demo version
- Styling is responsive and mobile-friendly
- Components use Angular's standalone API (simplest setup)
