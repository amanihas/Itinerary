@echo off
echo 🎨 Starting Vibe Guide Frontend...
echo.

cd frontend

if not exist "node_modules" (
    echo ⚠️  Dependencies not installed. Running npm install...
    call npm install
)

echo 🚀 Starting dev server...
echo    Opening http://localhost:5173
echo.

call npm run dev
