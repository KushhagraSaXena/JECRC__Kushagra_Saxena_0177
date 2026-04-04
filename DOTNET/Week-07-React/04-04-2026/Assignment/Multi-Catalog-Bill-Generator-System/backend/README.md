# Multi-Catalog Bill Generator System - Backend API

## Setup Instructions

### 1. Prerequisites
- .NET 8.0 SDK installed
- No additional extensions needed for SQLite (built into Entity Framework Core)

### 2. Create the Database

```bash
cd backend
dotnet ef database update
```

Or use the automatic database creation in Program.cs (already configured)

### 3. Run the Backend Server

```bash
dotnet run
```

The API will run on `https://localhost:5001` or `http://localhost:5000`

### 4. Update Frontend API URL

If the backend runs on a different port, update the `API_BASE_URL` in frontend components:
- [frontend/src/App.js](../frontend/src/App.js#L5)
- [frontend/src/components/BillGenerator.js](../frontend/src/components/BillGenerator.js#L6)
- [frontend/src/components/BillHistory.js](../frontend/src/components/BillHistory.js#L5)
- [frontend/src/components/CatalogManager.js](../frontend/src/components/CatalogManager.js#L5)

## Project Structure

- **Models/** - Database entity models
  - `CatalogItem.cs` - Catalog items for different categories
  - `Bill.cs` - Bill/Invoice entities
  - `BillItem.cs` - Individual items in a bill
- **DTOs/** - Data Transfer Objects for API requests/responses
- **Controllers/** - API endpoints
  - `CatalogsController.cs` - CRUD operations for catalog items
  - `BillsController.cs` - CRUD operations for bills
- **Data/** - Database context
  - `ApplicationDbContext.cs` - Entity Framework Core DbContext
- `Program.cs` - Application startup configuration
- `appsettings.json` - Configuration file

## SQLite Database Configuration

**Location:** `BillGenerator.db` (created in the backend root directory)

**Configuration File:** [appsettings.json](appsettings.json)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=BillGenerator.db"
  }
}
```

**No additional extensions needed!** SQLite support is built into Entity Framework Core 8.0.

### To move or backup the database:
Simply copy the `BillGenerator.db` file to the desired location and update the connection string path in `appsettings.json`.

## API Endpoints

### Catalogs
- `GET /api/catalogs` - Get all catalog items
- `GET /api/catalogs/{category}` - Get items by category (entrance, donation, product)
- `POST /api/catalogs` - Create new catalog item
- `PUT /api/catalogs/{id}` - Update catalog item
- `DELETE /api/catalogs/{id}` - Delete catalog item

### Bills
- `GET /api/bills` - Get all bills
- `GET /api/bills/{invoiceNumber}` - Get bill by invoice number
- `POST /api/bills` - Create new bill
- `PUT /api/bills/{invoiceNumber}` - Update bill
- `DELETE /api/bills/{invoiceNumber}` - Delete bill
- `GET /api/bills/daily-summary/{date}` - Get daily sales summary

## Swagger/OpenAPI Documentation

Once the backend is running, access the interactive API documentation at:
- `http://localhost:5000/swagger` (HTTP)
- `https://localhost:5001/swagger` (HTTPS)

## Database Schema

### CatalogItems Table
- `Id` (PK) - Primary Key
- `Name` - Item name (max 200 chars)
- `Price` - Item price (decimal)
- `Category` - Category type: entrance, donation, product
- `CreatedAt` - Creation timestamp
- `UpdatedAt` - Last update timestamp

### Bills Table
- `Id` (PK) - Primary Key
- `InvoiceNumber` - Unique invoice identifier
- `BillDate` - Date/time of bill
- `Subtotal` - Total before discount and tax
- `Discount` - Discount amount
- `DiscountType` - "percentage" or "fixed"
- `TaxRate` - Tax percentage
- `Tax` - Tax amount
- `Total` - Final total
- `Notes` - Optional notes
- `CreatedAt` - Creation timestamp
- `UpdatedAt` - Last update timestamp

### BillItems Table
- `Id` (PK) - Primary Key
- `BillId` (FK) - Reference to Bill
- `ItemName` - Name of the item
- `Price` - Price of the item
- `Quantity` - Quantity purchased
- `Category` - Item category
- `CreatedAt` - Creation timestamp

## Available Commands

```bash
# Create database from migrations
dotnet ef database update

# Create a new migration
dotnet ef migrations add MigrationName

# View database
# You can use any SQLite browser tool to open BillGenerator.db

# Run tests (when test project is added)
dotnet test

# Publish for production
dotnet publish -c Release
```

## Notes

- CORS is enabled for all origins in development (change in production)
- SQLite database is automatically created on first run
- Swagger UI is available in development environment
- All timestamps are stored in UTC
- Database supports concurrent bill creation and updates
