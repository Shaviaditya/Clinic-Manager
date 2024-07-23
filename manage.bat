@echo off
setlocal

:: Define log files
set "FRONTEND_LOG=frontend.log"
set "BACKEND_LOG=backend.log"
set "ERROR_LOG=error.log"

:Start
if "%1"=="start" goto StartServers
if "%1"=="stop" goto StopServers
echo Usage: %~nx0 {start|stop}
exit /b 1

:StartServers
:: Navigate to the frontend directory and install dependencies
echo Installing dependencies for the frontend...
cd /d "C:\Users\YourUsername\Desktop\Projects\clinic-frontend" || (echo Failed to navigate to frontend directory & exit /b 1)
npm install > "%~dp0%FRONTEND_LOG%" 2>> "%~dp0%ERROR_LOG%"

:: Start the frontend server
echo Starting the frontend server...
start /b npm start >> "%~dp0%FRONTEND_LOG%" 2>> "%~dp0%ERROR_LOG%"

:: Save the PID of the frontend server
set "FRONTEND_PID=%ERRORLEVEL%"
echo %FRONTEND_PID% > "%~dp0frontend.pid"

:: Navigate to the backend directory and install dependencies
echo Installing dependencies for the backend...
cd /d "C:\Users\YourUsername\Desktop\Projects\clinic-backend" || (echo Failed to navigate to backend directory & exit /b 1)
npm install > "%~dp0%BACKEND_LOG%" 2>> "%~dp0%ERROR_LOG%"

:: Start the backend server with pm2
echo Starting the backend server with pm2...
pm2 start npm --name "backend" -- run dev >> "%~dp0%BACKEND_LOG%" 2>> "%~dp0%ERROR_LOG%"

:: Display the status of pm2 processes
pm2 status >> "%~dp0%BACKEND_LOG%" 2>> "%~dp0%ERROR_LOG%"

echo Frontend and backend servers are starting. Logs are being written to frontend.log, backend.log, and error.log.
goto :eof

:StopServers
:: Stop the frontend server
if exist "%~dp0frontend.pid" (
    set /p FRONTEND_PID=<"%~dp0frontend.pid"
    if defined FRONTEND_PID (
        echo Stopping the frontend server with PID %FRONTEND_PID%...
        taskkill /PID %FRONTEND_PID% /F
        del "%~dp0frontend.pid"
    ) else (
        echo Frontend PID not found.
    )
) else (
    echo Frontend PID file not found.
)

:: Stop the backend server using pm2
echo Stopping the backend server managed by pm2...
pm2 stop backend
pm2 delete backend

:: Optional: Check the status of pm2 processes
pm2 status

goto :eof
