# 🎯 DOCKER COMMANDS - QUICK CARD

## 📍 Working Directory
```
D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment
```

---

## ⚡ TOP 5 COMMANDS YOU'LL USE

### 1. START EVERYTHING (First time)
```powershell
docker-compose up -d --build
```
⏱️ Time: 2-3 minutes

### 2. CHECK STATUS
```powershell
docker-compose ps
```
📊 Shows if all 3 containers running

### 3. VIEW LOGS
```powershell
docker-compose logs -f
```
👁️ Watch what's happening (Ctrl+C to exit)

### 4. RESTART EVERYTHING
```powershell
docker-compose restart
```
🔄 When something's stuck

### 5. STOP EVERYTHING (Keep data)
```powershell
docker-compose stop
```
🛑 Pause without losing data

---

## 🌐 OPEN IN BROWSER

```
http://localhost:8082           ← Main App (Employees)
http://localhost:8081/swagger   ← API Documentation
```

---

## 📋 ALL COMMANDS

| Command | What It Does | Time |
|---------|------------|------|
| `docker-compose up -d --build` | Build & start all | 2-3 min |
| `docker-compose up -d` | Start (no rebuild) | 10-15 sec |
| `docker-compose ps` | Show status | 1 sec |
| `docker-compose logs -f` | View live logs | Streaming |
| `docker-compose restart` | Restart all | 5-10 sec |
| `docker-compose stop` | Stop all (keep data) | 2-5 sec |
| `docker-compose start` | Start stopped ones | 10-15 sec |
| `docker-compose down` | Remove containers | 5 sec |
| `docker-compose down -v` | Delete everything | 5 sec |
| `docker-compose up -d --build ems-mvc-day2` | Rebuild just MVC | 1 min |

---

## 📊 SINGLE CONTAINER COMMANDS

```powershell
# View specific logs
docker-compose logs -f ems-mvc-day2
docker-compose logs -f ems-api-day2
docker-compose logs -f mssql-day2

# Rebuild specific
docker-compose up -d --build ems-mvc-day2

# Restart specific
docker-compose restart ems-mvc-day2

# View stats
docker stats
```

---

## 💾 DATABASE COMMANDS

```powershell
# Connect to SQL Server
docker exec -it mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123!

# Run SQL query directly
docker exec -it mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123! -Q "USE EmsDbDay2; SELECT * FROM Employees;"
```

---

## 🚀 COMMON SCENARIOS

### "I just started working"
```powershell
docker-compose ps              # Check if running
docker-compose start           # Start if needed
start http://localhost:8082    # Open app
```

### "Something's broken"
```powershell
docker-compose logs -f         # See error
docker-compose restart         # Try restart
# If still broken:
docker-compose down -v         # Full reset
docker-compose up -d --build   # Start fresh
```

### "I want to stop for lunch"
```powershell
docker-compose stop            # Stops all, keeps data
# Come back after lunch
docker-compose start           # 10 seconds - back to work!
```

### "I'm done for the day"
```powershell
docker-compose stop            # Gracefully stop
# Your data is saved!
```

### "I need a completely fresh start"
```powershell
docker-compose down -v         # Delete everything
docker-compose up -d --build   # Fresh start
```

---

## ✅ VERIFY EVERYTHING WORKS

```powershell
# 1. Check containers
docker-compose ps
# Should show 3 containers all "Up"

# 2. Open app
start http://localhost:8082

# 3. Create employee
# - Click Employees
# - Click Add New Employee
# - Fill form, click Save

# 4. Check database
docker exec -it mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123! -Q "USE EmsDbDay2; SELECT * FROM Employees;"

# 5. Check API
start http://localhost:8081/swagger
```

All working? ✅ YOU'RE GOOD TO GO!

---

## 🎯 PORTS REFERENCE

```
Port 8082   ← MVC App (Your main app)
Port 8081   ← API/Swagger (API documentation)
Port 1434   ← SQL Server (Database)
```

---

## 💡 PRO TIPS

1. **Always check logs first:** `docker-compose logs -f`
2. **Use `docker-compose restart` not `down` & `up`** - faster
3. **Keep terminal open with logs** - troubleshoot faster
4. **Backup database before `down -v`** - deletes everything
5. **Run commands from Assignment directory** - where docker-compose.yml is

---

## 🆘 HELP!

| Problem | Command |
|---------|---------|
| Not sure if running? | `docker-compose ps` |
| Want to see what's happening? | `docker-compose logs -f` |
| One container broken? | `docker-compose logs -f <name>` |
| Everything stuck? | `docker-compose restart` |
| Need total reset? | `docker-compose down -v` |
| Can't connect to app? | Check `http://localhost:8082` |
| API not responding? | Check `http://localhost:8081/swagger` |
| Database issue? | Check SQL connection command above |

---

**Quick Start:**
```powershell
docker-compose up -d --build    # One time
docker-compose ps               # Check status
start http://localhost:8082     # Open app
```

**Every Day:**
```powershell
docker-compose start            # Back to work
docker-compose stop             # End of day
```

**Documentation:**
- Full commands → DOCKER_COMMANDS.md
- Troubleshooting → README.md
- Diagrams → VISUAL_GUIDE.md
- Quick start → QUICKSTART.md

---

**Status:** ✅ READY TO RUN
**All 3 Containers:** ✅ RUNNING
**Main App:** ✅ http://localhost:8082
**API:** ✅ http://localhost:8081/swagger

🚀 **LET'S GO!**

