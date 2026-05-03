# 🎨 Visual Setup Guide - Employee Management System

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      YOUR LOCAL MACHINE (Windows)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    DOCKER NETWORK (Bridge)                      │   │
│  │                  ems-network (Isolated)                         │   │
│  │                                                                 │   │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐  │   │
│  │  │   MVC Container  │  │   API Container  │  │   SQL       │  │   │
│  │  │  ems-mvc-day2    │  │  ems-api-day2    │  │ ems-mssql   │  │   │
│  │  │                  │  │                  │  │             │  │   │
│  │  │ Port: 8082←8080  │  │ Port: 8081←8080  │  │ Port: 1433  │  │   │
│  │  │                  │  │                  │  │             │  │   │
│  │  │ .NET 9 MVC App   │──→.NET 9 API       │──→SQL Server   │  │   │
│  │  │ Bootstrap UI     │  │ REST Endpoints   │  │ EmsDbDay2   │  │   │
│  │  │ Employee Pages   │  │ Swagger Docs     │  │ Data Store  │  │   │
│  │  └──────────────────┘  └──────────────────┘  └─────────────┘  │   │
│  │          ↑                     ↑                                │   │
│  │  From Browser      Dependency Chain                            │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│          ↑                                                                │
│  ┌───────┴──────────────────────────────────────────────────────────┐   │
│  │  http://localhost:8082  (Your Browser Access)                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Diagram

```
USER REQUEST
     │
     ▼
┌─────────────────────────────────────────────────┐
│  Browser                                        │
│  http://localhost:8082/Employee/Create          │
└─────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────┐
│  MVC Container (ems-mvc-day2:8082)              │
│  ┌──────────────────────────────────────────┐   │
│  │ EmployeeController.Create()              │   │
│  │ - Renders Create.cshtml                  │   │
│  │ - Bootstrap UI displayed                 │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  User fills form & clicks "Create"              │
└─────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────┐
│  MVC Container Calls API                        │
│  POST http://ems-api-day2:8080/api/employees    │
│  ┌──────────────────────────────────────────┐   │
│  │ HttpClient ("EmsApi")                    │   │
│  │ - Uses internal network name             │   │
│  │ - DNS resolution: ems-api-day2 → IP      │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────┐
│  API Container (ems-api-day2:8081)              │
│  ┌──────────────────────────────────────────┐   │
│  │ EmployeesController.Post()               │   │
│  │ - Receives employee data                 │   │
│  │ - Validates input                        │   │
│  │ - Prepares for database save             │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  Connects to Database                           │
└─────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────┐
│  SQL Container (ems-mssql-day2:1433)            │
│  ┌──────────────────────────────────────────┐   │
│  │ Database: EmsDbDay2                      │   │
│  │ INSERT INTO Employees (...)              │   │
│  │ Returns: New Employee ID                 │   │
│  └──────────────────────────────────────────┘   │
│  Persists Data to Volume                        │
└─────────────────────────────────────────────────┘
     │
     ▼ (Response flows back)
┌─────────────────────────────────────────────────┐
│  API Returns JSON Response (200 OK)             │
│  { "id": 1, "name": "John", ... }              │
└─────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────┐
│  MVC Renders Response Page                      │
│  Redirect to /Employee/Index                    │
│  Shows employee list with new entry             │
└─────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────┐
│  Browser Displays Result                        │
│  ✅ Employee Added Successfully                 │
│  Shows updated employee table                   │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Docker Startup Sequence Diagram

```
docker-compose up -d --build
     │
     ├─────────────────────────────────────────┐
     │                                         │
     ▼                                         ▼
┌──────────────────────┐              ┌──────────────────────┐
│   Build MVC Image    │              │   Build API Image    │
│   (45-60 seconds)    │              │   (45-60 seconds)    │
└──────────────────────┘              └──────────────────────┘
     │                                         │
     └─────────────────┬───────────────────────┘
                       │
                       ▼
            ┌──────────────────────────┐
            │  All images built ✓      │
            │  Start containers...     │
            └──────────────────────────┘
                       │
                       ▼
            ┌──────────────────────────┐
            │  1. Start SQL Container  │
            │     (ems-mssql-day2)     │
            │     Listen on :1433      │
            └──────────────────────────┘
                       │
         (Health check loop every 10s)
                       │
                       ├─ Check 1: Not ready (retry)
                       ├─ Check 2: Not ready (retry)
                       ├─ Check 3: Not ready (retry)
                       └─ Check 4: Ready ✓
                       │
                       ▼
            ┌──────────────────────────┐
            │  2. Start API Container  │
            │     (ems-api-day2)       │
            │     Wait for SQL ✓       │
            │     Listen on :8081      │
            │     Auto-create DB ✓     │
            └──────────────────────────┘
                       │
         (Wait for startup, ~5-10s)
                       │
                       ▼
            ┌──────────────────────────┐
            │ 3. Start MVC Container   │
            │     (ems-mvc-day2)       │
            │     Wait for API ✓       │
            │     Listen on :8082      │
            └──────────────────────────┘
                       │
                       ▼
            ┌──────────────────────────┐
            │  All Containers Ready ✓  │
            │  Total Time: 2-3 min     │
            │  System Operational ✓    │
            └──────────────────────────┘
                       │
                       ▼
            Access: http://localhost:8082
