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

### 2. Configure Foursquare API (Optional but Recommended)

To support all cities worldwide, you'll need a Foursquare API key:

1. Sign up for a free account at [Foursquare Developers](https://foursquare.com/developers/signup)
2. Create a new project and get your API key
3. Copy `backend/.env.example` to `backend/.env`
4. Add your API key to `.env`:

```bash
FOURSQUARE_API_KEY=your_api_key_here
USE_PLACES_API=true
```

**Without an API key:** The app will still work with hardcoded data for Miami, FL and Orlando, FL only.

**With an API key:** The app will support any city worldwide! 🌍

### 3. Run the Application

**Terminal 1 - Start Backend (Port 3001):**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend (Port 5173):**
```bash
cd frontend
npm run dev
```

### 4. Open in Browser

Navigate to `http://localhost:5173` and try:
- Enter: **New York, NY** (or any city!)
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

- ✅ **Worldwide city support** via Foursquare Places API
- ✅ 3-step user flow (city → persona → intent)
- ✅ 6 preset personas + custom input
- ✅ 8 intent modifiers
- ✅ 2-4 curated spots per result
- ✅ Personalized explanations
- ✅ Cost & time estimates
- ✅ Fully responsive design
- ✅ Falls back to curated data for Miami & Orlando without API key

## 📄 License

MIT License - Free to use, modify, and distribute.

---

**Happy building!** ✨
