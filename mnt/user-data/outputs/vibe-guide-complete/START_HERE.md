# 🎯 VIBE GUIDE - Complete Package

**Your personalized micro-itinerary generator is ready to run!**

---

## ⚡ SUPER QUICK START (3 Steps)

### 1️⃣ Make sure you have Node.js installed
```bash
node -v
```
If you don't see a version number, install Node.js from: https://nodejs.org  
(Version 18 or higher recommended)

### 2️⃣ Run the setup script

**On Mac/Linux:**
```bash
./setup.sh
```

**On Windows:**
Double-click `setup.bat` or run in terminal:
```bash
setup.bat
```

### 3️⃣ Start the app (need 2 terminals)

**On Mac/Linux:**
- Terminal 1: `./run-backend.sh`
- Terminal 2: `./run-frontend.sh`

**On Windows:**
- Terminal 1: Double-click `run-backend.bat`
- Terminal 2: Double-click `run-frontend.bat`

**That's it!** The app will open at http://localhost:5173

---

## 📋 What You Need

**Required:**
- Node.js (version 18+) - Download from https://nodejs.org
- npm (comes with Node.js)

**Optional:**
- Git (if you want version control)
- Code editor (VS Code, Sublime, etc.)

---

## 🏃 Step-by-Step Instructions

### First Time Setup

