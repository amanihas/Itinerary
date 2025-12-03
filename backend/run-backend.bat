@echo off
echo 🔧 Starting Vibe Guide Backend...
echo.

cd backend

if not exist "node_modules" (
    echo ⚠️  Dependencies not installed. Running npm install...
    call npm install
)

echo 🚀 Starting server on http://localhost:3001
echo.

call npm start
