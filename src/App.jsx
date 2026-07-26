import { useState, useEffect } from 'react'
import { onAuthStateChange, getSession } from './lib/auth'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Students from './components/Students'
import Drills from './components/Drills'
import Schedule from './components/Schedule'
import Navbar from './components/Navbar'
import './index.css'

const BG = 'linear-gradient(160deg,#e2ecff 0%,#ede8ff 45%,#e6f2ff 100%)'

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then(({ session }) => {
      if (session?.user) setUser(session.user)
      setLoading(false)
    })
    const { data: { subscription } } = onAuthStateChange(u => setUser(u))
    return () => subscription?.unsubscribe()
  }, [])

  if (loading) return (
    <div style={{ background: BG, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui,sans-serif' }}>
      <span style={{ color: '#5a3aaa' }}>Loading...</span>
    </div>
  )

  if (!user) return <Auth onSuccess={() => {}} />

  const pages = { dashboard: <Dashboard />, students: <Students />, drills: <Drills />, schedule: <Schedule /> }

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif', color: '#1e1040' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px 120px' }}>
        {pages[page]}
      </div>
      <Navbar current={page} setPage={setPage} />
    </div>
  )
}