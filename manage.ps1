# Define log files
$frontendLog = "frontend.log"
$backendLog = "backend.log"
$errorLog = "error.log"

function Start-Servers {
    # Navigate to the frontend directory and install dependencies
    Write-Output "Installing dependencies for the frontend..."
    Set-Location -Path "C:\Users\YourUsername\Desktop\Projects\clinic-frontend" -ErrorAction Stop
    npm install *> "../$frontendLog" 2>> "../$errorLog"

    # Start the frontend server
    Write-Output "Starting the frontend server..."
    Start-Process npm -ArgumentList "start" -NoNewWindow -RedirectStandardOutput "../$frontendLog" -RedirectStandardError "../$errorLog" -PassThru
    $frontendPid = $PID
    $frontendPid | Out-File -FilePath "../frontend.pid"

    # Navigate to the backend directory and install dependencies
    Write-Output "Installing dependencies for the backend..."
    Set-Location -Path "C:\Users\YourUsername\Desktop\Projects\clinic-backend" -ErrorAction Stop
    npm install *> "../$backendLog" 2>> "../$errorLog"

    # Start the backend server with pm2
    Write-Output "Starting the backend server with pm2..."
    pm2 start npm --name "backend" -- run dev >> "../$backendLog" 2>> "../$errorLog"

    # Display the status of pm2 processes
    pm2 status >> "../$backendLog" 2>> "../$errorLog"

    Write-Output "Frontend and backend servers are starting. Logs are being written to frontend.log, backend.log, and error.log."
}

function Stop-Servers {
    # Stop the frontend server
    if (Test-Path "../frontend.pid") {
        $frontendPid = Get-Content "../frontend.pid"
        if ($frontendPid) {
            Write-Output "Stopping the frontend server with PID $frontendPid..."
            Stop-Process -Id $frontendPid -ErrorAction SilentlyContinue
            Remove-Item -Path "../frontend.pid"
        } else {
            Write-Output "Frontend PID not found."
        }
    } else {
        Write-Output "Frontend PID file not found."
    }

    # Stop the backend server using pm2
    Write-Output "Stopping the backend server managed by pm2..."
    pm2 stop backend
    pm2 delete backend

    # Optional: Check the status of pm2 processes
    pm2 status
}

param (
    [string]$action
)

switch ($action) {
    "start" { Start-Servers }
    "stop" { Stop-Servers }
    default {
        Write-Output "Usage: .\manage.ps1 {start|stop}"
        exit 1
    }
}
