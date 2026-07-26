import { useState, useEffect, useRef } from 'react'
import { ClockIcon, ChevronRight, CalendarIcon, ClipboardCheckIcon, UsersIcon, ClipboardIcon, CalendarStatsIcon } from './Icons'
import SessionPlan from './SessionPlan'

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

function parseTime(timeStr) {
  // Parse "10:30 AM" into today's Date
  const [time, meridiem] = timeStr.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (meridiem === 'PM' && h !== 12) h += 12
  if (meridiem === 'AM' && h === 12) h = 0
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d
}

// For demo: sessions start very soon (10s, 60s, 120s from now)
function getMockSessions() {
  const now = new Date()
  const fmt = (d) => {
    let h = d.getHours(), m = d.getMinutes()
    const mer = h >= 12 ? 'PM' : 'AM'
    if (h > 12) h -= 12
    if (h === 0) h = 12
    return `${h}:${String(m).padStart(2,'0')} ${mer}`
  }
  const t1 = new Date(now.getTime() + 10000)   // 10s from now
  const t2 = new Date(now.getTime() + 90000)   // 90s from now
  const t3 = new Date(now.getTime() + 180000)  // 3min from now
  return [
    { name: 'Alex Thompson', drill: 'Footwork drill', level: 'Advanced', time: fmt(t1) },
    { name: 'Jordan Davis', drill: 'Smash technique', level: 'Inter', time: fmt(t2) },
    { name: 'Sam Martinez', drill: 'Net play', level: 'Beginner', time: fmt(t3) },
  ]
}

const SESSIONS_DATA = getMockSessions()
const WARN_BEFORE_SECS = 60 // show alert 60s before

