# ⚡ EXACT COMMANDS TO COPY & PASTE

## 📍 Your Working Directory
```
D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment
```

---

## 🎯 COMMAND 1: NAVIGATE TO DIRECTORY

```powershell
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"
```

**Copy this entire line and paste into PowerShell**

---

## 🎯 COMMAND 2: CHECK IF RUNNING

```powershell
docker-compose ps
```

**Expected output:**
```
NAME              STATUS          PORTS
ems-mvc-day2      Up              0.0.0.0:8082->8080/tcp
ems-api-day2      Up              0.0.0.0:8081->8080/tcp
mssql-day2        Up              0.0.0.0:1434->1433/tcp
```

If all show "Up" = ✅ Everything running!

---

## 🎯 COMMAND 3: BUILD & START (First Time Only)

```powershell
docker-compose up -d --build
```

**Wait 2-3 minutes on first run**

Then verify with:
```powershell
docker-compose ps
```

---

## 🎯 COMMAND 4: START (Every Day - Much Faster)

```powershell
docker-compose start
```

**Takes 10-15 seconds!**

---

## 🎯 COMMAND 5: STOP (End of Day)

```powershell
docker-compose stop
```

**Data is saved! ✅**

---

## 🎯 COMMAND 6: VIEW LOGS

```powershell
docker-compose logs -f
```

**Press Ctrl+C to stop viewing logs**

View specific container:
```powershell
docker-compose logs -f ems-mvc-day2
docker-compose logs -f ems-api-day2
docker-compose logs -f mssql-day2
```

---

## 🎯 COMMAND 7: RESTART (If Something's Stuck)

```powershell
docker-compose restart
```

**Restarts all 3 containers**

---

## 🎯 COMMAND 8: FULL RESET (Delete Everything)

```powershell
docker-compose down -v
```

**Then rebuild:**
```powershell
docker-compose up -d --build
```

---

## 🎯 COMMAND 9: ACCESS DATABASE

```powershell
docker exec -it mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123!
```

**Then run SQL queries:**
```sql
USE EmsDbDay2;
SELECT * FROM Employees;
GO
```

**Exit with:** `EXIT`

---

## 🎯 COMMAND 10: QUICK DB QUERY (No SQL Console)

```powershell
docker exec -it mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123! -Q "USE EmsDbDay2; SELECT * FROM Employees;"
```

---

## 🎯 COMMAND 11: REBUILD ONE CONTAINER

**Rebuild MVC:**
```powershell
docker-compose up -d --build ems-mvc-day2
```

**Rebuild API:**
```powershell
docker-compose up -d --build ems-api-day2
```

**Rebuild SQL:**
```powershell
docker-compose up -d --build mssql-day2
```

---

## 🎯 COMMAND 12: MONITOR RESOURCES

```powershell
docker stats
```

**Shows CPU, memory, network usage**

**Press Ctrl+C to stop**

---

## 🎯 COMMAND 13: REMOVE CONTAINERS (Keep Data)

```powershell
docker-compose down
```

**No data is lost! Restart with:**
```powershell
docker-compose up -d
```

---

## 🎯 COMMAND 14: CLEAN UP IMAGES

```powershell
docker image prune
```

---

## 🎯 COMMAND 15: TEST CONNECTIVITY

**From MVC to API:**
```powershell
docker exec ems-mvc-day2 curl -i http://ems-api-day2:8080/api/employees
```

---

## 📋 YOUR DAILY ROUTINE

### Morning - Start Work
```powershell
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"
docker-compose start
docker-compose ps
start http://localhost:8082
```

### During Day - Check Status
```powershell
docker-compose ps
docker-compose logs -f
```

### Evening - End of Day
```powershell
docker-compose stop
```

---

## 🎯 QUICK REFERENCE TABLE

| Action | Command |
|--------|---------|
| Navigate to folder | `cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"` |
| Check status | `docker-compose ps` |
| Build & start | `docker-compose up -d --build` |
| Start (no build) | `docker-compose start` |
| Stop | `docker-compose stop` |
| Logs | `docker-compose logs -f` |
| Restart | `docker-compose restart` |
| Remove | `docker-compose down` |
| Database query | `docker exec -it mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123! -Q "USE EmsDbDay2; SELECT * FROM Employees;"` |
| Stats | `docker stats` |
| Full reset | `docker-compose down -v && docker-compose up -d --build` |

---

## 🌐 URLS TO ACCESS

### Copy and paste into browser:

**Main Application:**
```
http://localhost:8082
```

**API Documentation:**
```
http://localhost:8081/swagger
```

**Or open in PowerShell:**
```powershell
start http://localhost:8082
start http://localhost:8081/swagger
```

---

## 🆘 TROUBLESHOOTING COMMANDS

### If MVC not responding:
```powershell
docker-compose logs -f ems-mvc-day2
docker-compose restart ems-mvc-day2
```

### If API not responding:
```powershell
docker-compose logs -f ems-api-day2
docker-compose restart ems-api-day2
```

### If database not working:
```powershell
docker-compose logs -f mssql-day2
docker-compose restart mssql-day2
```

### If port conflict:
```powershell
netstat -ano | findstr :8082
taskkill /PID <PID> /F
```

### If everything broken:
```powershell
docker-compose down -v
docker-compose up -d --build
```

---

## ✅ COPY-PASTE WORKFLOW

### First Time:
1. Copy & run: `cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"`
2. Copy & run: `docker-compose up -d --build`
3. Wait 2-3 minutes
4. Copy & run: `docker-compose ps`
5. Copy & run: `start http://localhost:8082`

### Every Day After:
1. Copy & run: `cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"`
2. Copy & run: `docker-compose start`
3. Copy & run: `docker-compose ps`
4. Copy & run: `start http://localhost:8082`

---

## 🎯 3 ESSENTIAL COMMANDS

**You really only need 3:**

```powershell
# Morning
docker-compose start

# Check
docker-compose ps

# Night
docker-compose stop
```

**All done!**

---

## 📝 PASTE THIS INTO FILE

Save as `quick-commands.ps1` and run it:

```powershell
# Navigate to folder
Set-Location "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"

# Start containers
docker-compose up -d --build

# Wait for startup
Start-Sleep -Seconds 30

# Check status
docker-compose ps

# Open app
start http://localhost:8082
```

---

**Now you have all the exact commands you need!** ✅

Copy & paste them as needed. 🚀

