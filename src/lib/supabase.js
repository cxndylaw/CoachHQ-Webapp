// Supabase Database Integration
// Real queries replacing mock data in db.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

// ============================================================================
// STUDENTS
// ============================================================================

export async function getStudents(coachId) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('coach_id', coachId)
    .order('name')
  
  if (error) console.error('Error fetching students:', error)
  return data || []
}

export async function getStudentById(coachId, studentId) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('coach_id', coachId)
    .eq('id', studentId)
    .single()
  
  if (error) console.error('Error fetching student:', error)
  return data
}

export async function addStudent(coachId, studentData) {
  const { data, error } = await supabase
    .from('students')
    .insert([{ coach_id: coachId, ...studentData }])
    .select()
    .single()
  
  if (error) console.error('Error adding student:', error)
  return data
}

export async function updateStudent(coachId, studentId, updates) {
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('coach_id', coachId)
    .eq('id', studentId)
    .select()
    .single()
  
  if (error) console.error('Error updating student:', error)
  return data
}

export async function deleteStudent(coachId, studentId) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('coach_id', coachId)
    .eq('id', studentId)
  
  if (error) console.error('Error deleting student:', error)
  return !error
}

export async function updateStudentRatings(coachId, studentId, ratings) {
  return updateStudent(coachId, studentId, ratings)
}

// ============================================================================
// DRILLS
// ============================================================================

export async function getDrills(coachId) {
  const { data, error } = await supabase
    .from('drills')
    .select('*')
    .eq('coach_id', coachId)
    .order('name')
  
  if (error) console.error('Error fetching drills:', error)
  return data || []
}

export async function getDrillById(coachId, drillId) {
  const { data, error } = await supabase
    .from('drills')
    .select('*')
    .eq('coach_id', coachId)
    .eq('id', drillId)
    .single()
  
  if (error) console.error('Error fetching drill:', error)
  return data
}

export async function addDrill(coachId, drillData) {
  const { data, error } = await supabase
    .from('drills')
    .insert([{ coach_id: coachId, ...drillData }])
    .select()
    .single()
  
  if (error) console.error('Error adding drill:', error)
  return data
}

export async function updateDrill(coachId, drillId, updates) {
  const { data, error } = await supabase
    .from('drills')
    .update(updates)
    .eq('coach_id', coachId)
    .eq('id', drillId)
    .select()
    .single()
  
  if (error) console.error('Error updating drill:', error)
  return data
}

export async function deleteDrill(coachId, drillId) {
  const { error } = await supabase
    .from('drills')
    .delete()
    .eq('coach_id', coachId)
    .eq('id', drillId)
  
  if (error) console.error('Error deleting drill:', error)
  return !error
}

// ============================================================================
// SESSIONS
// ============================================================================

export async function getSessions(coachId) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('coach_id', coachId)
    .order('day')
  
  if (error) console.error('Error fetching sessions:', error)
  return data || []
}

export async function getSessionsByDay(coachId, day) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('coach_id', coachId)
    .eq('day', day)
    .order('time')
  
  if (error) console.error('Error fetching sessions by day:', error)
  return data || []
}

export async function getSessionsForWeek(coachId) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const allSessions = await getSessions(coachId)
  
  return days.map(day => ({
    day,
    sessions: allSessions.filter(s => s.day === day)
  }))
}

export async function addSession(coachId, sessionData) {
  const { data, error } = await supabase
    .from('sessions')
    .insert([{ coach_id: coachId, ...sessionData }])
    .select()
    .single()
  
  if (error) console.error('Error adding session:', error)
  return data
}

export async function updateSession(coachId, sessionId, updates) {
  const { data, error } = await supabase
    .from('sessions')
    .update({ ...updates, updated_at: new Date() })
    .eq('coach_id', coachId)
    .eq('id', sessionId)
    .select()
    .single()
  
  if (error) console.error('Error updating session:', error)
  return data
}

export async function deleteSession(coachId, sessionId) {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('coach_id', coachId)
    .eq('id', sessionId)
  
  if (error) console.error('Error deleting session:', error)
  return !error
}

