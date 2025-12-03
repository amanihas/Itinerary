#!/bin/bash

echo "🎨 Starting Vibe Guide Frontend..."
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed. Running npm install..."
    npm install
fi

echo "🚀 Starting dev server..."
echo "   Opening http://localhost:5173"
echo ""

npm run dev
