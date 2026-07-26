import { ClockIcon, ChevronRight, CalendarIcon, ClipboardCheckIcon, UsersIcon, ClipboardIcon, CalendarStatsIcon } from './Icons'

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

const PILL = {
  fontSize: 11, fontWeight: 700, color: '#5a3aaa',
  background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)',
  padding: '4px 12px', borderRadius: 20,
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard({ coachName }) {
  const sessions = [
    { name: 'Alex Thompson', drill: 'Footwork drill', level: 'Advanced', time: '10:30 AM' },
    { name: 'Jordan Davis', drill: 'Smash technique', level: 'Inter', time: '11:45 AM' },
    { name: 'Sam Martinez', drill: 'Net play', level: 'Beginner', time: '2:00 PM' },
  ]
  const top = [
    { name: 'Lee Smith', n: 24, level: 'Advanced' },
    { name: 'Alex Thompson', n: 16, level: 'Advanced' },
    { name: 'Rachel Park', n: 11, level: 'Inter' },
  ]
  const today = new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
  const stats = [
    { v: '3', l: "Today's sessions", Icon: ClipboardCheckIcon },
    { v: '12', l: 'Students', Icon: UsersIcon },
    { v: '48', l: 'Drills', Icon: ClipboardIcon },
    { v: '18', l: 'This week', Icon: CalendarStatsIcon },
  ]

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{getGreeting()}</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px', marginBottom: 6 }}>{coachName}</div>
        <div style={{ fontSize: 13, color: 'rgba(30,16,64,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <CalendarIcon size={14} color="rgba(30,16,64,0.4)" /> {today}
        </div>
      </div>

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

      {/* Upcoming */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'rgba(30,16,64,0.38)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Upcoming sessions</div>
        <button style={{ background:'none', border:'none', color:'#5a3aaa', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3 }}>
          See all <ChevronRight size={14} color="#5a3aaa" />
        </button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
        {sessions.map((s,i) => (
          <div key={i} style={{ ...G, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={AV}>{s.name.split(' ').map(n=>n[0]).join('')}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040', marginBottom:3 }}>{s.name}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)', display:'flex', alignItems:'center', gap:4 }}>
                <ClockIcon size={12} color="rgba(30,16,64,0.4)" />{s.time} · {s.drill}
              </div>
            </div>
            <div style={PILL}>{s.level}</div>
          </div>
        ))}
      </div>

      {/* Top students */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'rgba(30,16,64,0.38)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Top students</div>
        <button style={{ background:'none', border:'none', color:'#5a3aaa', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3 }}>
          See all <ChevronRight size={14} color="#5a3aaa" />
        </button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {top.map((s,i) => (
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
    </div>
  )
}