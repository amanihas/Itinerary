# 🏗️ Vibe Guide — Architecture Overview

A technical deep-dive into how the personalization engine works.

---

## 🎯 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │              React Frontend (Vite)                │     │
│  │                                                   │     │
│  │  - City Input                                     │     │
│  │  - Persona Selection                              │     │
│  │  - Intent Chooser                                 │     │
│  │  - Results Display                                │     │
│  │                                                   │     │
│  │  Port: 5173                                       │     │
│  └───────────────────────────────────────────────────┘     │
│                           │                                 │
│                           │ HTTP POST                       │
│                           ▼                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                           ▼                                 │
│  ┌───────────────────────────────────────────────────┐     │
│  │           Express Backend (Node.js)               │     │
│  │                                                   │     │
│  │  ┌─────────────────────────────────────────┐     │     │
│  │  │     API Routes                          │     │     │
│  │  │  - POST /api/generate                   │     │     │
│  │  │  - GET /api/health                      │     │     │
│  │  └─────────────────────────────────────────┘     │     │
│  │                     │                             │     │
│  │                     ▼                             │     │
│  │  ┌─────────────────────────────────────────┐     │     │
│  │  │   Itinerary Generator Logic             │     │     │
│  │  │  - Persona mapping                      │     │     │
│  │  │  - Intent filtering                     │     │     │
│  │  │  - Spot selection                       │     │     │
│  │  │  - Route generation                     │     │     │
│  │  └─────────────────────────────────────────┘     │     │
│  │                     │                             │     │
│  │                     ▼                             │     │
│  │  ┌─────────────────────────────────────────┐     │     │
│  │  │      Spot Database (In-Memory)          │     │     │
│  │  │                                         │     │     │
│  │  │  Miami, FL:                             │     │     │
│  │  │    - foodie: [24 spots]                 │     │     │
│  │  │    - introvert: [24 spots]              │     │     │
│  │  │    - artsy: [24 spots]                  │     │     │
│  │  │    - nature: [24 spots]                 │     │     │
│  │  │    - history: [24 spots]                │     │     │
│  │  │    - broke: [24 spots]                  │     │     │
│  │  │                                         │     │     │
│  │  │  Orlando, FL: [same structure]          │     │     │
│  │  └─────────────────────────────────────────┘     │     │
│  │                                                   │     │
│  │  Port: 3001                                       │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│                      SERVER                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

### 1. User Input Flow
```
User enters city
    ↓
User selects persona (or types custom)
    ↓
User optionally selects intent
    ↓
User clicks "Generate"
    ↓
Frontend sends POST request to /api/generate
```

### 2. Backend Processing Flow
```
Receive request with: { city, persona, customPersona, intent }
    ↓
Validate city exists in database
    ↓
Map persona to category (foodie, introvert, etc.)
    ↓
Retrieve spots for category
    ↓
Apply intent filters (if any)
    ↓
Shuffle spots
    ↓
Select 2-4 spots (based on intent)
    ↓
Generate personalized "why" explanations
    ↓
Calculate totals (cost, time)
    ↓
Generate route description
    ↓
Return JSON response
```

### 3. Results Display Flow
```
Frontend receives itinerary JSON
    ↓
Update state with itinerary data
    ↓
Render results screen with:
  - Summary card (time, cost, vibe, route)
  - Spot cards (name, type, vibe, why, details)
    ↓
User can "Start Over" or "Generate Another"
```

---

## 🧠 Personalization Engine Logic

### Persona → Category Mapping

```javascript
const personaMap = {
  'Foodie': 'foodie',
  'Introvert': 'introvert',
  'Artsy': 'artsy',
  'Nature lover': 'nature',
  'History nerd': 'history',
  'Broke college student': 'broke'
};

// For custom personas, use keyword heuristics
if (customPersona.includes('food')) return 'foodie';
if (customPersona.includes('quiet')) return 'introvert';
// ... etc
```

**Why this works:**
- Preset personas map directly to curated categories
- Custom personas use natural language processing (basic keyword matching)
- Falls back to 'foodie' if no match (safe default)

### Intent Filtering System

```javascript
const intents = {
  'cheap-date': {
    maxCost: '$$',           // Filter out expensive spots
    keywords: ['romantic']   // Prefer romantic vibes
  },
  'photography': {
    keywords: ['scenic', 'vibrant', 'views']
  },
  'walking-route': {
    maxDistance: 2,          // Future: use lat/lng for distance
    numSpots: 4              // More stops for walking tour
  }
};
```

**Filtering process:**
1. Start with all spots in persona category
2. If `maxCost` specified, filter by cost tier
3. If `keywords` specified, filter by matching vibe/description
4. If `excludeTypes` specified, remove those types
5. Return filtered list

### Spot Selection Algorithm

