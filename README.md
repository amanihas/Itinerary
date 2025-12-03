# 🎯 Vibe Guide

**Psychology-driven micro-itinerary generator** - Your personalized city experience based on personality, mood, and intent.

## 📁 Project Structure

```
Itinerary/
├── backend/           # Express API server
│   ├── server.js      # Main backend logic
│   ├── package.json   # Backend dependencies
│   └── run-backend.*  # Backend startup scripts
│
├── frontend/          # React + Vite application
│   ├── src/           # Source files
│   │   ├── App.jsx    # Main React component
│   │   ├── App.css    # Styling
│   │   └── main.jsx   # Entry point
│   ├── index.html     # HTML template
│   ├── package.json   # Frontend dependencies
│   └── run-frontend.* # Frontend startup scripts
│
├── docs/              # Documentation
│   ├── START_HERE.md  # Quick start guide
│   ├── QUICKSTART.md  # Setup instructions
│   ├── DESIGN.md      # Design philosophy
│   ├── ARCHITECTURE.md # Technical details
│   └── ...            # More documentation
│
└── mnt/               # Additional resources
```

## 🚀 Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Run the Application

**Terminal 1 - Start Backend (Port 3000):**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend (Port 5173):**
```bash
cd frontend
npm run dev
```

### 3. Open in Browser

Navigate to `http://localhost:5173` and try:
- Enter: **Miami, FL**
- Pick: **Foodie**
- Choose: **Cheap date**
- Click: **Generate My Vibe**

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite 5
- Custom CSS

**Backend:**
- Node.js
- Express 4
- CORS support

## 📚 Documentation

See the [docs](docs/) folder for comprehensive guides:
- [START_HERE.md](docs/START_HERE.md) - Complete overview
- [QUICKSTART.md](docs/QUICKSTART.md) - Setup guide
- [DESIGN.md](docs/DESIGN.md) - Design philosophy
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical details
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Production deployment

## 🎨 Features

- ✅ 3-step user flow (city → persona → intent)
- ✅ 6 preset personas + custom input
- ✅ 8 intent modifiers
- ✅ 2-4 curated spots per result
- ✅ Personalized explanations
- ✅ Cost & time estimates
- ✅ Fully responsive design

## 📄 License

MIT License - Free to use, modify, and distribute.

---

**Happy building!** ✨
