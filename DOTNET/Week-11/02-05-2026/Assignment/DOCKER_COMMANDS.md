# 🚀 DOCKER COMMANDS - QUICK REFERENCE

## 📍 YOUR WORKING DIRECTORY
```
D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment\
```

---

## ⚡ COMMAND 1: START ALL 3 CONTAINERS (MAIN COMMAND)

### **Option A: Using PowerShell Script (Easiest)**
```powershell
.\run-docker.ps1 -Action start
```

**What it does:**
- ✅ Builds images
- ✅ Creates 3 containers
- ✅ Starts services
- ✅ Waits for initialization
- ✅ Shows status

**Time:** 2-3 minutes on first run

### **Option B: Using Docker Compose Direct**
```powershell
docker-compose up -d --build
```

**What it does:**
- ✅ Builds fresh images
- ✅ Creates containers
- ✅ Runs in background (-d = detached)
- ✅ Auto-starts on reboot (unless stopped)

**Output:** You'll see build progress, then container names

### **Option C: Without Rebuild (Faster)**
```powershell
docker-compose up -d
```

**What it does:**
- ✅ Starts existing containers
- ✅ No rebuilding
- ✅ Much faster (10-15 seconds)

**Use when:** You've already built images before

---

## ✅ COMMAND 2: VERIFY ALL CONTAINERS ARE RUNNING

```powershell
docker-compose ps
```

**Expected Output:**
```
NAME              STATUS              PORTS
ems-mvc-day2      Up (healthy)        0.0.0.0:8082->8080/tcp
ems-api-day2      Up (healthy)        0.0.0.0:8081->8080/tcp
ems-mssql-day2    Up (healthy)        0.0.0.0:1433->1433/tcp
```

**What to look for:**
- ✅ All 3 containers show "Up"
- ✅ Status shows "healthy" (if health checks are implemented)
- ✅ All ports are mapped correctly

---

## 🌐 COMMAND 3: ACCESS YOUR APPLICATION

### **After containers are running, open these in your browser:**

```
http://localhost:8082       (MVC Application - Main App)
http://localhost:8081/swagger  (API Documentation - Swagger)
```

**Or via PowerShell:**
```powershell
start http://localhost:8082
start http://localhost:8081/swagger
```

---

## 📊 COMMAND 4: VIEW LOGS (Troubleshooting)

### **View ALL container logs (streaming):**
```powershell
docker-compose logs -f
```

### **View SPECIFIC container logs:**
```powershell
# MVC Container logs
docker-compose logs -f ems-mvc-day2

# API Container logs
docker-compose logs -f ems-api-day2

# SQL Server logs
docker-compose logs -f mssql-day2
```

**Press Ctrl+C to stop viewing logs**

---

## 🛑 COMMAND 5: STOP ALL CONTAINERS (Keep data)

```powershell
docker-compose stop
```

**What it does:**
- ✅ Gracefully stops all containers
- ✅ Keeps all data intact
- ✅ Can restart later with `docker-compose start`

---

## ▶️ COMMAND 6: START STOPPED CONTAINERS

```powershell
docker-compose start
```

**What it does:**
- ✅ Restarts previously stopped containers
- ✅ Much faster than full build
- ✅ Preserves all data

---

## 🔄 COMMAND 7: RESTART ALL CONTAINERS

```powershell
docker-compose restart
```

**What it does:**
- ✅ Stops and restarts all containers
- ✅ Useful when services are stuck
- ✅ Data is preserved

---

## 🗑️ COMMAND 8: REMOVE ALL CONTAINERS (Keep data)

```powershell
docker-compose down
```

**What it does:**
- ✅ Removes all containers
- ✅ Removes networks
- ✅ Keeps data in volumes (can restart and have data)

---

## 💥 COMMAND 9: FULL RESET (Delete everything including data)

```powershell
docker-compose down -v
```

**Warning:** This deletes ALL data!

**What it does:**
- ✅ Removes containers
- ✅ Removes networks
- ✅ Removes volumes (data is deleted)
- ✅ Clean slate for fresh start

---

## 🔧 COMMAND 10: REBUILD ONE CONTAINER

### **Rebuild & restart just the MVC:**
```powershell
docker-compose up -d --build ems-mvc-day2
```

### **Rebuild & restart just the API:**
```powershell
docker-compose up -d --build ems-api-day2
```

### **Rebuild & restart just SQL:**
```powershell
docker-compose up -d --build mssql-day2
```

---

## 🔍 COMMAND 11: INSPECT CONTAINERS

### **Get detailed info about a container:**
```powershell
docker inspect ems-mvc-day2
docker inspect ems-api-day2
docker inspect ems-mssql-day2
```

### **View running processes in container:**
```powershell
docker top ems-mvc-day2
docker top ems-api-day2
```

---

## 💾 COMMAND 12: ACCESS DATABASE

### **Connect to SQL Server via container:**
```powershell
docker exec -it ems-mssql-day2 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SuperSecretPass123!
```

**Then run SQL queries:**
```sql
USE EmsDbDay2;
SELECT * FROM Employees;
GO
```

