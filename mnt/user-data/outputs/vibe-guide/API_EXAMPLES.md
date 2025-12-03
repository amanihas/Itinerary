# API Examples

Sample requests and responses for the Vibe Guide API.

---

## Example 1: Foodie in Miami (No Intent)

### Request
```http
POST http://localhost:3001/api/generate
Content-Type: application/json

{
  "city": "Miami, FL",
  "persona": "Foodie",
  "customPersona": null,
  "intent": null
}
```

### Response
```json
{
  "city": "Miami, FL",
  "persona": "Foodie",
  "intent": "none",
  "spots": [
    {
      "order": 1,
      "name": "Versailles",
      "type": "Cuban cafe",
      "vibe": "authentic, bustling",
      "cost": "$",
      "time": "45min",
      "description": "Window cafecito counter culture",
      "lat": 25.7617,
      "lng": -80.1918,
      "why": "Versailles represents the soul of Cuban cafe - Window cafecito counter culture"
    },
    {
      "order": 2,
      "name": "Zak the Baker",
      "type": "Artisan bakery",
      "vibe": "morning, cozy",
      "cost": "$$",
      "time": "40min",
      "description": "Sourdough temple in Wynwood",
      "lat": 25.8014,
      "lng": -80.1995,
      "why": "Zak the Baker represents the soul of Artisan bakery - Sourdough temple in Wynwood"
    },
    {
      "order": 3,
      "name": "Garcia's Seafood",
      "type": "Waterfront seafood",
      "vibe": "fresh, local",
      "cost": "$$",
      "time": "1hr",
      "description": "River-side stone crab shack",
      "lat": 25.7738,
      "lng": -80.1856,
      "why": "Garcia's Seafood represents the soul of Waterfront seafood - River-side stone crab shack"
    }
  ],
  "summary": {
    "totalCost": "$70",
    "totalTime": "145 minutes",
    "vibe": "These spots celebrate authentic flavors and culinary craft",
    "route": "Begin at Versailles, continue to Zak the Baker, finish at Garcia's Seafood"
  }
}
```

---

## Example 2: Introvert in Orlando (Three Hours Intent)

### Request
```http
POST http://localhost:3001/api/generate
Content-Type: application/json

{
  "city": "Orlando, FL",
  "persona": "Introvert",
  "customPersona": null,
  "intent": "three-hours"
}
```

### Response
```json
{
  "city": "Orlando, FL",
  "persona": "Introvert",
  "intent": "three-hours",
  "spots": [
    {
      "order": 1,
      "name": "Kraft Azalea Garden",
      "type": "Lake garden",
      "vibe": "peaceful, shaded",
      "cost": "Free",
      "time": "45min",
      "description": "Secret Winter Park waterfront",
      "lat": 28.5933,
      "lng": -81.3478,
      "why": "Kraft Azalea Garden offers peaceful, shaded solitude - Secret Winter Park waterfront"
    },
    {
      "order": 2,
      "name": "Leu Gardens",
      "type": "Botanical garden",
      "vibe": "romantic, lush",
      "cost": "$",
      "time": "1.5hr",
      "description": "50 acres of camellias and roses",
      "lat": 28.5739,
      "lng": -81.3307,
      "why": "Leu Gardens offers romantic, lush solitude - 50 acres of camellias and roses"
    }
  ],
  "summary": {
    "totalCost": "$10",
    "totalTime": "135 minutes",
    "vibe": "These are peaceful sanctuaries where you can recharge",
    "route": "Start at Kraft Azalea Garden, then head to Leu Gardens"
  }
}
```

---

## Example 3: Custom Persona - "Cozy + Romantic" (Cheap Date Intent)

### Request
```http
POST http://localhost:3001/api/generate
Content-Type: application/json

{
  "city": "Miami, FL",
  "persona": null,
  "customPersona": "cozy + romantic",
  "intent": "cheap-date"
}
```

### Response
```json
{
  "city": "Miami, FL",
  "persona": "cozy + romantic",
  "intent": "cheap-date",
  "spots": [
    {
      "order": 1,
      "name": "Books & Books Coral Gables",
      "type": "Indie bookstore",
      "vibe": "literary, cozy",
      "cost": "Free",
      "time": "45min",
      "description": "Courtyard reading sanctuary",
      "lat": 25.7518,
      "lng": -80.2577,
      "why": "Books & Books Coral Gables offers literary, cozy solitude - Courtyard reading sanctuary"
    },
    {
      "order": 2,
      "name": "Matheson Hammock",
      "type": "Atoll pool",
      "vibe": "unique, family-friendly",
      "cost": "$",
      "time": "2hr",
      "description": "Tidal pool beach alternative",
      "lat": 25.6811,
      "lng": -80.2689,
      "why": "Matheson Hammock is unique, family-friendly immersion - Tidal pool beach alternative"
    }
  ],
  "summary": {
    "totalCost": "$10",
    "totalTime": "165 minutes",
    "vibe": "These are peaceful sanctuaries where you can recharge",
    "route": "Start at Books & Books Coral Gables, then head to Matheson Hammock"
  }
}
```

