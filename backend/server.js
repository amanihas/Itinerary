import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configuration
const USE_PLACES_API = process.env.USE_PLACES_API !== 'false';

// OpenStreetMap API configuration (completely free, no API key needed)
const NOMINATIM_API = 'https://nominatim.openstreetmap.org';
const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

// Database of curated spots by city
const cityData = {
  'Miami, FL': {
    foodie: [
      { name: 'Versailles', type: 'Cuban cafe', vibe: 'authentic, bustling', cost: '$', time: '45min', description: 'Window cafecito counter culture', lat: 25.7617, lng: -80.1918 },
      { name: 'La Sandwicherie', type: 'French deli', vibe: 'late-night, casual', cost: '$', time: '30min', description: 'South Beach midnight sandwich ritual', lat: 25.7907, lng: -80.1300 },
      { name: 'Zak the Baker', type: 'Artisan bakery', vibe: 'morning, cozy', cost: '$$', time: '40min', description: 'Sourdough temple in Wynwood', lat: 25.8014, lng: -80.1995 },
      { name: 'Garcia\'s Seafood', type: 'Waterfront seafood', vibe: 'fresh, local', cost: '$$', time: '1hr', description: 'River-side stone crab shack', lat: 25.7738, lng: -80.1856 }
    ],
    introvert: [
      { name: 'Ancient Spanish Monastery', type: 'Historic site', vibe: 'quiet, meditative', cost: '$', time: '1hr', description: '12th century cloisters, zero crowds', lat: 25.8635, lng: -80.1626 },
      { name: 'Pinecrest Gardens', type: 'Botanical garden', vibe: 'peaceful, green', cost: '$', time: '1.5hr', description: 'Hidden tropical oasis with parrots', lat: 25.6644, lng: -80.2972 },
      { name: 'Books & Books Coral Gables', type: 'Indie bookstore', vibe: 'literary, cozy', cost: 'Free', time: '45min', description: 'Courtyard reading sanctuary', lat: 25.7518, lng: -80.2577 },
      { name: 'Fairchild Garden Library', type: 'Garden library', vibe: 'serene, scholarly', cost: '$$', time: '2hr', description: 'Read among rare palms', lat: 25.6840, lng: -80.2710 }
    ],
    artsy: [
      { name: 'Rubell Museum', type: 'Contemporary art', vibe: 'cutting-edge, intimate', cost: '$$', time: '2hr', description: 'World-class private collection', lat: 25.8101, lng: -80.2063 },
      { name: 'Wynwood Walls', type: 'Street art', vibe: 'vibrant, outdoor', cost: 'Free', time: '1hr', description: 'Rotating murals, always evolving', lat: 25.8010, lng: -80.1995 },
      { name: 'de la Cruz Collection', type: 'Design district gallery', vibe: 'free, refined', cost: 'Free', time: '1.5hr', description: 'Museum-quality art, no admission', lat: 25.8125, lng: -80.1936 },
      { name: 'Little Haiti Cultural Complex', type: 'Cultural center', vibe: 'community, authentic', cost: 'Free', time: '45min', description: 'Caribbean art and performance', lat: 25.8179, lng: -80.1959 }
    ],
    nature: [
      { name: 'Oleta River State Park', type: 'Kayaking/biking', vibe: 'active, mangrove', cost: '$', time: '3hr', description: 'Urban wilderness escape', lat: 25.9198, lng: -80.1437 },
      { name: 'Bill Baggs Cape Florida', type: 'Beach park', vibe: 'scenic, historic', cost: '$', time: '2hr', description: 'Lighthouse, dunes, quiet beach', lat: 25.6697, lng: -80.1551 },
      { name: 'Deering Estate', type: 'Nature preserve', vibe: 'educational, coastal', cost: '$$', time: '2.5hr', description: 'Fossil pit, mangroves, mansion', lat: 25.6747, lng: -80.1671 },
      { name: 'Matheson Hammock', type: 'Atoll pool', vibe: 'unique, family-friendly', cost: '$', time: '2hr', description: 'Tidal pool beach alternative', lat: 25.6811, lng: -80.2689 }
    ],
    history: [
      { name: 'Vizcaya Museum', type: 'Historic mansion', vibe: 'elegant, European', cost: '$$', time: '2hr', description: 'Italian Renaissance on Biscayne Bay', lat: 25.7443, lng: -80.2106 },
      { name: 'Freedom Tower', type: 'Historic landmark', vibe: 'meaningful, free', cost: 'Free', time: '45min', description: 'Ellis Island of the South', lat: 25.7808, lng: -80.1870 },
      { name: 'The Barnacle', type: 'Pioneer home', vibe: 'shaded, untouched', cost: '$', time: '1hr', description: 'Miami\'s oldest house, 1891', lat: 25.7220, lng: -80.2547 },
      { name: 'Coral Castle', type: 'Mystery monument', vibe: 'enigmatic, quirky', cost: '$$', time: '1.5hr', description: 'One man carved 1,100 tons of coral', lat: 25.5003, lng: -80.4436 }
    ],
    broke: [
      { name: 'South Pointe Pier', type: 'Waterfront walk', vibe: 'sunset, breezy', cost: 'Free', time: '1hr', description: 'Watch cruise ships leave, free show', lat: 25.7663, lng: -80.1322 },
      { name: 'Domino Park', type: 'Cultural hub', vibe: 'authentic, social', cost: 'Free', time: '45min', description: 'Little Havana\'s living room', lat: 25.7654, lng: -80.2206 },
      { name: 'Venetian Pool', type: 'Historic pool', vibe: 'unique, refreshing', cost: '$', time: '2hr', description: 'Quarry turned Mediterranean lagoon', lat: 25.7561, lng: -80.2647 },
      { name: 'Bayfront Park', type: 'Urban park', vibe: 'downtown, views', cost: 'Free', time: '1hr', description: 'Free events, bay views, people-watching', lat: 25.7745, lng: -80.1864 }
    ]
  },
  'Orlando, FL': {
    foodie: [
      { name: 'Se7en Bites', type: 'Southern brunch', vibe: 'comfort, housemade', cost: '$$', time: '1hr', description: 'Biscuits from scratch, Worth the wait', lat: 28.5453, lng: -81.3634 },
      { name: 'Domu', type: 'Ramen shop', vibe: 'casual, authentic', cost: '$$', time: '45min', description: 'East End Market ramen counter', lat: 28.5709, lng: -81.3549 },
      { name: 'Yellow Dog Eats', type: 'BBQ shack', vibe: 'quirky, outdoor', cost: '$', time: '30min', description: 'Picnic tables, smoked perfection', lat: 28.5951, lng: -81.3066 },
      { name: 'Artisan\'s Table', type: 'Farm-to-table', vibe: 'refined, seasonal', cost: '$$$', time: '2hr', description: 'Winter Park fine dining intimacy', lat: 28.5983, lng: -81.3392 }
    ],
    introvert: [
      { name: 'Kraft Azalea Garden', type: 'Lake garden', vibe: 'peaceful, shaded', cost: 'Free', time: '45min', description: 'Secret Winter Park waterfront', lat: 28.5933, lng: -81.3478 },
      { name: 'Tibet-Butler Preserve', type: 'Nature trails', vibe: 'quiet, wildlife', cost: 'Free', time: '2hr', description: 'Boardwalks through untouched Florida', lat: 28.4497, lng: -81.4797 },
      { name: 'Enzian Theater', type: 'Art cinema', vibe: 'cozy, film-lover', cost: '$$', time: '2.5hr', description: 'Dinner and indie films', lat: 28.6258, lng: -81.3465 },
      { name: 'Leu Gardens', type: 'Botanical garden', vibe: 'romantic, lush', cost: '$', time: '1.5hr', description: '50 acres of camellias and roses', lat: 28.5739, lng: -81.3307 }
    ],
    artsy: [
      { name: 'Mennello Museum', type: 'Folk art', vibe: 'lakeside, charming', cost: '$', time: '1hr', description: 'Earl Cunningham originals', lat: 28.5697, lng: -81.3611 },
      { name: 'Snap! Space', type: 'Photography studio', vibe: 'community, workshops', cost: 'Free-$', time: '1hr', description: 'Gallery and darkroom collective', lat: 28.5434, lng: -81.3774 },
      { name: 'Audubon Center', type: 'Nature art', vibe: 'educational, interactive', cost: 'Free', time: '45min', description: 'Birds of prey, art exhibits', lat: 28.6258, lng: -81.3465 },
      { name: 'CityArts Factory', type: 'Gallery collective', vibe: 'downtown, eclectic', cost: 'Free', time: '1hr', description: 'Monthly art walks', lat: 28.5421, lng: -81.3790 }
    ],
    nature: [
      { name: 'Wekiwa Springs', type: 'Natural spring', vibe: 'pristine, swimming', cost: '$', time: '4hr', description: '72-degree water year-round', lat: 28.7125, lng: -81.4483 },
      { name: 'Bill Frederick Park', type: 'Wilderness park', vibe: 'trails, camping', cost: 'Free', time: '2hr', description: 'Hidden lake and boardwalks', lat: 28.5095, lng: -81.4492 },
      { name: 'Mead Botanical Garden', type: 'Boardwalk garden', vibe: 'elevated, diverse', cost: 'Free', time: '1hr', description: 'Elevated paths through ecosystems', lat: 28.6186, lng: -81.3587 },
      { name: 'Lake Apopka Loop Trail', type: 'Wildlife viewing', vibe: 'birding, expansive', cost: 'Free', time: '2hr', description: 'Best birding in Central Florida', lat: 28.6561, lng: -81.5742 }
    ],
    history: [
      { name: 'Zora Neale Hurston Museum', type: 'Literary landmark', vibe: 'cultural, significant', cost: 'Free', time: '45min', description: 'Eatonville, America\'s first incorporated Black city', lat: 28.6144, lng: -81.3791 },
      { name: 'Wells Built Museum', type: 'Civil rights history', vibe: 'powerful, local', cost: '$', time: '1hr', description: 'African American Orlando history', lat: 28.5515, lng: -81.3782 },
      { name: 'Orange County Regional History Center', type: 'Local museum', vibe: 'comprehensive, interactive', cost: '$$', time: '2hr', description: 'Four floors of Florida stories', lat: 28.5421, lng: -81.3790 },
      { name: 'Hannibal Square Heritage Center', type: 'Community museum', vibe: 'intimate, educational', cost: 'Free', time: '45min', description: 'Winter Park\'s Black history', lat: 28.5952, lng: -81.3549 }
    ],
    broke: [
      { name: 'Lake Eola Park', type: 'City lake', vibe: 'iconic, central', cost: 'Free', time: '1hr', description: 'Swan boats, fountain, skyline views', lat: 28.5436, lng: -81.3728 },
      { name: 'Winter Park Farmer\'s Market', type: 'Saturday market', vibe: 'local, vibrant', cost: 'Free-$', time: '1.5hr', description: 'Produce, live music, community', lat: 28.5952, lng: -81.3549 },
      { name: 'Fort Christmas Historical Park', type: 'Historic fort', vibe: 'educational, outdoor', cost: 'Free', time: '1.5hr', description: 'Seminole War fort replica', lat: 28.5305, lng: -81.0019 },
      { name: 'Free First Thursday', type: 'Monthly gallery night', vibe: 'downtown, social', cost: 'Free', time: '2hr', description: 'Art crawl with free admission', lat: 28.5421, lng: -81.3790 }
    ]
  }
};

