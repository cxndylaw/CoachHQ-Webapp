import { useState, useEffect, useRef } from 'react'
import { ClockIcon, ChevronRight, CalendarIcon, ClipboardCheckIcon, UsersIcon, ClipboardIcon, CalendarStatsIcon } from './Icons'
import SessionPlan from './SessionPlan'
import SessionRatingPopup from './SessionRatingPopup'
import { getSessionsForWeek, addSessionHistory, getCurrentCoachId, getStudents, getDrills } from '../lib/supabase-db'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

const AV = {
  width: 42, height: 42, borderRadius: '50%',
  background: 'rgba(90,60,170,0.1)', border: '1.5px solid rgba(90,60,170,0.2)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 12, fontWeight: 700, color: '#5a3aaa', flexShrink: 0,
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatDuration(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function Dashboard({ coachName }) {
  const [viewingSession, setViewingSession] = useState(null)
  const [activeSession, setActiveSession] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [sessionStartedAt, setSessionStartedAt] = useState(null)
  const [alert, setAlert] = useState(null)
  const [dismissedAlerts, setDismissedAlerts] = useState([])
  const [endConfirm, setEndConfirm] = useState(false)
  const [showRatingPopup, setShowRatingPopup] = useState(false)
  const [justEndedSession, setJustEndedSession] = useState(null)
  const [coachId, setCoachId] = useState(null)
  const [allSessions, setAllSessions] = useState([])
  const [upcomingSessions, setUpcomingSessions] = useState([])
  const [topStudents, setTopStudents] = useState([])
  const [drillCount, setDrillCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef(null)
  const alertCheckRef = useRef(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const cId = await getCurrentCoachId()
      setCoachId(cId)
      
      // Load sessions for week
      const weekData = await getSessionsForWeek(cId)
      const allSessionsList = weekData.reduce((acc, day) => [...acc, ...day.sessions], [])
      setAllSessions(allSessionsList)
      
      // Get today's sessions
      const todayName = new Date().toLocaleDateString('en-AU', { weekday: 'long' })
      const todaySessions = allSessionsList.filter(s => s.day === todayName)
      setUpcomingSessions(todaySessions)
      
      // Load students and get top ones
      const students = await getStudents(cId)
      const topByCount = students.sort((a, b) => (b.sessions_count || 0) - (a.sessions_count || 0)).slice(0, 3)
      setTopStudents(topByCount)
      
      // Load drill count
      const drills = await getDrills(cId)
      setDrillCount(drills.length)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeSession && sessionStartedAt) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - sessionStartedAt) / 1000))
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
      setElapsed(0)
    }
    return () => clearInterval(intervalRef.current)
  }, [activeSession, sessionStartedAt])

  useEffect(() => {
    alertCheckRef.current = setInterval(() => {
      if (activeSession || allSessions.length === 0) return
      // Alert logic would go here if needed
    }, 1000)
    return () => clearInterval(alertCheckRef.current)
  }, [activeSession, allSessions, dismissedAlerts, alert])

  const handleStartSession = (session) => {
    setActiveSession(session)
    setSessionStartedAt(Date.now())
    setAlert(null)
    setViewingSession(null)
    setEndConfirm(false)
  }

  const handleEndSession = () => {
    setJustEndedSession(activeSession)
    setShowRatingPopup(true)
    setActiveSession(null)
    setSessionStartedAt(null)
    setElapsed(0)
    setEndConfirm(false)
  }

  const handleSaveRatings = async (ratings) => {
    try {
      const sessionDate = new Date().toISOString().split('T')[0]
      await addSessionHistory(coachId, {
        student_id: justEndedSession.student_id,
        session_id: justEndedSession.id,
        session_date: sessionDate,
        duration_mins: elapsed ? Math.floor(elapsed / 60) : 0,
        overall_rating: ratings.overall,
        technique_rating: ratings.skills.Technique,
        footwork_rating: ratings.skills.Footwork,
        speed_rating: ratings.skills.Speed,
        stamina_rating: ratings.skills.Stamina,
        tactics_rating: ratings.skills.Tactics,
        notes: ''
      })
    } catch (error) {
      console.error('Error saving session history:', error)
    }
    setShowRatingPopup(false)
    setJustEndedSession(null)
  }

  const today = new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
  const stats = [
    { v: upcomingSessions.length, l: "Today's sessions", Icon: ClipboardCheckIcon },
    { v: topStudents.length, l: 'Students', Icon: UsersIcon },
    { v: drillCount, l: 'Drills', Icon: ClipboardIcon },
  ]

  if (loading) {
    return (
      <div>
        {/* Header skeleton */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ height: 20, borderRadius: 12, background: 'rgba(90,60,170,0.1)', marginBottom: 8, animation: 'pulse 2s infinite', width: '40%' }} />
          <div style={{ height: 44, borderRadius: 12, background: 'rgba(90,60,170,0.08)', marginBottom: 8, animation: 'pulse 2s infinite 0.1s', width: '60%' }} />
          <div style={{ height: 16, borderRadius: 12, background: 'rgba(90,60,170,0.08)', animation: 'pulse 2s infinite 0.2s', width: '35%' }} />
        </div>

        {/* Stats skeletons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ ...G, padding: 18, height: 120, animation: `pulse 2s infinite ${i * 0.1}s` }}>
              <div style={{ height: 32, borderRadius: 8, background: 'rgba(90,60,170,0.1)', marginBottom: 12 }} />
              <div style={{ height: 14, borderRadius: 6, background: 'rgba(90,60,170,0.08)' }} />
            </div>
          ))}
        </div>

        {/* Sessions section skeleton */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ height: 16, borderRadius: 8, background: 'rgba(90,60,170,0.1)', marginBottom: 12, width: '25%', animation: 'pulse 2s infinite 0.3s' }} />
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ ...G, padding: 14, marginBottom: 8, height: 80, animation: `pulse 2s infinite ${0.4 + i * 0.1}s` }}>
              <div style={{ height: 14, borderRadius: 6, background: 'rgba(90,60,170,0.1)', marginBottom: 8 }} />
              <div style={{ height: 12, borderRadius: 6, background: 'rgba(90,60,170,0.08)' }} />
            </div>
          ))}
        </div>

        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
      </div>
    )
  }

  if (viewingSession) {
    return (
      <SessionPlan
        student={{ name: viewingSession.student_name, id: viewingSession.student_id }}
        session={viewingSession}
        isActive={activeSession?.id === viewingSession.id}
        elapsed={activeSession?.id === viewingSession.id ? elapsed : null}
        onBack={() => setViewingSession(null)}
        onStartSession={() => handleStartSession(viewingSession)}
        onEndSession={handleEndSession}
        onViewStudent={() => {}}
      />
    )
  }

  return (
    <div>
      {showRatingPopup && justEndedSession && (
        <SessionRatingPopup
          student={justEndedSession}
          onClose={() => { setShowRatingPopup(false); setJustEndedSession(null) }}
          onSave={handleSaveRatings}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{getGreeting()}</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px', marginBottom: 6 }}>{coachName}</div>
        <div style={{ fontSize: 13, color: 'rgba(30,16,64,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <CalendarIcon size={14} color="rgba(30,16,64,0.4)" /> {today}
        </div>
      </div>

      {/* Active session banner */}
      {activeSession && (
        <div style={{ marginBottom: 16, borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(90,60,170,0.25)' }}>
          <div
            onClick={() => setViewingSession(activeSession)}
            style={{
              padding: '16px 18px', cursor: 'pointer',
              background: 'linear-gradient(135deg, #5a3aaa, #7c5cc7)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
              {activeSession.student_name?.split(' ').map(n => n[0]).join('') || '?'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Now Training</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>{activeSession.student_name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{activeSession.drill_name}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
                {formatDuration(elapsed)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#4ade80', background: 'rgba(74,222,128,0.15)', padding: '3px 8px', borderRadius: 20 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', animation: 'pulse 1.2s infinite' }} />
                LIVE
              </div>
            </div>
          </div>

          {!endConfirm ? (
            <button onClick={() => setEndConfirm(true)} style={{
              width: '100%', padding: '11px', background: 'rgba(239,68,68,0.12)',
              border: 'none', borderTop: '1px solid rgba(239,68,68,0.15)',
              color: '#dc2626', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l6 6M15 9l-6 6"/>
              </svg>
              End Session
            </button>
          ) : (
            <div style={{ display: 'flex', background: 'rgba(239,68,68,0.08)', borderTop: '1px solid rgba(239,68,68,0.15)' }}>
              <button onClick={handleEndSession} style={{ flex: 1, padding: '11px', background: 'none', border: 'none', borderRight: '1px solid rgba(239,68,68,0.15)', color: '#dc2626', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                End ({formatDuration(elapsed)})
              </button>
              <button onClick={() => setEndConfirm(false)} style={{ flex: 1, padding: '11px', background: 'none', border: 'none', color: 'rgba(30,16,64,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Keep going
              </button>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:24 }}>
        {stats.map(({ v, l, Icon }) => (
          <div key={l} style={{ ...G, padding:'18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
              <div style={{ fontSize:34, fontWeight:800, color:'#2e1870', letterSpacing:'-1px', lineHeight:1 }}>{v}</div>
              <div style={{ background:'rgba(90,60,170,0.08)', borderRadius:10, padding:6 }}>
                <Icon size={18} color="#5a3aaa" />
              </div>
            </div>
            <div style={{ fontSize:11, fontWeight:600, color:'rgba(30,16,64,0.4)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Upcoming sessions */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'rgba(30,16,64,0.38)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Upcoming sessions</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
        {upcomingSessions.slice(0, 3).map((s,i) => (
          <div key={i} onClick={() => setViewingSession(s)} style={{ ...G, padding:'14px 16px', display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
            <div style={{ ...AV }}>
              {s.student_name?.split(' ').map(n => n[0]).join('') || '?'}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040', marginBottom:3 }}>{s.student_name}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)', display:'flex', alignItems:'center', gap:4 }}>
                <ClockIcon size={12} color="rgba(30,16,64,0.4)" />{s.time} · {s.drill_name}
              </div>
            </div>
            <div style={{ fontSize:11, fontWeight:700, color:'#5a3aaa', background:'rgba(90,60,170,0.08)', border:'1.5px solid rgba(90,60,170,0.15)', padding:'4px 10px', borderRadius:20 }}>Plan</div>
            <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
          </div>
        ))}
      </div>

      {/* Top students */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'rgba(30,16,64,0.38)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Top students</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {topStudents.map((s,i) => (
          <div key={i} style={{ ...G, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={AV}>{s.name.split(' ').map(n => n[0]).join('')}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040' }}>{s.name}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)' }}>{s.level}</div>
            </div>
            <div style={{ textAlign:'right', marginRight:4 }}>
              <div style={{ fontSize:15, fontWeight:700, color:'#5a3aaa' }}>{s.sessions_count}</div>
              <div style={{ fontSize:10, color:'rgba(30,16,64,0.35)' }}>sessions</div>
            </div>
            <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
          </div>
        ))}
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  )
}
