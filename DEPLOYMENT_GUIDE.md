# DevBoard Deployment Guide

## Overview
- **Frontend**: https://dev-board-mauve.vercel.app/
- **Backend**: https://devboard-x6a4.onrender.com

## Backend Setup (Render)

### Environment Variables
Add these to your Render dashboard → Environment Variables:

```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secure_random_secret>
FRONTEND_URL=https://dev-board-mauve.vercel.app
GITHUB_TOKEN=<your_github_personal_access_token>
```

### Key Configuration
- The backend CORS is configured to accept requests from:
  - `https://dev-board-mauve.vercel.app` (production)
  - `http://localhost:3000` (local development)
  - `http://localhost:5173` (Vite dev server)
  - Any URL specified in `FRONTEND_URL` environment variable

### Deployment Steps
1. Push code to GitHub
2. Render auto-deploys from main branch
3. Verify environment variables are set in Render dashboard
4. Test API at: https://devboard-x6a4.onrender.com/

## Frontend Setup (Vercel)

### Environment Variables
Add these to your Vercel dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://devboard-x6a4.onrender.com/api
```

### Key Points
- The frontend uses Vite with environment variables
- Axios interceptor automatically adds JWT token from localStorage
- API calls are made to the backend via `VITE_API_URL` environment variable

### Deployment Steps
1. Push code to GitHub
2. Vercel auto-deploys from main branch
3. Verify environment variables are set in Vercel dashboard
4. Verify the API URL is correctly set

## Local Development Setup

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secure_random_secret>
FRONTEND_URL=http://localhost:3000
GITHUB_TOKEN=<your_github_personal_access_token>
```

### Run Locally
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Backend will run on: http://localhost:5000
Frontend will run on: http://localhost:5173

## Testing Deployment

1. Visit: https://dev-board-mauve.vercel.app/
2. Try logging in or performing any API action
3. Open browser DevTools → Network tab to verify API calls go to: `https://devboard-x6a4.onrender.com/api`
4. Check Console for any CORS errors (there should be none)

## Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` is set correctly in Render backend environment variables
- Clear browser cache and hard refresh (Ctrl+Shift+R)
- Check backend logs for CORS issues

### API Not Responding
- Verify backend is running: https://devboard-x6a4.onrender.com/
- Check Render logs for errors
- Verify environment variables are set correctly

### Environment Variables Not Loading
- Vercel & Render require redeploy after environment variable changes
- Wait 1-2 minutes for changes to take effect
- Check that variables are set in the correct environment (Production/Preview)

## Important Security Notes

⚠️ **Never commit `.env` files to GitHub**
- `.env` files are git-ignored
- Only commit `.env.example` files
- Add secrets through Vercel and Render dashboards

⚠️ **GitHub Token**
- Use a fine-grained Personal Access Token
- Scope to only necessary repositories
- Regenerate if compromised
