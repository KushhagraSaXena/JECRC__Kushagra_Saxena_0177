# 🐳 Employee Management System - Docker Compose Setup Guide

## 📋 Overview

This Docker Compose configuration orchestrates a complete 3-tier microservice architecture:

```
┌──────────────────────────────────────────────────────────────┐
│                    DOCKER NETWORK: ems-network               │
├────────────────────────┬───────────────────┬────────────────┤
│                        │                   │                │
│  MVC Container         │   API Container   │  SQL Container │
│  (ems-mvc-day2)        │  (ems-api-day2)   │  (mssql-day2)  │
│  Port: 8082            │   Port: 8081      │   Port: 1433   │
│  localhost:8082        │   :8080 (internal)│                │
│                        │                   │                │
└────────────────────────┴───────────────────┴────────────────┘
         ↓                      ↓                    ↓
    (Rendering)        (Processing)        (Storage)
```

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** installed and running ([Download](https://www.docker.com/products/docker-desktop))
- **Git** (for the repo management)
- Project files in: `D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment\`

### Step 1: Navigate to Assignment Directory

```powershell
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"
```

### Step 2: Build and Run All Containers

```powershell
docker-compose up -d --build
```

**What this command does:**
- `-d`: Run in detached mode (background)
- `--build`: Build images from Dockerfiles before starting

### Step 3: Verify All Containers Are Running

```powershell
docker-compose ps
```

Expected output:
```
NAME                 STATUS              PORTS
ems-mvc-day2         Up (healthy)        0.0.0.0:8082->8080/tcp
ems-api-day2         Up (healthy)        0.0.0.0:8081->8080/tcp
ems-mssql-day2       Up (healthy)        0.0.0.0:1433->1433/tcp
```

### Step 4: Access the Application

Open your browser and navigate to:

- **🌐 Main Application (MVC)**: [http://localhost:8082](http://localhost:8082)
- **📚 API Swagger Docs**: [http://localhost:8081/swagger/ui](http://localhost:8081/swagger)
- **🗄️ Database (SQL Server)**: `localhost:1433`

---

## 📊 Container Details

### 1. **SQL Server (mssql-day2)**
```yaml
Image: mcr.microsoft.com/mssql/server:2022-latest
Port: 1433 (Internal SQL port)
Username: sa
Password: SuperSecretPass123!
Database: EmsDbDay2
```

**Health Check:**
- Tests SQL connection every 10 seconds
- Waits 30 seconds before considering it ready
- Retries up to 5 times

### 2. **API Container (ems-api-day2)**
```yaml
Image: Built from ./EmsApiDay2/Dockerfile
Port: 8081 (External), 8080 (Internal)
Environment: Production
Base Address: http://ems-api-day2:8080
```

**Features:**
- ✅ Swagger UI enabled
- ✅ Auto-creates database on startup
- ✅ Depends on SQL Server being healthy
- ✅ Communicates with SQL via container name: `mssql-day2`

### 3. **MVC Container (ems-mvc-day2)**
```yaml
Image: Built from ./EmsMvcDay2/Dockerfile
Port: 8082 (External), 8080 (Internal)
Environment: Production
API Address: http://ems-api-day2:8080
```

**Features:**
- ✅ Rendered UI with Bootstrap styling
- ✅ Communicates with API via container name: `ems-api-day2`
- ✅ Depends on API being ready

---

## 🛑 Common Docker Compose Commands

### Stop All Containers
```powershell
docker-compose stop
```

### Remove All Containers (keep volumes/data)
```powershell
docker-compose down
```

### Remove Everything (including data)
```powershell
docker-compose down -v
```

### View Logs from All Services
```powershell
docker-compose logs -f
```

### View Logs from Specific Service
```powershell
docker-compose logs -f ems-mvc-day2
docker-compose logs -f ems-api-day2
docker-compose logs -f mssql-day2
```

### Restart a Specific Service
```powershell
docker-compose restart ems-mvc-day2
```

### Rebuild Specific Service
```powershell
docker-compose up -d --build ems-mvc-day2
```

---

## 🔧 Troubleshooting

### Issue: Port Already in Use

**Problem:** `Error: Port 8082 is already allocated`

**Solution:**
```powershell
# Find what's using the port
netstat -ano | findstr :8082

# Kill the process (if needed)
taskkill /PID <PID> /F

# Or change the port in docker-compose.yml
# Change "8082:8080" to "8083:8080"
```

### Issue: Containers Not Starting

**Check container logs:**
```powershell
docker-compose logs ems-mvc-day2
docker-compose logs ems-api-day2
docker-compose logs mssql-day2
```

### Issue: API Cannot Connect to Database

**Check SQL Server is ready:**
```powershell
docker exec ems-mssql-day2 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SuperSecretPass123! -Q "SELECT @@VERSION"
```

### Issue: MVC Cannot Connect to API

**Test connectivity between containers:**
```powershell
docker exec ems-mvc-day2 curl -i http://ems-api-day2:8080/api/employees
```

---

## 📝 Accessing the Database

### Via SQL Server Management Studio

1. **Server Name:** `localhost,1433`
2. **Authentication:** SQL Server Authentication
3. **Login:** `sa`
4. **Password:** `SuperSecretPass123!`
5. **Database:** `EmsDbDay2`

### Via Docker Exec

```powershell
docker exec -it ems-mssql-day2 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SuperSecretPass123!
```

Then run SQL queries:
```sql
USE EmsDbDay2;
SELECT * FROM Employees;
```

---

## 🌐 Network Architecture

All containers communicate via the `ems-network` bridge network:

| From | To | Connection | Port |
|------|----|-----------:|-----:|
| MVC | API | http://ems-api-day2 | 8080 |
| API | SQL | mssql-day2 | 1433 |
| Browser | MVC | http://localhost | 8082 |
| Browser | API | http://localhost | 8081 |

**Internal DNS Resolution:**
- `ems-mvc-day2` → resolves to MVC container
- `ems-api-day2` → resolves to API container
- `mssql-day2` → resolves to SQL container

---

## 📦 Data Persistence

SQL Server data is stored in a Docker volume named `mssql-data`:

```powershell
# View all volumes
docker volume ls

# Inspect volume
docker volume inspect assignment_mssql-data
```

**Data location:**
- **Windows:** `C:\ProgramData\Docker\volumes\assignment_mssql-data\_data`

Even if containers are removed, data persists unless you run:
```powershell
docker-compose down -v
```

---

## 🔐 Security Notes

⚠️ **For Development Only!**

The current setup uses default credentials suitable for development:
- SQL Password: `SuperSecretPass123!`
- No HTTPS configured
- All containers on same network

**For Production:**
1. Use strong, randomly generated passwords
2. Store passwords in environment files (not in compose file)
3. Enable HTTPS certificates
4. Use Docker secrets
5. Implement network segmentation

---

## ✅ Verification Checklist

After running `docker-compose up -d --build`:

- [ ] All 3 containers show "Up" status
- [ ] Can access http://localhost:8082 (MVC app)
- [ ] Can access http://localhost:8081/swagger (API docs)
- [ ] MVC can retrieve employee data
- [ ] Can create/edit/delete employees
- [ ] SQL Server accepts connections on port 1433

---

## 📊 Performance Tips

### Reduce Build Time
Use Docker layer caching:
```powershell
# Docker cache is used automatically, but you can clear it:
docker builder prune
```

### Monitor Resource Usage
```powershell
docker stats
```

### Speed Up SQL Startup
Current health check waits 30 seconds. For development, you can reduce `start_period`:
```yaml
start_period: 10s  # Reduce from 30s
```

---

## 🔄 Continuous Deployment

### Auto-Rebuild on Code Changes

For development, you might want to auto-rebuild:

```powershell
# Rebuild and restart specific service
docker-compose up -d --build ems-mvc-day2
```

Or monitor files with Docker Compose Watch (Docker Desktop 4.17+):
```yaml
watch:
  - action: rebuild
    path: ./EmsMvcDay2
    target: ems-mvc-day2
```

---

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [SQL Server Container Docs](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker)
- [ASP.NET Core Docker Docs](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/docker)

---

## 🎯 Next Steps

1. ✅ Run: `docker-compose up -d --build`
2. ✅ Verify: `docker-compose ps`
3. ✅ Test: Open [http://localhost:8082](http://localhost:8082)
4. ✅ Manage employees and enjoy! 🎉

---

**Status:** Ready for Development & Testing
**Architecture:** 3-Tier Microservices (MVC → API → SQL)
**Network:** Isolated Docker bridge network for security

