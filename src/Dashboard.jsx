const G = {
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
  padding: 20,
  marginBottom: 12,
}

const AV = {
  width: 42, height: 42, borderRadius: '50%',
  background: 'rgba(90,60,170,0.1)',
  border: '1.5px solid rgba(90,60,170,0.2)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 12, fontWeight: 700, color: '#5a3aaa', flexShrink: 0,
}

const PILL = {
  fontSize: 11, fontWeight: 700, color: '#5a3aaa',
  background: 'rgba(90,60,170,0.08)',
  border: '1.5px solid rgba(90,60,170,0.15)',
  padding: '4px 12px', borderRadius: 20,
}

export default function Dashboard() {
  const sessions = [
    { name: 'Alex Thompson', drill: 'Footwork drill', level: 'Advanced' },
    { name: 'Jordan Davis', drill: 'Smash technique', level: 'Inter' },
    { name: 'Sam Martinez', drill: 'Net play', level: 'Beginner' },
  ]
  const top = [
    { name: 'Lee Smith', n: 24 },
    { name: 'Alex Thompson', n: 16 },
    { name: 'Rachel Park', n: 11 },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Good morning</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px' }}>Coach Sarah</div>
      </div>

      {/* Bar chart */}
      <div style={G}>
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
        {[["3","TODAY'S SESSIONS"],["12","STUDENTS"],["48","DRILLS"],["18","THIS WEEK"]].map(([v,l]) => (
          <div key={l} style={{ ...G, marginBottom:0, padding:'20px 18px' }}>
            <div style={{ fontSize:36, fontWeight:800, color:'#2e1870', letterSpacing:'-1px', lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:10, fontWeight:700, color:'rgba(30,16,64,0.35)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:8 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div style={{ fontSize:11, fontWeight:700, color:'rgba(30,16,64,0.38)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:10 }}>Upcoming sessions</div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
        {sessions.map((s,i) => (
          <div key={i} style={{ ...G, marginBottom:0, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={AV}>{s.name.split(' ').map(n=>n[0]).join('')}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040', marginBottom:2 }}>{s.name}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)' }}>{s.drill}</div>
            </div>
            <div style={PILL}>{s.level}</div>
          </div>
        ))}
      </div>

      {/* Top students */}
      <div style={{ fontSize:11, fontWeight:700, color:'rgba(30,16,64,0.38)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:10 }}>Top students</div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {top.map((s,i) => (
          <div key={i} style={{ ...G, marginBottom:0, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={AV}>{s.name.split(' ').map(n=>n[0]).join('')}</div>
            <div style={{ flex:1, fontSize:15, fontWeight:600, color:'#1e1040' }}>{s.name}</div>
            <div style={{ fontSize:12, color:'rgba(30,16,64,0.35)' }}>{s.n} sessions</div>
            <div style={{ fontSize:20, color:'rgba(90,60,170,0.3)' }}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}