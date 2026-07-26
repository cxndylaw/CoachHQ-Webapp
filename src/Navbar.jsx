import { signOut } from '../lib/auth'

const tabs = [
  { icon: '🏠', label: 'Home', key: 'dashboard' },
  { icon: '👥', label: 'Students', key: 'students' },
  { icon: '🎯', label: 'Drills', key: 'drills' },
  { icon: '📅', label: 'Schedule', key: 'schedule' },
]

export default function Navbar({ current, setPage }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 0 20px',
      background: 'rgba(225,215,255,0.88)',
      WebkitBackdropFilter: 'blur(30px)',
      backdropFilter: 'blur(30px)',
      borderTop: '1px solid rgba(255,255,255,0.75)',
      boxShadow: '0 -4px 24px rgba(90,60,170,0.08)',
    }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => setPage(t.key)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          padding: '4px 16px', background: 'none', border: 'none', cursor: 'pointer',
          color: current === t.key ? '#5a3aaa' : 'rgba(90,60,170,0.28)',
          fontFamily: 'inherit',
        }}>
          <span style={{ fontSize: 22 }}>{t.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.02em' }}>{t.label}</span>
        </button>
      ))}
      <button onClick={async () => { await signOut(); window.location.reload() }} style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        padding: '4px 16px', background: 'none', border: 'none', cursor: 'pointer',
        color: 'rgba(90,60,170,0.28)', fontFamily: 'inherit',
      }}>
        <span style={{ fontSize: 22 }}>🚪</span>
        <span style={{ fontSize: 10, fontWeight: 700 }}>Exit</span>
      </button>
    </div>
  )
}