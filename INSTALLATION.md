# coachHQ Installation Guide

Complete step-by-step setup for the badminton coaching PWA.

## 📋 Prerequisites

- Node.js 16+ ([download](https://nodejs.org/))
- Git ([download](https://git-scm.com/))
- Supabase account (free at [supabase.com](https://supabase.com))
- GitHub account for deployment

## 🚀 Quick Start (5 minutes)

### 1. Extract & Install Dependencies

```bash
# Extract the zip file
unzip coachHQ-app.zip
cd coachHQ-app

# Install dependencies
npm install
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project
3. Wait for provisioning (2-3 minutes)
4. Go to **Settings → API**
5. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_KEY`

### 3. Create `.env.local`

```bash
# Copy the example
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_KEY=your-anon-key-here
```

### 4. Set Up Database

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy-paste contents of `supabase-setup-complete.sql`
4. Click **Run** (green play button)
5. Wait for completion ✓

### 5. Add Sample Data (Optional)

In Supabase SQL Editor, run:

```sql
-- Get your coach ID first
SELECT id FROM auth.users LIMIT 1;

-- Then replace YOUR_COACH_UUID with the ID from above:
INSERT INTO profiles (id, name) VALUES ('YOUR_COACH_UUID', 'Coach Sarah');

INSERT INTO students (coach_id, name, level, age, contact) VALUES 
  ('YOUR_COACH_UUID', 'Lee Smith', 'Advanced', 22, '0412345678'),
  ('YOUR_COACH_UUID', 'Jordan Davis', 'Inter', 19, 'jordan@email.com'),
  ('YOUR_COACH_UUID', 'Alex Thompson', 'Advanced', 25, '0498765432');
```

### 6. Test Locally

```bash
npm run dev
```

Opens at `http://localhost:5173`

**Test Login:**
- Use your Supabase email/password (create one first in Supabase Auth)
- Should see Dashboard with your data

## 🌐 Deploy to GitHub Pages

### 1. Create GitHub Repo

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: coachHQ badminton coaching app"

# Create repo on GitHub at github.com/new
# Then:
git remote add origin https://github.com/YOUR_USERNAME/CoachHQ-Webapp.git
git branch -M main
git push -u origin main
```

### 2. Set GitHub Secrets

1. Go to your GitHub repo **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add these secrets:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_KEY` = your anon key

### 3. Enable GitHub Pages

1. Go to **Settings → Pages**
2. Source: **GitHub Actions**
3. Wait for first deploy to complete

### 4. Custom Domain (Optional)

1. In Cloudflare (or your DNS):
   - Create CNAME record: `www` → `your-username.github.io`
   - OR A records pointing to GitHub Pages IPs
2. In GitHub **Settings → Pages**:
   - Enter custom domain
   - Enable "Enforce HTTPS"

## 📱 Install as PWA

On iPhone/Android:
1. Open app in Safari/Chrome
2. Click **Share → Add to Home Screen**
3. Use offline! (limited functionality)

## 🔧 Features

### Dashboard
- Real-time session data from Supabase
- Today's upcoming sessions
- Live session timer
- Session rating popup with skill tracking

### Students
- Add/Edit/Delete students
- View profiles with ratings
- Search & filter by level
- Session count tracking

### Drills
- Create drills with categories & difficulty
- Interactive star rating (click to rate)
- Focus points field
- **Badminton court tactics diagram** (draw plays)

### Court Tactics
- 4 player positions (color-coded)
- Multi-point tracking per player
- Draw movement paths with arrows
- Save court diagrams to drills
- Numbered sequences

### Schedule
- Weekly calendar view (2-column mobile)
- Toggle "Coaching Only" days
- Edit session time/drill
- Add availability windows
- Skeleton loading animation

### Settings
- Update coach profile
- Sign out
- Dark mode ready (base added)

## 🐛 Troubleshooting

### "VITE_SUPABASE_URL is not defined"
- Check `.env.local` exists in project root
- Verify variable names (no typos)
- Restart dev server: `npm run dev`

### "Failed to fetch" errors
- Verify Supabase URL is correct
- Check anon key is valid
- Ensure RLS policies allow access
- Check browser console for detailed error

### Blank page after login
- Open browser DevTools (F12)
- Check Console tab for errors
- Verify Supabase tables exist
- Check Auth is enabled in Supabase

### GitHub Pages shows old version
- Clear browser cache (Ctrl+Shift+Delete)
- Check GitHub Actions workflow succeeded
- Wait 2-3 minutes for CDN cache clear
- Try incognito window

## 📚 Project Structure

```
coachHQ-app/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.jsx
│   │   ├── Students.jsx
│   │   ├── Drills.jsx
│   │   ├── BadmintonCourt.jsx
│   │   ├── Schedule.jsx
│   │   ├── SessionPlan.jsx
│   │   ├── SessionRatingPopup.jsx
│   │   ├── Navbar.jsx
│   │   ├── Auth.jsx
│   │   ├── Settings.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Icons.jsx
│   ├── lib/
│   │   ├── supabase.js      # Supabase client
│   │   ├── supabase-db.js   # All DB queries
│   │   ├── auth.js          # Auth helpers
│   │   ├── studentData.js   # Mock data fallback
│   ├── App.jsx              # Main app
│   ├── main.jsx
│   ├── index.css
├── supabase-setup-complete.sql  # Database schema
├── .env.example             # Environment template
├── vite.config.js
├── package.json
├── index.html
└── README.md
```

## 🎯 Next Steps

1. **Add more students** via Students page
2. **Create drills** with court tactics
3. **Schedule sessions** in calendar
4. **Track progress** with skill ratings
5. **Share availability** with students (coming soon)

## 📞 Support

- Check DATABASE-STRUCTURE.md for schema details
- Check SETUP-GUIDE.md for detailed Supabase setup
- Review errors in browser DevTools Console
- Check Supabase logs for database errors

## 🚀 Version Info

- coachHQ v1.0.0
- React 18.2 + Vite 4.4
- Supabase 2.38
- PWA Ready
- Mobile Optimized (2-column layout)

Last updated: July 27, 2026
