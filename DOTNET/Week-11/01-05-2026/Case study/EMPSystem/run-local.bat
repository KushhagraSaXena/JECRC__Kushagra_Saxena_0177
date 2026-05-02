@echo off
REM Quick start script for local development

echo.
echo ====================================
echo   EMP System - Local Development
echo ====================================
echo.

echo Restoring packages...
dotnet restore

echo.
echo Building project...
dotnet build

echo.
echo Running application...
echo Access it at: https://localhost:5001 or http://localhost:5000
echo Navigate to: https://localhost:5001/Employee
echo.

dotnet run

pause