export default function Dashboard({ coachName }) {
  const [viewingSession, setViewingSession] = useState(null)
  const [activeSession, setActiveSession] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [sessionStartedAt, setSessionStartedAt] = useState(null)
  const [alert, setAlert] = useState(null) // { session, secondsUntil }
  const [dismissedAlerts, setDismissedAlerts] = useState([])
  const [endConfirm, setEndConfirm] = useState(false)
  const intervalRef = useRef(null)
  const alertCheckRef = useRef(null)

  const today = new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
  const stats = [
    { v: '3', l: "Today's sessions", Icon: ClipboardCheckIcon },
    { v: '12', l: 'Students', Icon: UsersIcon },
    { v: '48', l: 'Drills', Icon: ClipboardIcon },
    { v: '18', l: 'This week', Icon: CalendarStatsIcon },
  ]

  // Session elapsed timer
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

  // Alert checker — runs every second
  useEffect(() => {
    alertCheckRef.current = setInterval(() => {
      if (activeSession) return // don't alert if session already running
      const now = Date.now()
      for (const s of SESSIONS_DATA) {
        const sessionTime = parseTime(s.time).getTime()
        const secsUntil = Math.floor((sessionTime - now) / 1000)
        const key = s.name + s.time
        if (secsUntil <= WARN_BEFORE_SECS && secsUntil > -30 && !dismissedAlerts.includes(key) && !alert) {
          setAlert({ session: s, secondsUntil: secsUntil, key })
          break
        }
      }
    }, 1000)
    return () => clearInterval(alertCheckRef.current)
  }, [activeSession, dismissedAlerts, alert])

  // Update alert countdown
  useEffect(() => {
    if (!alert) return
    const t = setInterval(() => {
      const secsUntil = Math.floor((parseTime(alert.session.time).getTime() - Date.now()) / 1000)
      setAlert(a => a ? { ...a, secondsUntil: secsUntil } : null)
    }, 1000)
    return () => clearInterval(t)
  }, [alert?.key])

  const handleStartSession = (session) => {
    setActiveSession(session)
    setSessionStartedAt(Date.now())
    setAlert(null)
    setViewingSession(null)
    setEndConfirm(false)
  }

  const handleEndSession = () => {
    setActiveSession(null)
    setSessionStartedAt(null)
    setElapsed(0)
    setEndConfirm(false)
  }

  const dismissAlert = () => {
    if (alert) setDismissedAlerts(d => [...d, alert.key])
    setAlert(null)
  }

  if (viewingSession) {
    return (
      <SessionPlan
        student={{ name: viewingSession.name, level: viewingSession.level }}
        session={{ time: viewingSession.time, drills: [], notes: '' }}
        isActive={activeSession?.name === viewingSession.name}
        elapsed={activeSession?.name === viewingSession.name ? elapsed : null}
        onBack={() => setViewingSession(null)}
        onStartSession={() => handleStartSession(viewingSession)}
        onEndSession={handleEndSession}
      />
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{getGreeting()}</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px', marginBottom: 6 }}>{coachName}</div>
        <div style={{ fontSize: 13, color: 'rgba(30,16,64,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <CalendarIcon size={14} color="rgba(30,16,64,0.4)" /> {today}
        </div>
      </div>

      {/* ── ALERT POPUP ── */}
      {alert && (
        <div style={{
          marginBottom: 16, borderRadius: 20, padding: '16px 18px',
          background: alert.secondsUntil <= 0
            ? 'linear-gradient(135deg, #16a34a, #22c55e)'
            : 'linear-gradient(135deg, #f59e0b, #fbbf24)',
          boxShadow: `0 4px 24px ${alert.secondsUntil <= 0 ? 'rgba(34,197,94,0.35)' : 'rgba(245,158,11,0.35)'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
              {alert.session.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>
                {alert.secondsUntil <= 0 ? '🎯 Session starting now!' : `⏰ Starting in ${alert.secondsUntil}s`}
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{alert.session.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 1 }}>{alert.session.time} · {alert.session.drill}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => handleStartSession(alert.session)} style={{
              flex: 2, padding: '10px', borderRadius: 12, background: 'rgba(255,255,255,0.95)',
              color: alert.secondsUntil <= 0 ? '#16a34a' : '#b45309',
              fontSize: 13, fontWeight: 800, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {alert.secondsUntil <= 0 ? 'Start Session' : 'Start Now'}
            </button>
            <button onClick={() => setViewingSession(alert.session)} style={{
              flex: 1, padding: '10px', borderRadius: 12, background: 'rgba(255,255,255,0.2)',
              color: '#fff', fontSize: 13, fontWeight: 700, border: '1.5px solid rgba(255,255,255,0.3)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              View Plan
            </button>
            <button onClick={dismissAlert} style={{
              padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.15)',
              color: '#fff', fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            }}>✕</button>
          </div>
        </div>
      )}

      {/* ── ACTIVE SESSION BANNER ── */}
      {activeSession && (
        <div style={{ marginBottom: 16, borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(90,60,170,0.25)' }}>
          {/* Main banner */}
          <div
            onClick={() => setViewingSession(activeSession)}
            style={{
              padding: '16px 18px', cursor: 'pointer',
              background: 'linear-gradient(135deg, #5a3aaa, #7c5cc7)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
              {activeSession.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Now Training</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>{activeSession.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{activeSession.drill}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              {/* Live timer */}
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
                {formatDuration(elapsed)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#4ade80', background: 'rgba(74,222,128,0.15)', padding: '3px 8px', borderRadius: 20 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', animation: 'pulse 1.2s infinite' }} />
                LIVE
              </div>
            </div>
          </div>

          {/* End session bar */}
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

      {/* Bar chart */}
      <div style={{ ...G, padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sessions this week</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#5a3aaa' }}>18 total</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
          {[42,58,35,88,65,95,50].map((h,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6, height:'100%', justifyContent:'flex-end' }}>
              <div style={{ width:'100%', height:h+'%', borderRadius:'6px 6px 0 0', background: h>80 ? 'rgba(90,60,170,0.6)' : 'rgba(90,60,170,0.15)' }} />
              <div style={{ fontSize:10, color:'rgba(30,16,64,0.3)', fontWeight:600 }}>{'MTWTFSS'[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
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
        <button style={{ background:'none', border:'none', color:'#5a3aaa', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3 }}>
          See all <ChevronRight size={14} color="#5a3aaa" />
        </button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
        {SESSIONS_DATA.map((s,i) => {
          const isLive = activeSession?.name === s.name
          return (
            <div key={i} onClick={() => setViewingSession(s)} style={{ ...G, padding:'14px 16px', display:'flex', alignItems:'center', gap:12, cursor:'pointer', border: isLive ? '1.5px solid rgba(90,60,170,0.35)' : G.border }}>
              <div style={{ ...AV, background: isLive ? 'rgba(90,60,170,0.18)' : AV.background }}>
                {s.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:600, color:'#1e1040', marginBottom:3 }}>{s.name}</div>
                <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)', display:'flex', alignItems:'center', gap:4 }}>
                  <ClockIcon size={12} color="rgba(30,16,64,0.4)" />{s.time} · {s.drill}
                </div>
              </div>
              {isLive
                ? <div style={{ fontSize:10, fontWeight:700, color:'#16a34a', background:'rgba(34,197,94,0.1)', border:'1.5px solid rgba(34,197,94,0.2)', padding:'4px 10px', borderRadius:20 }}>Live</div>
                : <div style={{ fontSize:11, fontWeight:700, color:'#5a3aaa', background:'rgba(90,60,170,0.08)', border:'1.5px solid rgba(90,60,170,0.15)', padding:'4px 10px', borderRadius:20 }}>Plan</div>
              }
              <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
            </div>
          )
        })}
      </div>

      {/* Top students */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'rgba(30,16,64,0.38)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Top students</div>
        <button style={{ background:'none', border:'none', color:'#5a3aaa', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3 }}>
          See all <ChevronRight size={14} color="#5a3aaa" />
        </button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {[{name:'Lee Smith',n:24,level:'Advanced'},{name:'Alex Thompson',n:16,level:'Advanced'},{name:'Rachel Park',n:11,level:'Inter'}].map((s,i) => (
          <div key={i} style={{ ...G, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={AV}>{s.name.split(' ').map(n=>n[0]).join('')}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040' }}>{s.name}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)' }}>{s.level}</div>
            </div>
            <div style={{ textAlign:'right', marginRight:4 }}>
              <div style={{ fontSize:15, fontWeight:700, color:'#5a3aaa' }}>{s.n}</div>
              <div style={{ fontSize:10, color:'rgba(30,16,64,0.35)' }}>sessions</div>
            </div>
            <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  )
}