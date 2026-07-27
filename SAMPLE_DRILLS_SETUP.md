# Adding Sample Drills to coachHQ

This guide shows you how to add 80+ professional badminton drills to your database.

## 📋 What's Included

The `sample-drills.sql` file contains comprehensive drills organized by category:

- **Technical Skills** (12 drills) — Forehand, Backhand, Serve, Net Play, etc.
- **Footwork & Movement** (8 drills) — Footwork patterns, agility, recovery
- **Tactical Skills** (8 drills) — Singles/doubles tactics, shot selection, positioning
- **Defensive Skills** (5 drills) — Smash defence, block defence, retrieval
- **Attacking Skills** (6 drills) — Jump smash, front court kills, continuous attacks
- **Physical Conditioning** (8 drills) — Speed, agility, endurance, strength, power
- **Reaction & Reflexes** (4 drills) — Reaction time, decision making
- **Multi-Shuttle & Feeding** (4 drills) — Coach feeding, continuous drills
- **Match Play** (5 drills) — Conditioned games, match simulation, tournaments
- **Warm-up & Recovery** (5 drills) — Dynamic stretching, cool-down, mobility
- **Mental Skills** (5 drills) — Focus, confidence, pressure situations
- **Beginner Skills** (5 drills) — Grip, ready position, basic rules

**Total: 80 Professional Drills**

---

## 🚀 How to Add These Drills

### Step 1: Get Your Coach ID

1. Go to your Supabase project
2. Click **SQL Editor**
3. Run this query:
   ```sql
   SELECT id FROM auth.users LIMIT 1;
   ```
4. Copy the UUID that appears (looks like: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`)

### Step 2: Prepare the SQL File

1. Open `sample-drills.sql` in a text editor
2. Replace all instances of `'YOUR_COACH_UUID'` with your actual UUID
   - Use Find & Replace (Ctrl+H / Cmd+H)
   - Find: `'YOUR_COACH_UUID'`
   - Replace: `'YOUR_ACTUAL_UUID'` (keep the quotes!)

### Step 3: Add Drills to Database

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy-paste the entire updated `sample-drills.sql` file
4. Click **Run** (green button)
5. Wait for completion ✓

### Step 4: Verify

In your app:
1. Go to **Drills** page
2. You should see 80+ drills in the list
3. Dashboard should show drill count (was hardcoded, now synced!)
4. Click a drill to see full details with focus points

---

## 📊 New Category Structure

Instead of simple categories like "Footwork", we now have detailed categories:

**Example:** Instead of just "Technical Skills", we have:
- Technical Skills - Forehand
- Technical Skills - Backhand
- Technical Skills - Serve
- Technical Skills - Net Play
- etc.

This allows you to filter and organize drills much better!

---

## 🎯 Features of Sample Drills

Each drill includes:

- **Name** — Descriptive drill name
- **Category** — Organized hierarchical category
- **Difficulty** — 1⭐ to 5⭐ star rating
- **Description** — What the drill focuses on
- **Duration** — Estimated time in minutes
- **Focus Points** — Array of key focus areas

Example:
```
Name: Forehand Drive
Category: Technical Skills - Forehand
Difficulty: ⭐⭐⭐
Duration: 30 minutes
Focus Points: Grip, Stance, Backswing, Contact point, Follow-through
```

---

## 🔄 After Adding Drills

1. **Dashboard** — Drills count now shows actual number (80+)
2. **Drills Page** — Filter by category and difficulty
3. **Court Integration** — Attach court diagrams to drills
4. **Student Sessions** — Assign drills to training sessions
5. **Progression** — Track which drills students master

---

## 💡 Tips

- **Start small:** Pick 10-15 drills to use initially
- **Customize:** Modify drill durations based on your coaching style
- **Add your own:** You can create custom drills anytime
- **Organize:** Use categories to group similar drills
- **Court tactics:** Add court diagrams to complex drills

---

## 🐛 Troubleshooting

**Error: "UUID not in correct format"**
- Make sure your UUID is copied exactly
- Check for extra spaces or quotes

**Error: "duplicate key value violates unique constraint"**
- Drills already exist in database
- Run `DELETE FROM drills WHERE coach_id = 'YOUR_UUID';` first

**No drills showing up**
- Refresh the browser (Ctrl+R / Cmd+R)
- Check that the drills were added (run `SELECT COUNT(*) FROM drills;`)

---

## 📝 Sample SQL Query for Your Coach ID

```sql
SELECT id, email FROM auth.users LIMIT 1;
```

This shows you:
- **id** = Your coach UUID (use this for the drills)
- **email** = Your login email

---

## ✨ What Happens Next?

After adding these 80 drills:

1. ✅ Dashboard shows real drill count
2. ✅ Drills page organized by category
3. ✅ Easy to filter and search
4. ✅ Add court tactics to any drill
5. ✅ Schedule sessions with these drills
6. ✅ Track student drill progression

---

**Ready? Let's add those drills! 🚀**

1. Copy your Coach ID from Supabase
2. Find & Replace YOUR_COACH_UUID in sample-drills.sql
3. Paste into SQL Editor and Run
4. Refresh your app
5. Go to Drills → See 80+ professional badminton drills!
