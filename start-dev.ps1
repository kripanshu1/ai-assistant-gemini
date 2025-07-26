#!/usr/bin/env pwsh

Write-Host "🚀 Starting Full-Stack Animated Website Development Environment" -ForegroundColor Green
Write-Host "===============================================================" -ForegroundColor Green

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Check if ports are available
Write-Host "🔍 Checking ports..." -ForegroundColor Yellow

if (Test-Port 5000) {
    Write-Host "❌ Port 5000 is already in use. Please stop any process using this port." -ForegroundColor Red
    Write-Host "You can find the process using: netstat -ano | findstr :5000" -ForegroundColor Yellow
    exit 1
}

if (Test-Port 3000) {
    Write-Host "❌ Port 3000 is already in use. Please stop any process using this port." -ForegroundColor Red
    Write-Host "You can find the process using: netstat -ano | findstr :3000" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Ports 3000 and 5000 are available" -ForegroundColor Green

# Start backend
Write-Host "🖥️  Starting Backend Server..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🖥️  Backend Server Starting...' -ForegroundColor Cyan; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Host "🌐 Starting Frontend Development Server..." -ForegroundColor Magenta
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host '🌐 Frontend Development Server Starting...' -ForegroundColor Magenta; npm start"

Write-Host ""
Write-Host "🎉 Development environment is starting up!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend will be available at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "🛠️  Backend API will be available at: http://localhost:5000" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 API Endpoints:" -ForegroundColor Cyan
Write-Host "   • GET  http://localhost:5000/api/health" -ForegroundColor White
Write-Host "   • GET  http://localhost:5000/api/hero" -ForegroundColor White
Write-Host "   • GET  http://localhost:5000/api/features" -ForegroundColor White
Write-Host "   • GET  http://localhost:5000/api/testimonials" -ForegroundColor White
Write-Host "   • POST http://localhost:5000/api/contact" -ForegroundColor White
Write-Host ""
Write-Host "🎨 Features included:" -ForegroundColor Magenta
Write-Host "   ✨ Framer Motion animations" -ForegroundColor White
Write-Host "   🎭 Lottie animation support" -ForegroundColor White
Write-Host "   📱 Responsive design" -ForegroundColor White
Write-Host "   🎯 Intersection Observer API" -ForegroundColor White
Write-Host "   💅 Styled Components" -ForegroundColor White
Write-Host "   🚀 Express.js backend" -ForegroundColor White
Write-Host ""
Write-Host "To stop the servers, close the terminal windows or press Ctrl+C in each terminal." -ForegroundColor Yellow
Write-Host ""
Write-Host "Happy coding! 🚀✨" -ForegroundColor Green
