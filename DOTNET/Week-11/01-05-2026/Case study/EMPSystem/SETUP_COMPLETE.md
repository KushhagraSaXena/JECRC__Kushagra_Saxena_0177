# ✅ EMP System - Complete Setup & Deployment Guide

## 🎉 Setup Completed Successfully!

Your ASP.NET Core 9.0 Employee Management System has been fully configured with SQLite and Docker containerization.

---

## 📋 What Was Completed

### 1. ✅ Program.cs Configuration
- Added Entity Framework Core with SQLite provider
- Configured DbContext dependency injection
- Added automatic database migration on application startup
- Full setup for Dependency Injection

```csharp
// DbContext registration with SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Auto-migrate database on startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}
```

### 2. ✅ Database Configuration
- Changed from SQL Server to **SQLite**
- Connection string: `Data Source=emp_system.db`
- Works both locally and in Docker containers
- Lightweight, serverless, perfect for development and small-scale apps

**appsettings.json:**
```json
"ConnectionStrings": {
    "DefaultConnection": "Data Source=emp_system.db"
}
```

### 3. ✅ Employee Controller - Full CRUD
**File:** `Controllers/EmployeeController.cs`

Implemented methods:
- `Index()` - List all employees
- `Create()` - Add new employee (GET & POST)
- `Edit()` - Update employee (GET & POST)
- `Details()` - View employee information
- `Delete()` - Remove employee (GET & POST)

All with proper validation, error handling, and async operations.

### 4. ✅ Views Created
**Location:** `Views/Employee/`

| View | Purpose |
|------|---------|
| `Index.cshtml` | Display all employees in a responsive table |
| `Create.cshtml` | Form to add new employee |
| `Edit.cshtml` | Form to update employee details |
| `Details.cshtml` | Show full employee information |
| `Delete.cshtml` | Confirm deletion page |

All views use:
- Bootstrap 5 for styling
- Razor syntax for server-side rendering
- ASP.NET tag helpers for forms and validation
- Responsive design

### 5. ✅ Entity Framework Migrations
**Location:** `Migrations/`

Created migrations:
- `InitialCreate` - Initial database schema
- `UpdateEmployeeNullable` - Updated Employee model with nullable properties

Database automatically created on first run.

### 6. ✅ Docker Setup

**Dockerfile:**
- Multi-stage build for optimized image size
- Base image: `mcr.microsoft.com/dotnet/aspnet:9.0`
- Automatically creates `/app/data` directory for SQLite database
- Production-ready configuration

**docker-compose.yml:**
- Single service: `empsystem`
- Port mapping: `8080:80`
- Persistent volume: `empsystem-data` for database persistence
- Custom network: `empsystem-network`

**Features:**
- ✅ Data persists between container restarts
- ✅ Automatic database migration on startup
- ✅ Environment-based configuration
- ✅ Production environment settings

### 7. ✅ Project Dependencies Updated
**EMPSystem.csproj:**

Added NuGet Packages:
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="9.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.0" />
```

---

## 🚀 How to Run

### Option 1: Local Development

**Prerequisites:**
- .NET 9.0 SDK installed
- Visual Studio or VS Code (optional)

**Steps:**

```bash
cd "Case study\EMPSystem"

# Restore packages
dotnet restore

# Build project
dotnet build

# Run application
dotnet run
```

**Access at:**
- https://localhost:5001 or http://localhost:5000
- Navigate to: https://localhost:5001/Employee

---

### Option 2: Docker (Recommended)

**Prerequisites:**
- Docker Desktop installed and running

**Steps:**

```bash
cd "Case study\EMPSystem"

# Build and start
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

**Access at:**
- http://localhost:8080
- Navigate to: http://localhost:8080/Employee

**Other Docker commands:**

```bash
# View logs
docker-compose logs -f

# Stop container
docker-compose down

# Remove everything (including data)
docker-compose down -v

# Check running containers
docker ps

# Stop without removing
docker-compose stop

# Resume
docker-compose start
```

---

### Option 3: Quick Start Scripts

**Windows users can use batch files:**

```bash
# For Docker
./run-docker.bat

# For Local Development
./run-local.bat
```

---

## 📊 Employee Model

```csharp
public class Employee
{
    public int Id { get; set; }

    [Required]
    public string? Name { get; set; }

    public string? Department { get; set; }

    public decimal Salary { get; set; }

    public DateTime CreatedDate { get; set; }
}
```

---

## 🔗 API Routes

| Method | Route | Action | Description |
|--------|-------|--------|-------------|
| GET | `/Employee` | Index | List all employees |
| GET | `/Employee/Create` | Create | Show add form |
| POST | `/Employee/Create` | Create | Save new employee |
| GET | `/Employee/Details/{id}` | Details | View employee details |
| GET | `/Employee/Edit/{id}` | Edit | Show edit form |
| POST | `/Employee/Edit/{id}` | Edit | Update employee |
| GET | `/Employee/Delete/{id}` | Delete | Show delete confirmation |
| POST | `/Employee/Delete/{id}` | DeleteConfirmed | Delete employee |

---

## 📁 Project Structure