// ============================================================================
// AVAILABILITIES
// ============================================================================

export async function getAvailabilities(coachId) {
  const { data, error } = await supabase
    .from('availabilities')
    .select('*')
    .eq('coach_id', coachId)
    .order('day')
  
  if (error) console.error('Error fetching availabilities:', error)
  return data || []
}

export async function getAvailabilitiesByDay(coachId, day) {
  const { data, error } = await supabase
    .from('availabilities')
    .select('*')
    .eq('coach_id', coachId)
    .eq('day', day)
    .order('start_time')
  
  if (error) console.error('Error fetching availabilities by day:', error)
  return data || []
}

export async function addAvailability(coachId, availabilityData) {
  const { data, error } = await supabase
    .from('availabilities')
    .insert([{ coach_id: coachId, ...availabilityData }])
    .select()
    .single()
  
  if (error) console.error('Error adding availability:', error)
  return data
}

export async function deleteAvailability(coachId, availabilityId) {
  const { error } = await supabase
    .from('availabilities')
    .delete()
    .eq('coach_id', coachId)
    .eq('id', availabilityId)
  
  if (error) console.error('Error deleting availability:', error)
  return !error
}

// ============================================================================
// SESSION HISTORY
// ============================================================================

export async function getSessionHistory(coachId, studentId = null) {
  let query = supabase
    .from('session_history')
    .select('*')
    .eq('coach_id', coachId)
  
  if (studentId) {
    query = query.eq('student_id', studentId)
  }
  
  const { data, error } = await query.order('session_date', { ascending: false })
  
  if (error) console.error('Error fetching session history:', error)
  return data || []
}

export async function addSessionHistory(coachId, historyData) {
  const { data, error } = await supabase
    .from('session_history')
    .insert([{ coach_id: coachId, ...historyData }])
    .select()
    .single()
  
  if (error) console.error('Error adding session history:', error)
  return data
}

export async function getStudentProgress(coachId, studentId) {
  const history = await getSessionHistory(coachId, studentId)
  
  if (history.length === 0) return null
  
  // Calculate average ratings over all sessions
  const avgTechnique = Math.round(history.reduce((sum, h) => sum + (h.technique_rating || 0), 0) / history.length)
  const avgFootwork = Math.round(history.reduce((sum, h) => sum + (h.footwork_rating || 0), 0) / history.length)
  const avgSpeed = Math.round(history.reduce((sum, h) => sum + (h.speed_rating || 0), 0) / history.length)
  const avgStamina = Math.round(history.reduce((sum, h) => sum + (h.stamina_rating || 0), 0) / history.length)
  const avgTactics = Math.round(history.reduce((sum, h) => sum + (h.tactics_rating || 0), 0) / history.length)
  
  return {
    totalSessions: history.length,
    avgTechnique,
    avgFootwork,
    avgSpeed,
    avgStamina,
    avgTactics,
    recentSessions: history.slice(0, 5)
  }
}

// ============================================================================
// PROFILES (COACH DATA)
// ============================================================================

export async function getProfile(coachId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', coachId)
    .single()
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error)
  }
  return data
}

export async function updateProfile(coachId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', coachId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating profile:', error)
  }
  return data
}

export async function createProfileIfNotExists(coachId, name) {
  const existing = await getProfile(coachId)
  if (existing) return existing
  
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ id: coachId, name }])
    .select()
    .single()
  
  if (error) console.error('Error creating profile:', error)
  return data
}

// ============================================================================
// HELPER: Get coach ID from current session
// ============================================================================

export async function getCurrentCoachId() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id
}

// ============================================================================
// REAL-TIME SUBSCRIPTIONS (Optional)
// ============================================================================

export function subscribeToSessions(coachId, callback) {
  return supabase
    .channel(`sessions:${coachId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'sessions', filter: `coach_id=eq.${coachId}` },
      callback
    )
    .subscribe()
}

export function subscribeToStudents(coachId, callback) {
  return supabase
    .channel(`students:${coachId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'students', filter: `coach_id=eq.${coachId}` },
      callback
    )
    .subscribe()
}