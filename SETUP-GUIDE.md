# coachHQ Complete Setup Guide

## Step 1: Supabase Project Setup

### 1a. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Enter your project name, password, and region
4. Wait for the project to initialize (~1 minute)

### 1b. Get API Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** — looks like `https://xxx.supabase.co`
   - **anon public key** — starts with `eyJ...`
3. Save these for Step 3

### 1c. Set Up Database Schema
1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Copy entire contents of `supabase-setup-complete.sql` (in your app folder)
4. Paste into the SQL editor
5. Click **▶ Run** (wait for all ✓ checkmarks)

> **Check tables created:** Go to Table Editor → you should see 6 tables:
> - profiles
> - students  
> - drills
> - sessions
> - availabilities
> - session_history

---

## Step 2: Enable Authentication

### 2a. Email/Password Auth (Already enabled by default)
1. Go to **Authentication** → **Providers**
2. Ensure **"Email"** is enabled (it is by default)

### 2b. Configure Email Settings (Optional)
1. Go to **Authentication** → **Email Templates**
2. Customize if needed (default templates work fine)

---

## Step 3: Configure Your App

### 3a. Create Environment File
1. In your app root directory, create `.env.local`
2. Add these lines:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-public-anon-key
```

Replace with your actual keys from Step 1b

### 3b. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 3c. Restart Dev Server
```bash
npm run dev
```

---

## Step 4: Test the Connection

### 4a. Create Your First Account
1. Open your app
2. Sign up with your email
3. Check your email inbox (may be in spam)
4. Click verification link
5. You should be logged in!

### 4b. Check Supabase Database
1. Go to Supabase → **Table Editor**
2. Click **profiles** table
3. You should see a row with your user ID and email

---

## Step 5: Start Using Real Data

### 5a. Add Your First Student
1. In the app, go to **Students** tab
2. Click **"+ Add"** button
3. Fill in: Name, Level, Age, Contact, Address
4. Click **"Add Student"**
5. Check Supabase → **students** table (you should see the new student)

### 5b. Add a Session
1. Go to **Schedule** tab
2. Click on a day
3. Click **"+ Add Session"**
4. Select student, day, time, drill, and "Repeat every week"
5. Click **"Add Session"**
6. Check Supabase → **sessions** table

### 5c. Add Your Availability
1. Go to **Schedule** tab
2. Click **"Show Availabilities"** button
3. For each day you're free, click **"+ Add"**
4. Set start and end times
5. Check Supabase → **availabilities** table

---

## Step 6: Test Ratings System

### 6a. Complete a Session
1. Go to **Schedule**
2. Click on a session card
3. Click **"Start Session"**
4. Click **"End Session"** (after some time)
5. Rate the student's skills
6. Click **"Save Ratings"**

### 6b. Check Session History
In Supabase:
1. Go to **session_history** table
2. You should see a new row with:
   - Student ID
   - Session date
   - All ratings (technique, footwork, etc.)

### 6c. Check Student Ratings Updated
1. Go to **students** table
2. Find the student you just rated
3. Their `technique_rating`, `footwork_rating`, etc. should be updated

---

## Step 7: Security & Row Level Security (RLS)

**Important:** All tables have RLS enabled. This means:
- Each coach only sees their own data
- No one can modify other coaches' data
- This is already set up in `supabase-setup-complete.sql`

To verify RLS is working:
1. Create 2 test accounts
2. Sign in as Coach A, add a student
3. Sign out, sign in as Coach B
4. You should NOT see Coach A's students
5. ✅ RLS is working!

---

## Common Issues & Fixes

### ❌ "Error: Supabase URL or key not found"
- Check `.env.local` exists
- Verify keys are correct (copy/paste again)
- Restart dev server: `npm run dev`

### ❌ "No data appearing in app"
- Check Supabase → **Authentication** → **Users**
- Verify your user email is listed
- Try refresh page and log out/in again

### ❌ "Tables don't exist"
- Go to Supabase → **SQL Editor** → **New Query**
- Paste `supabase-setup-complete.sql` again
- Click **Run** (check for ✓ checkmarks)

### ❌ "Can't sign up (stuck on loading)"
- Check browser console for errors (F12 → Console)
- Verify `VITE_SUPABASE_URL` is accessible
- Make sure `.env.local` is saved

### ❌ "Ratings not saving"
- Check browser console (F12 → Console)
- Verify student actually has an ID
- Try refreshing page

---

## Data Sync & Real-Time Updates (Optional)

The app currently polls data on page load. For real-time updates across multiple devices:

```javascript
// In your component
import { subscribeToSessions } from './lib/supabase-db'

subscribeToSessions(coachId, (payload) => {
  console.log('Session updated!', payload)
  // Refresh data
})
```

Real-time subscriptions are already defined in `supabase-db.js` but not yet integrated in components.

---

## What's Connected to Supabase Now

✅ **Students** — Add, view, edit, delete
✅ **Sessions** — Add, edit (with "this week only" option), delete
✅ **Availabilities** — Add times you're free, delete
✅ **Ratings** — Save after each session
✅ **Session History** — Full records with notes
✅ **Profiles** — Coach name saved to database
✅ **Authentication** — Email/password, RLS protection

---

## What's Still Using Mock Data

❌ **Drills** — Still loading from mock `db.js`
   - To connect: Update `getDrills()` in components to use `getDrills(coachId)` from `supabase-db.js`

---

## Next Steps

### Recommended:
1. ✅ Complete setup above
2. ✅ Add a few students and sessions
3. ✅ Complete a practice session and rate it
4. ⏳ Connect drills to Supabase
5. ⏳ Add session notes & persistence
6. ⏳ Build student progress charts

### Advanced:
- Add student progress charts (based on `session_history`)
- Generate shareable availability link for new students
- Email notifications before sessions
- Bulk import students from CSV

---

## Deployment to Production

When ready to deploy to GitHub Pages:

```bash
# 1. Build the app
npm run build

# 2. Commit your env file is in .gitignore (it is by default)
# 3. Push to GitHub
git add .
git commit -m "connect to supabase"
git push

# 4. GitHub Actions auto-deploys to GitHub Pages
# 5. Create `.env.local` file on production server or in deployment settings
```

⚠️ **Never commit `.env.local` to Git** — it contains your Supabase API key!

---

## Troubleshooting Checklist

- [ ] `.env.local` exists with correct keys
- [ ] `npm install @supabase/supabase-js` ran
- [ ] `supabase-setup-complete.sql` was run in Supabase SQL Editor
- [ ] Verified tables exist in Supabase Table Editor
- [ ] Verified authentication works (can sign up/log in)
- [ ] Dev server restarted after adding `.env.local`
- [ ] Checked browser console for errors (F12)

---

## Get Help

- **Supabase Docs:** https://supabase.com/docs
- **Supabase Community:** https://discord.supabase.io
- **This App Repo:** Check the transcript for detailed implementation

Good luck! 🚀