```
EMPSystem/
├── Controllers/
│   ├── HomeController.cs
│   └── EmployeeController.cs ✨ NEW
├── Models/
│   ├── Employee.cs (Updated)
│   └── ErrorViewModel.cs
├── Data/
│   └── AppDbContext.cs (Updated)
├── Views/
│   ├── Employee/ ✨ NEW
│   │   ├── Index.cshtml
│   │   ├── Create.cshtml
│   │   ├── Edit.cshtml
│   │   ├── Details.cshtml
│   │   └── Delete.cshtml
│   ├── Home/
│   ├── Shared/
│   └── _ViewImports.cshtml
├── Migrations/ ✨ NEW
│   ├── 20260501xxxxxx_InitialCreate.cs
│   ├── 20260501xxxxxx_UpdateEmployeeNullable.cs
│   └── AppDbContextModelSnapshot.cs
├── wwwroot/
├── Properties/
├── Program.cs ✨ UPDATED
├── appsettings.json ✨ UPDATED
├── Dockerfile ✨ UPDATED
├── docker-compose.yml ✨ NEW
├── .dockerignore
├── run-docker.bat ✨ NEW
├── run-local.bat ✨ NEW
├── README.md ✨ NEW
├── EMPSystem.csproj ✨ UPDATED
└── EMPSystem.slnx
```

---

## ✨ Key Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete employees
✅ **SQLite Database** - Lightweight, serverless, no setup required
✅ **Entity Framework Core** - Modern ORM with LINQ support
✅ **Docker Containerization** - Easy deployment anywhere
✅ **Data Persistence** - SQLite DB persists in Docker volume
✅ **Auto Migrations** - Database automatically created and migrated
✅ **Responsive UI** - Bootstrap 5 styling
✅ **Model Validation** - Required field validation
✅ **Error Handling** - Proper exception handling and 404 responses
✅ **Async/Await** - Modern async database operations

---

## 🐛 Troubleshooting

### Docker Issues

**Port 8080 already in use:**
```yaml
# In docker-compose.yml, change:
ports:
  - "8080:80"
# To:
ports:
  - "8081:80"
```

**Database connection error:**
```bash
# Remove volume and restart
docker-compose down -v
docker-compose up -d --build
```

**Container won't start:**
```bash
# Check logs
docker-compose logs

# Rebuild
docker-compose down
docker-compose up -d --build
```

### Local Development Issues

**Port 5001 already in use:**
```bash
# Specify different port
dotnet run --urls "http://localhost:5002"
```

**Database locked:**
```bash
# Delete database file and rebuild
rm emp_system.db
dotnet ef database update
```

**Migration errors:**
```bash
# Remove last migration and recreate
dotnet ef migrations remove
dotnet ef migrations add <MigrationName>
dotnet ef database update
```

---

## 📚 Testing the Application

### Add Sample Employee:
1. Navigate to http://localhost:8080/Employee
2. Click "Add New Employee"
3. Fill in:
   - Name: John Doe
   - Department: Engineering
   - Salary: 60000
4. Click "Create"

### View Employees:
- All employees display in a table on the Index page

### Edit Employee:
- Click "Edit" button on any employee row
- Modify details
- Click "Update"

### Delete Employee:
- Click "Delete" button
- Confirm deletion
- Employee removed from database

---

## 🔄 Deployment Workflow

### Development → Docker → Production

1. **Develop Locally**
   ```bash
   dotnet run
   ```

2. **Test in Docker**
   ```bash
   docker-compose up -d --build
   ```

3. **Deploy to Server**
   - Push code to repository
   - Server pulls latest code
   - Runs: `docker-compose up -d --build`
   - Application deployed with persistent data

---

## 📞 Support

For issues or questions:

1. Check `docker-compose logs -f` for container errors
2. Check `dotnet run` output for local development errors
3. Verify database file exists: `ls -la emp_system.db` (Linux/Mac) or `dir emp_system.db` (Windows)
4. Clear everything and restart: `docker-compose down -v && docker-compose up -d --build`

---

## ✅ Checklist

- ✅ Program.cs configured with EF Core & SQLite
- ✅ Database connection string updated
- ✅ Employee model created with validation
- ✅ AppDbContext created
- ✅ EmployeeController with full CRUD
- ✅ All views created (Index, Create, Edit, Details, Delete)
- ✅ Database migrations created
- ✅ Dockerfile configured with data directory
- ✅ docker-compose.yml with volumes
- ✅ NuGet packages added
- ✅ Project builds without errors
- ✅ Docker image builds successfully
- ✅ Container runs and serves on port 8080
- ✅ Database auto-migrates on startup
- ✅ Data persists in Docker volume
- ✅ README and quick start scripts created

---

## 🎯 Summary

Your EMP System is now **fully functional** with:
- ✅ Complete backend setup with ASP.NET Core 9.0
- ✅ SQLite database with Entity Framework Core
- ✅ Full CRUD operations for employee management
- ✅ Professional UI with Bootstrap 5
- ✅ Docker containerization for easy deployment
- ✅ Automatic database setup and migration
- ✅ Data persistence in Docker volumes
- ✅ Production-ready configuration

**Ready to use in Docker:** `docker-compose up -d --build`
**Access at:** http://localhost:8080/Employee

Enjoy your employee management system! 🚀
