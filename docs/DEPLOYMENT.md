# 🚀 Deployment Guide

Step-by-step instructions for deploying Vibe Guide to production.

---

## 🎯 Deployment Options Overview

| Option | Best For | Cost | Difficulty |
|--------|----------|------|------------|
| Vercel + Railway | Quick MVP | $5-20/mo | ⭐ Easy |
| Netlify + Render | Alternative to above | $5-20/mo | ⭐ Easy |
| Docker + DigitalOcean | Full control | $10-30/mo | ⭐⭐ Medium |
| AWS (Lambda + S3) | Serverless scale | Pay-per-use | ⭐⭐⭐ Hard |

**Recommended for beginners:** Vercel (frontend) + Railway (backend)

---

## Option 1: Vercel + Railway (Easiest)

### Step 1: Deploy Backend to Railway

1. **Sign up at Railway.app**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   ```
   Dashboard → New Project → Deploy from GitHub repo
   ```

3. **Connect GitHub Repo**
   - Authorize Railway to access your repo
   - Select `vibe-guide` repository

4. **Configure Service**
   ```
   Root Directory: /backend
   Start Command: npm start
   Port: 3001 (auto-detected)
   ```

5. **Add Environment Variables**
   ```
   NODE_ENV=production
   ```

6. **Generate Domain**
   ```
   Settings → Generate Domain
   Copy the URL (e.g., vibe-guide-production.up.railway.app)
   ```

7. **Deploy**
   - Railway auto-deploys on push to main branch
   - Check logs for "🎯 Vibe Guide API running..."

### Step 2: Deploy Frontend to Vercel

1. **Sign up at Vercel.com**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   ```
   Dashboard → Add New → Project
   Select your GitHub repo
   ```

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

4. **Add Environment Variable**
   ```
   Name: VITE_API_URL
   Value: https://your-railway-url.up.railway.app
   ```

