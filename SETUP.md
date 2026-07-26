# coachHQ Setup Guide

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `coachHQ` (or whatever you want)
3. Make it **Public** (for GitHub Pages free tier)
4. Click "Create repository"
5. Copy the HTTPS URL

## Step 2: Clone & Install

Open terminal on your Mac:

```bash
cd ~/Desktop  # or wherever you want
git clone YOUR_REPO_URL coachHQ
cd coachHQ
npm install
```

(This downloads all dependencies from package.json — takes ~2 min)

## Step 3: Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with email
4. Create a new project (name: `coachHQ`, region: closest to you)
5. Wait ~2 min for setup
6. In the dashboard, go to **Settings** → **API**
7. Copy:
   - **Project URL** (starts with `https://`)
   - **Anon Key** (long string)

## Step 4: Set Environment Variables

In your `coachHQ` folder, create `.env` file (copy `.env.example`):

```bash
cp .env.example .env
```

Then open `.env` and paste:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save the file** (Cmd+S)

## Step 5: Run Locally

```bash
npm run dev
```

You'll see:
```
VITE v4.4.0  ready in 234 ms

➜  Local:   http://localhost:5173/
```

Open that URL in Safari. You should see the login screen!

**To stop**: Press Ctrl+C in terminal

## Step 6: Test Login

- Create account: any email, any password
- Supabase will send a confirmation email (check spam folder)
- After confirming, you can sign in

## Step 7: Deploy to GitHub Pages

Push your code:

```bash
npm run build       # Creates ./dist folder
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

Then enable GitHub Pages:

1. Go to your repo on GitHub
2. Settings → Pages
3. Source: **Deploy from a branch**
4. Branch: `main` / Folder: `/ (root)`
5. Click Save

GitHub Actions will auto-build & deploy. Check the **Actions** tab to see progress.

After ~1 min, your app is live at:
```
https://YOUR_GITHUB_USERNAME.github.io/coachHQ/
```

## Step 8: Future Updates

Every time you want to update:

```bash
# Make changes to src/ files...
git add .
git commit -m "Update: description"
git push
```

GitHub automatically rebuilds & deploys.

---

## Troubleshooting

**"npm: command not found"**
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart terminal

**"VITE_SUPABASE_URL is undefined"**
- Make sure `.env` file exists and has correct keys
- Restart `npm run dev`

**Login not working**
- Check Supabase credentials in `.env`
- Make sure Supabase project is active

**App not showing on GitHub Pages**
- Check Actions tab for build errors
- Make sure Settings → Pages is set to `main/dist`
- Wait 2-3 minutes after first push

---

Next: Database schema setup coming! 🚀
