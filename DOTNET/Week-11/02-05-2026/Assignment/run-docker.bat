@echo off
REM Employee Management System - Docker Compose Launcher
REM This script builds and runs all 3 containers

cls
echo.
echo ====================================================================
echo   Employee Management System - Docker Microservices
echo   3-Tier Architecture: MVC ^| API ^| SQL Server
echo ====================================================================
echo.

REM Check if Docker is installed
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not in PATH
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Check if Docker daemon is running
docker ps >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Docker daemon is not running
    echo Please start Docker Desktop and try again
    pause
    exit /b 1
)

echo [OK] Docker is installed and running
echo.

REM Ask user for action
echo What would you like to do?
echo 1. Start All Containers (Build + Run)
echo 2. Stop All Containers
echo 3. View Container Status
echo 4. View Logs
echo 5. Remove All Containers
echo 6. Open Application in Browser
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto start_containers
if "%choice%"=="2" goto stop_containers
if "%choice%"=="3" goto view_status
if "%choice%"=="4" goto view_logs
if "%choice%"=="5" goto remove_containers
if "%choice%"=="6" goto open_browser
goto invalid_choice

:start_containers
echo.
echo [*] Starting all containers...
echo [*] This may take a few minutes on first run (building images)...
echo.
docker-compose up -d --build
echo.
echo [OK] Containers started!
echo.
echo Waiting 10 seconds for services to initialize...
timeout /t 10 /nobreak
echo.
echo Services should be ready at:
echo   - MVC App: http://localhost:8082
echo   - API Swagger: http://localhost:8081/swagger
echo   - SQL Server: localhost,1433
echo.
pause
goto end

:stop_containers
echo.
echo [*] Stopping all containers...
docker-compose stop
echo [OK] Containers stopped!
pause
goto end

:view_status
echo.
docker-compose ps
echo.
pause
goto end

:view_logs
echo.
echo Select container (1-3):
echo 1. MVC Container
echo 2. API Container
echo 3. SQL Server Container
echo.
set /p log_choice="Enter choice: "

if "%log_choice%"=="1" docker-compose logs -f ems-mvc-day2
if "%log_choice%"=="2" docker-compose logs -f ems-api-day2
if "%log_choice%"=="3" docker-compose logs -f mssql-day2
pause
goto end

:remove_containers
echo.
echo [WARNING] This will remove all containers and networks
echo Data will NOT be deleted (volumes are kept)
set /p confirm="Are you sure? (yes/no): "

if /i "%confirm%"=="yes" (
    docker-compose down
    echo [OK] Containers removed!
) else (
    echo [Cancelled] No changes made
)
pause
goto end

:open_browser
echo.
echo [*] Opening application in default browser...
start http://localhost:8082
goto end

:invalid_choice
echo.
echo [ERROR] Invalid choice
pause
goto end

:end
echo.
echo ====================================================================
echo   Press any key to exit...
pause >nul
