@echo off
setlocal enabledelayedexpansion

:: Colors for Windows (limited support)
set "GREEN=[92m"
set "RED=[91m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

echo %BLUE%[STEP]%NC% Starting TaskFlow Timer Development Environment

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR]%NC% Python is not installed. Please install Python 3.7+ to continue.
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR]%NC% Node.js is not installed. Please install Node.js to continue.
    pause
    exit /b 1
)

:: Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR]%NC% npm is not installed. Please install npm to continue.
    pause
    exit /b 1
)

echo %BLUE%[STEP]%NC% Setting up Backend (FastAPI)

:: Navigate to backend directory
cd backend

:: Check if virtual environment exists, create if not
if not exist "venv" (
    echo %GREEN%[INFO]%NC% Creating Python virtual environment...
    python -m venv venv
)

:: Activate virtual environment
echo %GREEN%[INFO]%NC% Activating virtual environment...
call venv\Scripts\activate.bat

:: Install Python dependencies
echo %GREEN%[INFO]%NC% Installing Python dependencies...
pip install -r requirements.txt

:: Start FastAPI backend
echo %GREEN%[INFO]%NC% Starting FastAPI backend on http://localhost:8000
start "FastAPI Backend" cmd /c "python main.py"

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

:: Navigate back to root directory
cd ..

echo %BLUE%[STEP]%NC% Setting up Frontend (React)

:: Check if node_modules exists, install if not
if not exist "node_modules" (
    echo %GREEN%[INFO]%NC% Installing Node.js dependencies...
    npm install
)

:: Start React frontend
echo %GREEN%[INFO]%NC% Starting React frontend on http://localhost:5173
start "React Frontend" cmd /c "npm run dev"

:: Wait a moment for frontend to start
timeout /t 3 /nobreak >nul

echo %BLUE%[STEP]%NC% Development Environment Ready!
echo %GREEN%✓%NC% FastAPI Backend: http://localhost:8000
echo %GREEN%✓%NC% React Frontend: http://localhost:5173
echo %GREEN%✓%NC% API Health Check: http://localhost:8000/
echo.
echo %YELLOW%[WARNING]%NC% Close the command windows to stop the services
echo Press any key to exit this setup script...
pause >nul 