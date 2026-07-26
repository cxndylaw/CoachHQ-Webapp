import { useState } from 'react'
import { SearchIcon, ChevronRight, RunIcon, BoltIcon, TargetIcon, FlameIcon, ChessIcon } from './Icons'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

const TechIcon = (p) => (
  <svg width={p.size||22} height={p.size||22} viewBox="0 0 24 24" fill="none" stroke={p.color||'currentColor'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
)

function HeartIcon({ filled, size = 18, color = '#5a3aaa' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

function Stars({ n, max = 5, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? '#f59e0b' : 'none'} stroke={i < n ? '#f59e0b' : 'rgba(30,16,64,0.2)'} strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

const DRILLS = [
  {
    id: 1, name: 'Full Court Footwork', category: 'Footwork', difficulty: 4,
    tags: ['Footwork', 'Speed', '1-1 Training', 'Group Training'],
    description: 'Point to any of the six corners. Students will go to the side/corner that you point to.',
    duration: '5–10 minutes',
    reps: '30 x 4 (Intermediate–Advanced)\n20 x 4 (Beginner)',
    focus: ['Split Step', 'Get back to the middle faster', 'Go all the way to the corners'],
    equipment: ['Racquet', 'Cones (Optional)'],
    Icon: RunIcon,
  },
  {
    id: 2, name: 'Net Kill', category: 'Technique', difficulty: 3,
    tags: ['Technique', 'Net Play'],
    description: 'Player at net intercepts shuttle before it drops below tape height. Focus on fast reaction and flat contact.',
    duration: '10 minutes',
    reps: '20 x 3',
    focus: ['Tight net entry', 'Flat racquet angle', 'Quick recovery'],
    equipment: ['Racquet', 'Shuttle'],
    Icon: TechIcon,
  },
  {
    id: 3, name: 'Clear', category: 'Technique', difficulty: 2,
    tags: ['Technique', 'Beginner Friendly'],
    description: 'High defensive clear from baseline to baseline. Focus on full swing and follow-through.',
    duration: '10 minutes',
    reps: '15 x 4',
    focus: ['Full arm extension', 'Contact above head', 'Land shuttle deep'],
    equipment: ['Racquet', 'Shuttle'],
    Icon: TechIcon,
  },
  {
    id: 4, name: 'Smash and Kill', category: 'Smash', difficulty: 5,
    tags: ['Smash', 'Attack', 'Advanced'],
    description: 'Feeder at net, player jumps and smashes from mid-court, then rushes net to kill the return.',
    duration: '15 minutes',
    reps: '10 x 5',
    focus: ['Jump smash timing', 'Fast net recovery', 'Aggressive follow-up'],
    equipment: ['Racquet', 'Shuttle', 'Feeder'],
    Icon: BoltIcon,
  },
  {
    id: 5, name: 'Serve and Return', category: 'Serve', difficulty: 2,
    tags: ['Serve', 'Beginner Friendly'],
    description: 'Low serve to T, partner returns cross-court. Rotate after 10 serves.',
    duration: '10 minutes',
    reps: '10 x 4 per player',
    focus: ['Low flat serve', 'Consistent placement', 'Ready position after serve'],
    equipment: ['Racquet', 'Shuttle'],
    Icon: TargetIcon,
  },
  {
    id: 6, name: 'Shadow Footwork', category: 'Speed & Stamina', difficulty: 3,
    tags: ['Footwork', 'Speed', 'Stamina'],
    description: 'Move to all 6 corners in sequence without shuttle. Focus on split step and recovery between corners.',
    duration: '5 minutes',
    reps: '6 corners x 6 rounds',
    focus: ['Split step before each move', 'Explosive first step', 'Return to center'],
    equipment: ['None'],
    Icon: FlameIcon,
  },
  {
    id: 7, name: 'Tactics: 3-2-1', category: 'Tactics', difficulty: 4,
    tags: ['Tactics', 'Advanced', 'Group Training'],
    description: 'Attacker plays 3 smashes, lifts, then closes with 1 net kill. Defender must survive and counter.',
    duration: '20 minutes',
    reps: '5 rounds each side',
    focus: ['Shot selection under pressure', 'Transition from defense to attack', 'Court positioning'],
    equipment: ['Racquet', 'Shuttle'],
    Icon: ChessIcon,
  },
  {
    id: 8, name: 'Drop Shot Routine', category: 'Technique', difficulty: 3,
    tags: ['Technique', 'Net Play', '1-1 Training'],
    description: 'From rear court, play a steep drop to the net. Follow in and play net exchange.',
    duration: '10 minutes',
    reps: '20 x 3',
    focus: ['Disguise the drop', 'Steep angle', 'Follow into net quickly'],
    equipment: ['Racquet', 'Shuttle'],
    Icon: TechIcon,
  },
]

const CATS = ['All', 'Footwork', 'Technique', 'Smash', 'Serve', 'Speed & Stamina', 'Tactics']
const DIFF_LABEL = ['', 'Beginner', 'Beginner', 'Intermediate', 'Advanced', 'Expert']
const DIFF_COLOR = ['', '#16a34a', '#16a34a', '#3b82f6', '#5a3aaa', '#dc2626']

function DrillDetail({ drill, favourites, onToggleFav, onBack }) {
  const isFav = favourites.includes(drill.id)
  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a3aaa', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, padding: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        Drills
      </button>

      {/* Header card */}
      <div style={{ ...G, padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.3px', marginBottom: 6 }}>{drill.name}</div>
            <Stars n={drill.difficulty} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onToggleFav(drill.id)} style={{ width: 36, height: 36, borderRadius: '50%', background: isFav ? 'rgba(90,60,170,0.1)' : 'rgba(90,60,170,0.06)', border: '1.5px solid rgba(90,60,170,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <HeartIcon filled={isFav} size={16} />
            </button>
            <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(90,60,170,0.06)', border: '1.5px solid rgba(90,60,170,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="1.75" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {drill.tags.map(t => (
            <span key={t} style={{ fontSize: 11, fontWeight: 700, color: '#5a3aaa', background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.12)', padding: '3px 10px', borderRadius: 20 }}>{t}</span>
          ))}
          <span style={{ fontSize: 11, fontWeight: 700, color: DIFF_COLOR[drill.difficulty], background: `${DIFF_COLOR[drill.difficulty]}15`, border: `1.5px solid ${DIFF_COLOR[drill.difficulty]}30`, padding: '3px 10px', borderRadius: 20 }}>{DIFF_LABEL[drill.difficulty]}</span>
        </div>

        {/* Description */}
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Description</div>
        <div style={{ fontSize: 14, color: 'rgba(30,16,64,0.7)', lineHeight: 1.6, marginBottom: 16 }}>{drill.description}</div>

        {/* Info row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'rgba(90,60,170,0.05)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Est. Duration</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1e1040' }}>{drill.duration}</div>
          </div>
          <div style={{ background: 'rgba(90,60,170,0.05)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Recommended Reps</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e1040', whiteSpace: 'pre-line' }}>{drill.reps}</div>
          </div>
        </div>
      </div>

      {/* Focus points */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginLeft: 4 }}>Focus Points</div>
      <div style={{ ...G, padding: '4px 0', marginBottom: 12 }}>
        {drill.focus.map((f, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderBottom: i < arr.length - 1 ? '1px solid rgba(90,60,170,0.06)' : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5a3aaa', flexShrink: 0 }} />
            <div style={{ fontSize: 14, color: '#1e1040' }}>{f}</div>
          </div>
        ))}
      </div>

      {/* Equipment */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginLeft: 4 }}>Equipment Needed</div>
      <div style={{ ...G, padding: '4px 0', marginBottom: 12 }}>
        {drill.equipment.map((e, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderBottom: i < arr.length - 1 ? '1px solid rgba(90,60,170,0.06)' : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(90,60,170,0.4)', flexShrink: 0 }} />
            <div style={{ fontSize: 14, color: '#1e1040' }}>{e}</div>
          </div>
        ))}
      </div>

      {/* Use drill button */}
      <button style={{ width: '100%', padding: '14px', borderRadius: 16, background: '#5a3aaa', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 8 }}>
        Add to Session
      </button>
    </div>
  )
}

export default function Drills() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [showFavs, setShowFavs] = useState(false)
  const [favourites, setFavourites] = useState([1, 4])
  const [selected, setSelected] = useState(null)
  const [sort, setSort] = useState('name')

  const toggleFav = (id) => setFavourites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])

  if (selected) return <DrillDetail drill={selected} favourites={favourites} onToggleFav={toggleFav} onBack={() => setSelected(null)} />

  let filtered = DRILLS.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (cat === 'All' || d.category === cat) &&
    (!showFavs || favourites.includes(d.id))
  )
  if (sort === 'difficulty') filtered = [...filtered].sort((a, b) => b.difficulty - a.difficulty)
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px' }}>Drills</div>
        <button onClick={() => setShowFavs(!showFavs)} style={{
          display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 20,
          border: '1.5px solid rgba(90,60,170,0.2)',
          background: showFavs ? '#5a3aaa' : 'rgba(255,255,255,0.55)',
          color: showFavs ? '#fff' : '#5a3aaa',
          fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <HeartIcon filled={showFavs} size={14} color={showFavs ? '#fff' : '#5a3aaa'} />
          Favourites
        </button>
      </div>

      {/* Search + sort */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
            <SearchIcon size={15} color="rgba(90,60,170,0.4)" />
          </div>
          <input placeholder="Search drills..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{
          padding: '11px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)',
          background: 'rgba(255,255,255,0.55)', fontSize: 13, color: '#5a3aaa', fontWeight: 600,
          outline: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <option value="name">A–Z</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>

      {/* Category scroll */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: '7px 14px', borderRadius: 10, border: '1.5px solid rgba(90,60,170,0.15)',
            background: cat === c ? '#5a3aaa' : 'rgba(255,255,255,0.55)',
            color: cat === c ? '#fff' : '#5a3aaa',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>{c}</button>
        ))}
      </div>

      {/* Drill list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(30,16,64,0.35)', fontSize: 14 }}>No drills found</div>
        )}
        {filtered.map((d) => (
          <div key={d.id} onClick={() => setSelected(d)} style={{ ...G, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(90,60,170,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <d.Icon size={22} color="#5a3aaa" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1040', marginBottom: 4 }}>{d.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Stars n={d.difficulty} size={12} />
                <span style={{ fontSize: 11, color: DIFF_COLOR[d.difficulty], fontWeight: 600 }}>{DIFF_LABEL[d.difficulty]}</span>
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); toggleFav(d.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
              <HeartIcon filled={favourites.includes(d.id)} size={18} color={favourites.includes(d.id) ? '#5a3aaa' : 'rgba(90,60,170,0.25)'} />
            </button>
            <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
          </div>
        ))}
      </div>
    </div>
  )
}