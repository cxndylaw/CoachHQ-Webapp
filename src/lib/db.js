// Unified database with Supabase integration
// For now, using mock data. Replace with supabase.from() calls later.

export const DRILLS_DB = [
  { id: 1, name: 'Full Court Footwork', category: 'Footwork', difficulty: 4, tags: ['Footwork', 'Speed'] },
  { id: 2, name: 'Net Kill', category: 'Technique', difficulty: 3, tags: ['Technique', 'Net Play'] },
  { id: 3, name: 'Clear', category: 'Technique', difficulty: 2, tags: ['Technique', 'Beginner'] },
  { id: 4, name: 'Smash and Kill', category: 'Smash', difficulty: 5, tags: ['Smash', 'Attack'] },
  { id: 5, name: 'Serve and Return', category: 'Serve', difficulty: 2, tags: ['Serve', 'Beginner'] },
  { id: 6, name: 'Shadow Footwork', category: 'Speed & Stamina', difficulty: 3, tags: ['Footwork', 'Speed'] },
  { id: 7, name: 'Tactics: 3-2-1', category: 'Tactics', difficulty: 4, tags: ['Tactics', 'Advanced'] },
  { id: 8, name: 'Drop Shot Routine', category: 'Technique', difficulty: 3, tags: ['Technique', 'Net Play'] },
]

export const SESSIONS_DB = [
  { id: 1, studentId: 1, studentName: 'Lee Smith', day: 'Monday', time: '5:00 PM', drill: 'Full Court Footwork', drillId: 1, recurring: true, createdAt: new Date() },
  { id: 2, studentId: 1, studentName: 'Lee Smith', day: 'Wednesday', time: '5:00 PM', drill: 'Smash Technique', drillId: 4, recurring: true, createdAt: new Date() },
  { id: 3, studentId: 1, studentName: 'Lee Smith', day: 'Friday', time: '6:00 PM', drill: 'Net Play', drillId: 2, recurring: true, createdAt: new Date() },
  { id: 4, studentId: 2, studentName: 'Jordan Davis', day: 'Tuesday', time: '4:00 PM', drill: 'Drop Shot', drillId: 8, recurring: true, createdAt: new Date() },
  { id: 5, studentId: 2, studentName: 'Jordan Davis', day: 'Thursday', time: '5:00 PM', drill: 'Serve Practice', drillId: 5, recurring: true, createdAt: new Date() },
  { id: 6, studentId: 3, studentName: 'Alex Thompson', day: 'Monday', time: '10:30 AM', drill: 'Footwork drill', drillId: 1, recurring: true, createdAt: new Date() },
  { id: 7, studentId: 4, studentName: 'Sam Martinez', day: 'Thursday', time: '4:00 PM', drill: 'Net Play Basics', drillId: 2, recurring: false, createdAt: new Date() },
  { id: 8, studentId: 4, studentName: 'Sam Martinez', day: 'Saturday', time: '10:00 AM', drill: 'Footwork Intro', drillId: 1, recurring: true, createdAt: new Date() },
  { id: 9, studentId: 5, studentName: 'Rachel Park', day: 'Friday', time: '5:00 PM', drill: 'Serve Practice', drillId: 5, recurring: true, createdAt: new Date() },
]

export const AVAILABILITIES_DB = [
  { id: 1, day: 'Monday', startTime: '9:00 AM', endTime: '12:00 PM' },
  { id: 2, day: 'Monday', startTime: '2:00 PM', endTime: '7:00 PM' },
  { id: 3, day: 'Tuesday', startTime: '9:00 AM', endTime: '12:00 PM' },
  { id: 4, day: 'Tuesday', startTime: '2:00 PM', endTime: '6:00 PM' },
  { id: 5, day: 'Wednesday', startTime: '10:00 AM', endTime: '7:00 PM' },
  { id: 6, day: 'Thursday', startTime: '9:00 AM', endTime: '6:00 PM' },
  { id: 7, day: 'Friday', startTime: '9:00 AM', endTime: '7:00 PM' },
  { id: 8, day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' },
]

export function getSessionsByDay(day) {
  return SESSIONS_DB.filter(s => s.day === day)
}

export function getSessionsForWeek() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return days.map(day => ({
    day,
    sessions: getSessionsByDay(day)
  }))
}

export function updateSession(sessionId, updates) {
  const session = SESSIONS_DB.find(s => s.id === sessionId)
  if (session) Object.assign(session, updates)
  return session
}

export function addSession(session) {
  const newSession = {
    id: Math.max(...SESSIONS_DB.map(s => s.id), 0) + 1,
    createdAt: new Date(),
    ...session
  }
  SESSIONS_DB.push(newSession)
  return newSession
}

export function deleteSession(sessionId) {
  const idx = SESSIONS_DB.findIndex(s => s.id === sessionId)
  if (idx >= 0) SESSIONS_DB.splice(idx, 1)
}

export function getAvailabilitiesByDay(day) {
  return AVAILABILITIES_DB.filter(a => a.day === day)
}

export function addAvailability(availability) {
  const newAvail = {
    id: Math.max(...AVAILABILITIES_DB.map(a => a.id), 0) + 1,
    ...availability
  }
  AVAILABILITIES_DB.push(newAvail)
  return newAvail
}

export function deleteAvailability(availId) {
  const idx = AVAILABILITIES_DB.findIndex(a => a.id === availId)
  if (idx >= 0) AVAILABILITIES_DB.splice(idx, 1)
}