```

---

## 📊 Container Dependency Chain

```
┌─────────────────────────────────────────────────────┐
│  Start Order & Dependencies                         │
└─────────────────────────────────────────────────────┘

1️⃣  SQL Server (mssql-day2)
    ├─ No dependencies
    ├─ Start immediately
    ├─ Health check: Verify SQL port responds
    └─ Status: Healthy ✓

                        │
                        │ (waits for)
                        ▼

2️⃣  API Container (ems-api-day2)
    ├─ Depends on: SQL Server (healthy)
    ├─ Starts after SQL ready
    ├─ Connects to: mssql-day2:1433
    ├─ Auto-creates: Database tables
    ├─ Exposes: :8081 → :8080
    └─ Status: Running ✓

                        │
                        │ (waits for)
                        ▼

3️⃣  MVC Container (ems-mvc-day2)
    ├─ Depends on: API Container (started)
    ├─ Starts after API running
    ├─ Connects to: ems-api-day2:8080
    ├─ Renders: Bootstrap UI
    ├─ Exposes: :8082 → :8080
    └─ Status: Running ✓

                        ✅ READY
```

---

## 🌐 Network Communication Map

```
┌──────────────────────────────────────────────────────┐
│  Docker Bridge Network: assignment_ems-network       │
│  Network Subnet: 10.0.0.0/16 (example)              │
└──────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│  MVC Container                  │
│  ems-mvc-day2                   │
│  IP: 10.0.0.2 (example)         │
│  Port: 8080 (internal)          │
│  Exposed: 8082 (external)       │
├─────────────────────────────────┤
│  Outbound Connection:           │
│  POST http://ems-api-day2:8080/ │ ────────┐
│  (DNS: ems-api-day2 → 10.0.0.3) │        │
└─────────────────────────────────┘        │
                                           │
                                    ┌──────▼─────────────┐
                                    │  API Container     │
                                    │  ems-api-day2      │
                                    │  IP: 10.0.0.3      │
                                    │  Port: 8080        │
                                    │  Exposed: 8081     │
                                    ├────────────────────┤
                                    │  Outbound Conn:    │
                                    │  Query mssql-day2: │────┐
                                    │  1433              │   │
                                    └────────────────────┘   │
                                                             │
                                                      ┌──────▼──────────┐
                                                      │  SQL Container   │
                                                      │  ems-mssql-day2  │
                                                      │  IP: 10.0.0.4    │
                                                      │  Port: 1433      │
                                                      │  Exposed: 1433   │
                                                      │  Data Volume:    │
                                                      │  mssql-data      │
                                                      └──────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Host Machine (Windows 10/11)                           │
│  127.0.0.1 / localhost                                  │
│                                                         │
│  Browser:                                               │
│  http://localhost:8082  ──→  exposed as  ──→ MVC:8080  │
│  http://localhost:8081  ──→  exposed as  ──→ API:8080  │
│  localhost:1433         ──→  exposed as  ──→ SQL:1433  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 File Structure Tree

