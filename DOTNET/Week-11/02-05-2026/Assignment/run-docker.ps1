# Employee Management System - Docker Compose PowerShell Helper
# Usage: .\run-docker.ps1 -Action start

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("start", "stop", "status", "logs", "remove", "restart", "build", "help")]
    [string]$Action = "help"
)

# Colors
$Green = @{ ForegroundColor = "Green" }
$Red = @{ ForegroundColor = "Red" }
$Yellow = @{ ForegroundColor = "Yellow" }
$Blue = @{ ForegroundColor = "Blue" }

function Write-Success { Write-Host "[✓]" @Green -NoNewline; Write-Host " $args" }
function Write-Error-Custom { Write-Host "[✗]" @Red -NoNewline; Write-Host " $args" }
function Write-Info { Write-Host "[*]" @Blue -NoNewline; Write-Host " $args" }
function Write-Warning-Custom { Write-Host "[!]" @Yellow -NoNewline; Write-Host " $args" }

function Show-Banner {
    Write-Host "`n" @Blue
    Write-Host "╔════════════════════════════════════════════════════════════════╗" @Blue
    Write-Host "║   Employee Management System - Docker Microservices            ║" @Blue
    Write-Host "║   3-Tier Architecture: MVC | API | SQL Server                  ║" @Blue
    Write-Host "╚════════════════════════════════════════════════════════════════╝" @Blue
}

function Check-Docker {
    try {
        $docker_version = docker --version 2>$null
        if ($LASTEXITCODE -ne 0) {
            throw "Docker not found"
        }

        docker ps *>$null
        if ($LASTEXITCODE -ne 0) {
            throw "Docker daemon not running"
        }

        Write-Success "Docker is installed and running"
        Write-Host "   $docker_version`n"
        return $true
    }
    catch {
        Write-Error-Custom "Docker check failed: $_"
        Write-Host "`nPlease install Docker Desktop: https://www.docker.com/products/docker-desktop`n"
        return $false
    }
}

function Start-Containers {
    Show-Banner
    Write-Info "Starting all containers..."
    Write-Info "Building images and initializing services..."
    Write-Host ""

    docker-compose up -d --build

    if ($LASTEXITCODE -eq 0) {
        Write-Success "Containers started successfully!`n"
        Write-Host "Waiting 15 seconds for services to initialize..." -ForegroundColor Cyan
        Start-Sleep -Seconds 15
        Show-Status
        Write-Host ""
        Write-Info "Services are ready at:"
        Write-Host "   🌐 MVC App:       http://localhost:8082" @Green
        Write-Host "   📚 API Swagger:   http://localhost:8081/swagger" @Green
        Write-Host "   🗄️  SQL Server:    localhost,1433`n"
    }
    else {
        Write-Error-Custom "Failed to start containers"
    }
}

function Stop-Containers {
    Show-Banner
    Write-Info "Stopping all containers..."
    docker-compose stop

    if ($LASTEXITCODE -eq 0) {
        Write-Success "Containers stopped successfully!`n"
    }
    else {
        Write-Error-Custom "Failed to stop containers`n"
    }
}

function Show-Status {
    Write-Host ""
    Write-Info "Container Status:`n"
    docker-compose ps
    Write-Host ""
}

function Show-Logs {
    param([string]$Service = "")

    if ([string]::IsNullOrEmpty($Service)) {
        Write-Info "Displaying logs from all services (press Ctrl+C to exit)`n"
        docker-compose logs -f
    }
    else {
        Write-Info "Displaying logs from $Service (press Ctrl+C to exit)`n"
        docker-compose logs -f $Service
    }
}

function Remove-Containers {
    Show-Banner
    Write-Warning-Custom "This will remove all containers and networks"
    Write-Warning-Custom "Data WILL NOT be deleted (volumes are preserved)`n"

    $confirm = Read-Host "Continue? (yes/no)"

    if ($confirm -eq "yes") {
        Write-Info "Removing containers..."
        docker-compose down

        if ($LASTEXITCODE -eq 0) {
            Write-Success "Containers removed successfully!`n"
        }
        else {
            Write-Error-Custom "Failed to remove containers`n"
        }
    }
    else {
        Write-Info "Operation cancelled`n"
    }
}

function Restart-Containers {
    Show-Banner
    Write-Info "Restarting all containers..."
    docker-compose restart

    if ($LASTEXITCODE -eq 0) {
        Write-Success "Containers restarted successfully!`n"
        Start-Sleep -Seconds 5
        Show-Status
    }
    else {
        Write-Error-Custom "Failed to restart containers`n"
    }
}

function Build-Images {
    Show-Banner
    Write-Info "Building all Docker images..."
    docker-compose build

    if ($LASTEXITCODE -eq 0) {
        Write-Success "Images built successfully!`n"
    }
    else {
        Write-Error-Custom "Failed to build images`n"
    }
}

function Show-Help {
    Show-Banner
    Write-Host @"
USAGE:
   .\run-docker.ps1 -Action <action>

ACTIONS:
   start      - Build and start all containers
   stop       - Stop all running containers
   status     - Show container status
   logs       - Display logs from containers
   restart    - Restart all containers
   remove     - Remove all containers (keeps data)
   build      - Build Docker images only
   help       - Show this help message

EXAMPLES:
   .\run-docker.ps1 -Action start
   .\run-docker.ps1 -Action status
   .\run-docker.ps1 -Action "logs"

QUICK ACCESS:
   🌐 MVC App:       http://localhost:8082
   📚 API Swagger:   http://localhost:8081/swagger
   🗄️  SQL Server:    localhost,1433

USEFUL DOCKER COMMANDS:
   docker-compose ps              - Show container status
   docker-compose logs -f         - Stream all logs
   docker stats                   - Monitor resource usage
   docker exec -it <container> sh - Enter container shell

"@
}

# Main execution
try {
    if ($Action -eq "help") {
        Show-Help
        exit 0
    }

    if (-not (Check-Docker)) {
        exit 1
    }

    switch ($Action) {
        "start"   { Start-Containers }
        "stop"    { Stop-Containers }
        "status"  { Show-Status }
        "logs"    { Show-Logs }
        "restart" { Restart-Containers }
        "remove"  { Remove-Containers }
        "build"   { Build-Images }
        default   { Show-Help }
    }
}
catch {
    Write-Error-Custom "An error occurred: $_`n"
    exit 1
}