---

## 📈 COMMAND 13: MONITOR CONTAINER STATS

### **Real-time resource usage:**
```powershell
docker stats
```

### **One-time snapshot:**
```powershell
docker stats --no-stream
```

**Shows:**
- CPU usage
- Memory usage
- Network I/O
- Block I/O

---

## 🐚 COMMAND 14: ACCESS CONTAINER SHELL

### **Enter MVC container:**
```powershell
docker exec -it ems-mvc-day2 /bin/sh
```

### **Enter API container:**
```powershell
docker exec -it ems-api-day2 /bin/sh
```

**Exit with:** `exit`

---

## 🧹 COMMAND 15: CLEAN UP DOCKER

### **Remove unused images:**
```powershell
docker image prune
```

### **Remove stopped containers:**
```powershell
docker container prune
```

### **Remove unused volumes:**
```powershell
docker volume prune
```

### **Full cleanup (nuclear option):**
```powershell
docker system prune -a
```

---

## 📝 RECOMMENDED WORKFLOW

### **First Time Setup:**
```powershell
# 1. Navigate to Assignment directory
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"

# 2. Validate Docker is running
docker ps

# 3. Build and start all containers
docker-compose up -d --build

# 4. Wait 30 seconds, then check status
docker-compose ps

# 5. Open browser
start http://localhost:8082
```

### **Subsequent Starts (Faster):**
```powershell
# Just start without rebuild
docker-compose up -d

# Verify
docker-compose ps

# Open browser
start http://localhost:8082
```

### **When Something's Wrong:**
```powershell
# Check logs
docker-compose logs -f

# Restart everything
docker-compose restart

# Or full reset
docker-compose down -v
docker-compose up -d --build
```

### **Before Pushing to Git:**
```powershell
# Check logs for errors
docker-compose logs | more

# Verify all containers healthy
docker-compose ps
```

---

## 🎯 QUICK COMMAND CHEAT SHEET

```powershell
# START (Main command - use this!)
docker-compose up -d --build

# VERIFY
docker-compose ps

# LOGS
docker-compose logs -f

# STOP
docker-compose stop

# START AGAIN
docker-compose start

# FULL RESET
docker-compose down -v

# REBUILD ONE SERVICE
docker-compose up -d --build ems-mvc-day2

# ACCESS DB
docker exec -it ems-mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123!

# STATS
docker stats

# CLEAN UP
docker system prune -a
```

---

## 📊 CONTAINERS EXPLAINED

### Container 1: SQL Server (ems-mssql-day2)
```
Port: 1433
Purpose: Database storage
Login: sa / SuperSecretPass123!
Database: EmsDbDay2
Status: Must be healthy before API starts
```

### Container 2: API (ems-api-day2)
```
Port: 8081 (external), 8080 (internal)
Purpose: Business logic & REST endpoints
Depends on: SQL Server
URL: http://localhost:8081/swagger
```

### Container 3: MVC (ems-mvc-day2)
```
Port: 8082 (external), 8080 (internal)
Purpose: UI rendering
Depends on: API Container
URL: http://localhost:8082
```

---

## ✅ TROUBLESHOOTING COMMANDS

### **Port already in use?**
```powershell
netstat -ano | findstr :8082
taskkill /PID <PID> /F
```

### **Docker daemon not running?**
```powershell
# Start Docker Desktop manually from Start menu
# Then verify
docker ps
```

### **Container keeps crashing?**
```powershell
# Check logs
docker-compose logs ems-mvc-day2

# Try restart
docker-compose restart ems-mvc-day2

# Or rebuild
docker-compose up -d --build ems-mvc-day2
```

### **Can't connect to API from MVC?**
```powershell
# Test network connectivity
docker exec ems-mvc-day2 curl -i http://ems-api-day2:8080/api/employees

# Check API logs
docker-compose logs ems-api-day2
```

### **Database not initializing?**
```powershell
# Check SQL logs
docker-compose logs ems-mssql-day2

# Verify SQL is healthy
docker-compose ps | findstr mssql

# Manual check
docker exec -it ems-mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123! -Q "SELECT 1"
```

---

## 🎯 SUCCESS INDICATORS

After running `docker-compose up -d --build`, you should see:

✅ Build output for 3 images
✅ Containers created and started
✅ All services showing "Up" in `docker-compose ps`
✅ http://localhost:8082 loads in browser
✅ http://localhost:8081/swagger shows API docs
✅ Can create/view employees

---

## 📞 QUICK HELP

| Problem | Command |
|---------|---------|
| Nothing works | `docker-compose ps` (check status) |
| Want to see what's happening | `docker-compose logs -f` |
| Services keep restarting | `docker-compose logs ems-api-day2` |
| Port conflict | `netstat -ano \| findstr :8082` |
| Complete reset | `docker-compose down -v` |
| Just restart | `docker-compose restart` |

---

**Status:** ✅ Ready to Run
**Time to Start:** 2-3 minutes
**Time to Restart:** 10-15 seconds

