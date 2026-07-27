import { useState } from 'react'
import { ClockIcon, CheckIcon } from './Icons'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

function formatDuration(secs) {
  if (secs == null) return null
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} onClick={() => onChange(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill={i <= value ? '#f59e0b' : 'none'}
            stroke={i <= value ? '#f59e0b' : 'rgba(30,16,64,0.2)'}
            strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

const DRILL_OPTIONS = [
  { id: 1, name: 'Full Court Footwork', category: 'Footwork' },
  { id: 2, name: 'Net Kill', category: 'Technique' },
  { id: 3, name: 'Clear', category: 'Technique' },
  { id: 4, name: 'Smash and Kill', category: 'Smash' },
  { id: 5, name: 'Serve and Return', category: 'Serve' },
  { id: 6, name: 'Shadow Footwork', category: 'Speed & Stamina' },
  { id: 7, name: 'Tactics: 3-2-1', category: 'Tactics' },
  { id: 8, name: 'Drop Shot Routine', category: 'Technique' },
]

const LEVEL_COLOR = {
  Advanced: '#5a3aaa', Inter: '#3b82f6', Beginner: '#16a34a'
}

export default function SessionPlan({ student, session, onBack, onStartSession, onEndSession, isActive, elapsed, onViewStudent }) {
  const [drills, setDrills] = useState([
    { id: 1, name: 'Full Court Footwork', category: 'Footwork', done: false, rating: 0 },
    { id: 2, name: 'Net Kill', category: 'Technique', done: false, rating: 0 },
  ])
  const [notes, setNotes] = useState('')
  const [sessionRating, setSessionRating] = useState(0)
  const [adding, setAdding] = useState(false)
  const [saved, setSaved] = useState(false)
  const [endConfirm, setEndConfirm] = useState(false)

  const toggleDrill = (id) => setDrills(ds => ds.map(d => d.id === id ? { ...d, done: !d.done } : d))
  const rateDrill = (id, r) => setDrills(ds => ds.map(d => d.id === id ? { ...d, rating: r } : d))
  const removeDrill = (id) => setDrills(ds => ds.filter(d => d.id !== id))
  const addDrill = (drill) => {
    if (!drills.find(d => d.id === drill.id)) setDrills(ds => [...ds, { ...drill, done: false, rating: 0 }])
    setAdding(false)
  }

  const doneDrills = drills.filter(d => d.done).length
  const progress = drills.length > 0 ? (doneDrills / drills.length) * 100 : 0
  const initials = student.name.split(' ').map(n => n[0]).join('')
  const lc = LEVEL_COLOR[student.level] || '#5a3aaa'

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a3aaa', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, padding: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        Home
      </button>

      {/* Student header — clickable to view details */}
      <div style={{ marginBottom: 12, borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 20px rgba(90,60,170,0.07)', cursor: onViewStudent ? 'pointer' : 'default' }} onClick={onViewStudent}>
        <div style={{
          padding: 20,
          background: isActive ? 'linear-gradient(135deg, #5a3aaa, #7c5cc7)' : 'rgba(255,255,255,0.55)',
          border: isActive ? 'none' : '1px solid rgba(255,255,255,0.85)',
          WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)',
          transition: 'background 0.2s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(90,60,170,0.12)', border: `2px solid ${isActive ? 'rgba(255,255,255,0.3)' : 'rgba(90,60,170,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: isActive ? '#fff' : '#5a3aaa', flexShrink: 0 }}>
              {initials}
            </div>
            <div style={{ flex: 1, cursor: 'pointer' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: isActive ? '#fff' : '#1e1040', marginBottom: 4 }}>{student.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.9)' : lc, background: isActive ? 'rgba(255,255,255,0.2)' : `${lc}15`, border: `1.5px solid ${isActive ? 'rgba(255,255,255,0.3)' : `${lc}30`}`, padding: '3px 10px', borderRadius: 20 }}>{student.level}</span>
                <span style={{ fontSize: 12, color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(30,16,64,0.45)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ClockIcon size={12} color={isActive ? 'rgba(255,255,255,0.7)' : 'rgba(30,16,64,0.45)'} />{session?.time}
                </span>
                {onViewStudent && <span style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(30,16,64,0.3)', fontStyle: 'italic' }}>tap to view profile</span>}
              </div>
            </div>
            {isActive && elapsed != null && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>{formatDuration(elapsed)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', fontSize: 10, fontWeight: 700, color: '#4ade80' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', animation: 'pulse 1.2s infinite' }} />
                  LIVE
                </div>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {drills.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Progress</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? '#fff' : '#5a3aaa' }}>{doneDrills}/{drills.length} drills</span>
              </div>
              <div style={{ height: 6, background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(90,60,170,0.1)', borderRadius: 99 }}>
                <div style={{ height: '100%', width: `${progress}%`, background: isActive ? '#fff' : '#5a3aaa', borderRadius: 99, transition: 'width 0.4s ease' }} />
              </div>
            </div>
          )}
        </div>

        {/* End session row */}
        {isActive && (
          !endConfirm ? (
            <button onClick={() => setEndConfirm(true)} style={{ width: '100%', padding: '11px', background: 'rgba(239,68,68,0.08)', border: 'none', borderTop: '1px solid rgba(239,68,68,0.12)', color: '#dc2626', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l6 6M15 9l-6 6"/></svg>
              End Session
            </button>
          ) : (
            <div style={{ display: 'flex', borderTop: '1px solid rgba(239,68,68,0.12)' }}>
              <button onClick={onEndSession} style={{ flex: 1, padding: '11px', background: 'rgba(239,68,68,0.08)', border: 'none', borderRight: '1px solid rgba(239,68,68,0.12)', color: '#dc2626', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                End ({formatDuration(elapsed)})
              </button>
              <button onClick={() => setEndConfirm(false)} style={{ flex: 1, padding: '11px', background: 'none', border: 'none', color: 'rgba(30,16,64,0.4)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Keep going
              </button>
            </div>
          )
        )}
      </div>

      {/* Drills */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginLeft: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Drills</div>
        <button onClick={() => setAdding(!adding)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#5a3aaa', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Add drill
        </button>
      </div>

      {adding && (
        <div style={{ ...G, padding: '4px 0', marginBottom: 12 }}>
          {DRILL_OPTIONS.filter(d => !drills.find(x => x.id === d.id)).map((d, i, arr) => (
            <div key={d.id} onClick={() => addDrill(d)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < arr.length - 1 ? '1px solid rgba(90,60,170,0.06)' : 'none', cursor: 'pointer' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e1040' }}>{d.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.4)' }}>{d.category}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </div>
          ))}
          {DRILL_OPTIONS.filter(d => !drills.find(x => x.id === d.id)).length === 0 && (
            <div style={{ padding: 16, textAlign: 'center', color: 'rgba(30,16,64,0.35)', fontSize: 13 }}>All drills added</div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {drills.length === 0 && (
          <div style={{ ...G, padding: 24, textAlign: 'center', color: 'rgba(30,16,64,0.35)', fontSize: 14 }}>No drills added yet.</div>
        )}
        {drills.map((d) => (
          <div key={d.id} style={{ ...G, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => toggleDrill(d.id)} style={{ width: 24, height: 24, borderRadius: 8, flexShrink: 0, cursor: 'pointer', background: d.done ? '#5a3aaa' : 'transparent', border: `2px solid ${d.done ? '#5a3aaa' : 'rgba(90,60,170,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {d.done && <CheckIcon size={13} color="#fff" />}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: d.done ? 'rgba(30,16,64,0.4)' : '#1e1040', textDecoration: d.done ? 'line-through' : 'none' }}>{d.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(30,16,64,0.4)' }}>{d.category}</div>
              </div>
              <button onClick={() => removeDrill(d.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'rgba(30,16,64,0.25)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            {d.done && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(90,60,170,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: 'rgba(30,16,64,0.4)', fontWeight: 600 }}>Performance</span>
                <StarRating value={d.rating} onChange={r => rateDrill(d.id, r)} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Session rating */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginLeft: 4 }}>Overall Rating</div>
      <div style={{ ...G, padding: '16px 18px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
        <StarRating value={sessionRating} onChange={setSessionRating} />
        {sessionRating > 0 && <span style={{ fontSize: 12, color: 'rgba(30,16,64,0.45)' }}>{['','Poor','Fair','Good','Great','Excellent'][sessionRating]}</span>}
      </div>

      {/* Notes */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginLeft: 4 }}>Session Notes</div>
      <div style={{ ...G, padding: 16, marginBottom: 16 }}>
        <textarea value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="Write notes about today's session — what worked, what to improve, things to remember..."
          style={{ width: '100%', minHeight: 120, background: 'transparent', border: 'none', resize: 'none', fontSize: 14, color: '#1e1040', fontFamily: 'inherit', lineHeight: 1.6, outline: 'none', boxSizing: 'border-box' }} />
        <div style={{ fontSize: 11, color: 'rgba(30,16,64,0.3)', textAlign: 'right', marginTop: 4 }}>{notes.length} chars</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        {!isActive && (
          <button onClick={onStartSession} style={{ flex: 1, padding: '14px', borderRadius: 16, background: '#16a34a', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            Start Session
          </button>
        )}
        <button onClick={() => { setSaved(true); setTimeout(() => onBack(), 600) }} style={{ flex: 1, padding: '14px', borderRadius: 16, background: '#5a3aaa', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {saved ? <><CheckIcon size={16} color="#fff" /> Saved!</> : 'Save Plan'}
        </button>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  )
}