# 🎯 Vibe Guide

**Micro-itineraries for real people**

A psychology-driven personalization engine that generates unique, hyper-personalized city experiences based on personality, mood, and intention. Not a travel guide—a vibe matcher.

---

## 🎨 Design Philosophy

This project uses a **bold brutalist-editorial aesthetic** with:
- **Typography**: Playfair Display (display) + DM Sans (body) for distinctive character
- **Color**: High-contrast black/white with accent red (#ff3366)
- **Layout**: Asymmetric, grid-breaking elements with generous negative space
- **Motion**: Intentional animations on key moments (hover states, page transitions)
- **Texture**: Subtle noise overlay for depth

The design avoids generic "AI slop" aesthetics—no Inter, no purple gradients, no cookie-cutter layouts.

---

## ✨ Features

### User Flow
1. **Enter City** → Type your location (e.g., "Miami, FL")
2. **Choose Persona** → Select from presets or type your own vibe
   - Presets: Foodie, Introvert, Artsy, Nature lover, History nerd, Broke college student
   - Custom: "cozy + romantic", "quiet self-care day", etc.
3. **Choose Intent** (Optional) → Refine your experience
   - Cheap date, Avoid tourists, Walking route, Hidden gems, Photography day, etc.
4. **Generate** → Get your custom micro-itinerary

### Output
- **2-4 curated stops** tailored to your persona
- **Why each place fits** your vibe
- **Cost & time estimates**
- **Route description**
- **Vibe explanation** for the overall experience

### Cities Currently Supported
- **Miami, FL** — 6 personas × 4 spots each = 24 curated experiences
- **Orlando, FL** — 6 personas × 4 spots each = 24 curated experiences

---

## 🏗️ Tech Stack

### Frontend
- **React 18** — Component library
- **Vite** — Build tool for fast dev experience
- **CSS3** — Custom styling with CSS variables (no Tailwind/Bootstrap)
- **Google Fonts** — Playfair Display + DM Sans

### Backend
- **Node.js** — Runtime
- **Express** — Web framework
- **CORS** — Cross-origin support

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ and npm

### Backend Setup

```bash
cd backend
npm install
npm start
```

The API will run on `http://localhost:3001`

**Available Endpoints:**
- `POST /api/generate` — Generate itinerary
- `GET /api/health` — Health check & supported cities

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📡 API Usage

### Generate Itinerary

**Endpoint:** `POST /api/generate`

**Request Body:**
```json
{
  "city": "Miami, FL",
  "persona": "Foodie",
  "customPersona": null,
  "intent": "cheap-date"
}
```

**Response:**
```json
{
  "city": "Miami, FL",
  "persona": "Foodie",
  "intent": "cheap-date",
  "spots": [
    {
      "order": 1,
      "name": "La Sandwicherie",
      "type": "French deli",
      "vibe": "late-night, casual",
      "cost": "$",
      "time": "30min",
      "description": "South Beach midnight sandwich ritual",
      "why": "La Sandwicherie represents the soul of French deli - South Beach midnight sandwich ritual"
    }
  ],
  "summary": {
    "totalCost": "$20",
    "totalTime": "120 minutes",
    "vibe": "These spots celebrate authentic flavors and culinary craft",
    "route": "Begin at La Sandwicherie, continue to Versailles, finish at Garcia's Seafood"
  }
}
```

### Intent Options
- `cheap-date` — Max cost $$, prefers romantic/cozy
- `avoid-tourists` — Excludes popular spots
- `walking-route` — 4 stops within 2 miles
- `hidden-gems` — Prioritizes lesser-known spots
- `photography` — Scenic, vibrant, photogenic locations
- `spontaneous` — Randomized selection
- `three-hours` — 2 stops, ~180 min total
- `locals-only` — Authentic, non-touristy spots

---

## 🎯 How It Works

### Persona Mapping
The backend maps personas to spot categories:

```javascript
const personaMap = {
  'Foodie': 'foodie',
  'Introvert': 'introvert',
  'Artsy': 'artsy',
  'Nature lover': 'nature',
  'History nerd': 'history',
  'Broke college student': 'broke'
};
```

Custom personas use heuristics:
- Keywords like "food", "eat" → foodie
- "quiet", "alone" → introvert
- "art", "creative" → artsy
- "nature", "outdoor" → nature
- "history", "museum" → history
- "cheap", "broke", "budget" → broke

### Intent Filters
Intents modify spot selection:

```javascript
const intents = {
  'cheap-date': { 
    maxCost: '$$', 
    preferredTime: 'evening', 
    keywords: ['romantic', 'cozy', 'intimate'] 
  },
  'photography': { 
    keywords: ['scenic', 'vibrant', 'views', 'colorful'] 
  }
};
```

### Spot Selection
1. Filter by persona category
2. Apply intent filters (cost, keywords, etc.)
3. Shuffle and select 2-4 spots
4. Generate personalized "why" explanations
5. Calculate totals and route

---

## 📂 Project Structure

```
vibe-guide/
├── backend/
│   ├── server.js          # Express API with spot database
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Brutalist-editorial styling
│   │   └── main.jsx       # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🎨 Design Tokens

```css
:root {
  --black: #0a0a0a;
  --white: #fefefe;
  --accent: #ff3366;
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
}
```

---

## 🔮 Future Enhancements

### More Cities
- New York, Austin, Portland, Nashville, Boston, etc.
- International: London, Tokyo, Paris, Barcelona

### Advanced Features
- **Time-of-day optimization** — Morning vs evening recommendations
- **Weather-aware** — Indoor vs outdoor based on forecast
- **Group size** — Solo, couple, friends, family
- **Accessibility filters** — Wheelchair access, sensory-friendly
- **Budget tracking** — Set max spend, get options
- **Save & share** — Export itineraries, share links
- **Map integration** — Visualize route on map
- **Real-time updates** — Hours, closures, events

### Personalization
- **AI-powered matching** — Use LLM to parse custom personas
- **Learning algorithm** — Improve recommendations over time
- **User profiles** — Save preferences, past trips
- **Mood detection** — Analyze input tone for better matching

### Social
- **Community submissions** — Users add their favorite spots
- **Reviews & ratings** — Crowd-sourced quality control
- **Local guides** — Partner with residents for curation
- **Events integration** — Include concerts, pop-ups, markets

---

## 🤝 Contributing

### Adding a New City

1. Open `backend/server.js`
2. Add your city to the `cityData` object:

```javascript
'Austin, TX': {
  foodie: [
    { 
      name: 'Franklin Barbecue', 
      type: 'BBQ', 
      vibe: 'legendary, worth-the-wait',
      cost: '$$', 
      time: '2hr', 
      description: 'Texas BBQ pilgrimage',
      lat: 30.2700,
      lng: -97.7400
    },
    // ... more spots
  ],
  introvert: [ /* ... */ ],
  artsy: [ /* ... */ ],
  nature: [ /* ... */ ],
  history: [ /* ... */ ],
  broke: [ /* ... */ ]
}
```

3. Restart backend, enjoy!

### Spot Requirements
Each spot needs:
- `name` — Official name
- `type` — Category (e.g., "Cuban cafe", "Historic site")
- `vibe` — 2-3 descriptive words (e.g., "cozy, authentic")
- `cost` — Free, $, $$, or $$$
- `time` — Average visit duration
- `description` — One compelling sentence
- `lat` / `lng` — Coordinates (optional, for future map feature)

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

## 🙌 Credits

**Built with:**
- React + Vite
- Express
- Google Fonts (Playfair Display, DM Sans)
- Lots of coffee ☕

**Curated by:**
- Humans who actually live in these cities and know the good spots

---

## 💬 Feedback

Found a hidden gem we missed? Want to add your city? Have design feedback?

**Let's make travel personal again.**

---

*"Not all who wander are lost, but most need better recommendations."*