```javascript
// 1. Get filtered spots
let spots = citySpots[category];

// 2. Apply intent filters
if (intent && intents[intent]) {
  spots = applyIntentFilters(spots, intents[intent]);
}

// 3. Determine number of spots
let numSpots = 3; // default
if (intent === 'three-hours') numSpots = 2;
if (intent === 'walking-route') numSpots = 4;

// 4. Shuffle for variety
spots = shuffle(spots);

// 5. Select top N
const selected = spots.slice(0, numSpots);

// 6. Generate personalized explanations
selected.forEach(spot => {
  spot.why = generateWhy(spot, persona, category);
});
```

**Why shuffle?**
- Same persona + intent shouldn't always return same spots
- Creates variety across multiple generations
- Makes each experience feel unique

### "Why" Explanation Generator

```javascript
function generateWhy(spot, persona, category) {
  const templates = {
    foodie: `${spot.name} represents the soul of ${spot.type} - ${spot.description}`,
    introvert: `${spot.name} offers ${spot.vibe} solitude - ${spot.description}`,
    artsy: `${spot.name} feeds your creative eye - ${spot.description}`,
    nature: `${spot.name} is ${spot.vibe} immersion - ${spot.description}`,
    history: `${spot.name} preserves ${spot.vibe} heritage - ${spot.description}`,
    broke: `${spot.name} delivers ${spot.vibe} energy - ${spot.description}`
  };
  
  return templates[category];
}
```

**Design choice:**
- Each persona gets a distinct "voice" in explanations
- Foodie = "soul", Introvert = "solitude", Artsy = "creative eye"
- Makes recommendations feel personalized, not algorithmic

---

## 🗄️ Data Structure

### Spot Object Schema
```javascript
{
  name: String,          // Official name
  type: String,          // Category (e.g., "Cuban cafe")
  vibe: String,          // 2-3 descriptive words
  cost: Enum,            // 'Free', '$', '$$', '$$$'
  time: String,          // e.g., "45min", "2hr"
  description: String,   // One compelling sentence
  lat: Number,           // Latitude (for future map feature)
  lng: Number            // Longitude
}
```

### City Data Structure
```javascript
{
  "City, State": {
    foodie: [ /* 4 spots */ ],
    introvert: [ /* 4 spots */ ],
    artsy: [ /* 4 spots */ ],
    nature: [ /* 4 spots */ ],
    history: [ /* 4 spots */ ],
    broke: [ /* 4 spots */ ]
  }
}
```

**Scalability considerations:**
- Currently in-memory (fast, simple)
- Could move to MongoDB/PostgreSQL for hundreds of cities
- Could add Redis cache for popular queries
- Could use vector database for semantic persona matching

---

## 🎨 Frontend State Management

### React State Structure
```javascript
const [step, setStep] = useState(1);           // 1-4
const [city, setCity] = useState('');
const [persona, setPersona] = useState('');
const [customPersona, setCustomPersona] = useState('');
const [intent, setIntent] = useState('');
const [itinerary, setItinerary] = useState(null);
const [loading, setLoading] = useState(false);
```

**Why not Redux/Context?**
- Simple app, no complex state sharing
- All state is local to App component
- Props not deeply nested
- useState is sufficient

### Step Flow
```
Step 1: City Input
  ↓ (city required)
Step 2: Persona Selection
  ↓ (persona OR customPersona required)
Step 3: Intent (optional)
  ↓
Step 4: Results Display
```

**Navigation:**
- Forward buttons validate required fields
- Back buttons allow editing previous choices
- "Start Over" resets all state to Step 1

---

## 🔐 Security Considerations

### Current Implementation
- ✅ CORS enabled for local development
- ✅ Input validation (city required)
- ❌ No rate limiting
- ❌ No authentication
- ❌ No input sanitization

### Production Recommendations

**1. Rate Limiting**
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});

app.use('/api/', limiter);
```

**2. Input Sanitization**
```javascript
import validator from 'validator';

const city = validator.escape(req.body.city);
const persona = validator.escape(req.body.persona);
```

**3. CORS Restriction**
```javascript
const corsOptions = {
  origin: 'https://yourdomain.com',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

**4. API Keys (optional)**
```javascript
app.use('/api/', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || !isValidKey(apiKey)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

---

## 📈 Performance Optimization

### Current Performance
- **Backend response time**: ~5-20ms (in-memory lookup)
- **Frontend render time**: ~50-100ms (React re-render)
- **Total time to results**: ~100-200ms

### Optimization Opportunities

**1. Backend Caching**
```javascript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 min TTL

app.post('/api/generate', (req, res) => {
  const cacheKey = JSON.stringify(req.body);
  
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }
  
  const result = generateItinerary(req.body);
  cache.set(cacheKey, result);
  res.json(result);
});
```

**2. Frontend Code Splitting**
```javascript
// Lazy load results component
const Results = lazy(() => import('./Results'));

<Suspense fallback={<Loading />}>
  {step === 4 && <Results itinerary={itinerary} />}
