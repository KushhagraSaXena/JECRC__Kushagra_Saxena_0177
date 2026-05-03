# Docker Compose Workflow

## 🚀 Your First Run

### Step 1: Open PowerShell in the Assignment Directory

```powershell
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"
```

### Step 2: Run Docker Compose

**Option A: Using PowerShell Script (Recommended)**
```powershell
.\run-docker.ps1 -Action start
```

**Option B: Using Batch File**
```cmd
run-docker.bat
```

**Option C: Direct Command**
```powershell
docker-compose up -d --build
```

### Step 3: Wait for Services to Start

The first run may take 2-3 minutes:
- Building MVC image (30-60 seconds)
- Building API image (30-60 seconds)
- SQL Server initializing (30-60 seconds)
- Containers starting (10-20 seconds)

You'll see output like:
```
[+] Building 45.2s
[+] Running 4/4
  ✓ ems-mssql-day2 Healthy   1.5s
  ✓ ems-api-day2 Healthy     5.2s
  ✓ ems-mvc-day2 Healthy     8.1s
```

### Step 4: Verify All Containers Are Running

```powershell
docker-compose ps
```

Expected output:
```
NAME              COMMAND           STATUS              PORTS
ems-mvc-day2      dotnet EmsMvc...  Up (healthy)        0.0.0.0:8082->8080/tcp
ems-api-day2      dotnet EmsApi...  Up (healthy)        0.0.0.0:8081->8080/tcp
ems-mssql-day2    /opt/mssql/bi...  Up (healthy)        0.0.0.0:1433->1433/tcp
```

### Step 5: Access the Application

Open your browser and navigate to:

🌐 **http://localhost:8082**

---

## 📊 What's Running?

### Container 1: SQL Server (Port 1433)
- **Image:** `mcr.microsoft.com/mssql/server:2022-latest`
- **Container Name:** `ems-mssql-day2`
- **Database:** `EmsDbDay2`
- **Login:** `sa` / `SuperSecretPass123!`
- **Status:** Listen for API container

### Container 2: API (Port 8081)
- **Image:** Built from `EmsApiDay2/Dockerfile`
- **Container Name:** `ems-api-day2`
- **Startup:** Waits for SQL Server (health check)
- **URL:** http://localhost:8081/swagger
- **Database Access:** Connects via `mssql-day2:1433`
- **Purpose:** Process business logic & database queries

### Container 3: MVC Web App (Port 8082)
- **Image:** Built from `EmsMvcDay2/Dockerfile`
- **Container Name:** `ems-mvc-day2`
- **Startup:** Waits for API container
- **URL:** http://localhost:8082
- **API Access:** Connects via `ems-api-day2:8080`
- **Purpose:** Render UI and handle user requests

---

## 🎯 Quick Actions

### Stop All Containers (Keep Data)
```powershell
docker-compose stop
```

### Restart All Containers
```powershell
docker-compose restart
```

### View Logs (Streaming)
```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f ems-mvc-day2
docker-compose logs -f ems-api-day2
docker-compose logs -f mssql-day2
```

### Remove All Containers (Keep Data)
```powershell
docker-compose down
```

### Complete Reset (Delete Everything)
```powershell
docker-compose down -v
```

---

## 🌐 Testing the Application

### 1. Add an Employee
1. Go to http://localhost:8082
2. Click "Employees" in navbar
3. Click "Add New Employee"
4. Fill in Name and Department
5. Click "Create Employee"

### 2. View Employee List
- Navigate to http://localhost:8082/Employee
- See all employees in a table
- Click Edit or Delete buttons

### 3. Check Database
```powershell
# Enter SQL Server
docker exec -it ems-mssql-day2 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SuperSecretPass123!

# Run SQL query
USE EmsDbDay2;
SELECT * FROM Employees;
GO
```

### 4. Test API
Visit: http://localhost:8081/swagger

Try GET /api/employees endpoint

---

## 🔍 Monitoring

### View All Container Stats
```powershell
docker stats
```

### Check Individual Container
```powershell
docker stats ems-mvc-day2
```

### View Container Processes
```powershell
docker top ems-mvc-day2
```

---

## 🛠️ Development Workflow

### Make Changes to MVC Project
```powershell
# Edit files in EmsMvcDay2/

# Rebuild the container
docker-compose up -d --build ems-mvc-day2

# View logs
docker-compose logs -f ems-mvc-day2
```

### Make Changes to API Project
```powershell
# Edit files in EmsApiDay2/

# Rebuild the container
docker-compose up -d --build ems-api-day2

# View logs
docker-compose logs -f ems-api-day2
```

### Make Database Changes
```powershell
# Changes to models are auto-applied via EF Core

# Manually run SQL
docker exec -it ems-mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123!
```

---

## 🐛 Common Issues & Solutions

### "Port 8082 is already allocated"
```powershell
# Find what's using port 8082
netstat -ano | findstr :8082

# Kill the process (if it's old Docker)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
```

### "API Container keeps restarting"
```powershell
# Check logs
docker-compose logs ems-api-day2

# Wait for SQL Server to be ready
# The health check should handle this automatically

# If stuck, do hard restart
docker-compose down
docker-compose up -d --build
```

### "Cannot see data in database"
```powershell
# Verify table exists
docker exec -it ems-mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123! -Q "USE EmsDbDay2; SELECT * FROM Employees;"

# Check API logs for errors
docker-compose logs ems-api-day2

# Recreate database
docker-compose down -v
docker-compose up -d
```

### "MVC app loads but no data from API"
```powershell
# Test API directly
curl http://localhost:8081/api/employees

# Check API logs
docker-compose logs ems-api-day2

# Verify network connection
docker exec ems-mvc-day2 curl -v http://ems-api-day2:8080/api/employees
```

---

## 📱 Access from Mobile/Other Devices

### Within Same Network
Replace `localhost` with your computer's IP:

```
http://<your-ip>:8082
```

Find your IP:
```powershell
ipconfig
```

Look for "IPv4 Address" under your active network adapter.

Example: `http://192.168.1.100:8082`

---

## 🔐 Security Warning

⚠️ **This setup is for DEVELOPMENT ONLY**

Default credentials:
- Username: `sa`
- Password: `SuperSecretPass123!`

**Never use in production without:**
- Strong password generation
- Environment-based secrets
- HTTPS encryption
- User authentication
- Network isolation
- Backup & disaster recovery

---

## 📚 Useful Docker Commands Reference

```powershell
# View all images
docker images

# View all containers (running and stopped)
docker ps -a

# Remove unused images
docker image prune

# Remove all stopped containers
docker container prune

# Check network
docker network ls
docker network inspect assignment_ems-network

# Execute command in container
docker exec -it ems-mvc-day2 /bin/sh

# Copy file from container
docker cp ems-mvc-day2:/app/logs.txt ./logs.txt

# Inspect container
docker inspect ems-mvc-day2

# View events
docker events
```

---

## ✅ Verification Checklist

After running `docker-compose up -d --build`:

- [ ] All 3 containers show "Up" status
- [ ] Can access http://localhost:8082
- [ ] Can access http://localhost:8081/swagger
- [ ] Can create an employee
- [ ] Can view employees
- [ ] Can edit employee
- [ ] Can delete employee
- [ ] Database has employee records

---

## 📞 Need Help?

Check these files:
- `README.md` - Complete documentation
- `DOCKER_SETUP_GUIDE.md` - Docker-specific setup
- `run-docker.ps1 -Action help` - PowerShell helper

---

**Status:** ✅ Ready to Run

**Version:** 1.0

**Last Updated:** May 3, 2026

