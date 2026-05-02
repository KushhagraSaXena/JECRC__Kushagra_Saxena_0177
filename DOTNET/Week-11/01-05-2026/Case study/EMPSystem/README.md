# EMP System - Employee Management System

A complete ASP.NET Core 9.0 web application for managing employees using SQLite and Docker.

## Setup Completed

### ✅ What's Been Done:

1. **Program.cs** - Configured with:
   - EF Core DbContext registration
   - SQLite database provider
   - Automatic database migration on startup

2. **Database Configuration** - Changed to SQLite:
   - Connection string: `Data Source=emp_system.db`
   - Supports both local and Docker environments

3. **Employee Controller** - Full CRUD operations:
   - List all employees
   - View employee details
   - Create new employee
   - Edit employee information
   - Delete employees

4. **Views Created**:
   - `Index.cshtml` - List all employees with Bootstrap styling
   - `Create.cshtml` - Form to add new employee
   - `Edit.cshtml` - Form to update employee
   - `Details.cshtml` - View employee details
   - `Delete.cshtml` - Confirm delete page

5. **Docker Setup**:
   - `Dockerfile` - Multi-stage build for production
   - `docker-compose.yml` - Containerized application setup
   - SQLite database persisted in Docker volume

6. **Database Migration**:
   - Initial migration created (`InitialCreate`)
   - Ready for database initialization

---

## Running Locally

### Prerequisites
- .NET 9.0 SDK installed
- Visual Studio or VS Code (optional)

### Steps:

1. **Navigate to project directory:**
   ```bash
   cd "Case study\EMPSystem"
   ```

2. **Restore NuGet packages:**
   ```bash
   dotnet restore
   ```

3. **Build the project:**
   ```bash
   dotnet build
   ```

4. **Run the application:**
   ```bash
   dotnet run
   ```

5. **Access the application:**
   - Open browser: `https://localhost:5001` or `http://localhost:5000`
   - Navigate to: `/Employee` to see the employee management interface

---

## Running with Docker

### Prerequisites
- Docker Desktop installed and running

### Steps:

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Open browser: `http://localhost:8080`
   - Navigate to: `/Employee` to see the employee management interface

3. **View running containers:**
   ```bash
   docker ps
   ```

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

5. **View logs:**
   ```bash
   docker-compose logs -f
   ```

### Database Persistence
- SQLite database is stored in a Docker volume (`empsystem-data`)
- Data persists between container restarts
- To remove all data: `docker-compose down -v`

---

## Project Structure

```
EMPSystem/
├── Controllers/
│   ├── HomeController.cs
│   └── EmployeeController.cs        ✨ NEW
├── Models/
│   ├── Employee.cs
│   └── ErrorViewModel.cs
├── Data/
│   └── AppDbContext.cs              (DbContext for EF Core)
├── Views/
│   ├── Employee/                    ✨ NEW
│   │   ├── Index.cshtml
│   │   ├── Create.cshtml
│   │   ├── Edit.cshtml
│   │   ├── Details.cshtml
│   │   └── Delete.cshtml
│   ├── Home/
│   ├── Shared/
│   ├── _ViewImports.cshtml
│   └── _ViewStart.cshtml
├── Migrations/
│   ├── InitialCreate                ✨ NEW (Auto-generated)
│   └── AppDbContextModelSnapshot.cs
├── wwwroot/                         (Static files)
├── Properties/
├── Program.cs                       (Updated)
├── appsettings.json                 (Updated)
├── Dockerfile                       (Updated)
├── docker-compose.yml               ✨ NEW
├── .dockerignore                    ✨ NEW
└── EMPSystem.csproj                 (Updated)
```

---

## Features

### Employee Management
- **List Employees** - View all employees in a responsive table
- **Add Employee** - Create new employee record with validation
- **View Details** - See full employee information
- **Edit Employee** - Update employee details
- **Delete Employee** - Remove employee with confirmation

### Employee Model
```csharp
public class Employee
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Department { get; set; }
    public decimal Salary { get; set; }
    public DateTime CreatedDate { get; set; }
}
```

---

## Technology Stack

- **Framework**: ASP.NET Core 9.0 MVC
- **Database**: SQLite (with Entity Framework Core)
- **UI**: Razor Pages with Bootstrap 5
- **Containerization**: Docker & Docker Compose
- **Runtime**: .NET 9.0

---

## API Endpoints

| Method | Endpoint | Action |
|--------|----------|--------|
| GET | `/Employee` | List all employees |
| GET | `/Employee/Create` | Show create form |
| POST | `/Employee/Create` | Save new employee |
| GET | `/Employee/Details/{id}` | View employee details |
| GET | `/Employee/Edit/{id}` | Show edit form |
| POST | `/Employee/Edit/{id}` | Update employee |
| GET | `/Employee/Delete/{id}` | Show delete confirmation |
| POST | `/Employee/Delete/{id}` | Delete employee |

---

## Troubleshooting

### Docker Issues:
- **Port 8080 already in use**: Change port in `docker-compose.yml`
- **Database not persisting**: Ensure volume isn't removed: `docker volume ls`
- **Container won't start**: Check logs: `docker-compose logs`

### Local Development Issues:
- **Database locked error**: Delete `emp_system.db` and rebuild
- **Port 5001 already in use**: Specify port: `dotnet run --urls "http://localhost:5002"`
- **EF Core errors**: Run migrations: `dotnet ef database update`

---

## Sample Data

To add sample employees, modify the `Program.cs` with a seed method, or use the UI to create them.

---

## License

This is a training project.

