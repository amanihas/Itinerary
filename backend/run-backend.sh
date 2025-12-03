#!/bin/bash

echo "🔧 Starting Vibe Guide Backend..."
echo ""

cd backend

if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed. Running npm install..."
    npm install
fi

echo "🚀 Starting server on http://localhost:3001"
echo ""

npm start