```
Assignment/ (Working Directory)
│
├── 📦 CONTAINERS
│   ├── EmsApiDay2/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Program.cs (API Startup)
│   │   ├── Dockerfile (Multi-stage build)
│   │   └── appsettings.json (SQL Connection)
│   │
│   └── EmsMvcDay2/
│       ├── Controllers/
│       │   ├── HomeController.cs
│       │   └── EmployeeController.cs
│       │
│       ├── Views/
│       │   ├── Home/
│       │   │   ├── Index.cshtml (Enhanced: Feature cards)
│       │   │   └── Privacy.cshtml (Enhanced: Policy)
│       │   │
│       │   ├── Employee/
│       │   │   ├── Index.cshtml (Enhanced: Table)
│       │   │   ├── Create.cshtml (Enhanced: Form)
│       │   │   ├── Edit.cshtml (Enhanced: Form)
│       │   │   └── Delete.cshtml (Enhanced: Confirmation)
│       │   │
│       │   └── Shared/
│       │       ├── _Layout.cshtml (Enhanced: Dark navbar)
│       │       └── _ValidationScriptsPartial.cshtml
│       │
│       ├── Models/
│       ├── wwwroot/ (Bootstrap CSS, site.css, etc.)
│       ├── Program.cs (MVC Startup + API client)
│       ├── Dockerfile (Multi-stage build)
│       └── appsettings.json
│
├── 🐳 DOCKER CONFIGURATION
│   ├── docker-compose.yml (Main orchestration file)
│   └── .env (Environment variables)
│
├── 🚀 LAUNCH SCRIPTS
│   ├── run-docker.ps1 (PowerShell: 200+ lines)
│   └── run-docker.bat (Batch: Menu-driven)
│
└── 📚 DOCUMENTATION
    ├── INDEX.md (Navigation guide)
    ├── SETUP_COMPLETE.md (Overview & checklist)
    ├── QUICKSTART.md (5-minute guide)
    ├── README.md (900+ lines reference)
    ├── DOCKER_SETUP_GUIDE.md (600+ lines Docker guide)
    └── UI_IMPROVEMENTS_SUMMARY.md (CSHTML changes)

Total Files: 40+ (code + config + docs)
Total Lines: 2500+ (documentation)
Total Time to Setup: 2-3 minutes
```

---

## 🎨 UI Improvements Visual

```
BEFORE vs AFTER

┌─────────────────────┐         ┌─────────────────────────────────┐
│  Old Employee List  │         │   New Employee List (Bootstrap) │
├─────────────────────┤         ├─────────────────────────────────┤
│                     │         │                                 │
│ ID | Name | Dept    │   →     │  ┌─────────────────────────┐    │
│  1 | John | Sales   │         │  │    👥 Employee List    │    │
│  2 | Jane | IT      │         │  └─────────────────────────┘    │
│                     │         │  ┌────┬──────┬──────┬──────┐   │
│  [Edit] [Delete]    │         │  │ ID │ Name │ Dept │Action│   │
│                     │         │  ├────┼──────┼──────┼──────┤   │
└─────────────────────┘         │  │ 1  │ John │Sales │✏️ 🗑️  │   │
                                │  ├────┼──────┼──────┼──────┤   │
                                │  │ 2  │ Jane │ IT   │✏️ 🗑️  │   │
                                │  └────┴──────┴──────┴──────┘   │
                                │  ┌──────────────────────────┐   │
                                │  │ ➕ Add New Employee      │   │
                                │  └──────────────────────────┘   │
                                └─────────────────────────────────┘

BEFORE Create Form:              AFTER Create Form:
┌──────────────────┐            ┌──────────────────────────┐
│ Add New Employee │            │ ┌────────────────────┐   │
├──────────────────┤            │ │ ➕ Add New Employee│   │
│ Name:            │            │ └────────────────────┘   │
│ [________]       │   →        │ ┌────────────────────┐   │
│ Department:      │            │ │ Employee Name:     │   │
│ [________]       │            │ │ [_________________]│   │
│                  │            │ │                    │   │
│ [Save] [Back]    │            │ │ Department:        │   │
└──────────────────┘            │ │ [_________________]│   │
                                │ │                    │   │
                                │ │  [Cancel] [Create] │   │
                                │ └────────────────────┘   │
                                └──────────────────────────┘

All pages now feature:
✅ Card-based design
✅ Bootstrap 5 styling
✅ Responsive layout
✅ Color-coded badges
✅ Professional buttons
✅ Better spacing
✅ Shadow effects
✅ Mobile-friendly
```

---

## 🔍 Docker Build Process Diagram

