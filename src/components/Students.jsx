import { useState } from 'react'
import { SearchIcon, ChevronRight, CalendarIcon, ClockIcon, ClipboardIcon, UsersIcon } from './Icons'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

const STUDENTS = [
  {
    id: 1, name: 'Lee Smith', level: 'Advanced', sessions: 24, age: 22,
    dob: '12/03/2002', contact: '0412 345 678', address: '5 Pine St, Sydney NSW 2000',
    skills: { Technique: 4, Footwork: 5, Speed: 4, Stamina: 3, Tactics: 4 },
    nextSession: 'Mon 5:00–6:00 pm', lastSeen: 'Today',
    upcomingSessions: [
      { day: 'Monday', time: '5:00–6:00 pm', drill: 'Full Court Footwork' },
      { day: 'Wednesday', time: '5:00–6:00 pm', drill: 'Smash Technique' },
      { day: 'Friday', time: '6:00–7:00 pm', drill: 'Net Play' },
    ]
  },
  {
    id: 2, name: 'Jordan Davis', level: 'Inter', sessions: 18, age: 19,
    dob: '04/07/2005', contact: '0421 234 567', address: '12 Oak Ave, Melbourne VIC 3000',
    skills: { Technique: 3, Footwork: 3, Speed: 4, Stamina: 3, Tactics: 2 },
    nextSession: 'Tue 4:00–5:00 pm', lastSeen: 'Yesterday',
    upcomingSessions: [
      { day: 'Tuesday', time: '4:00–5:00 pm', drill: 'Drop Shot' },
      { day: 'Thursday', time: '5:00–6:00 pm', drill: 'Serve Practice' },
    ]
  },
  {
    id: 3, name: 'Alex Thompson', level: 'Advanced', sessions: 16, age: 25,
    dob: '19/11/1999', contact: '0433 456 789', address: '8 Elm Rd, Brisbane QLD 4000',
    skills: { Technique: 5, Footwork: 4, Speed: 5, Stamina: 4, Tactics: 4 },
    nextSession: 'Wed 6:00–7:00 pm', lastSeen: '2 days ago',
    upcomingSessions: [
      { day: 'Wednesday', time: '6:00–7:00 pm', drill: 'Advanced Tactics' },
    ]
  },
  {
    id: 4, name: 'Sam Martinez', level: 'Beginner', sessions: 12, age: 16,
    dob: '22/05/2008', contact: '0444 567 890', address: '3 Birch Ln, Perth WA 6000',
    skills: { Technique: 2, Footwork: 2, Speed: 3, Stamina: 2, Tactics: 1 },
    nextSession: 'Thu 4:00–5:00 pm', lastSeen: '3 days ago',
    upcomingSessions: [
      { day: 'Thursday', time: '4:00–5:00 pm', drill: 'Net Play Basics' },
      { day: 'Saturday', time: '10:00–11:00 am', drill: 'Footwork Intro' },
    ]
  },
  {
    id: 5, name: 'Rachel Park', level: 'Inter', sessions: 11, age: 20,
    dob: '08/09/2004', contact: '0455 678 901', address: '21 Cedar St, Adelaide SA 5000',
    skills: { Technique: 3, Footwork: 4, Speed: 3, Stamina: 3, Tactics: 3 },
    nextSession: 'Fri 5:00–6:00 pm', lastSeen: 'Today',
    upcomingSessions: [
      { day: 'Friday', time: '5:00–6:00 pm', drill: 'Serve Practice' },
    ]
  },
]

const LEVEL_COLOR = {
  Advanced: { bg: 'rgba(90,60,170,0.1)', color: '#5a3aaa', border: 'rgba(90,60,170,0.2)' },
  Inter: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'rgba(59,130,246,0.2)' },
  Beginner: { bg: 'rgba(34,197,94,0.1)', color: '#16a34a', border: 'rgba(34,197,94,0.2)' },
}

