# ⚡ QUICK START - DO THIS RIGHT NOW!

## 🎯 YOUR SYSTEM IS RUNNING!

```
✅ SQL Server        Port 1434   Up 4 hours
✅ API Server        Port 8081   Up 1 hour  
✅ MVC App           Port 8082   Up 39 min
```

---

## 🚀 ACTION #1: OPEN BROWSER (10 seconds)

### Copy this URL:
```
http://localhost:8082
```

### Paste into browser and press Enter

You'll see:
- 🏠 Professional home page
- 📊 Feature cards
- 👥 "Employees" link in navbar
- 🎨 Modern Bootstrap 5 design

---

## 🚀 ACTION #2: CLICK "EMPLOYEES" (5 seconds)

In the top navigation bar, click: **Employees**

URL becomes: `http://localhost:8082/Employee`

You'll see:
- 📋 Employee table
- 🟢 "Add New Employee" button
- ✏️ Edit buttons
- 🗑️ Delete buttons

---

## 🚀 ACTION #3: ADD YOUR FIRST EMPLOYEE (30 seconds)

### Click: "Add New Employee" (green button)

URL becomes: `http://localhost:8082/Employee/Create`

### Fill the form:
1. **Name:** `John Doe` (or your name)
2. **Department:** `Engineering` (or your department)

### Click: "Create Employee" button

### Result:
- ✅ Redirects back to employee list
- ✅ Your new employee appears in the table!
- ✅ Data saved to database!
- ✅ You're done! 🎉

---

## 🎯 BONUS: TRY THE API (2 minutes)

### Open New Browser Tab:
```
http://localhost:8081/swagger
```

### You'll see:
- 📚 Swagger UI
- 🔗 API endpoints
- 📝 Request/response examples

### Try GET request:
1. Find: **GET /api/employees**
2. Click: **"Try it out"**
3. Click: **"Execute"**
4. See: Your employees as JSON!

---

## 💾 BONUS: CHECK DATABASE (1 minute)

### Open PowerShell:
```powershell
cd "D:\Corporate Training\JECRC_KushagraSaxena_0177\DOTNET\Week-11\02-05-2026\Assignment"
```

### Run this command:
```powershell
docker exec -it mssql-day2 sqlcmd -S localhost -U sa -P SuperSecretPass123! -Q "USE EmsDbDay2; SELECT * FROM Employees;"
```

### You'll see:
- 🗄️ Your employees in SQL format
- 📊 Employee IDs, names, departments
- ✅ Data is persisted!

---

## 📊 3-MINUTE TOTAL EXPERIENCE

```
1 min  → Open browser & see app
1 min  → Create employee
1 min  → See in API & database
────────────────────────
Total: 3 minutes to see entire system working!
```

---

## 💡 KEY COMMANDS YOU'LL USE

### Before Starting Work:
```powershell
docker-compose start
```

### During Work:
```powershell
docker-compose ps              # See if running
docker-compose logs -f         # Watch logs
```

### When Done:
```powershell
docker-compose stop
```

### All 3 Containers Ready Check:
```powershell
docker-compose ps
```

Expected output:
```
NAME              STATUS          PORTS
ems-mvc-day2      Up 39 minutes   0.0.0.0:8082->8080/tcp
ems-api-day2      Up About an hour 0.0.0.0:8081->8080/tcp
mssql-day2        Up 4 hours      0.0.0.0:1434->1433/tcp
```

---

## 🌐 YOUR THREE URLs

```
http://localhost:8082           ← Main App (USE THIS)
http://localhost:8081/swagger   ← API Docs
localhost:1434                  ← Database (SQL Server)
```

---

## ✅ SUCCESS CHECKLIST

After following the above:

- [ ] Opened http://localhost:8082
- [ ] Saw the home page
- [ ] Clicked "Employees"
- [ ] Created an employee
- [ ] Employee appears in table
- [ ] Opened http://localhost:8081/swagger
- [ ] Tested GET /api/employees
- [ ] Ran database query
- [ ] Saw employee in SQL results

If all checked ✅, **YOU'RE DONE AND SUCCESSFUL!**

---

## 🆘 IF SOMETHING DOESN'T WORK

### App won't load (Page shows error):
```powershell
docker-compose restart ems-mvc-day2
# Wait 10 seconds, refresh browser
```

### Can't create employee (Error saving):
```powershell
docker-compose logs -f ems-api-day2
# Check what error appears
```

### API not responding:
```powershell
docker-compose restart ems-api-day2
```

### Database not working:
```powershell
docker-compose restart mssql-day2
# Wait 30 seconds for SQL to start
```

### Everything broken:
```powershell
docker-compose down -v
docker-compose up -d --build
# Wait 2-3 minutes
start http://localhost:8082
```

---

## 📚 IF YOU WANT MORE INFO

| If You Want | Read This |
|-------------|-----------|
| Quick commands | COMMAND_CARD.md |
| All commands | DOCKER_COMMANDS.md |
| Troubleshooting | README.md |
| Architecture | VISUAL_GUIDE.md |
| Full setup | COMPLETE_SETUP.md |

---

## 🎉 THAT'S IT!

You have a complete 3-tier microservice system:

```
You (Browser)
    ↓
🌐 MVC (Modern UI)
    ↓
🔌 API (REST Endpoints)
    ↓
🗄️ SQL (Database)

All working together! ✅
```

### Next: 
**Open http://localhost:8082 and start using it!**

---

**Time to complete:** 5-10 minutes  
**Result:** Working microservice system  
**Status:** ✅ READY TO USE  

🚀 **LET'S GO!**