5. **Update Frontend Code**
   
   In `frontend/src/App.jsx`, change:
   ```javascript
   // Old
   const response = await fetch('http://localhost:3001/api/generate', {
   
   // New
   const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/generate`, {
   ```

6. **Deploy**
   - Vercel auto-builds and deploys
   - Visit your domain (e.g., vibe-guide.vercel.app)

### Step 3: Update Backend CORS

In `backend/server.js`, update CORS:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-vercel-domain.vercel.app'
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Redeploy backend by pushing to GitHub.

---

## Option 2: Netlify + Render

### Step 1: Deploy Backend to Render

1. **Sign up at Render.com**

2. **Create Web Service**
   ```
   Dashboard → New → Web Service
   Connect GitHub repo
   ```

3. **Configure**
   ```
   Name: vibe-guide-api
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   Environment: Node
   ```

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   ```

5. **Deploy & Get URL**

### Step 2: Deploy Frontend to Netlify

1. **Sign up at Netlify.com**

2. **Import Project**
   ```
   Sites → Add new site → Import from Git
   ```

3. **Configure**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://your-render-url.onrender.com
   ```

5. **Deploy**

---

## Option 3: Docker + DigitalOcean

### Step 1: Create Docker Files

**Backend Dockerfile** (`backend/Dockerfile`):
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

**Frontend Dockerfile** (`frontend/Dockerfile`):
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Frontend nginx.conf** (`frontend/nginx.conf`):
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

**Docker Compose** (`docker-compose.yml`):
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

### Step 2: Deploy to DigitalOcean

1. **Create Droplet**
   ```
   DigitalOcean Dashboard → Create → Droplets
   Image: Docker on Ubuntu 22.04
   Plan: Basic ($6/mo)
   ```

2. **SSH into Droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Clone Repo**
   ```bash
   git clone https://github.com/yourusername/vibe-guide.git
   cd vibe-guide
   ```

4. **Build & Run**
   ```bash
   docker-compose up -d --build
   ```

5. **Configure Domain** (optional)
   ```
   Point DNS A record to droplet IP
   Install Certbot for SSL:
   
   apt-get update
   apt-get install certbot python3-certbot-nginx
   certbot --nginx -d yourdomain.com
   ```

---

## Option 4: AWS Lambda + S3

### Step 1: Deploy Frontend to S3

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://vibe-guide-frontend
   ```

3. **Upload Build**
   ```bash
   aws s3 sync dist/ s3://vibe-guide-frontend --acl public-read
   ```

4. **Enable Static Hosting**
   ```
   S3 Console → Bucket → Properties → Static website hosting
   Index document: index.html
   Error document: index.html
   ```

5. **Setup CloudFront** (optional, for CDN)

### Step 2: Deploy Backend to Lambda

1. **Install Serverless Framework**
   ```bash
   npm install -g serverless
   ```

2. **Create serverless.yml** (`backend/serverless.yml`):
   ```yaml
   service: vibe-guide-api

   provider:
     name: aws
     runtime: nodejs18.x
     stage: prod
     region: us-east-1

   functions:
     generate:
       handler: lambda.generate
       events:
         - http:
             path: /api/generate
             method: post
             cors: true
     
     health:
       handler: lambda.health
       events:
         - http:
             path: /api/health
             method: get
             cors: true
   ```

3. **Create Lambda Handler** (`backend/lambda.js`):
   ```javascript
   const serverless = require('serverless-http');
   const app = require('./server');

   module.exports.generate = serverless(app);
   module.exports.health = serverless(app);
   ```

4. **Deploy**
   ```bash
   cd backend
   serverless deploy
   ```

---

## 🔒 Production Security Checklist

### Backend
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Restrict CORS to your domain
- [ ] Add rate limiting
- [ ] Sanitize user inputs
- [ ] Add API keys (optional)
- [ ] Enable logging
- [ ] Set up error monitoring (Sentry)

### Frontend
- [ ] Use environment variables for API URL
- [ ] Enable HTTPS
- [ ] Add CSP headers
- [ ] Minify/bundle code
- [ ] Enable caching
- [ ] Add analytics (GA4, Mixpanel)

### Infrastructure
- [ ] Set up automated backups
- [ ] Configure firewall rules
- [ ] Enable DDoS protection
- [ ] Set up monitoring/alerts
- [ ] Document runbooks

---

## 🌍 Custom Domain Setup

### For Vercel
1. Go to Project Settings → Domains
2. Add custom domain (e.g., vibeguide.com)
3. Update DNS records as instructed
4. SSL auto-configured

### For Railway
1. Settings → Networking → Custom Domain
2. Add domain
3. Add CNAME record pointing to Railway
4. SSL auto-configured

### For Docker/DigitalOcean
1. Point A record to droplet IP
2. Install Certbot:
   ```bash
   certbot --nginx -d yourdomain.com
   ```

---

## 📊 Monitoring Setup

### Railway/Render
- Built-in metrics dashboard
- View logs, CPU, memory usage
- Set up alerts via integrations

### DigitalOcean
```bash
# Install monitoring agent
curl -sSL https://repos.insights.digitalocean.com/install.sh | bash
```

### Sentry for Errors

**Backend** (`backend/server.js`):
```javascript
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.errorHandler());
```

**Frontend** (`frontend/src/main.jsx`):
```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## 🔄 CI/CD Setup

### GitHub Actions (for Vercel + Railway)

**`.github/workflows/deploy.yml`:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: echo "Railway auto-deploys on push"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: echo "Vercel auto-deploys on push"
```

### Manual Deploy Script

**`deploy.sh`:**
```bash
#!/bin/bash

echo "🚀 Deploying Vibe Guide..."

# Frontend
echo "📦 Building frontend..."
cd frontend
npm run build
vercel --prod

# Backend
echo "🔧 Deploying backend..."
cd ../backend
git push railway main

echo "✅ Deployment complete!"
```

---

## 🧪 Pre-Deployment Testing

### Local Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
NODE_ENV=production npm start
```

### Load Testing
```bash
# Install Artillery
npm install -g artillery

# Create test file (test.yml)
config:
  target: 'http://localhost:3001'
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Generate itinerary"
    flow:
      - post:
          url: "/api/generate"
          json:
            city: "Miami, FL"
            persona: "Foodie"
            intent: null

# Run test
artillery run test.yml
```

---

## 🎯 Post-Deployment Checklist

- [ ] Test all user flows on production
- [ ] Verify API responds correctly
- [ ] Check logs for errors
- [ ] Test on mobile devices
- [ ] Verify SSL certificate
- [ ] Test from different locations (VPN)
- [ ] Set up monitoring alerts
- [ ] Document production URLs
- [ ] Update README with live link
- [ ] Announce launch! 🎉

---

## 🆘 Troubleshooting

### Frontend won't load
- Check environment variables (VITE_API_URL)
- Verify build succeeded
- Check browser console for errors
- Verify CDN cache cleared

### API returns CORS errors
- Update CORS origin in backend
- Verify frontend URL matches
- Check preflight OPTIONS requests

### Backend crashes
- Check logs for stack traces
- Verify environment variables
- Check memory/CPU usage
- Restart service

### SSL certificate errors
- Verify DNS propagation (can take 24-48h)
- Check certificate expiry
- Renew with Certbot: `certbot renew`

---

## 💰 Cost Estimates

### Hobby/MVP (< 1000 users/mo)
```
Vercel: Free
Railway: Free tier (500 hrs/mo)
Domain: $12/yr
Total: ~$1/mo + domain
```

### Small Scale (1K-10K users/mo)
```
Vercel Pro: $20/mo
Railway Starter: $5/mo
MongoDB Atlas: $9/mo (optional)
Domain: $12/yr
Total: ~$35/mo
```

### Medium Scale (10K-100K users/mo)
```
Vercel Pro: $20/mo
Railway: $20/mo
MongoDB Atlas: $25/mo
CDN: $10/mo
Monitoring: $10/mo
Total: ~$85/mo
```

---

## 🎓 Best Practices

1. **Always use environment variables** for API URLs, keys
2. **Test locally first** before deploying
3. **Use git tags** for production releases
4. **Keep dependencies updated** (Dependabot)
5. **Monitor performance** from day one
6. **Set up alerts** for downtime
7. **Document everything** (README, wiki)
8. **Backup data** regularly (if using DB)

---

## 🔮 Next Steps After Deployment

1. **Add analytics** to understand user behavior
2. **Set up A/B testing** for design changes
3. **Collect feedback** from real users
4. **Monitor performance** and optimize
5. **Plan feature roadmap** based on data
6. **Build community** around the product

---

*Ready to launch? Pick an option and follow the steps. You got this! 🚀*
