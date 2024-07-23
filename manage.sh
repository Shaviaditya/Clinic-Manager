#!/bin/bash

# Define log files
FRONTEND_LOG="frontend.log"
BACKEND_LOG="backend.log"
ERROR_LOG="error.log"

start() {
  # Navigate to the frontend directory and install dependencies
  echo "Installing dependencies for the frontend..."
  cd /home/whitesand/Desktop/Projects/clinic-frontend || { echo "Failed to navigate to frontend directory"; exit 1; }
  npm install > "../$FRONTEND_LOG" 2>> "../$ERROR_LOG"

  # Start the frontend server
  echo "Starting the frontend server..."
  npm start >> "../$FRONTEND_LOG" 2>> "../$ERROR_LOG" &

  # Save the PID of the frontend server
  FRONTEND_PID=$!
  echo $FRONTEND_PID > "../frontend.pid"

  # Navigate to the backend directory and install dependencies
  echo "Installing dependencies for the backend..."
  cd /home/whitesand/Desktop/Projects/clinic-backend || { echo "Failed to navigate to backend directory"; exit 1; }
  npm install > "../$BACKEND_LOG" 2>> "../$ERROR_LOG"

  # Start the backend server with pm2
  echo "Starting the backend server with pm2..."
  pm2 start npm --name "backend" -- run dev >> "../$BACKEND_LOG" 2>> "../$ERROR_LOG"

  # Display the status of pm2 processes
  pm2 status >> "../$BACKEND_LOG" 2>> "../$ERROR_LOG"

  echo "Frontend and backend servers are starting. Logs are being written to frontend.log, backend.log, and error.log."
}

stop() {
  # Stop the frontend server
  if [ -f "../frontend.pid" ]; then
    FRONTEND_PID=$(cat "../frontend.pid")
    if [ -n "$FRONTEND_PID" ]; then
      echo "Stopping the frontend server with PID $FRONTEND_PID..."
      kill $FRONTEND_PID
      rm "../frontend.pid"
    else
      echo "Frontend PID not found."
    fi
  else
    echo "Frontend PID file not found."
  fi

  # Stop the backend server using pm2
  echo "Stopping the backend server managed by pm2..."
  pm2 stop backend
  pm2 delete backend

  # Optional: Check the status of pm2 processes
  pm2 status
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac

