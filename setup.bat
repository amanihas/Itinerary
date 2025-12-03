@echo off
echo 🎯 Vibe Guide Setup Script
echo ==========================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    echo Recommended version: 18 or higher
    pause
    exit /b 1
)

for /f "tokens=*" %%a in ('node -v') do set NODE_VERSION=%%a
for /f "tokens=*" %%a in ('npm -v') do set NPM_VERSION=%%a

echo ✅ Node.js %NODE_VERSION% detected
echo ✅ npm %NPM_VERSION% detected
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    cd ..
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully
cd ..

echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    cd ..
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully
cd ..

echo.
echo 🎉 Setup complete!
echo.
echo To run the application:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   npm start
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo The app will open at http://localhost:5173
echo.
echo Happy coding! 🚀
echo.
pause
