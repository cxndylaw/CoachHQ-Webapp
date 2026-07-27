# coachHQ Database Structure & Setup

## Quick Start

### 1. Supabase Setup
1. Go to your Supabase project → SQL Editor
2. Copy the entire `supabase-setup-complete.sql` file
3. Paste into a new SQL query and click **Run**
4. Wait for all tables to be created (check ✓ confirmations)

### 2. Environment Variables
Create a `.env.local` file in the root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-public-anon-key
```

Get these from Supabase → Settings → API

### 3. Start Using Real Data
- All mock data in `src/lib/db.js` and `src/lib/studentData.js` will sync with Supabase
- Ratings, sessions, availabilities all persist to the database

---

## Database Schema

### STUDENTS Table
Stores coach's student information.
```sql
students (
  id,              -- auto-generated
  coach_id,        -- links to auth.users
  name,
  level,           -- 'Beginner', 'Inter', 'Advanced'
  age,
  dob,
  contact,
  address,
  sessions_count,
  technique_rating,   -- current skill ratings (0-5)
  footwork_rating,
  speed_rating,
  stamina_rating,
  tactics_rating
)
```

### DRILLS Table
All badminton drills available to assign.
```sql
drills (
  id,
  coach_id,
  name,            -- e.g., "Full Court Footwork"
  category,        -- e.g., "Footwork", "Technique", "Smash"
  difficulty,      -- 1-5
  description,
  duration_mins,
  focus_points[],  -- array of focus areas
  equipment[]      -- array of equipment needed
)
```

### SESSIONS Table
Weekly recurring sessions with students.
```sql
sessions (
  id,
  coach_id,
  student_id,      -- references students(id)
  day,             -- "Monday", "Tuesday", etc.
  time,            -- "5:00 PM"
  drill_id,        -- references drills(id)
  drill_name,      -- text backup
  recurring,       -- true/false for weekly repeats
  session_date,    -- for one-off sessions
  created_at,
  updated_at
)
```

### AVAILABILITIES Table
Times you're available for coaching (shows to new students).
```sql
availabilities (
  id,
  coach_id,
  day,             -- "Monday", "Tuesday", etc.
  start_time,      -- "09:00 AM"
  end_time,        -- "12:00 PM"
  created_at
)
```

### SESSION_HISTORY Table
Records of completed sessions with ratings & notes.
```sql
session_history (
  id,
  coach_id,
  student_id,
  session_id,
  session_date,
  duration_mins,
  overall_rating,  -- 1-5
  technique_rating,  -- 1-5
  footwork_rating,
  speed_rating,
  stamina_rating,
  tactics_rating,
  notes            -- coach's session notes
)
```

### PROFILES Table
Coach's profile (name, preferences).
```sql
profiles (
  id,              -- auth.users id
  name,
  created_at,
  updated_at
)
```

---

## Using the App with Real Data

### Schedule Page
1. **Weekly View**: Shows all sessions for the week (Monday–Sunday)
2. **Edit Session**: Click ⋯ on any session card → Change time, drill, or recurrence
3. **Manage Availabilities**: Toggle "Show Availabilities" → Add times you're free
4. Click on any session card to open the full session plan

### Ratings System
When you end a session:
1. **Session Rating Popup** appears
2. Shows student's **current ratings** for each skill
3. You rate today's performance
4. Ratings average together: `(current + today) / 2`
5. Updated ratings save to `students.technique_rating`, etc.

### Student Profiles
- Click student name in session card → View full details
- See current skill ratings, upcoming sessions, contact info
- Ratings update automatically after each session

### Adding New Data

#### Add a Student
```javascript
import { addStudent } from './lib/db'
addStudent({
  name: 'New Student',
  level: 'Beginner',
  age: 18,
  dob: '05/12/2006',
  contact: '0412 345 678',
  address: '123 Street, City'
})
```

#### Add a Drill
```javascript
import { addDrill } from './lib/db'
addDrill({
  name: 'New Drill',
  category: 'Footwork',
  difficulty: 3,
  description: 'Focus on quick feet...'
})
```

#### Add a Session
```javascript
import { addSession } from './lib/db'
addSession({
  studentId: 1,
  studentName: 'Lee Smith',
  day: 'Monday',
  time: '5:00 PM',
  drillId: 1,
  recurring: true
})
```

#### Log Session History
After a session ends, save results:
```javascript
import { addSessionHistory } from './lib/db'
addSessionHistory({
  studentId: 1,
  sessionId: 1,
  sessionDate: new Date().toISOString().split('T')[0],
  durationMins: 60,
  overallRating: 4,
  techniqueRating: 3,
  footworkRating: 4,
  speedRating: 4,
  staminaRating: 3,
  tacticsRating: 4,
  notes: 'Great footwork today, needs work on tactics'
})
```

---

## Integration Roadmap

### Phase 1 (Current) ✅
- Mock data in `db.js` and `studentData.js`
- UI fully built
- Edit/add modals working

### Phase 2 (Next)
- Replace mock functions with Supabase queries:
  - `getSessionsForWeek()` → fetch from `sessions` table
  - `getStudentById()` → fetch from `students` table
  - `addSession()` → insert into `sessions` table
- Pass `coach_id` from authenticated user

### Phase 3
- Session history logging
- Skill progression charts
- Sharing availabilities link with new students
- Drill suggestions based on student level

---

## Notes for Developers

**All data is coach-specific** — RLS policies ensure each coach only sees their own data.

**Key fields to always include:**
- `coach_id` — from `auth.uid()`
- Student/session timestamps — `created_at`, `updated_at`

**Testing without Supabase:**
- Current mock data in `lib/db.js` works standalone
- All functions are already modular → easy to swap for Supabase calls

**Backup mock data** is in `lib/studentData.js` if needed.
