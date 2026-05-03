# 🚀 Employee Management System - Complete Setup

> A modern 3-tier microservice architecture running in Docker containers with MVC UI, REST API, and SQL Server database.

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Project Structure](#project-structure)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### For Windows Users (Easiest)

**Option 1: Using Batch File**
```bash
Double-click: run-docker.bat
Select option: 1 (Start All Containers)
```

**Option 2: Using PowerShell**
```powershell
.\run-docker.ps1 -Action start
```

**Option 3: Manual Docker Compose**
```bash
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"
docker-compose up -d --build
```

Then open: 🌐 **http://localhost:8082**

---

## 🏗️ Architecture

### 3-Tier Microservices

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                              │
│                  http://localhost:8082                       │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP Request
                           ▼
        ╔══════════════════════════════════════╗
        ║  MVC Container (ems-mvc-day2)        ║
        ║  ✓ Razor Pages/MVC Views              ║
        ║  ✓ Bootstrap UI                       ║
        ║  ✓ Employee Management Pages          ║
        ║  Port: 8082 ← 8080                    ║
        ╚══════════════┬═════════════════════════╝
                       │ HTTP API Call
                       ▼
        ╔══════════════════════════════════════╗
        ║  API Container (ems-api-day2)        ║
        ║  ✓ REST API Endpoints                 ║
        ║  ✓ Swagger Documentation              ║
        ║  ✓ Business Logic                     ║
        ║  Port: 8081 ← 8080                    ║
        ╚══════════════┬═════════════════════════╝
                       │ SQL Query
                       ▼
        ╔══════════════════════════════════════╗
        ║  SQL Container (ems-mssql-day2)      ║
        ║  ✓ SQL Server 2022 Express            ║
        ║  ✓ EmsDbDay2 Database                 ║
        ║  ✓ Employee Data Storage              ║
        ║  Port: 1433                           ║
        ╚══════════════════════════════════════╝

All containers communicate via: ems-network (Bridge Network)
```

### Communication Flow

1. **Browser** → **MVC** (HTTP): User makes request
2. **MVC** → **API** (HTTP): Retrieves employee data via API
3. **API** → **SQL** (Native): Queries database for records
4. **SQL** → **API** (Results): Returns data
5. **API** → **MVC** (JSON): Sends data to UI
6. **MVC** → **Browser** (HTML): Renders page with data

---

## ✅ Prerequisites

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| **Docker Desktop** | 4.0+ | [Download](https://www.docker.com/products/docker-desktop) |
| **Windows 10/11** | 20H2+ | - |
| **PowerShell** | 5.0+ | Built-in |
| **Git** | (Optional) | [Download](https://git-scm.com/) |

### System Requirements

- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: 5GB minimum
- **CPU**: 2+ cores
- **WSL 2**: Enabled (for Docker Desktop on Windows)

### Check Prerequisites

```powershell
# Check Docker
docker --version

# Check Docker daemon
docker ps

# Check available RAM
systeminfo | findstr /C:"Total Physical Memory"
```

---

## 💾 Installation

### Step 1: Clone Repository (Optional)

If using Git:
```powershell
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177"
git pull origin main
```

### Step 2: Navigate to Project

```powershell
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"
```

### Step 3: Verify Project Structure

```powershell
# Should see:
# ├── EmsMvcDay2/           (MVC Application)
# ├── EmsApiDay2/           (API Application)
# ├── docker-compose.yml    (Docker Compose config)
# ├── run-docker.bat        (Windows batch script)
# ├── run-docker.ps1        (PowerShell script)
# └── .env                  (Environment variables)

dir
```

---

## 🏃 Running the Application

### Start All Containers

#### Method 1: PowerShell (Recommended)
```powershell
.\run-docker.ps1 -Action start
```

#### Method 2: Batch File (Windows)
```cmd
run-docker.bat
```

#### Method 3: Direct Docker Compose
```powershell
docker-compose up -d --build
```

### Verify All Services Are Running

```powershell
# Check status
docker-compose ps

# Expected output:
# NAME              STATUS          PORTS
# ems-mvc-day2      Up (healthy)    0.0.0.0:8082->8080/tcp
# ems-api-day2      Up (healthy)    0.0.0.0:8081->8080/tcp
# ems-mssql-day2    Up (healthy)    0.0.0.0:1433->1433/tcp
```

### Access Services

| Service | URL | Purpose |
|---------|-----|---------|
| **Main App** | http://localhost:8082 | Employee Management UI |
| **API Docs** | http://localhost:8081/swagger | API Documentation |
| **Database** | localhost,1433 | SQL Server Connection |

---

## ✨ Features

### 🎨 User Interface (MVC)
- ✅ Modern Bootstrap 5 design
- ✅ Responsive layout for mobile/tablet
- ✅ Employee management dashboard
- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Professional card-based design
- ✅ Real-time data from API

### 🔌 API Layer
- ✅ RESTful Web API
- ✅ Swagger/OpenAPI documentation
- ✅ Automatic database migrations
- ✅ Error handling
- ✅ CORS enabled for cross-origin requests

### 💾 Database
- ✅ SQL Server 2022 Express
- ✅ Automatic schema creation
- ✅ Persistent data storage (volumes)
- ✅ Connection pooling
- ✅ Secure authentication

### 🐳 Docker
- ✅ Multi-stage builds (optimized images)
- ✅ Health checks for all services
- ✅ Automatic networking
- ✅ Volume management for data persistence
- ✅ Easy scaling and deployment

---

## 📁 Project Structure

```
Assignment/
├── EmsMvcDay2/                 # MVC Application (UI)
│   ├── Controllers/
│   │   ├── HomeController.cs
│   │   └── EmployeeController.cs
│   ├── Views/
│   │   ├── Home/
│   │   │   ├── Index.cshtml   (Enhanced with cards)
│   │   │   └── Privacy.cshtml
│   │   ├── Employee/
│   │   │   ├── Index.cshtml   (Employee list)
│   │   │   ├── Create.cshtml  (Add employee)
│   │   │   ├── Edit.cshtml    (Update employee)
│   │   │   └── Delete.cshtml  (Confirm delete)
│   │   └── Shared/
│   │       └── _Layout.cshtml (Master template)
│   ├── Models/
│   ├── Properties/
│   ├── wwwroot/               (CSS, JS, images)
│   ├── Program.cs
│   ├── appsettings.json
│   └── Dockerfile
│
├── EmsApiDay2/                # API Application (Backend)
│   ├── Controllers/
│   │   └── EmployeesController.cs
│   ├── Models/
│   │   ├── Employee.cs
│   │   └── AppDbContext.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── Dockerfile
│
├── docker-compose.yml         # Orchestration config
├── .env                       # Environment variables
├── run-docker.bat             # Windows batch launcher
├── run-docker.ps1             # PowerShell launcher
├── DOCKER_SETUP_GUIDE.md      # Docker documentation
└── README.md                  # This file
```

---

## 🔧 Development

### Common Tasks

#### View Real-time Logs
```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f ems-mvc-day2
docker-compose logs -f ems-api-day2
docker-compose logs -f mssql-day2
```

#### Stop Containers Without Removing Them
```powershell
docker-compose stop
```

#### Restart a Service
```powershell
docker-compose restart ems-mvc-day2
```

#### Rebuild a Specific Image
```powershell
docker-compose up -d --build ems-mvc-day2
```

#### Access Container Shell
```powershell
# Enter MVC container
docker exec -it ems-mvc-day2 /bin/sh

# Enter API container
docker exec -it ems-api-day2 /bin/sh
```

#### Connect to SQL Server
```powershell
# Via Docker exec
docker exec -it ems-mssql-day2 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SuperSecretPass123!

# Via SQL Server Management Studio
# Server: localhost,1433
# User: sa
# Password: SuperSecretPass123!
```

#### Monitor Resource Usage
```powershell
docker stats
```

---

## 🐛 Troubleshooting

### Issue 1: Port Already in Use

**Error:** `Port 8082 is already allocated`

**Solution 1: Stop the Conflicting Service**
```powershell
netstat -ano | findstr :8082
taskkill /PID <PID> /F
```

**Solution 2: Change Port in docker-compose.yml**
```yaml
ems-mvc-day2:
  ports:
    - "8083:8080"  # Changed from 8082 to 8083
```

Then restart:
```powershell
docker-compose up -d
```

### Issue 2: Cannot Connect to API from MVC

**Error:** `Unable to connect to http://ems-api-day2:8080`

**Diagnosis:**
```powershell
# Check if API is running
docker-compose ps ems-api-day2

# Check logs
docker-compose logs ems-api-day2

# Test connectivity
docker exec ems-mvc-day2 curl -i http://ems-api-day2:8080/api/employees
```

**Solution:**
```powershell
# Restart API
docker-compose restart ems-api-day2

# Or rebuild
docker-compose up -d --build ems-api-day2
```

### Issue 3: SQL Server Not Starting

**Error:** `mssql-day2 health check failed`

**Diagnosis:**
```powershell
# Check logs
docker-compose logs mssql-day2

# Check if port is in use
netstat -ano | findstr :1433
```

**Solution:**
```powershell
# Restart SQL Server
docker-compose restart mssql-day2

# If that fails, remove and recreate
docker-compose down -v
docker-compose up -d
```

### Issue 4: Docker Daemon Not Running

**Error:** `Cannot connect to Docker daemon`

**Solution:**
1. Open Docker Desktop (Windows Start → Search → Docker)
2. Wait for Docker to fully start (check system tray)
3. Retry your command

### Issue 5: Images Won't Build

**Error:** `COPY failed: file not found`

**Solution:**
```powershell
# Ensure you're in the correct directory
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"

# Verify directory structure
dir EmsMvcDay2
dir EmsApiDay2
dir docker-compose.yml

# Clean build
docker-compose build --no-cache
```

### Issue 6: "Connection Refused" from MVC to API

**Error:** `Connection refused (10.0.0.2:8080)`

**Cause:** MVC container can't reach API container

**Solution:**
```powershell
# Check network
docker network ls | findstr ems-network

# Inspect network
docker network inspect assignment_ems-network

# Verify both containers are on network
docker network inspect assignment_ems-network | findstr -A 10 "Containers"
```

---

## 📚 API Documentation

Once running, visit: **http://localhost:8081/swagger**

### Endpoints

```
GET  /api/employees       - Get all employees
GET  /api/employees/{id}  - Get employee by ID
POST /api/employees       - Create new employee
PUT  /api/employees/{id}  - Update employee
DELETE /api/employees/{id} - Delete employee
```

---

## 🔐 Security Notes

⚠️ **Current Configuration is for Development Only**

### Current Credentials
- **SQL User:** `sa`
- **SQL Password:** `SuperSecretPass123!`
- **No HTTPS:** Running on HTTP
- **No Authentication:** No user login required

### Production Recommendations
1. ✅ Use strong, randomly generated passwords
2. ✅ Store credentials in secrets vault
3. ✅ Enable HTTPS with certificates
4. ✅ Implement user authentication
5. ✅ Use Docker secrets instead of environment variables
6. ✅ Implement network policies
7. ✅ Enable SQL Server encryption
8. ✅ Set up proper firewall rules

---

## 📊 Performance Tips

### Reduce Build Time
```powershell
# Clear Docker builder cache
docker builder prune
```

### Monitor Containers
```powershell
# Real-time stats
docker stats

# Memory usage
docker stats --no-stream
```

### Optimize Database
```powershell
# Access SQL Server
docker exec -it ems-mssql-day2 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SuperSecretPass123!

# Run queries
USE EmsDbDay2;
SELECT * FROM Employees;
```

---

## 🆘 Support

### Getting Help

1. **Check Logs First**
   ```powershell
   docker-compose logs -f
   ```

2. **Review Error Messages**
   - Container names match configuration
   - Ports are not in use
   - Disk space is available

3. **Restart Services**
   ```powershell
   docker-compose restart
   ```

4. **Full Reset (Backup Data First!)**
   ```powershell
   docker-compose down -v
   docker-compose up -d --build
   ```

---

## 📝 Git & Version Control

### Push Changes to Repository

```powershell
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177"

# Stage changes
git add .

# Commit
git commit -m "Update: Enhanced UI and Docker setup"

# Push
git push origin main
```

---

## 🎯 Next Steps

1. ✅ **Run Containers:** `.\run-docker.ps1 -Action start`
2. ✅ **Open Application:** http://localhost:8082
3. ✅ **Add Employees:** Use "Add New Employee" button
4. ✅ **Manage Data:** Create, Edit, Delete records
5. ✅ **Check API:** http://localhost:8081/swagger
6. ✅ **Monitor Logs:** `docker-compose logs -f`

---

## 📜 License & Credits

- **Framework:** .NET 9, ASP.NET Core
- **UI:** Bootstrap 5, Razor Pages
- **Database:** SQL Server 2022 Express
- **Containerization:** Docker & Docker Compose
- **Architecture:** 3-Tier Microservices

---

## 📞 Contact

Repository: https://github.com/KushhagraSaXena/JECRC__Kushagra_Saxena_0177

---

## ✅ Checklist

Before deploying to production:

- [ ] All containers start successfully
- [ ] All services communicate properly
- [ ] Database persists data correctly
- [ ] UI is responsive on mobile
- [ ] API returns correct data
- [ ] Error handling is working
- [ ] Logs are being recorded
- [ ] Performance is acceptable
- [ ] Security credentials are changed
- [ ] HTTPS is configured

---

**Status:** ✅ Ready for Development & Testing

**Last Updated:** May 3, 2026

**Version:** 1.0 - Complete Microservices Setup