1. **Extract the files** to a folder (if you haven't already)

2. **Open terminal/command prompt** in this folder

3. **Install dependencies:**
   
   **Automatic way (recommended):**
   ```bash
   # Mac/Linux:
   ./setup.sh
   
   # Windows:
   setup.bat
   ```
   
   **Manual way:**
   ```bash
   # Backend
   cd backend
   npm install
   cd ..
   
   # Frontend
   cd frontend
   npm install
   cd ..
   ```

### Running the App

You need **TWO terminal windows** (one for backend, one for frontend):

**Terminal 1 - Start Backend:**
```bash
# Quick way:
./run-backend.sh    # Mac/Linux
run-backend.bat     # Windows

# Manual way:
cd backend
npm start
```

Wait until you see: `🎯 Vibe Guide API running on http://localhost:3001`

**Terminal 2 - Start Frontend:**
```bash
# Quick way:
./run-frontend.sh   # Mac/Linux
run-frontend.bat    # Windows

# Manual way:
cd frontend
npm run dev
```

Wait until you see: `Local: http://localhost:5173/`

Your browser should automatically open!

---

## ✅ Testing It Works

### Test 1: Backend API
Open in browser: http://localhost:3001/api/health

Should show:
```json
{"status":"ok","cities":["Miami, FL","Orlando, FL"]}
```

### Test 2: Full App
1. Go to http://localhost:5173
2. Enter city: **Miami, FL**
3. Choose: **Foodie**
4. Click: **Generate My Vibe**

You should see a personalized itinerary! 🎉

---

## 📁 Files You Got

```
vibe-guide-complete/
│
├── 🚀 SETUP & RUN SCRIPTS
│   ├── setup.sh              # Mac/Linux setup
│   ├── setup.bat             # Windows setup
│   ├── run-backend.sh        # Mac/Linux - start backend
│   ├── run-backend.bat       # Windows - start backend
│   ├── run-frontend.sh       # Mac/Linux - start frontend
│   ├── run-frontend.bat      # Windows - start frontend
│   └── GETTING_STARTED.md    # Detailed guide
│
├── 📚 DOCUMENTATION
│   ├── README.md             # Project overview
│   ├── QUICKSTART.md         # Quick setup guide
│   ├── DESIGN.md             # Design system
│   ├── ARCHITECTURE.md       # Technical details
│   ├── API_EXAMPLES.md       # API reference
│   ├── DEPLOYMENT.md         # Deploy to production
│   ├── PROJECT_SUMMARY.md    # Complete summary
│   ├── INDEX.md              # Navigation guide
│   └── PREVIEW.html          # Visual preview (open in browser!)
│
├── 🔧 BACKEND (Node.js + Express)
│   ├── server.js             # API server with spots database
│   └── package.json          # Dependencies (express, cors)
│
└── 🎨 FRONTEND (React + Vite)
    ├── src/
    │   ├── App.jsx           # Main component
    │   ├── App.css           # All styling
    │   └── main.jsx          # Entry point
    ├── index.html            # HTML template
    ├── package.json          # Dependencies (react, vite)
    └── vite.config.js        # Vite configuration
```

---

## 🐛 Common Issues & Solutions

### ❌ "node: command not found"
**Fix:** Install Node.js from https://nodejs.org

### ❌ "Cannot find module 'express'"
**Fix:** Run `./setup.sh` or `npm install` in backend folder

### ❌ "EADDRINUSE: address already in use"
**Fix:** Another app is using port 3001 or 5173
- Close other apps
- Or change port in `backend/server.js` (line 6) or `frontend/vite.config.js`

### ❌ Frontend can't connect to backend
**Fix:** Make sure backend is running in Terminal 1
- Check Terminal 1 for errors
- Visit http://localhost:3001/api/health to verify

### ❌ Browser shows blank page
**Fix:** 
- Check browser console (press F12)
- Make sure you ran setup first
- Try `npm install` in frontend folder

### ❌ "Permission denied" on Mac/Linux
**Fix:** Make scripts executable:
```bash
chmod +x *.sh
```

---

## 🎨 Quick Customization

### Change the Colors
Edit `frontend/src/App.css` around line 10:
```css
:root {
  --accent: #ff3366;  /* Change to your color! */
}
```

### Add Your City
Edit `backend/server.js` around line 15:
```javascript
'Your City, State': {
  foodie: [
    { name: 'Restaurant', type: 'Food', vibe: 'cozy', 
      cost: '$$', time: '1hr', description: 'Amazing food' }
  ]
  // ... add more categories
}
```

---

## 📖 Need More Help?

- **Basic setup:** You're reading it! (This file)
- **Detailed guide:** Read `GETTING_STARTED.md`
- **Visual preview:** Open `PREVIEW.html` in your browser
- **Design details:** Read `DESIGN.md`
- **Technical details:** Read `ARCHITECTURE.md`
- **Deployment:** Read `DEPLOYMENT.md`

---

## 🎯 What This App Does

**Vibe Guide** generates personalized micro-itineraries (2-4 spots) based on:
- **Your city** (currently Miami, Orlando)
- **Your persona** (Foodie, Introvert, Artsy, Nature lover, History nerd, Broke student)
- **Your intent** (Cheap date, Avoid tourists, Hidden gems, etc.)

It's not a generic travel guide—it matches YOUR vibe!

---

## 🚀 Ready to Deploy?

Once it's working locally, deploy to production:
1. Read `DEPLOYMENT.md`
2. Choose a platform (Vercel + Railway is easiest)
3. Follow the step-by-step guide
4. Share your app with the world!

---

## ✨ Features

- ✅ 3-step wizard flow
- ✅ 6 preset personas + custom input
- ✅ 8 intent modifiers
- ✅ 48 curated spots (Miami & Orlando)
- ✅ Personalized explanations
- ✅ Beautiful, responsive design
- ✅ Fast (~100ms response time)

---

## 🎉 You're Ready!

**Checklist:**
- [ ] Node.js installed
- [ ] Ran setup script
- [ ] Backend running in Terminal 1
- [ ] Frontend running in Terminal 2
- [ ] Browser open at localhost:5173
- [ ] Successfully generated an itinerary

**All checked?** Congratulations! 🎊

Now you can:
- Add your own cities
- Customize the design
- Deploy to production
- Share with users

---

## 💡 Pro Tips

1. **Keep both terminals open** - You need backend AND frontend running
2. **Browser auto-reloads** - Changes to frontend code reload automatically
3. **Check terminal for errors** - If something breaks, the error is usually there
4. **Use the docs** - Every question is answered in the documentation files

---

**Questions?** Check `GETTING_STARTED.md` for detailed troubleshooting.

**Ready to code?** Check `README.md` for project overview.

**Want to customize?** Check `DESIGN.md` for design tokens.

---

**Happy building!** 🚀

*Made with ☕ and intentionality*