function Stars({ n, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? '#5a3aaa' : 'none'} stroke="#5a3aaa" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function StudentDetail({ student, onBack }) {
  const lc = LEVEL_COLOR[student.level]
  return (
    <div>
      {/* Back button */}
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a3aaa', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, padding: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        Students
      </button>

      {/* Profile header */}
      <div style={{ ...G, padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(90,60,170,0.12)', border: '2px solid rgba(90,60,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#5a3aaa', flexShrink: 0 }}>
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1040', marginBottom: 4 }}>{student.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: lc.color, background: lc.bg, border: `1.5px solid ${lc.border}`, padding: '3px 10px', borderRadius: 20 }}>{student.level}</span>
              <span style={{ fontSize: 11, color: 'rgba(30,16,64,0.45)', display: 'flex', alignItems: 'center', gap: 3 }}>
                <ClipboardIcon size={12} color="rgba(30,16,64,0.4)" /> {student.sessions} sessions
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.45)', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div>Age: {student.age}</div>
              <div>DOB: {student.dob}</div>
              <div>Contact: {student.contact}</div>
              <div>Address: {student.address}</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {[
            { label: 'Edit', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
            { label: 'Delete', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>, danger: true },
            { label: 'Contact', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
          ].map(b => (
            <button key={b.label} style={{
              flex: 1, padding: '9px 8px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              fontSize: 12, fontWeight: 700,
              background: b.danger ? 'rgba(239,68,68,0.08)' : 'rgba(90,60,170,0.08)',
              border: `1.5px solid ${b.danger ? 'rgba(239,68,68,0.15)' : 'rgba(90,60,170,0.15)'}`,
              color: b.danger ? '#ef4444' : '#5a3aaa',
            }}>{b.icon}{b.label}</button>
          ))}
        </div>
      </div>

      {/* Skill ratings */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginLeft: 4 }}>Skill Rating</div>
      <div style={{ ...G, padding: '4px 0', marginBottom: 12 }}>
        {Object.entries(student.skills).map(([skill, rating], i, arr) => (
          <div key={skill} style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', borderBottom: i < arr.length - 1 ? '1px solid rgba(90,60,170,0.06)' : 'none' }}>
            <div style={{ width: 100, fontSize: 14, fontWeight: 500, color: '#1e1040' }}>{skill}</div>
            <Stars n={rating} />
          </div>
        ))}
      </div>

      {/* Upcoming sessions */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginLeft: 4 }}>Sessions</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {student.upcomingSessions.map((s, i) => (
          <div key={i} style={{ ...G, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#5a3aaa', display: 'flex', alignItems: 'center', gap: 5 }}>
                <ClockIcon size={13} color="#5a3aaa" />{s.day} · {s.time}
              </div>
              <button style={{ fontSize: 11, fontWeight: 700, color: '#5a3aaa', background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)', padding: '3px 10px', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit' }}>Plan</button>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(30,16,64,0.5)' }}>{s.drill}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Students() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)

  if (selected) return <StudentDetail student={selected} onBack={() => setSelected(null)} />

  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (active === 'All' || s.level === active)
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px' }}>Students</div>
        <button style={{ width: 36, height: 36, borderRadius: '50%', background: '#5a3aaa', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: 12 }}>
        <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
          <SearchIcon size={16} color="rgba(90,60,170,0.4)" />
        </div>
        <input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 14, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['All', 'Beginner', 'Inter', 'Advanced'].map(f => (
          <button key={f} onClick={() => setActive(f)} style={{
            padding: '7px 14px', borderRadius: 10, border: '1.5px solid rgba(90,60,170,0.15)',
            background: active === f ? '#5a3aaa' : 'rgba(255,255,255,0.55)',
            color: active === f ? '#fff' : '#5a3aaa',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((s) => {
          const lc = LEVEL_COLOR[s.level]
          return (
            <div key={s.id} onClick={() => setSelected(s)} style={{ ...G, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(90,60,170,0.1)', border: '1.5px solid rgba(90,60,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#5a3aaa', flexShrink: 0 }}>
                {s.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1040', marginBottom: 3 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: lc.color, fontWeight: 600 }}>{s.level}</span>
                  · {s.sessions} sessions · {s.lastSeen}
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(30,16,64,0.3)', marginRight: 4 }}>
                <div style={{ fontSize: 12, color: '#5a3aaa', fontWeight: 600, textAlign: 'right', marginBottom: 2 }}>{s.nextSession.split(' ')[0]}</div>
                <div style={{ fontSize: 11, color: 'rgba(30,16,64,0.35)', textAlign: 'right' }}>{s.nextSession.split(' ').slice(1).join(' ')}</div>
              </div>
              <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
            </div>
          )
        })}
      </div>
    </div>
  )
}