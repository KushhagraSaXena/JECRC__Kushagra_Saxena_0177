# Quick Reference - EMPSystem Deployment Commands

## Stage 1(a): Local Development
```powershell
# Option 1: Using dotnet CLI
dotnet run

# Option 2: VS Studio
# Press F5 or click Green Play Button

# Access:
http://localhost:8080/Employee
```

---

## Stage 1(b): Docker Local
```powershell
# Build Docker image
docker build -t empapi .

# Run container
docker run -p 8080:8080 empapi

# Check if running
docker ps

# View logs
docker logs <CONTAINER_ID>

# Stop container
docker stop <CONTAINER_ID>

# Remove container
docker rm <CONTAINER_ID>

# Access:
http://localhost:8080/Employee
```

---

## Stage 2: WiFi Network (Local)
```powershell
# Build and run with docker-compose
docker-compose up

# Run in background (detached mode)
docker-compose up -d

# Check status
docker-compose ps
docker ps

# View logs
docker-compose logs --tail 20

# Stop everything
docker-compose down

# Clean up everything
docker-compose down -v

# Access from your devices:
http://192.168.1.9:8080/Employee
# (Replace 192.168.1.9 with your PC's WiFi IP)
```

---

## Stage 3: Public Access (Ngrok - BACKEND SERVER)

### Step 1: Start Docker in Background
```powershell
# This keeps running even if you close terminal/VS
docker-compose up -d

# Verify
docker ps
```

### Step 2: Download and Setup Ngrok
```powershell
# Download from https://ngrok.com
# Extract and add to PATH, or navigate to folder

# Authenticate (one time)
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Step 3: Create Public Tunnel
```powershell
# Create tunnel to port 8080
ngrok http 8080

# You'll see:
# Session Status: online
# Forwarding: https://abc123.ngrok.io -> http://localhost:8080

# Copy the https:// URL and share with teacher
# Example: https://abc123.ngrok.io/Employee
```

### Step 4: Keep Server Running
```powershell
# Docker is running in background ✅
# Ngrok tunnel is active ✅
# You can close terminal ✅
# You can close VS Studio ✅
# Teacher can access anytime ✅

# Container keeps running!
```

### Step 5: Monitor Server
```powershell
# Check if still running (in new terminal)
docker ps

# View logs
docker-compose logs --tail 20

# Stop server
docker-compose down
```

---

## Find Your WiFi IP Address
```powershell
ipconfig

# Look for:
# IPv4 Address. . . . . . . . . . : 192.168.1.9
#                                   ↑
#                            This is your IP
```

---

## Firewall Configuration (Windows)
```
Windows Defender Firewall → Advanced Settings → Inbound Rules
→ New Rule
  → Port
  → TCP
  → Specific local ports: 8080
  → Allow
  → Public/Private (both)
  → Finish
```

---

## Troubleshooting

### Port Already in Use
```powershell
# Check what's using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with the number shown)
taskkill /PID <PID> /F

# Or just use different port
docker run -p 8081:8080 empapi
# Access: http://localhost:8081
```

### Container Won't Start
```powershell
# Check logs for error
docker-compose logs

# Try clean rebuild
docker-compose down -v
docker system prune -f
docker-compose up --build
```

### Can't Access from Other Device
```
1. Check if Docker is running: docker ps
2. Check firewall allows port 8080
3. Check other device is on same WiFi
4. Use correct IP: ipconfig (find IPv4 Address)
5. Example: http://192.168.1.9:8080/Employee
```

### Lost Connection to Ngrok
```powershell
# Ngrok session expired? Start new tunnel
ngrok http 8080

# Get new URL and share with teacher
```

---

## Data Persistence

### Where is My Database?
```
SQLite Database: empsystem-data volume
Location: Docker managed volume (persists data)

Data is saved when:
- Employee created
- Employee edited
- Employee deleted

Data persists even if:
- Container stops ✅
- Container restarts ✅
- Docker restarts ✅
- PC restarts ✅
```

### Backup Your Data
```powershell
# Extract database from container
docker cp <CONTAINER_ID>:/app/data/emp_system.db ./backup.db

# Or check volume location
docker volume ls
docker volume inspect empsystem-data
```

---

## Docker vs VS Studio

| | Docker | VS Studio |
|---|---|---|
| **Start** | `docker-compose up -d` | F5 / Click Run |
| **Access** | Any network | Localhost only |
| **Independent** | Yes (runs in background) | No (stops when closed) |
| **Production** | Yes (ready for server) | No (dev only) |
| **Persistence** | Yes (volumes) | Depends on app |
| **Multiple Users** | Yes | No |
| **URL Sharing** | Yes (with Ngrok) | No |
| **Data Loss** | No (in volume) | Maybe |

---

## Your Achievement Checklist

- [ ] Stage 1(a): App runs locally with `dotnet run`
- [ ] Stage 1(b): App runs in Docker container
- [ ] Stage 2: App accessible on WiFi network
- [ ] Stage 3: Docker runs in background (detached)
- [ ] Stage 3: Ngrok creates public URL
- [ ] Stage 3: Teacher accesses from public URL
- [ ] Stage 3: Multiple users can add data
- [ ] Stage 3: Data persists after restart
- [ ] Documentation completed
- [ ] Explained to teacher ✅

---

## Resources

- Docker Docs: https://docs.docker.com/
- .NET 9 Docs: https://learn.microsoft.com/en-us/dotnet/
- ASP.NET Core: https://learn.microsoft.com/en-us/aspnet/core/
- Ngrok: https://ngrok.com/
- Entity Framework Core: https://learn.microsoft.com/en-us/ef/core/

