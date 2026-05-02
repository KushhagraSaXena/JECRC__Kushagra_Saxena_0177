@echo off
REM Quick start script for EMP System

echo.
echo ====================================
echo   EMP System - Quick Start
echo ====================================
echo.

REM Check if Docker is running
echo Checking Docker status...
docker ps >nul 2>&1
if errorlevel 1 (
    echo Warning: Docker doesn't appear to be running.
    echo Please start Docker Desktop and try again.
    echo.
    pause
    exit /b 1
)

echo Docker is running. Starting application...
echo.

REM Build and run with docker-compose
docker-compose up --build

echo.
echo ====================================
echo Application is running!
echo Access it at: http://localhost:8080
echo Go to: http://localhost:8080/Employee
echo ====================================
echo.
pause
