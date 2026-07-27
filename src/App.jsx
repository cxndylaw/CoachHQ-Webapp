import { useState, useEffect, useRef } from 'react'
import { onAuthStateChange, getSession } from './lib/auth'
import { getProfile } from './lib/supabase'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Students from './components/Students'
import Drills from './components/Drills'
import Schedule from './components/Schedule'
import SessionPlan from './components/SessionPlan'
import Settings from './components/Settings'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import { STUDENTS_DB } from './lib/studentData'
import './index.css'

const BG = 'linear-gradient(160deg,#e2ecff 0%,#ede8ff 45%,#e6f2ff 100%)'
const PAGE_KEY = 'coachHQ_page'

export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [page, setPage] = useState(() => localStorage.getItem(PAGE_KEY) || 'dashboard')
  const [loading, setLoading] = useState(true)
  const [viewingSession, setViewingSession] = useState(null)

  const scrollRef = useRef(null)

  const navigateTo = (p) => {
    setPage(p)
    localStorage.setItem(PAGE_KEY, p)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }

  useEffect(() => {
    getSession().then(async ({ session }) => {
      if (session?.user) {
        setUser(session.user)
        const p = await getProfile(session.user.id)
        setProfile(p)
      }
      setLoading(false)
    })
    const { data: { subscription } } = onAuthStateChange(async (u) => {
      setUser(u)
      if (u) {
        const p = await getProfile(u.id)
        setProfile(p)
      }
    })
    return () => subscription?.unsubscribe()
  }, [])

  if (loading) return <LoadingScreen />
  if (!user) return <Auth onSuccess={() => window.location.reload()} />

  const coachName = profile?.name || user?.email?.split('@')[0] || 'Coach'

  // If viewing a session, show session plan overlay
  if (viewingSession) {
    const student = STUDENTS_DB.find(s => s.id === viewingSession.studentId)
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: BG,
        fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif',
        color: '#1e1040',
      }}>
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px 40px' }}>
            <SessionPlan
              student={student}
              session={viewingSession}
              onBack={() => setViewingSession(null)}
              onStartSession={() => {}}
              onEndSession={() => {}}
              onViewStudent={() => {}}
            />
          </div>
        </div>
        <Navbar current={page} setPage={navigateTo} />
      </div>
    )
  }

  const pages = {
    dashboard: <Dashboard coachName={coachName} />,
    students: <Students />,
    drills: <Drills />,
    schedule: <Schedule onViewSession={setViewingSession} />,
    settings: <Settings user={user} profile={profile} coachName={coachName} onNameUpdate={(name) => setProfile(p => ({ ...p, name }))} />,
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: BG,
      fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif',
      color: '#1e1040',
    }}>
      {/* Scrollable content area — nav never moves */}
      <div ref={scrollRef} style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px 40px' }}>
          {pages[page]}
        </div>
      </div>

      {/* Nav always pinned at bottom */}
      <Navbar current={page} setPage={navigateTo} />
    </div>
  )
}