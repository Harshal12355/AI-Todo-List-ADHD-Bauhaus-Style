#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Function to cleanup background processes
cleanup() {
    print_warning "Shutting down services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        print_status "Backend stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        print_status "Frontend stopped"
    fi
    exit 0
}

# Set up signal handlers for cleanup
trap cleanup SIGINT SIGTERM

print_step "Starting TaskFlow Timer Development Environment"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        print_error "Python is not installed. Please install Python 3.7+ to continue."
        exit 1
    else
        PYTHON_CMD="python"
    fi
else
    PYTHON_CMD="python3"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js to continue."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm to continue."
    exit 1
fi

print_step "Setting up Backend (FastAPI)"

# Navigate to backend directory
cd backend

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    $PYTHON_CMD -m venv venv
fi

# Activate virtual environment
print_status "Activating virtual environment..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash)
    source venv/Scripts/activate
else
    # Linux/Mac
    source venv/bin/activate
fi

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install -r requirements.txt

# Start FastAPI backend in background
print_status "Starting FastAPI backend on http://localhost:8000"
$PYTHON_CMD main.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Navigate back to root directory
cd ..

print_step "Setting up Frontend (React)"

# Check if node_modules exists, install if not
if [ ! -d "node_modules" ]; then
    print_status "Installing Node.js dependencies..."
    npm install
fi

# Start React frontend in background
print_status "Starting React frontend on http://localhost:5173"
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

print_step "Development Environment Ready!"
echo -e "${GREEN}✓${NC} FastAPI Backend: http://localhost:8000"
echo -e "${GREEN}✓${NC} React Frontend: http://localhost:5173"
echo -e "${GREEN}✓${NC} API Health Check: http://localhost:8000/"
echo ""
print_warning "Press Ctrl+C to stop both services"

# Wait for user to stop the services
wait 