# ⚡ Quick Start (5 Minutes)

## 1️⃣ Setup
```bash
npm install
cp .env.example .env.local
```

## 2️⃣ Add Credentials to `.env.local`
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_KEY=your-anon-key
```
Get from: [Supabase](https://supabase.com) → Project → Settings → API

## 3️⃣ Create Database
In Supabase SQL Editor, paste `supabase-setup-complete.sql` and run

## 4️⃣ Run Locally
```bash
npm run dev
# Opens http://localhost:5173
```

## 5️⃣ Build & Deploy
```bash
npm run build
git add -A
git commit -m "deploy: update"
git push origin main
# GitHub Actions auto-deploys to GitHub Pages
```

---

## 📱 Features

| Page | What it does |
|------|-------------|
| **Dashboard** | Live sessions, today's coaching, student ratings |
| **Students** | Add/edit students, view profiles & skills |
| **Drills** | Create drills with court tactics diagram |
| **Court** | Draw player positions & movement paths |
| **Schedule** | Weekly calendar, manage availability |
| **Settings** | Update profile, sign out |

---

## 🎮 Try It Now

1. **Add a student:** Students → + → fill form
2. **Create a drill:** Drills → + → name it → click 🎾 Court → add positions
3. **Schedule:** Schedule → click day → add session
4. **Track:** Dashboard shows upcoming sessions & ratings

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank after login | Check DevTools Console (F12) |
| "not defined" error | Restart: `npm run dev` |
| No students showing | Add sample data in Supabase SQL |
| GitHub Pages old version | Clear cache + wait 2min |

---

For full details: See `INSTALLATION.md`