**Note:** Custom personas use heuristic matching. "Cozy + romantic" contains "quiet" vibes, so it maps to the "introvert" category.

---

## Example 4: Nature Lover (Walking Route Intent)

### Request
```http
POST http://localhost:3001/api/generate
Content-Type: application/json

{
  "city": "Miami, FL",
  "persona": "Nature lover",
  "customPersona": null,
  "intent": "walking-route"
}
```

### Response
```json
{
  "city": "Miami, FL",
  "persona": "Nature lover",
  "intent": "walking-route",
  "spots": [
    {
      "order": 1,
      "name": "Oleta River State Park",
      "type": "Kayaking/biking",
      "vibe": "active, mangrove",
      "cost": "$",
      "time": "3hr",
      "description": "Urban wilderness escape",
      "lat": 25.9198,
      "lng": -80.1437,
      "why": "Oleta River State Park is active, mangrove immersion - Urban wilderness escape"
    },
    {
      "order": 2,
      "name": "Bill Baggs Cape Florida",
      "type": "Beach park",
      "vibe": "scenic, historic",
      "cost": "$",
      "time": "2hr",
      "description": "Lighthouse, dunes, quiet beach",
      "lat": 25.6697,
      "lng": -80.1551,
      "why": "Bill Baggs Cape Florida is scenic, historic immersion - Lighthouse, dunes, quiet beach"
    },
    {
      "order": 3,
      "name": "Deering Estate",
      "type": "Nature preserve",
      "vibe": "educational, coastal",
      "cost": "$$",
      "time": "2.5hr",
      "description": "Fossil pit, mangroves, mansion",
      "lat": 25.6747,
      "lng": -80.1671,
      "why": "Deering Estate is educational, coastal immersion - Fossil pit, mangroves, mansion"
    },
    {
      "order": 4,
      "name": "Matheson Hammock",
      "type": "Atoll pool",
      "vibe": "unique, family-friendly",
      "cost": "$",
      "time": "2hr",
      "description": "Tidal pool beach alternative",
      "lat": 25.6811,
      "lng": -80.2689,
      "why": "Matheson Hammock is unique, family-friendly immersion - Tidal pool beach alternative"
    }
  ],
  "summary": {
    "totalCost": "$40",
    "totalTime": "570 minutes",
    "vibe": "These places reconnect you with Florida's natural beauty",
    "route": "Walking loop: Oleta River State Park → Bill Baggs Cape Florida → Deering Estate → Matheson Hammock"
  }
}
```

**Note:** Walking route intent generates 4 spots (instead of default 3).

---

## Example 5: Broke College Student (Locals-Only Intent)

### Request
```http
POST http://localhost:3001/api/generate
Content-Type: application/json

{
  "city": "Orlando, FL",
  "persona": "Broke college student",
  "customPersona": null,
  "intent": "locals-only"
}
```

### Response
```json
{
  "city": "Orlando, FL",
  "persona": "Broke college student",
  "intent": "locals-only",
  "spots": [
    {
      "order": 1,
      "name": "Lake Eola Park",
      "type": "City lake",
      "vibe": "iconic, central",
      "cost": "Free",
      "time": "1hr",
      "description": "Swan boats, fountain, skyline views",
      "lat": 28.5436,
      "lng": -81.3728,
      "why": "Lake Eola Park delivers iconic, central energy - Swan boats, fountain, skyline views"
    },
    {
      "order": 2,
      "name": "Winter Park Farmer's Market",
      "type": "Saturday market",
      "vibe": "local, vibrant",
      "cost": "Free-$",
      "time": "1.5hr",
      "description": "Produce, live music, community",
      "lat": 28.5952,
      "lng": -81.3549,
      "why": "Winter Park Farmer's Market delivers local, vibrant energy - Produce, live music, community"
    },
    {
      "order": 3,
      "name": "Free First Thursday",
      "type": "Monthly gallery night",
      "vibe": "downtown, social",
      "cost": "Free",
      "time": "2hr",
      "description": "Art crawl with free admission",
      "lat": 28.5421,
      "lng": -81.3790,
      "why": "Free First Thursday delivers downtown, social energy - Art crawl with free admission"
    }
  ],
  "summary": {
    "totalCost": "Free",
    "totalTime": "270 minutes",
    "vibe": "These prove the best experiences don't need a big budget",
    "route": "Begin at Lake Eola Park, continue to Winter Park Farmer's Market, finish at Free First Thursday"
  }
}
```