// Intents that modify the selection logic
const intents = {
  'cheap-date': { maxCost: '$$', preferredTime: 'evening', keywords: ['romantic', 'cozy', 'intimate'] },
  'avoid-tourists': { excludeTypes: ['theme park'], preferKeyword: 'local' },
  'walking-route': { maxDistance: 2, preferType: 'compact' },
  'hidden-gems': { preferKeyword: 'hidden', avoidPopular: true },
  'photography': { keywords: ['scenic', 'vibrant', 'views', 'colorful'] },
  'spontaneous': { randomize: true },
  'three-hours': { maxTotalTime: 180 },
  'locals-only': { preferKeyword: 'authentic' }
};

// Rich OSM category mapping for personalities
const personaToOSMTags = {
  foodie: {
    amenity: ['restaurant', 'cafe', 'fast_food', 'bar', 'ice_cream', 'bakery', 'food_court'],
    shop: ['bakery', 'coffee', 'confectionery', 'deli', 'cheese', 'chocolate'],
    cuisine: true, // Include cuisine tags
    preferLocal: true
  },
  introvert: {
    amenity: ['library', 'community_centre'],
    leisure: ['park', 'garden'],
    shop: ['books'],
    tourism: ['museum', 'gallery'],
    natural: ['beach', 'waterfall'],
    quiet: true
  },
  artsy: {
    tourism: ['museum', 'gallery', 'artwork'],
    amenity: ['arts_centre', 'theatre', 'cinema'],
    historic: ['monument', 'memorial', 'castle'],
    shop: ['art'],
    cultural: true
  },
  nature: {
    leisure: ['park', 'nature_reserve', 'garden', 'dog_park'],
    natural: ['beach', 'waterfall', 'cave', 'peak', 'valley', 'wood'],
    tourism: ['viewpoint'],
    outdoor: true
  },
  adventurer: {
    tourism: ['attraction', 'viewpoint', 'theme_park'],
    leisure: ['sports_centre', 'water_park', 'climbing'],
    sport: ['climbing', 'cycling', 'skiing'],
    natural: ['peak', 'cave'],
    active: true
  },
  romantic: {
    amenity: ['restaurant', 'cafe', 'bar'],
    tourism: ['viewpoint', 'artwork'],
    leisure: ['park', 'garden'],
    natural: ['beach', 'waterfall'],
    ambiance: 'intimate',
    preferUpscale: true
  },
  history: {
    historic: ['monument', 'memorial', 'castle', 'ruins', 'archaeological_site', 'battlefield'],
    tourism: ['museum'],
    amenity: ['place_of_worship'],
    building: ['cathedral', 'church', 'mosque', 'temple'],
    educational: true
  },
  broke: {
    leisure: ['park', 'garden', 'playground'],
    natural: ['beach', 'waterfall', 'viewpoint'],
    tourism: ['viewpoint', 'artwork'],
    historic: ['monument', 'memorial'],
    freeOnly: true
  }
};

