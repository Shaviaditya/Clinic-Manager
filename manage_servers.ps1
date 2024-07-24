param (
    [string]$action
)

function Start-Servers {
    # Navigate to the frontend directory and install dependencies
    Write-Output "Installing dependencies for the frontend..."
    Set-Location -Path "C:\Users\rudra\OneDrive\Desktop\Clinic-Manager\clinic-frontend" -ErrorAction Stop
    npm install

    # Start the frontend server
    Write-Output "Starting the frontend server..."
    $frontendProcess = Start-Process npm -ArgumentList "start" -NoNewWindow -PassThru
    $frontendPid = $frontendProcess.Id
    $frontendPid | Out-File -FilePath "$PSScriptRoot\frontend.pid"

    # Navigate to the backend directory and install dependencies
    Write-Output "Installing dependencies for the backend..."
    Set-Location -Path "C:\Users\rudra\OneDrive\Desktop\Clinic-Manager\clinic-backend" -ErrorAction Stop
    npm install

    # Start the backend server
    Write-Output "Starting the backend server..."
    $backendProcess = Start-Process npm -ArgumentList "run dev" -NoNewWindow -PassThru
    $backendPid = $backendProcess.Id
    $backendPid | Out-File -FilePath "$PSScriptRoot\backend.pid"
}

function Stop-Servers {
    # Stop the frontend server
    if (Test-Path "$PSScriptRoot\frontend.pid") {
        $frontendPid = Get-Content "$PSScriptRoot\frontend.pid"
        if ($frontendPid) {
            Write-Output "Stopping the frontend server with PID $frontendPid..."
            Stop-Process -Id $frontendPid -ErrorAction SilentlyContinue
            Remove-Item -Path "$PSScriptRoot\frontend.pid"
        } else {
            Write-Output "Frontend PID not found."
        }
    } else {
        Write-Output "Frontend PID file not found."
    }

    # Stop the backend server
    if (Test-Path "$PSScriptRoot\backend.pid") {
        $backendPid = Get-Content "$PSScriptRoot\backend.pid"
        if ($backendPid) {
            Write-Output "Stopping the backend server with PID $backendPid..."
            Stop-Process -Id $backendPid -ErrorAction SilentlyContinue
            Remove-Item -Path "$PSScriptRoot\backend.pid"
        } else {
            Write-Output "Backend PID not found."
        }
    } else {
        Write-Output "Backend PID file not found."
    }
}

switch ($action) {
    "start" { Start-Servers }
    "stop" { Stop-Servers }
    default {
        Write-Output "Usage: .\manage_servers.ps1 {start|stop}"
        exit 1
    }
}