---

## Example 6: Error - City Not Supported

### Request
```http
POST http://localhost:3001/api/generate
Content-Type: application/json

{
  "city": "Austin, TX",
  "persona": "Foodie",
  "customPersona": null,
  "intent": null
}
```

### Response (404)
```json
{
  "error": "City not yet supported",
  "message": "We're still building out Austin, TX. Try Miami, FL or Orlando, FL!"
}
```

---

## Example 7: Error - Missing City

### Request
```http
POST http://localhost:3001/api/generate
Content-Type: application/json

{
  "persona": "Foodie",
  "intent": null
}
```

### Response (400)
```json
{
  "error": "City is required"
}
```

---

## Health Check Endpoint

### Request
```http
GET http://localhost:3001/api/health
```

### Response
```json
{
  "status": "ok",
  "cities": [
    "Miami, FL",
    "Orlando, FL"
  ]
}
```

---

## Intent Configurations

Here's how each intent modifies the spot selection:

### cheap-date
```javascript
{
  maxCost: '$$',
  preferredTime: 'evening',
  keywords: ['romantic', 'cozy', 'intimate']
}
```
→ Filters out $$$ spots, prefers romantic vibes

### avoid-tourists
```javascript
{
  excludeTypes: ['theme park'],
  preferKeyword: 'local'
}
```
→ Removes touristy spots, prioritizes "local" or "authentic"

### walking-route
```javascript
{
  maxDistance: 2,
  preferType: 'compact'
}
```
→ Generates 4 stops (vs. default 3) within 2 miles

### hidden-gems
```javascript
{
  preferKeyword: 'hidden',
  avoidPopular: true
}
```
→ Prioritizes lesser-known spots with "hidden" or "secret" vibes

### photography
```javascript
{
  keywords: ['scenic', 'vibrant', 'views', 'colorful']
}
```
→ Filters for visually striking locations

### spontaneous
```javascript
{
  randomize: true
}
```
→ Fully randomized selection across categories

### three-hours
```javascript
{
  maxTotalTime: 180
}
```
→ Generates only 2 stops, max 3 hours total

### locals-only
```javascript
{
  preferKeyword: 'authentic'
}
```
→ Prioritizes "authentic", "local", "community" vibes

---

## Notes on the Algorithm

### Persona → Category Mapping
```javascript
Foodie           → foodie
Introvert        → introvert
Artsy            → artsy
Nature lover     → nature
History nerd     → history
Broke college... → broke
```

### Custom Persona Heuristics
```javascript
if (includes('food', 'eat'))       → foodie
if (includes('quiet', 'alone'))    → introvert
if (includes('art', 'creative'))   → artsy
if (includes('nature', 'outdoor')) → nature
if (includes('history', 'museum')) → history
if (includes('cheap', 'broke'))    → broke
```

### Spot Selection Logic
1. Get all spots for persona category
2. Apply intent filters (cost, keywords, type exclusions)
3. Shuffle remaining spots
4. Select 2-4 spots (based on intent)
5. Generate personalized "why" explanations
6. Calculate totals and route description

---

## Testing the API

### Using cURL
```bash
# Basic foodie request
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Miami, FL",
    "persona": "Foodie",
    "intent": null
  }'

# Custom persona with intent
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Orlando, FL",
    "customPersona": "quiet self-care day",
    "intent": "three-hours"
  }'
```

### Using Postman
1. Create new POST request
2. URL: `http://localhost:3001/api/generate`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "city": "Miami, FL",
     "persona": "Artsy",
     "intent": "photography"
   }
   ```

### Using JavaScript Fetch
```javascript
const response = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    city: 'Miami, FL',
    persona: 'History nerd',
    intent: 'walking-route'
  })
});

const data = await response.json();
console.log(data);
```

---

## Rate Limiting & Production Considerations

**Current Implementation:**
- No rate limiting
- No authentication
- CORS enabled for all origins
- Single-threaded Express server

**Production Recommendations:**
- Add rate limiting (express-rate-limit)
- Implement API keys for usage tracking
- Use Redis for caching popular queries
- Add database (MongoDB/PostgreSQL) for spot management
- Implement logging (Winston/Morgan)
- Add monitoring (DataDog/New Relic)
- Deploy with PM2 or Docker
- Use CDN for frontend assets

---

*These examples should cover most use cases. For custom scenarios, refer to the main README.md*