// Geocode city using OpenStreetMap Nominatim (completely free!)
async function geocodeCity(cityName) {
  try {
    // Nominatim requires a User-Agent header
    const response = await fetch(
      `${NOMINATIM_API}/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'VibeGuide/1.0 (Travel Itinerary App)'
        }
      }
    );

    if (!response.ok) {
      console.error(`Nominatim geocoding error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data && data.length > 0) {
      const place = data[0];
      return {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        name: place.display_name.split(',')[0] // Get city name
      };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }

  return null;
}

// Calculate distance between two coordinates using Haversine formula (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Geographic clustering - group nearby places for walkable itineraries
function clusterPlaces(places, targetCount = 4) {
  if (!places || places.length === 0) return [];
  if (places.length <= targetCount) return places;

  // Find clusters of places within 2km of each other
  const clusters = [];
  const maxClusterRadius = 2.0; // 2km max distance within cluster

  for (const place of places) {
    let addedToCluster = false;

    for (const cluster of clusters) {
      // Check if place is within 2km of all places in this cluster
      const withinCluster = cluster.every(p =>
        calculateDistance(place.lat, place.lng, p.lat, p.lng) <= maxClusterRadius
      );

      if (withinCluster) {
        cluster.push(place);
        addedToCluster = true;
        break;
      }
    }

    if (!addedToCluster) {
      clusters.push([place]);
    }
  }

  // Score clusters by size and diversity
  const scoredClusters = clusters.map(cluster => {
    const types = new Set(cluster.map(p => p.type));
    const diversity = types.size / cluster.length; // Prefer diverse spots
    const size = cluster.length; // Prefer clusters with multiple spots
    const score = (size >= targetCount ? 10 : size * 2) + (diversity * 5);

    return { cluster, score, size, diversity };
  });

  // Sort by score and return best cluster
  scoredClusters.sort((a, b) => b.score - a.score);
  const bestCluster = scoredClusters[0].cluster;

  // Return target count from best cluster
  return bestCluster.slice(0, targetCount);
}

// Search for places using OpenStreetMap Overpass API (completely free!)
async function searchPlaces(lat, lng, category, limit = 50) {
  // Use rich persona mapping
  const personaTags = personaToOSMTags[category] || personaToOSMTags.adventurer;
  const allPlaces = [];

  try {
    // Build Overpass query for POIs around the location
    const radius = 10000; // 10km radius for initial search
    const queryParts = [];

    // Build query parts for each tag type
    if (personaTags.amenity) {
      const amenityValues = personaTags.amenity.join('|');
      queryParts.push(`node["amenity"~"${amenityValues}"](around:${radius},${lat},${lng});`);
      queryParts.push(`way["amenity"~"${amenityValues}"](around:${radius},${lat},${lng});`);
    }

    if (personaTags.tourism) {
      const tourismValues = personaTags.tourism.join('|');
      queryParts.push(`node["tourism"~"${tourismValues}"](around:${radius},${lat},${lng});`);
      queryParts.push(`way["tourism"~"${tourismValues}"](around:${radius},${lat},${lng});`);
    }

    if (personaTags.leisure) {
      const leisureValues = personaTags.leisure.join('|');
      queryParts.push(`node["leisure"~"${leisureValues}"](around:${radius},${lat},${lng});`);
      queryParts.push(`way["leisure"~"${leisureValues}"](around:${radius},${lat},${lng});`);
    }

    if (personaTags.historic) {
      const historicValues = personaTags.historic.join('|');
      queryParts.push(`node["historic"~"${historicValues}"](around:${radius},${lat},${lng});`);
      queryParts.push(`way["historic"~"${historicValues}"](around:${radius},${lat},${lng});`);
    }

    if (personaTags.natural) {
      const naturalValues = personaTags.natural.join('|');
      queryParts.push(`node["natural"~"${naturalValues}"](around:${radius},${lat},${lng});`);
      queryParts.push(`way["natural"~"${naturalValues}"](around:${radius},${lat},${lng});`);
    }

    if (personaTags.shop) {
      const shopValues = personaTags.shop.join('|');
      queryParts.push(`node["shop"~"${shopValues}"](around:${radius},${lat},${lng});`);
      queryParts.push(`way["shop"~"${shopValues}"](around:${radius},${lat},${lng});`);
    }

    // Create Overpass QL query
    const overpassQuery = `
      [out:json][timeout:25];
      (
        ${queryParts.join('\n        ')}
      );
      out body ${limit};
    `;

    const response = await fetch(OVERPASS_API, {
      method: 'POST',
      body: `data=${encodeURIComponent(overpassQuery)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      console.error(`Overpass API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data.elements) {
      allPlaces.push(...data.elements);
    }

    // Transform OSM data to our format
    const transformedPlaces = allPlaces
      .filter(place => place.tags && place.tags.name) // Only named places
      .map(place => {
        const tags = place.tags || {};
        const amenity = tags.amenity || tags.tourism || tags.leisure || tags.historic || tags.natural || tags.shop || 'attraction';

        // Detect if free using OSM tags
        const isFree = tags.fee === 'no' ||
                      amenity === 'park' || amenity === 'garden' || amenity === 'beach' ||
                      amenity === 'viewpoint' || tags.natural || amenity === 'memorial';

        // Enhanced cost estimation
        let cost = '$$';
        if (isFree) {
          cost = 'Free';
        } else if (tags.fee === 'yes') {
          cost = tags.charge || '$';
        } else if (amenity === 'cafe' || amenity === 'fast_food' || amenity === 'ice_cream') {
          cost = '$';
        } else if (amenity === 'restaurant' || amenity === 'bar' || amenity === 'pub') {
          cost = tags.cuisine === 'fine_dining' ? '$$$' : '$$';
        } else if (amenity === 'museum' || amenity === 'gallery' || amenity === 'theatre') {
          cost = tags.fee === 'no' ? 'Free' : '$-$$';
        }

        // Improved time estimates
        const timeEstimates = {
          cafe: '45min', fast_food: '30min', restaurant: '1-2hr', bar: '1hr', pub: '1-2hr',
          museum: '1.5-2hr', gallery: '1hr', arts_centre: '1hr',
          park: '1-2hr', garden: '1hr', beach: '2-3hr',
          viewpoint: '20min', monument: '30min', memorial: '30min',
          library: '1hr', bookshop: '45min',
          theatre: '2-3hr', cinema: '2-3hr'
        };
        const time = timeEstimates[amenity] || '1hr';

        // Rich vibe generation from OSM tags
        const vibes = [];
        if (tags.outdoor === 'yes' || amenity === 'park' || amenity === 'garden' || tags.natural) {
          vibes.push('outdoor', 'fresh air');
        }
        if (personaTags.quiet || amenity === 'library' || amenity === 'garden') {
          vibes.push('peaceful', 'quiet');
        }
        if (amenity === 'museum' || amenity === 'gallery' || tags.historic) {
          vibes.push('cultural', 'enriching');
        }
        if (tags.cuisine) {
          vibes.push(`${tags.cuisine} cuisine`, 'authentic');
        }
        if (amenity === 'cafe' || amenity === 'bookshop') {
          vibes.push('cozy', 'casual');
        }
        if (amenity === 'viewpoint' || tags.natural === 'peak') {
          vibes.push('scenic', 'Instagram-worthy');
        }
        if (tags.wheelchair === 'yes') {
          vibes.push('accessible');
        }
        if (personaTags.preferLocal || amenity === 'market' || amenity === 'street_art') {
          vibes.push('local favorite', 'hidden gem');
        }

        // Hidden gem scoring
        let hiddenGemScore = 0;
        if (amenity === 'viewpoint' || tags.tourism === 'artwork') hiddenGemScore += 3;
        if (tags.historic === 'memorial' || tags.historic === 'monument') hiddenGemScore += 2;
        if (amenity === 'biergarten' || tags.shop === 'coffee') hiddenGemScore += 2;
        if (personaTags.preferLocal) hiddenGemScore += 1;

        return {
          name: tags.name,
          type: amenity.replace('_', ' '),
          vibe: vibes.length > 0 ? vibes.slice(0, 3).join(', ') : 'local, authentic',
          cost: cost,
          time: time,
          description: tags.description || tags.wikipedia || `${amenity.replace('_', ' ')} in the area`,
          lat: place.lat || place.center?.lat,
          lng: place.lon || place.center?.lon,
          rating: null,
          photos: [],
          hiddenGemScore: hiddenGemScore,
          isFree: isFree
        };
      });

    // Apply budget filtering if freeOnly flag is set
    let filteredPlaces = transformedPlaces;
    if (personaTags.freeOnly) {
      filteredPlaces = transformedPlaces.filter(place => place.isFree);
      console.log(`Budget filtering: Found ${filteredPlaces.length} free activities out of ${transformedPlaces.length} total`);
    }

    // Apply geographic clustering
    const clusteredPlaces = clusterPlaces(filteredPlaces, 4);

    return clusteredPlaces;
  } catch (error) {
    console.error('Places search error:', error);
    return null;
  }
}

// Calculate number of spots based on duration
function calculateNumSpots(duration) {
  const { value, unit } = duration;

  if (unit === 'hours') {
    if (value <= 2) return 2;      // 2 hours: 2 spots
    if (value <= 4) return 3;      // 3-4 hours: 3 spots
    if (value <= 6) return 4;      // 5-6 hours: 4 spots
    if (value <= 8) return 5;      // 7-8 hours: 5 spots
    return Math.min(8, Math.ceil(value / 1.5)); // 1.5 hours per spot
  } else if (unit === 'days') {
    return Math.min(20, value * 4); // ~4 spots per day, max 20
  }

  return 3; // default
}

// Merge places from multiple personas
async function getMergedPlaces(cityLocation, effectivePersonas, personaMap) {
  const allPlaces = [];
  const categoriesUsed = [];

  for (const personaName of effectivePersonas) {
    let category = personaMap[personaName] || 'foodie';

    // For custom personas, use heuristics
    const lower = personaName.toLowerCase();
    if (lower.includes('food') || lower.includes('eat')) category = 'foodie';
    else if (lower.includes('quiet') || lower.includes('alone') || lower.includes('introvert')) category = 'introvert';
    else if (lower.includes('art') || lower.includes('creative') || lower.includes('aesthetic')) category = 'artsy';
    else if (lower.includes('nature') || lower.includes('outdoor') || lower.includes('hike')) category = 'nature';
    else if (lower.includes('history') || lower.includes('museum')) category = 'history';
    else if (lower.includes('cheap') || lower.includes('broke') || lower.includes('budget')) category = 'broke';

    categoriesUsed.push(category);

    // Search for places for this persona
    const places = await searchPlaces(cityLocation.lat, cityLocation.lng, category);

    if (places && places.length > 0) {
      // Tag each place with the persona category for diversity
      places.forEach(p => p.personaCategory = category);
      allPlaces.push(...places);
    }
  }

  return { allPlaces, categoriesUsed };
}

// Generate itinerary based on city, personas (multiple), intents (multiple), and duration
app.post('/api/generate', async (req, res) => {
  const { city, personas = [], intents = [], duration = { value: 3, unit: 'hours' }, customPersona } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  // Handle empty personas array
  const effectivePersonas = customPersona ? [customPersona] : (Array.isArray(personas) ? personas : [personas]);

  if (effectivePersonas.length === 0) {
    return res.status(400).json({ error: 'At least one persona is required' });
  }

  let citySpots = cityData[city];

  // If city not in hardcoded data, try to use Places API
  if (!citySpots && USE_PLACES_API) {
    console.log(`Fetching data for ${city} from OpenStreetMap API...`);

    // Geocode the city first
    const cityLocation = await geocodeCity(city);

    if (!cityLocation) {
      return res.status(404).json({
        error: 'City not found',
        message: `Could not find location data for "${city}". Please check the city name and try again.`
      });
    }

    // Map persona to category
    const personaMap = {
      'Foodie': 'foodie',
      'Introvert': 'introvert',
      'Artsy': 'artsy',
      'Nature lover': 'nature',
      'History nerd': 'history',
      'Broke college student': 'broke'
    };

    // Get merged places from all selected personas
    const { allPlaces, categoriesUsed } = await getMergedPlaces(cityLocation, effectivePersonas, personaMap);

    if (!allPlaces || allPlaces.length === 0) {
      return res.status(404).json({
        error: 'No places found',
        message: `Could not find suitable places in ${city}. Try a different city or persona.`
      });
    }

    // Use the merged spots
    let spots = allPlaces;

    // Apply intent filters for all selected intents
    const intentFilters = {
      'cheap-date': { maxCost: '$$', keywords: [] },
      'avoid-tourists': { keywords: ['local', 'hidden', 'authentic'] },
      'walking-route': { keywords: ['outdoor', 'viewpoint', 'park'] },
      'hidden-gems': { keywords: ['hidden', 'local', 'authentic'], boost: (s) => s.hiddenGemScore || 0 },
      'photography': { keywords: ['scenic', 'instagram', 'viewpoint', 'artistic'] },
      'spontaneous': { random: true },
      'locals-only': { keywords: ['local', 'authentic', 'hidden'], boost: (s) => s.hiddenGemScore || 0 }
    };

    // Apply filters for each selected intent
    intents.forEach(intentId => {
      const filter = intentFilters[intentId];
      if (!filter) return;

      if (filter.maxCost) {
        const costOrder = ['Free', '$', '$$', '$$$'];
        const maxIndex = costOrder.indexOf(filter.maxCost);
        spots = spots.filter(s => costOrder.indexOf(s.cost) <= maxIndex);
      }

      if (filter.keywords && filter.keywords.length > 0) {
        // Boost spots that match keywords rather than filtering them out
        spots = spots.map(s => {
          const matchCount = filter.keywords.filter(kw =>
            s.vibe.toLowerCase().includes(kw) ||
            s.description.toLowerCase().includes(kw)
          ).length;
          return { ...s, intentBoost: (s.intentBoost || 0) + matchCount };
        });
      }
    });

    // Calculate number of spots based on duration
    const numSpots = calculateNumSpots(duration);

    // Sort by intent boost and diversity, then select
    const sorted = [...spots].sort((a, b) => {
      // Prioritize intent boost
      const boostDiff = (b.intentBoost || 0) - (a.intentBoost || 0);
      if (boostDiff !== 0) return boostDiff;

      // Then prioritize hidden gems
      return (b.hiddenGemScore || 0) - (a.hiddenGemScore || 0);
    });

    // Select spots with diversity in mind (mix of persona categories)
    const selected = [];
    const usedCategories = new Set();

    // First pass: select one from each persona category
    for (const spot of sorted) {
      if (selected.length >= numSpots) break;
      if (!usedCategories.has(spot.personaCategory)) {
        selected.push(spot);
        usedCategories.add(spot.personaCategory);
      }
    }

    // Second pass: fill remaining slots
    for (const spot of sorted) {
      if (selected.length >= numSpots) break;
      if (!selected.includes(spot)) {
        selected.push(spot);
      }
    }

    // Calculate totals
    const costMap = { 'Free': 0, '$': 10, '$$': 30, '$$$': 60 };
    const totalCost = selected.reduce((sum, s) => sum + costMap[s.cost], 0);
    const totalTime = selected.reduce((sum, s) => {
      const match = s.time.match(/(\d+\.?\d*)/);
      return sum + (match ? parseFloat(match[1]) * 60 : 60);
    }, 0);

    // Generate combined vibe explanation
    const explanations = {
      foodie: 'These spots celebrate authentic flavors and culinary craft',
      introvert: 'These are peaceful sanctuaries where you can recharge',
      artsy: 'These spaces inspire creativity and visual discovery',
      nature: 'These places reconnect you with natural beauty',
      history: 'These landmarks tell the real stories behind the city',
      broke: 'These prove the best experiences don\'t need a big budget'
    };

    const vibeDescription = categoriesUsed.length > 1
      ? `A curated blend of ${categoriesUsed.join(', ')} experiences`
      : explanations[categoriesUsed[0]];

    const itinerary = {
      city: cityLocation.name || city,
      personas: effectivePersonas,
      intents: intents,
      duration: duration,
      spots: selected.map((spot, idx) => ({
        order: idx + 1,
        ...spot,
        why: generateWhy(spot, effectivePersonas.join(' + '), spot.personaCategory || categoriesUsed[0])
      })),
      summary: {
        totalCost: totalCost === 0 ? 'Free' : `$${totalCost}`,
        totalTime: duration.unit === 'hours'
          ? `${duration.value} hours`
          : `${duration.value} day${duration.value > 1 ? 's' : ''}`,
        vibe: vibeDescription,
        route: generateRoute(selected)
      }
    };

    return res.json(itinerary);
  }

  // Use hardcoded data if available
  if (!citySpots) {
    return res.status(404).json({
      error: 'City not yet supported',
      message: `We're still building out ${city}. Currently supporting: Miami, FL and Orlando, FL`
    });
  }

  // Map persona to category
  const personaMap = {
    'Foodie': 'foodie',
    'Introvert': 'introvert',
    'Artsy': 'artsy',
    'Nature lover': 'nature',
    'History nerd': 'history',
    'Broke college student': 'broke'
  };

  let selectedCategory = personaMap[effectivePersona] || 'foodie';
  
  // For custom personas, use heuristics
  if (customPersona) {
    const lower = customPersona.toLowerCase();
    if (lower.includes('food') || lower.includes('eat')) selectedCategory = 'foodie';
    else if (lower.includes('quiet') || lower.includes('alone') || lower.includes('introvert')) selectedCategory = 'introvert';
    else if (lower.includes('art') || lower.includes('creative') || lower.includes('aesthetic')) selectedCategory = 'artsy';
    else if (lower.includes('nature') || lower.includes('outdoor') || lower.includes('hike')) selectedCategory = 'nature';
    else if (lower.includes('history') || lower.includes('museum')) selectedCategory = 'history';
    else if (lower.includes('cheap') || lower.includes('broke') || lower.includes('budget')) selectedCategory = 'broke';
  }

  let spots = citySpots[selectedCategory] || citySpots.foodie;
  
  // Apply intent filters
  const intentConfig = intent ? intents[intent] : null;
  
  if (intentConfig) {
    if (intentConfig.maxCost) {
      const costOrder = ['Free', '$', '$$', '$$$'];
      const maxIndex = costOrder.indexOf(intentConfig.maxCost);
      spots = spots.filter(s => costOrder.indexOf(s.cost) <= maxIndex);
    }
    
    if (intentConfig.keywords) {
      spots = spots.filter(s => 
        intentConfig.keywords.some(kw => 
          s.vibe.toLowerCase().includes(kw) || 
          s.description.toLowerCase().includes(kw)
        )
      );
    }
  }

  // Select 2-4 spots
  let numSpots = 3;
  if (intent === 'three-hours') numSpots = 2;
  if (intent === 'walking-route') numSpots = 4;
  
  // Shuffle and select
  const shuffled = [...spots].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(numSpots, shuffled.length));

  // Calculate totals
  const costMap = { 'Free': 0, '$': 10, '$$': 30, '$$$': 60 };
  const totalCost = selected.reduce((sum, s) => sum + costMap[s.cost], 0);
  const totalTime = selected.reduce((sum, s) => {
    const match = s.time.match(/(\d+\.?\d*)/);
    return sum + (match ? parseFloat(match[1]) * 60 : 60);
  }, 0);

  // Generate personalized explanations
  const explanations = {
    foodie: 'These spots celebrate authentic flavors and culinary craft',
    introvert: 'These are peaceful sanctuaries where you can recharge',
    artsy: 'These spaces inspire creativity and visual discovery',
    nature: 'These places reconnect you with Florida\'s natural beauty',
    history: 'These landmarks tell the real stories behind the city',
    broke: 'These prove the best experiences don\'t need a big budget'
  };

  const itinerary = {
    city,
    persona: effectivePersona,
    intent: intent || 'none',
    spots: selected.map((spot, idx) => ({
      order: idx + 1,
      ...spot,
      why: generateWhy(spot, effectivePersona, selectedCategory)
    })),
    summary: {
      totalCost: totalCost === 0 ? 'Free' : `$${totalCost}`,
      totalTime: `${Math.round(totalTime)} minutes`,
      vibe: explanations[selectedCategory],
      route: generateRoute(selected)
    }
  };

  res.json(itinerary);
});

function generateWhy(spot, persona, category) {
  const whyTemplates = {
    foodie: `${spot.name} represents the soul of ${spot.type} - ${spot.description}`,
    introvert: `${spot.name} offers ${spot.vibe} solitude - ${spot.description}`,
    artsy: `${spot.name} feeds your creative eye - ${spot.description}`,
    nature: `${spot.name} is ${spot.vibe} immersion - ${spot.description}`,
    history: `${spot.name} preserves ${spot.vibe} heritage - ${spot.description}`,
    broke: `${spot.name} delivers ${spot.vibe} energy - ${spot.description}`
  };

  return whyTemplates[category] || spot.description;
}

function generateRoute(spots) {
  if (spots.length === 2) {
    return `Start at ${spots[0].name}, then head to ${spots[1].name}`;
  } else if (spots.length === 3) {
    return `Begin at ${spots[0].name}, continue to ${spots[1].name}, finish at ${spots[2].name}`;
  } else if (spots.length === 4) {
    return `Walking loop: ${spots[0].name} → ${spots[1].name} → ${spots[2].name} → ${spots[3].name}`;
  }
  return 'Explore in any order';
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', cities: Object.keys(cityData) });
});

app.listen(PORT, () => {
  console.log(`🎯 Vibe Guide API running on http://localhost:${PORT}`);
});
