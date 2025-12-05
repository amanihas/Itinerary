import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState('');
  const [personas, setPersonas] = useState([]);
  const [customPersona, setCustomPersona] = useState('');
  const [intents, setIntents] = useState([]);
  const [duration, setDuration] = useState({ value: 3, unit: 'hours' });
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const presetPersonas = [
    'Foodie',
    'Introvert', 
    'Artsy',
    'Nature lover',
    'History nerd',
    'Broke college student'
  ];

  const intentOptions = [
    { id: 'cheap-date', label: 'Cheap date', emoji: '💕' },
    { id: 'avoid-tourists', label: 'Avoid tourists', emoji: '🚫' },
    { id: 'walking-route', label: 'Walking route', emoji: '🚶' },
    { id: 'hidden-gems', label: 'Hidden gems', emoji: '💎' },
    { id: 'photography', label: 'Aesthetic photography day', emoji: '📸' },
    { id: 'spontaneous', label: 'Spontaneous adventure', emoji: '🎲' },
    { id: 'locals-only', label: 'Local-only spots', emoji: '🏘️' }
  ];

  const togglePersona = (p) => {
    setPersonas(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
    setCustomPersona('');
  };

  const toggleIntent = (i) => {
    setIntents(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city,
          personas: customPersona ? [customPersona] : personas,
          customPersona: customPersona || null,
          intents: intents,
          duration: duration
        })
      });

      const data = await response.json();

      if (response.ok) {
        setItinerary(data);
        setStep(5);
      } else {
        alert(data.message || data.error);
      }
    } catch (error) {
      alert('Failed to generate itinerary. Make sure the backend is running!');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setCity('');
    setPersonas([]);
    setCustomPersona('');
    setIntents([]);
    setDuration({ value: 3, unit: 'hours' });
    setItinerary(null);
  };

  return (
    <div className="app">
      <div className="noise"></div>
      
      {step < 5 && (
        <header className="header">
          <h1 className="title">
            <span className="title-main">VIBE</span>
            <span className="title-sub">GUIDE</span>
          </h1>
          <p className="tagline">Micro-itineraries for real people</p>
        </header>
      )}

      {step === 1 && (
        <section className="step step-1">
          <div className="step-number">01</div>
          <h2 className="step-title">Where are you?</h2>
          
          <div className="city-input-wrapper">
            <input
              type="text"
              className="city-input"
              placeholder="New York, NY"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && city && setStep(2)}
            />
            <div className="input-underline"></div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => city && setStep(2)}
            disabled={!city}
          >
            Continue →
          </button>

          <div className="supported-cities">
            <small>Supporting cities worldwide via Foursquare API</small>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="step step-2">
          <div className="step-number">02</div>
          <h2 className="step-title">Who are you?</h2>
          <p className="step-subtitle">Select one or more vibes</p>

          <div className="persona-grid">
            {presetPersonas.map((p) => (
              <button
                key={p}
                className={`persona-card ${personas.includes(p) ? 'active' : ''}`}
                onClick={() => togglePersona(p)}
              >
                <span className="persona-label">{p}</span>
                {personas.includes(p) && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="custom-persona">
            <input
              type="text"
              className="custom-input"
              placeholder="Type your vibe... (e.g., 'cozy + romantic', 'quiet self-care day')"
              value={customPersona}
              onChange={(e) => {
                setCustomPersona(e.target.value);
                setPersonas([]);
              }}
            />
          </div>

          <div className="step-actions">
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setStep(3)}
              disabled={personas.length === 0 && !customPersona}
            >
              Continue →
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="step step-3">
          <div className="step-number">03</div>
          <h2 className="step-title">What's the intent?</h2>
          <p className="step-subtitle">Select all that apply (optional)</p>

          <div className="intent-grid">
            {intentOptions.map((i) => (
              <button
                key={i.id}
                className={`intent-card ${intents.includes(i.id) ? 'active' : ''}`}
                onClick={() => toggleIntent(i.id)}
              >
                <span className="intent-emoji">{i.emoji}</span>
                <span className="intent-label">{i.label}</span>
                {intents.includes(i.id) && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>

          <div className="step-actions">
            <button className="btn btn-ghost" onClick={() => setStep(2)}>
              ← Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setStep(4)}
            >
              Continue →
            </button>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="step step-4">
          <div className="step-number">04</div>
          <h2 className="step-title">How long do you have?</h2>
          <p className="step-subtitle">Choose your time budget</p>

          <div className="duration-selector">
            <div className="duration-input-group">
              <input
                type="number"
                className="duration-input"
                min="1"
                max="30"
                value={duration.value}
                onChange={(e) => setDuration({ ...duration, value: parseInt(e.target.value) || 1 })}
              />
              <select
                className="duration-unit"
                value={duration.unit}
                onChange={(e) => setDuration({ ...duration, unit: e.target.value })}
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>

            <div className="duration-presets">
              <button
                className={`duration-preset ${duration.value === 2 && duration.unit === 'hours' ? 'active' : ''}`}
                onClick={() => setDuration({ value: 2, unit: 'hours' })}
              >
                Quick (2hr)
              </button>
              <button
                className={`duration-preset ${duration.value === 4 && duration.unit === 'hours' ? 'active' : ''}`}
                onClick={() => setDuration({ value: 4, unit: 'hours' })}
              >
                Half Day (4hr)
              </button>
              <button
                className={`duration-preset ${duration.value === 8 && duration.unit === 'hours' ? 'active' : ''}`}
                onClick={() => setDuration({ value: 8, unit: 'hours' })}
              >
                Full Day (8hr)
              </button>
              <button
                className={`duration-preset ${duration.value === 2 && duration.unit === 'days' ? 'active' : ''}`}
                onClick={() => setDuration({ value: 2, unit: 'days' })}
              >
                Weekend (2 days)
              </button>
              <button
                className={`duration-preset ${duration.value === 3 && duration.unit === 'days' ? 'active' : ''}`}
                onClick={() => setDuration({ value: 3, unit: 'days' })}
              >
                Long Weekend (3 days)
              </button>
            </div>
          </div>

          <div className="step-actions">
            <button className="btn btn-ghost" onClick={() => setStep(3)}>
              ← Back
            </button>
            <button
              className="btn btn-primary btn-generate"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate My Vibe →'}
            </button>
          </div>
        </section>
      )}

      {step === 5 && itinerary && (
        <section className="results">
          <div className="results-header">
            <div className="results-title-block">
              <h1 className="results-title">Your Vibe Guide</h1>
              <div className="results-meta">
                <span className="meta-item">{itinerary.city}</span>
                <span className="meta-divider">•</span>
                <span className="meta-item">{itinerary.personas?.join(' + ') || itinerary.persona}</span>
                {itinerary.intents && itinerary.intents.length > 0 && (
                  <>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">{itinerary.intents.join(', ')}</span>
                  </>
                )}
              </div>
            </div>
            
            <button className="btn btn-ghost btn-reset" onClick={reset}>
              Start Over
            </button>
          </div>

          <div className="summary-card">
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-label">Total Time</div>
                <div className="summary-value">{itinerary.summary.totalTime}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Total Cost</div>
                <div className="summary-value">{itinerary.summary.totalCost}</div>
              </div>
            </div>
            <div className="summary-vibe">
              <div className="summary-label">The Vibe</div>
              <div className="summary-vibe-text">{itinerary.summary.vibe}</div>
            </div>
            <div className="summary-route">
              <div className="summary-label">Your Route</div>
              <div className="summary-route-text">{itinerary.summary.route}</div>
            </div>
          </div>

          <div className="spots-container">
            {itinerary.spots.map((spot) => (
              <article key={spot.order} className="spot-card">
                <div className="spot-header">
                  <div className="spot-number">{String(spot.order).padStart(2, '0')}</div>
                  <div className="spot-title-block">
                    <h3 className="spot-name">{spot.name}</h3>
                    <div className="spot-type">{spot.type}</div>
                  </div>
                </div>

                <div className="spot-content">
                  <div className="spot-vibe">{spot.vibe}</div>
                  
                  <p className="spot-why">{spot.why}</p>

                  <div className="spot-details">
                    <span className="detail-badge">{spot.cost}</span>
                    <span className="detail-badge">{spot.time}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="results-footer">
            <button className="btn btn-primary" onClick={reset}>
              Generate Another Vibe
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
