# 🐳 EMS API Dockerization - Complete Guide

## ✅ What We Accomplished

### 1. **Docker Network Created**
```bash
docker network create ems-network
```
- Containers can communicate using container names
- `ems-sql` = SQL Server container
- `ems-api` = ASP.NET Core API container

### 2. **SQL Server Container Running**
```bash
docker run -e "ACCEPT_EULA=Y" \
-e "MSSQL_SA_PASSWORD=YourStrong@Pass123" \
-p 1433:1433 \
--name ems-sql \
--network ems-network \
-d mcr.microsoft.com/mssql/server:2022-latest
```

**Details:**
- **Port**: 1433 (inside and outside container)
- **Database**: EMS_DB
- **Username**: sa
- **Password**: YourStrong@Pass123

### 3. **Connection String Updated**
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=ems-sql;Database=EMS_DB;User Id=sa;Password=YourStrong@Pass123;Encrypt=false;TrustServerCertificate=true;"
}
```

**🔑 KEY CONCEPT**: 
- Uses `ems-sql` (container name) instead of `localhost`
- Inside Docker, containers resolve by name on the same network
- Outside Docker, you would use `localhost,1433` for host machine

### 4. **API Docker Image Built**
```bash
docker build -t ems-api .
```

**Dockerfile Stages:**
1. **Build Stage** - Restore dependencies and compile
2. **Publish Stage** - Publish the release build
3. **Runtime Stage** - Copy published files and run

### 5. **API Container Running**
```bash
docker run -d \
-p 5000:80 \
--name ems-api \
--network ems-network \
ems-api
```

**Details:**
- **Port**: 5000 (external) → 80 (internal)
- **Network**: ems-network (connects to SQL Server)
- **Status**: Running and listening on port 5000

### 6. **Automatic Database Migrations**
Program.cs now includes:
```csharp
try
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await dbContext.Database.MigrateAsync();
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Migration error: {ex.Message}");
}
```

---

## 🚀 Running Everything with Docker Compose

### Single Command to Start All Services:
```bash
docker-compose up -d
```

### Stop All Services:
```bash
docker-compose down
```

### View Logs:
```bash
docker-compose logs -f api
docker-compose logs -f sql-server
```

---

## 🧪 Testing the API

### 1. **Via Swagger UI**
- Open: `http://localhost:5000/swagger`
- Test endpoints directly in the UI

### 2. **Via cURL / PowerShell**

**Get all employees:**
```powershell
curl http://localhost:5000/api/employee
```

**Create an employee:**
```powershell
curl -X POST http://localhost:5000/api/employee `
-H "Content-Type: application/json" `
-d '{
  "name": "John Doe",
  "department": "IT",
  "email": "john@company.com",
  "salary": 50000
}'
```

**Update an employee:**
```powershell
curl -X PUT http://localhost:5000/api/employee/1 `
-H "Content-Type: application/json" `
-d '{
  "name": "John Updated",
  "department": "Finance",
  "email": "john.new@company.com",
  "salary": 55000
}'
```

**Delete an employee:**
```powershell
curl -X DELETE http://localhost:5000/api/employee/1
```

---

## 📋 Container Details

### EMS-SQL (SQL Server)
```
Container ID: b7153dab09fa
Image: mcr.microsoft.com/mssql/server:2022-latest
Ports: 0.0.0.0:1433→1433/tcp
Network: ems-network
Status: Up and running
```

### EMS-API (ASP.NET Core)
```
Container ID: 91b721a4aac5
Image: ems-api:latest
Ports: 0.0.0.0:5000→80/tcp
Network: ems-network
Status: Up and running
Environment: Production
```

---

## 🔗 Network Communication

**Inside Docker Network (ems-network):**
- `ems-api` connects to `ems-sql:1433`
- Connection string: `Server=ems-sql;...`

**From Host Machine:**
- Connect to `localhost:1433` (SQL Server)
- Connect to `localhost:5000` (API)

**Important**: Inside a container, `localhost` = the container itself, NOT the host or other containers!

---

## 📊 Database Schema

**Employees Table:**
```sql
CREATE TABLE [Employees] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Department] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [Salary] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_Employees] PRIMARY KEY ([Id])
);
```

---

## 🛠️ Useful Docker Commands

### View Containers
```bash
docker ps -a
docker ps -a | Select-String "ems"  # PowerShell
```

### View Logs
```bash
docker logs ems-api
docker logs ems-sql
docker logs -f ems-api  # Follow logs
```

### Execute Commands in Container
```bash
docker exec -it ems-sql /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P YourStrong@Pass123
```

### Stop/Start Containers
```bash
docker stop ems-api
docker start ems-api
docker restart ems-api
```

### Remove Containers
```bash
docker rm ems-api
docker rm ems-sql
```

### Rebuild Image
```bash
docker build -t ems-api .
```

---

## 📌 Key Interview Concepts

### 1. **Container Networking**
- Containers on same network can communicate by container name
- `ems-sql` resolves to the SQL Server IP inside the network
- From host, use `localhost` + published ports

### 2. **Environment Variables**
- SQL Server password set via `MSSQL_SA_PASSWORD`
- API URLs configured via `ASPNETCORE_URLS`
- Configuration read from appsettings.json

### 3. **Multi-stage Docker Build**
- **Stage 1 (Build)**: SDK image, compile code
- **Stage 2 (Publish)**: Create release files
- **Stage 3 (Runtime)**: Lightweight runtime image with only binaries

### 4. **Port Mapping**
- `-p 5000:80` = external:internal
- 5000 = host port (you access this)
- 80 = container port (app listens on this)

### 5. **Health Checks**
- Docker Compose includes health checks for SQL Server
- API waits for SQL to be healthy before starting
- `depends_on` with `condition: service_healthy`

---

## ✨ Next Steps

1. ✅ Both containers running in network
2. ✅ Migrations applied automatically on startup
3. ✅ Database created in SQL Server
4. ✅ API accessible on localhost:5000
5. 🎯 Test all endpoints in Swagger
6. 🎯 Push to Docker Hub (optional)
7. 🎯 Deploy to Kubernetes (advanced)

---

## 🐛 Troubleshooting

### API can't connect to SQL Server
```bash
docker logs ems-api | Select-String "error"
```
- Check SQL Server is running: `docker ps`
- Verify connection string has correct container name
- Wait 10-15 seconds for SQL to fully initialize

### Port already in use
```bash
# Change port in docker-compose.yml or use different port
docker run -p 5001:80 ...
```

### SQL Server login failed
- Verify password is exactly: `YourStrong@Pass123`
- Check environment variable: `MSSQL_SA_PASSWORD`

---

**🎉 Congratulations! Your EMS API is now fully Dockerized!**
