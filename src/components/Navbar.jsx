import { HomeIcon, UsersIcon, ClipboardIcon, CalendarIcon, SettingsIcon } from './Icons'

const tabs = [
  { Icon: HomeIcon, label: 'Home', key: 'dashboard' },
  { Icon: UsersIcon, label: 'Students', key: 'students' },
  { Icon: ClipboardIcon, label: 'Drills', key: 'drills' },
  { Icon: CalendarIcon, label: 'Schedule', key: 'schedule' },
  { Icon: SettingsIcon, label: 'Settings', key: 'settings' },
]

export default function Navbar({ current, setPage }) {
  return (
    <div style={{
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      /* tighter on mobile, slightly more on desktop */
      padding: '8px 0',
      paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      background: 'rgba(225,215,255,0.92)',
      WebkitBackdropFilter: 'blur(30px)',
      backdropFilter: 'blur(30px)',
      borderTop: '1px solid rgba(255,255,255,0.75)',
      boxShadow: '0 -4px 24px rgba(90,60,170,0.08)',
    }}>
      {tabs.map(({ Icon, label, key }) => {
        const active = current === key
        return (
          <button key={key} onClick={() => setPage(key)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '4px 10px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: active ? '#5a3aaa' : 'rgba(90,60,170,0.28)',
            fontFamily: 'inherit', transition: 'color 0.15s',
            minWidth: 0, flex: 1,
          }}>
            <Icon size={20} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}