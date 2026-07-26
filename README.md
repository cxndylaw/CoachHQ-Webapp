# coachHQ — Badminton Coaching App

A modern, fast coaching app built with React, Vite, Tailwind CSS, and Supabase.

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/coachHQ.git
cd coachHQ
npm install
```

### 2. Set up Supabase
- Go to [supabase.com](https://supabase.com) and create a new project
- Copy your `Project URL` and `Anon Key`
- Create `.env` (copy from `.env.example`):
```
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_KEY=your_key_here
```

### 3. Run Locally
```bash
npm run dev
```
Visit `http://localhost:5173`

### 4. Deploy to GitHub Pages
```bash
npm run build
git add dist/
git commit -m "build: deploy"
git push origin main
```

Then enable GitHub Pages:
- Go to repo Settings → Pages
- Source: Deploy from a branch
- Branch: `main` / folder: `dist`

Your app is now live at `https://YOUR_USERNAME.github.io/coachHQ/`

## Project Structure
```
src/
  components/      ← React components (Dashboard, Students, etc.)
  lib/             ← Supabase & auth helpers
  index.css        ← Tailwind styles
  App.jsx          ← Main app
  main.jsx         ← Entry point
```

## Adding Pages
Each new page = 1 file in `src/components/`. Import in `App.jsx` and add to navigation.

## Database Schema
Coming next — I'll set up Supabase tables for students, drills, sessions.
