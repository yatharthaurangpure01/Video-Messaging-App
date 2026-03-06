# 🚀 Complete Deployment Guide - Video Messaging App

Deploy your entire Video Messaging App in one comprehensive guide.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Preparation](#preparation)
3. [Deploy Backend (Render - Free)](#deploy-backend)
4. [Deploy Website (Vercel - Free)](#deploy-website)
5. [Build Desktop App](#build-desktop-app)
6. [Update CORS Settings](#update-cors)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Going to Production](#production)

---

## 🎯 Prerequisites

### Accounts Needed (All Free)
- [ ] GitHub account
- [ ] Render account (https://render.com)
- [ ] Vercel account (https://vercel.com)
- [ ] Neon database (already set up)
- [ ] Google Cloud Platform (already set up)
- [ ] Clerk account
- [ ] Stripe account (optional)

### API Keys to Gather
- [ ] Neon DATABASE_URL
- [ ] Clerk publishable key + secret
- [ ] Google Cloud project ID
- [ ] Google Cloud bucket name
- [ ] Google Cloud credentials JSON
- [ ] Gemini API key
- [ ] Stripe keys (optional)

---

## 🔧 Preparation

### Step 1: Update Environment Files

#### Express Backend
Create `Express-Backend/.env`:
```env
PORT=5000
NODE_ENV=production
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_BUCKET_NAME=video-messaging-app-storage
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}
GEMINI_API_KEY=your-gemini-key
ELECTRON_HOST=http://localhost:5173
NEXT_API_HOST=https://your-website.vercel.app
```

#### Website
Create `Website/.env.production`:
```env
DATABASE_URL=your-neon-connection-string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
STRIPE_CLIENT_SECRET=sk_live_...
NEXT_API_HOST=https://your-website.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

#### Desktop App
Update `Desktop App/.env`:
```env
VITE_SOCKET_URL=https://your-backend.onrender.com
VITE_HOST_URL=https://your-website.vercel.app
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
```

### Step 2: Test Locally

```bash
# Test Backend
cd Express-Backend
npm install
npm start

# Test Website
cd Website
npm install
npx prisma generate
npm run build
npm start

# Test Desktop App
cd "Desktop App"
npm install
npm run dev
```

---

## 🌐 Deploy Backend (Render - Free)

### Step 1: Sign Up for Render
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `video-messaging-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `Express-Backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables

Click "Environment" and add:

```
PORT=5000
NODE_ENV=production
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_BUCKET_NAME=video-messaging-app-storage
GEMINI_API_KEY=your-gemini-api-key
ELECTRON_HOST=http://localhost:5173
NEXT_API_HOST=https://your-website.vercel.app
```

### Step 4: Add Google Cloud Credentials

1. Open your `gcp-key.json` file
2. Copy the entire JSON content (it should look like `{"type":"service_account",...}`)
3. Add environment variable:
   - **Key**: `GOOGLE_APPLICATION_CREDENTIALS_JSON`
   - **Value**: Paste the entire JSON (as one line)

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Copy your backend URL: `https://your-app.onrender.com`

**Note:** Free tier spins down after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.

---

## 🌍 Deploy Website (Vercel - Free)

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `Website`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Step 3: Add Environment Variables

Click "Environment Variables" and add:

```
DATABASE_URL=your-neon-connection-string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
STRIPE_CLIENT_SECRET=sk_live_...
NEXT_API_HOST=https://your-website.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

**Important:** Replace `your-backend.onrender.com` with your actual Render URL from previous step.

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Copy your website URL: `https://your-website.vercel.app`

### Step 5: Update Backend URL

1. Go back to Render dashboard
2. Update `NEXT_API_HOST` environment variable with your Vercel URL
3. Render will auto-redeploy

### Step 6: Configure Clerk

1. Go to Clerk Dashboard (https://dashboard.clerk.com)
2. Select your application
3. Go to "Domains"
4. Add your Vercel domain: `your-website.vercel.app`
5. Update redirect URLs:
   - Sign-in URL: `https://your-website.vercel.app/auth/sign-in`
   - Sign-up URL: `https://your-website.vercel.app/auth/sign-up`
   - After sign-in: `https://your-website.vercel.app/auth/callback`

---

## 💻 Build Desktop App

### Step 1: Update Environment Variables

Edit `Desktop App/.env`:
```env
VITE_SOCKET_URL=https://your-backend.onrender.com
VITE_HOST_URL=https://your-website.vercel.app
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
```

### Step 2: Build for Your Platform

#### Windows
```bash
cd "Desktop App"
npm install
npm run build
```
Output: `Desktop App/release/*.exe`

#### macOS
```bash
cd "Desktop App"
npm install
npm run build
```
Output: `Desktop App/release/*.dmg`

#### Linux
```bash
cd "Desktop App"
npm install
npm run build
```
Output: `Desktop App/release/*.AppImage`

### Step 3: Test Installation

1. Find installer in `Desktop App/release/` folder
2. Install on your machine
3. Launch the app
4. Test connection to backend

### Step 4: Distribute

**Option 1: GitHub Releases**
1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Upload the installer files
4. Publish release

**Option 2: Website Download**
1. Upload installers to your website
2. Create download page
3. Link from your website

---

## 🔄 Update CORS Settings

### Step 1: Update Backend CORS

Edit `Express-Backend/server.js`:

```javascript
const io = new Server(server, {
  cors: {
    origin: [
      "https://your-website.vercel.app",  // ← Add your Vercel URL
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  },
});
```

### Step 2: Update Website Middleware

Edit `Website/src/middleware.ts`:

```typescript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://your-website.vercel.app',     // ← Add your Vercel URL
  'https://your-backend.onrender.com',   // ← Add your Render URL
]
```

### Step 3: Push Changes

```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Both Render and Vercel will auto-deploy the changes.

---

## ✅ Testing

### Test 1: Backend Health Check

```bash
curl https://your-backend.onrender.com
```

Should respond (even if 404, means it's running).

**Note:** First request may take 30-60 seconds if backend was sleeping.

### Test 2: Website Loads

1. Visit `https://your-website.vercel.app`
2. Check homepage loads
3. Try signing up
4. Check dashboard loads

### Test 3: Desktop App Connection

1. Install desktop app
2. Launch app
3. Sign in with same account
4. Select screen source
5. Check if sources load (means backend connected)

### Test 4: Record Video

1. In desktop app, click record
2. Record for 10-15 seconds
3. Stop recording
4. Wait for upload (check backend logs on Render)
5. Go to website dashboard
6. Verify video appears

### Test 5: Video Playback

1. Click on video in dashboard
2. Video should play from Google Cloud Storage
3. Check if title/description appear

### Test 6: Transcription (PRO Users Only)

1. Upgrade user to PRO in database
2. Record video with speech
3. Wait for processing
4. Check if AI-generated title appears
5. Verify transcript is saved






---

## 🐛 Troubleshooting

### Backend Issues

**Problem: Backend won't start**
```bash
# Check Render logs
1. Go to Render dashboard
2. Click on your service
3. Click "Logs" tab
4. Look for errors
```

**Common fixes:**
- Verify all environment variables are set
- Check `GOOGLE_APPLICATION_CREDENTIALS_JSON` is valid JSON
- Ensure `temp_upload` folder exists (Render creates it automatically)
- Check Node version compatibility

**Problem: Backend sleeps (Free tier)**
- This is normal for Render free tier
- First request takes 30-60 seconds
- Consider upgrading to paid tier ($7/month) for always-on

### Website Issues

**Problem: Build fails on Vercel**
```bash
# Test build locally first
cd Website
npm run build
```

**Common fixes:**
- Run `npx prisma generate` before build
- Check all environment variables are set
- Verify `DATABASE_URL` is correct
- Check for TypeScript errors

**Problem: Database connection fails**
- Verify Neon database is running
- Check connection string format
- Ensure IP allowlist includes Vercel IPs (usually not needed)

### Desktop App Issues

**Problem: App won't connect to backend**

**Check:**
1. `.env` file has correct URLs
2. Backend is running (visit URL in browser)
3. CORS settings include localhost
4. Firewall isn't blocking connection

**Fix:**
```bash
# Rebuild with correct URLs
cd "Desktop App"
npm run build
```

**Problem: Recording fails**
- Check microphone permissions
- Verify screen capture permissions
- Check browser console for errors

### Video Upload Issues

**Problem: Videos not uploading**

**Check:**
1. GCS bucket exists
2. Bucket name is correct in env vars
3. GCS credentials are valid
4. Backend has write permissions

**Test GCS manually:**
```bash
# In Express-Backend folder
node -e "
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
});
storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME).exists()
  .then(data => console.log('Bucket exists:', data[0]))
  .catch(err => console.error('Error:', err));
"
```

### Transcription Issues

**Problem: Transcription not working**

**Check:**
1. User has PRO plan in database
2. Video has audio content
3. Speech-to-Text API is enabled in GCP
4. Gemini API key is valid

**Check logs:**
- Render logs should show "🎙️ Transcribing..."
- If shows "⚠️ Transcription skipped", user isn't PRO

---

## 🚀 Going to Production

### Upgrade from Free Tier

When you're ready for production:

#### Render (Backend)
- Upgrade to Starter: $7/month
- No cold starts
- Always-on
- Better performance

#### Vercel (Website)
- Free tier is fine for most apps
- Upgrade to Pro ($20/month) for:
  - More bandwidth
  - Better analytics
  - Priority support

#### Neon (Database)
- Free tier: 0.5GB storage
- Upgrade to Pro ($19/month) for:
  - More storage
  - Better performance
  - Automatic backups

### Custom Domain Setup

#### For Website (Vercel)
1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your domain
   - Follow DNS instructions
3. Update Clerk redirect URLs with new domain

#### For Backend (Render)
1. In Render dashboard:
   - Go to your service
   - Click "Settings" → "Custom Domain"
   - Add subdomain (e.g., `api.yourdomain.com`)
   - Update DNS records
2. Update CORS settings with new domain

### Enable Stripe Live Mode

1. Go to Stripe Dashboard
2. Switch to "Live mode"
3. Get live API keys
4. Update environment variables:
   - `STRIPE_CLIENT_SECRET=sk_live_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
5. Redeploy website

### Set Up Monitoring

#### Error Tracking (Sentry)
```bash
# Install Sentry
npm install @sentry/nextjs @sentry/node

# Configure in both Website and Backend
# Follow: https://docs.sentry.io
```

#### Uptime Monitoring
- Use UptimeRobot (free): https://uptimerobot.com
- Monitor both backend and website
- Get alerts when down

#### Analytics
- Google Analytics
- Plausible (privacy-friendly)
- Vercel Analytics (built-in)

---

## 📊 Cost Summary

### Free Tier (Testing)
- Backend: Render Free
- Website: Vercel Free
- Database: Neon Free
- **Total: $0/month**

**Limitations:**
- Backend sleeps after 15 min
- 0.5GB database storage
- Limited bandwidth

### Production (Recommended)
- Backend: Render Starter ($7/month)
- Website: Vercel Free or Pro ($0-20/month)
- Database: Neon Pro ($19/month)
- Domain: ~$12/year
- **Total: $26-46/month**

**Benefits:**
- No cold starts
- Better performance
- More storage
- Professional setup

---

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] All code tested locally
- [ ] Environment variables prepared
- [ ] API keys gathered
- [ ] Database migrations run
- [ ] .gitignore updated

### Backend Deployment
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables added
- [ ] GCP credentials added
- [ ] Deployment successful
- [ ] Backend URL copied

### Website Deployment
- [ ] Vercel account created
- [ ] Project imported
- [ ] Environment variables added
- [ ] Backend URL updated
- [ ] Deployment successful
- [ ] Website URL copied
- [ ] Clerk configured

### Desktop App
- [ ] .env updated with production URLs
- [ ] App built successfully
- [ ] Installer tested
- [ ] Distributed to users

### Post-Deployment
- [ ] CORS settings updated
- [ ] Changes pushed to GitHub
- [ ] All services redeployed
- [ ] Backend health check passed
- [ ] Website loads correctly
- [ ] Desktop app connects
- [ ] Video recording works
- [ ] Video upload works
- [ ] Video playback works
- [ ] Transcription works (PRO)

---

## 🎉 Success!

Your Video Messaging App is now live!

### Your URLs
- **Website**: https://your-website.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Desktop App**: Distributed to users

### Next Steps
1. Share website URL with users
2. Distribute desktop app
3. Monitor logs for errors
4. Gather user feedback
5. Plan feature updates

### Support
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Render Community**: https://community.render.com
- **Vercel Discord**: https://vercel.com/discord

---

## 📞 Need Help?

### Common Resources
- Check Render logs for backend issues
- Check Vercel logs for website issues
- Test locally before deploying
- Verify environment variables
- Check CORS settings

### Platform Support
- Render: https://render.com/docs
- Vercel: https://vercel.com/support
- Neon: https://neon.tech/docs
- Clerk: https://clerk.com/docs
- Stripe: https://stripe.com/docs

---

**Congratulations! Your app is deployed! 🚀**

**By God's grace, you've built and deployed an amazing video messaging platform!** ✨
