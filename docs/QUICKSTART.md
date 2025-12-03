# 🚀 Quick Start Guide

Get Vibe Guide running in 2 minutes.

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Run the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm start
```

You should see: `🎯 Vibe Guide API running on http://localhost:3001`

### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```

Your browser should automatically open to `http://localhost:5173`

## Step 3: Test It Out

1. Enter a city: **Miami, FL** or **Orlando, FL**
2. Choose a persona: **Foodie** 
3. (Optional) Choose an intent: **Cheap date**
4. Click **Generate My Vibe** 

You should see a personalized micro-itinerary with 2-4 curated spots!

---

## Troubleshooting

### Backend won't start
- Make sure you're in the `backend` folder
- Check if port 3001 is already in use: `lsof -i :3001`
- Try: `npm install` again

### Frontend can't connect to backend
- Make sure backend is running on http://localhost:3001
- Check browser console for CORS errors
- Verify the fetch URL in `App.jsx` matches your backend URL

### Browser doesn't open automatically
- Manually navigate to http://localhost:5173
- Check if port 5173 is available

### City not supported
- Currently only **Miami, FL** and **Orlando, FL** are supported
- Case-sensitive: Use exact format "Miami, FL" not "Miami" or "miami, fl"

---

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- **Frontend**: Vite automatically reloads on file changes
- **Backend**: Use `npm run dev` (with nodemon) instead of `npm start`

### Add Your Own City
See the main README.md "Contributing" section for how to add new cities.

### Modify the Design
All styles are in `frontend/src/App.css` — no build step needed, just save and watch it update!

---

## What's Next?

- Try different personas and intents
- Add your own city (see README.md)
- Customize the design tokens in App.css
- Add more spots to existing cities

**Have fun exploring! 🎯**
