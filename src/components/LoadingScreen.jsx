import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 400)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg,#e2ecff 0%,#ede8ff 45%,#e6f2ff 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui,-apple-system,sans-serif',
    }}>
      {/* Logo mark */}
      <div style={{ marginBottom: 24, position: 'relative' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 22,
          background: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(90,60,170,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Shuttlecock icon */}
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="18" r="3" />
            <path d="M12 15V9" />
            <path d="M9 9c0-1.5 1-3 3-5 2 2 3 3.5 3 5" />
            <path d="M7.5 10.5c-1 0-2.5-.5-3.5-2 1.5-.5 3-.5 5 .5" />
            <path d="M16.5 10.5c1 0 2.5-.5 3.5-2-1.5-.5-3-.5-5 .5" />
          </svg>
        </div>

        {/* Pulse ring */}
        <div style={{
          position: 'absolute', inset: -8,
          borderRadius: 30,
          border: '2px solid rgba(90,60,170,0.2)',
          animation: 'pulse 1.8s ease-in-out infinite',
        }} />
      </div>

      <div style={{ fontSize: 26, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px', marginBottom: 6 }}>coachHQ</div>
      <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 40 }}>Badminton Coaching</div>

      {/* Loading bar */}
      <div style={{ width: 120, height: 3, background: 'rgba(90,60,170,0.12)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: '#5a3aaa',
          animation: 'slide 1.2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes slide {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
