# 🚀 Getting Started with Vibe Guide

Your complete guide to running the Vibe Guide micro-itinerary generator.

---

## ⚡ Quick Start (Choose Your Method)

### Method 1: Automated Setup (Recommended)

**Mac/Linux:**
```bash
./setup.sh
```

**Windows:**
```bash
setup.bat
```

This will install all dependencies for both frontend and backend.

---

### Method 2: Manual Setup

**Step 1: Install Backend Dependencies**
```bash
cd backend
npm install
cd ..
```

**Step 2: Install Frontend Dependencies**
```bash
cd frontend
npm install
cd ..
```

---

## 🏃 Running the Application

You need to run **TWO** processes (backend + frontend).

### Option A: Using Run Scripts (Easiest)

**Mac/Linux:**

Terminal 1:
```bash
./run-backend.sh
```

Terminal 2:
```bash
./run-frontend.sh
```

**Windows:**

Terminal 1:
```bash
run-backend.bat
```

Terminal 2:
```bash
run-frontend.bat
```

---

### Option B: Manual Commands

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

You should see:
```
🎯 Vibe Guide API running on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Your browser should automatically open to `http://localhost:5173`

---

## ✅ Verify It's Working

### Test 1: Check Backend
Open your browser and go to:
```
http://localhost:3001/api/health
```

You should see:
```json
{
  "status": "ok",
  "cities": ["Miami, FL", "Orlando, FL"]
}
```

### Test 2: Use the App
1. Open `http://localhost:5173`
2. Enter city: **Miami, FL**
3. Choose persona: **Foodie**
4. Choose intent: **Cheap date** (optional)
5. Click **Generate My Vibe**

You should see a personalized itinerary with 2-3 spots!

---

## 🛠️ Prerequisites

### Required Software

**Node.js** (version 18 or higher)
- Download: https://nodejs.org
- Check version: `node -v`
- Check npm: `npm -v`

That's it! Just Node.js and npm.

---

## 📁 Project Structure

```
vibe-guide-complete/
├── setup.sh              # Mac/Linux setup script
├── setup.bat             # Windows setup script
├── run-backend.sh        # Mac/Linux backend runner
├── run-backend.bat       # Windows backend runner
├── run-frontend.sh       # Mac/Linux frontend runner
├── run-frontend.bat      # Windows frontend runner
├── GETTING_STARTED.md    # This file
│
├── backend/
│   ├── server.js         # Express API server
│   └── package.json      # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Styling
│   │   └── main.jsx      # Entry point
│   ├── index.html        # HTML template
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite config
│
└── [Documentation files...]
```

---

## 🎯 First Time Setup Checklist

- [ ] Install Node.js 18+
- [ ] Extract the project files
- [ ] Run setup script (or manual install)
- [ ] Start backend in Terminal 1
- [ ] Start frontend in Terminal 2
- [ ] Open http://localhost:5173
- [ ] Try generating an itinerary!

---

## 🐛 Troubleshooting

### Problem: "node: command not found"
**Solution:** Install Node.js from https://nodejs.org

### Problem: "Cannot find module 'express'"
**Solution:** Run the setup script or `npm install` in backend folder

### Problem: Backend won't start
**Solution:** 
- Check if port 3001 is already in use
- On Mac/Linux: `lsof -i :3001`
- On Windows: `netstat -ano | findstr :3001`
- Kill the process or change the port in `backend/server.js`

### Problem: Frontend shows "Failed to fetch"
**Solution:** 
- Make sure backend is running on http://localhost:3001
- Check backend terminal for errors
- Try visiting http://localhost:3001/api/health

### Problem: Page is blank
**Solution:**
- Check browser console (F12) for errors
- Make sure you ran `npm install` in frontend
- Try clearing browser cache

### Problem: "EADDRINUSE: address already in use"
**Solution:** Another app is using the port
- Backend uses 3001 - change `PORT` in `backend/server.js`
- Frontend uses 5173 - change in `frontend/vite.config.js`

---

## 🎨 Customization Quick Tips

### Change Colors
Edit `frontend/src/App.css` and modify CSS variables:
```css
:root {
  --accent: #ff3366;  /* Change this to your color */
  --black: #0a0a0a;
  --white: #fefefe;
}
```

### Add a New City
Edit `backend/server.js` and add to `cityData`:
```javascript
'Your City, State': {
  foodie: [ /* spots */ ],
  introvert: [ /* spots */ ],
  // ... etc
}
```

### Change Port Numbers
- **Backend**: Edit `backend/server.js` - change `const PORT = 3001`
- **Frontend**: Edit `frontend/vite.config.js` - change `server.port`

---

## 📚 Next Steps

Once you have it running:

1. **Read the docs:**
   - README.md - Project overview
   - DESIGN.md - Design system
   - ARCHITECTURE.md - Technical details

2. **Try the features:**
   - Different personas
   - Custom persona input
   - Various intent modifiers
   - Different cities

3. **Customize it:**
   - Add your city
   - Change the colors
   - Modify the spots

4. **Deploy it:**
   - See DEPLOYMENT.md
   - Choose your platform
   - Share with users!

---

## 💡 Keyboard Shortcuts

**While developing:**
- `Ctrl+C` (or `Cmd+C` on Mac) - Stop the server
- Browser refresh (F5) - Reload frontend (or it auto-reloads!)

---

## 🎓 Learning Resources

**React:** https://react.dev  
**Vite:** https://vitejs.dev  
**Express:** https://expressjs.com  
**Node.js:** https://nodejs.org/docs

---

## 🆘 Still Having Issues?

1. Make sure Node.js 18+ is installed: `node -v`
2. Make sure you're in the project root directory
3. Make sure both backend and frontend dependencies are installed
4. Check both terminal windows for error messages
5. Try deleting `node_modules` folders and running setup again

---

## 🎉 Success!

If you see the app and can generate itineraries, you're all set!

**What you can do now:**
- ✅ Generate personalized itineraries
- ✅ Try different personas and intents
- ✅ Add your own cities
- ✅ Customize the design
- ✅ Deploy to production

---

**Happy coding!** 🚀

*For more detailed information, see README.md*