</Suspense>
```

**3. Database Indexing** (if moving to DB)
```javascript
// MongoDB indexes for fast lookups
db.spots.createIndex({ city: 1, category: 1 });
db.spots.createIndex({ vibe: "text", description: "text" });
```

**4. CDN for Static Assets**
- Serve frontend from Cloudflare/Vercel
- Reduces latency for global users
- Automatic caching and compression

---

## 🔄 Future Architecture Considerations

### Moving to Database

**MongoDB Schema:**
```javascript
{
  city: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  spots: [{
    name: String,
    type: String,
    vibe: String,
    cost: String,
    time: String,
    description: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    images: [String],
    reviews: [{
      rating: Number,
      comment: String,
      user: String,
      date: Date
    }]
  }]
}
```

**Benefits:**
- Easier to add/edit spots
- Can add user reviews
- Can track analytics (popular spots, etc.)
- Can scale to thousands of cities

### Adding User Accounts

```
User Registration/Login
    ↓
Save preferences (favorite personas, cities)
    ↓
Track past itineraries
    ↓
Share itineraries with friends
    ↓
Rate spots after visiting
```

### ML-Powered Personalization

```
Collect user behavior data
    ↓
Train model on persona → spot preferences
    ↓
Use embeddings for semantic persona matching
    ↓
Improve recommendations over time
```

**Tech stack:**
- TensorFlow.js for in-browser inference
- Python ML service for training
- Vector database (Pinecone/Weaviate) for semantic search

---

## 🧪 Testing Strategy

### Backend Tests
```javascript
// Example: Jest test
describe('POST /api/generate', () => {
  test('returns itinerary for valid request', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({
        city: 'Miami, FL',
        persona: 'Foodie',
        intent: null
      });
    
    expect(res.status).toBe(200);
    expect(res.body.spots).toHaveLength(3);
    expect(res.body.summary).toBeDefined();
  });
  
  test('returns 404 for unsupported city', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({
        city: 'Unknown City',
        persona: 'Foodie'
      });
    
    expect(res.status).toBe(404);
  });
});
```

### Frontend Tests
```javascript
// Example: React Testing Library
test('advances to step 2 when city entered', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText('Miami, FL');
  fireEvent.change(input, { target: { value: 'Miami, FL' } });
  
  const button = screen.getByText('Continue →');
  fireEvent.click(button);
  
  expect(screen.getByText('Who are you?')).toBeInTheDocument();
});
```

### Integration Tests
```javascript
test('full user flow generates itinerary', async () => {
  // 1. Enter city
  // 2. Select persona
  // 3. Skip intent
  // 4. Generate
  // 5. Verify results displayed
});
```

---

## 📦 Deployment Architecture

### Development
```
Local Machine
├── Backend: localhost:3001
├── Frontend: localhost:5173
└── Live reload enabled
```

### Production (Recommended)

**Option 1: Separate Hosting**
```
Frontend: Vercel (static hosting)
Backend: Railway/Render (Node.js hosting)
Database: MongoDB Atlas (managed DB)
```

**Option 2: Docker + Cloud**
```
Docker Containers:
├── frontend:latest
└── backend:latest

Deploy to:
├── AWS ECS/Fargate
├── Google Cloud Run
└── DigitalOcean App Platform
```

**Option 3: Serverless**
```
Frontend: Vercel/Netlify
Backend: AWS Lambda + API Gateway
Database: DynamoDB or Aurora Serverless
```

---

## 🎯 Technical Decisions & Tradeoffs

### Why React?
**Pros:**
- Component-based UI = maintainable
- Large ecosystem
- Vite = fast dev experience

**Cons:**
- Overkill for simple apps (but needed for step flow)

### Why Express?
**Pros:**
- Minimal, unopinionated
- Easy to understand
- Fast for API-only servers

**Cons:**
- No built-in validation (need middleware)

### Why In-Memory Data?
**Pros:**
- Fast lookups (~1ms)
- Simple to implement
- No DB setup needed

**Cons:**
- Data lost on restart
- Doesn't scale beyond ~100 cities
- Hard to edit spots without code change

**When to migrate to DB:**
- > 10 cities
- Need user-submitted spots
- Want analytics
- Need spot updates without redeployment

---

## 📊 Monitoring & Analytics

### Metrics to Track
```
Backend:
- Request rate (requests/sec)
- Response time (p50, p95, p99)
- Error rate (%)
- Popular cities/personas/intents

Frontend:
- Page load time
- Time to interactive
- Conversion rate (step 1 → results)
- Drop-off points
```

### Recommended Tools
- **Backend**: DataDog, New Relic, or Grafana
- **Frontend**: Google Analytics 4, Mixpanel
- **Errors**: Sentry
- **Logs**: Winston → CloudWatch/Papertrail

---

*This architecture is designed for simplicity and extensibility. Start simple, scale when needed.* 🚀
