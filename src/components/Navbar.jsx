import { signOut } from '../lib/auth'

export default function Navbar({ currentPage, setPage }) {
  const pages = [
    { icon: '🏠', label: 'Home', key: 'dashboard' },
    { icon: '👥', label: 'Students', key: 'students' },
    { icon: '🎯', label: 'Drills', key: 'drills' },
    { icon: '📅', label: 'Schedule', key: 'schedule' }
  ]

  const handleSignOut = async () => {
    await signOut()
    window.location.reload()
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-frost-bg/90 backdrop-blur-2xl border-t border-white/50 flex justify-around py-2 px-4 pb-[max(8px,env(safe-area-inset-bottom))] z-50">
      {pages.map((page) => (
        <button
          key={page.key}
          onClick={() => setPage(page.key)}
          className={`nav-btn ${currentPage === page.key ? 'active' : 'text-frost-text/30'}`}
        >
          <span className="text-xl">{page.icon}</span>
          <span className="text-xs">{page.label}</span>
        </button>
      ))}
      <button
        onClick={handleSignOut}
        className="nav-btn text-frost-text/30 hover:text-red-500 text-xs"
        title="Sign out"
      >
        <span>🚪</span>
        <span className="text-xs">Exit</span>
      </button>
    </nav>
  )
}
