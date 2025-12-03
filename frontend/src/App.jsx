import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState('');
  const [persona, setPersona] = useState('');
  const [customPersona, setCustomPersona] = useState('');
  const [intent, setIntent] = useState('');
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

  const intents = [
    { id: 'cheap-date', label: 'Cheap date', emoji: '💕' },
    { id: 'avoid-tourists', label: 'Avoid tourists', emoji: '🚫' },
    { id: 'walking-route', label: 'Walking route', emoji: '🚶' },
    { id: 'hidden-gems', label: 'Hidden gems', emoji: '💎' },
    { id: 'photography', label: 'Aesthetic photography day', emoji: '📸' },
    { id: 'spontaneous', label: 'Spontaneous adventure', emoji: '🎲' },
    { id: 'three-hours', label: 'See the whole city in 3 hours', emoji: '⚡' },
    { id: 'locals-only', label: 'Local-only spots', emoji: '🏘️' }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city,
          persona: customPersona || persona,
          customPersona: customPersona || null,
          intent
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setItinerary(data);
        setStep(4);
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
    setPersona('');
    setCustomPersona('');
    setIntent('');
    setItinerary(null);
  };

  return (
    <div className="app">
      <div className="noise"></div>
      
      {step < 4 && (
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
              placeholder="Miami, FL"
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
            <small>Currently supporting: Miami FL, Orlando FL</small>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="step step-2">
          <div className="step-number">02</div>
          <h2 className="step-title">Who are you?</h2>
          
          <div className="persona-grid">
            {presetPersonas.map((p) => (
              <button
                key={p}
                className={`persona-card ${persona === p ? 'active' : ''}`}
                onClick={() => {
                  setPersona(p);
                  setCustomPersona('');
                }}
              >
                <span className="persona-label">{p}</span>
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
                setPersona('');
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
              disabled={!persona && !customPersona}
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
          <p className="step-subtitle">(optional)</p>
          
          <div className="intent-grid">
            {intents.map((i) => (
              <button
                key={i.id}
                className={`intent-card ${intent === i.id ? 'active' : ''}`}
                onClick={() => setIntent(intent === i.id ? '' : i.id)}
              >
                <span className="intent-emoji">{i.emoji}</span>
                <span className="intent-label">{i.label}</span>
              </button>
            ))}
          </div>

          <div className="step-actions">
            <button className="btn btn-ghost" onClick={() => setStep(2)}>
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

      {step === 4 && itinerary && (
        <section className="results">
          <div className="results-header">
            <div className="results-title-block">
              <h1 className="results-title">Your Vibe Guide</h1>
              <div className="results-meta">
                <span className="meta-item">{itinerary.city}</span>
                <span className="meta-divider">•</span>
                <span className="meta-item">{itinerary.persona}</span>
                {itinerary.intent !== 'none' && (
                  <>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">{itinerary.intent}</span>
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