```
docker-compose up -d --build

        │
        ├─────────────────────────────────┐
        │                                 │
        ▼                                 ▼
    BUILD MVC                         BUILD API
    ┌────────────────────────┐       ┌────────────────────────┐
    │ Stage 1: base          │       │ Stage 1: base          │
    │ FROM aspnet:9.0        │       │ FROM aspnet:9.0        │
    │ WORKDIR /app           │       │ WORKDIR /app           │
    │ EXPOSE 8080            │       │ EXPOSE 8080            │
    └────────────┬───────────┘       └────────────┬───────────┘
                 │                                 │
                 ▼                                 ▼
            ┌────────────────────────┐       ┌────────────────────────┐
            │ Stage 2: build         │       │ Stage 2: build         │
            │ FROM sdk:9.0           │       │ FROM sdk:9.0           │
            │ COPY .csproj           │       │ COPY .csproj           │
            │ RUN dotnet restore     │       │ RUN dotnet restore     │
            │ COPY source code       │       │ COPY source code       │
            │ RUN dotnet build       │       │ RUN dotnet build       │
            └────────────┬───────────┘       └────────────┬───────────┘
                         │                                 │
                         ▼                                 ▼
                    ┌────────────────────────┐       ┌────────────────────────┐
                    │ Stage 3: publish       │       │ Stage 3: publish       │
                    │ RUN dotnet publish     │       │ RUN dotnet publish     │
                    │ Output: /app/publish   │       │ Output: /app/publish   │
                    └────────────┬───────────┘       └────────────┬───────────┘
                                 │                                 │
                                 ▼                                 ▼
                            ┌────────────────────────┐       ┌────────────────────────┐
                            │ Stage 4: final         │       │ Stage 4: final         │
                            │ FROM aspnet:9.0        │       │ FROM aspnet:9.0        │
                            │ COPY /app/publish      │       │ COPY /app/publish      │
                            │ ENTRYPOINT dotnet DLL │       │ ENTRYPOINT dotnet DLL │
                            └────────────┬───────────┘       └────────────┬───────────┘
                                         │                                 │
                                         └──────────────┬──────────────────┘
                                                        │
                                                        ▼
                                                ✅ Images Built
                                          (Ready for container creation)
```

---

## 🎯 Access Map

```
┌──────────────────────────────────────────────────────┐
│           FROM YOUR BROWSER                           │
└──────────────────────────────────────────────────────┘

         http://localhost:8082
              │
              └─→ http://localhost:8082/Employee/Index
              │
              └─→ http://localhost:8082/Employee/Create
              │
              └─→ http://localhost:8082/Employee/Edit/1
              │
              └─→ http://localhost:8082/Employee/Delete/1
              │
              └─→ http://localhost:8082/Home/Privacy

         http://localhost:8081/swagger
              │
              └─→ GET  /api/employees
              │
              └─→ GET  /api/employees/{id}
              │
              └─→ POST /api/employees
              │
              └─→ PUT  /api/employees/{id}
              │
              └─→ DELETE /api/employees/{id}

         SQL Server: localhost,1433
              │
              ├─ User: sa
              ├─ Password: SuperSecretPass123!
              ├─ Database: EmsDbDay2
              └─ Table: Employees
```

---

## ✅ Success Indicators

```
✅ SUCCESSFUL SETUP

Docker Desktop Running
        ↓
   Docker Daemon OK
        ↓
docker-compose config
        ↓
   Config Valid ✓
        ↓
docker-compose up -d --build
        ↓
   SQL Started ✓
        ↓
   SQL Healthy ✓ (Health check passed)
        ↓
   API Started ✓
        ↓
   API Running ✓
        ↓
   MVC Started ✓
        ↓
   MVC Running ✓
        ↓
   All 3 containers "Up" status ✓
        ↓
   http://localhost:8082 loads ✓
        ↓
   Can create employee ✓
        ↓
   API returns data ✓
        ↓
   Database has records ✓
        ↓
🎉 SYSTEM OPERATIONAL
```

---

## 📱 Responsive Design Preview

```
Desktop View (1024+px):          Mobile View (360px):
┌──────────────────────┐        ┌────────┐
│ 📊 EMS Navigation     │        │ 📊 EMS │
├──────────────────────┤        ├────────┤
│ Home|Employees|Priv. │        │ Menu   │
├──────────────────────┤        ├────────┤
│ ┌──────────────────┐ │        │┌──────┐│
│ │ Card 1 | Card 2  │ │   →    ││Card1 ││
│ │        | Card 3  │ │        │├──────┤│
│ └──────────────────┘ │        ││Card2 ││
│ ┌──────────────────┐ │        │├──────┤│
│ │ Table with 5 col │ │        ││Table ││
│ │ [S]  [M] [L] [D] │ │        ││[S][M]││
│ └──────────────────┘ │        │└──────┘│
└──────────────────────┘        └────────┘

[S]=Small  [M]=Medium  [L]=Large  [D]=Delete
```

---

**Last Updated:** May 3, 2026
**Format:** Visual Reference Guide
**Status:** ✅ Complete

