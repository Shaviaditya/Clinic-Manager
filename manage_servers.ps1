param (
    [string]$action
)

function Start-Servers {
    # Start PostgreSQL service
    Write-Output "Starting PostgreSQL service..."
    Start-Service -Name "postgresql-x64-16"

    # Start the frontend server
    Write-Output "Starting the frontend server..."
    Set-Location -Path "C:\Users\rudra\OneDrive\Desktop\Clinic-Manager\clinic-frontend" -ErrorAction Stop
    $frontendProcess = Start-Process npm -ArgumentList "start" -NoNewWindow -PassThru
    $frontendPid = $frontendProcess.Id
    $frontendPid | Out-File -FilePath "$PSScriptRoot\frontend.pid"

    # Start the backend server
    Write-Output "Starting the backend server..."
    Set-Location -Path "C:\Users\rudra\OneDrive\Desktop\Clinic-Manager\clinic-backend" -ErrorAction Stop
    $backendProcess = Start-Process npm -ArgumentList "run dev" -NoNewWindow -PassThru
    $backendPid = $backendProcess.Id
    $backendPid | Out-File -FilePath "$PSScriptRoot\backend.pid"

    # Register the exit event to stop servers
    Register-EngineEvent PowerShell.Exiting -Action { Stop-Servers }
}

function Stop-Servers {
    # Stop the frontend server
    if (Test-Path "$PSScriptRoot\frontend.pid") {
        $frontendPid = Get-Content "$PSScriptRoot\frontend.pid"
        if ($frontendPid) {
            Write-Output "Stopping the frontend server with PID $frontendPid..."
            Stop-Process -Id $frontendPid -Force -ErrorAction SilentlyContinue
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
            Stop-Process -Id $backendPid -Force -ErrorAction SilentlyContinue
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
