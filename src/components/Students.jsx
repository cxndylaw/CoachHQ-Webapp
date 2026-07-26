import { useState } from 'react'

const G = {
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

const AV = {
  width:42, height:42, borderRadius:'50%',
  background:'rgba(90,60,170,0.1)', border:'1.5px solid rgba(90,60,170,0.2)',
  display:'flex', alignItems:'center', justifyContent:'center',
  fontSize:12, fontWeight:700, color:'#5a3aaa', flexShrink:0,
}

const STUDENTS = [
  { name:'Lee Smith', sessions:24, level:'Advanced', last:'Today' },
  { name:'Jordan Davis', sessions:18, level:'Inter', last:'Yesterday' },
  { name:'Alex Thompson', sessions:16, level:'Advanced', last:'2 days ago' },
  { name:'Sam Martinez', sessions:12, level:'Beginner', last:'3 days ago' },
  { name:'Rachel Park', sessions:11, level:'Inter', last:'Today' },
]

export default function Students() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('All')

  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (active === 'All' || s.level === active)
  )

  return (
    <div>
      <div style={{ fontSize:36, fontWeight:800, color:'#1e1040', letterSpacing:'-0.5px', marginBottom:20 }}>Students</div>

      <input placeholder="Search students..." value={search} onChange={e=>setSearch(e.target.value)}
        style={{ width:'100%', padding:'12px 16px', borderRadius:14, border:'1px solid rgba(90,60,170,0.15)', background:'rgba(255,255,255,0.55)', WebkitBackdropFilter:'blur(10px)', backdropFilter:'blur(10px)', fontSize:14, color:'#1e1040', marginBottom:12, outline:'none', boxSizing:'border-box' }} />

      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {['All','Beginner','Inter','Advanced'].map(f => (
          <button key={f} onClick={()=>setActive(f)} style={{
            padding:'7px 14px', borderRadius:10, border:'1.5px solid rgba(90,60,170,0.15)',
            background: active===f ? '#5a3aaa' : 'rgba(255,255,255,0.55)',
            color: active===f ? '#fff' : '#5a3aaa',
            fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {filtered.map((s,i) => (
          <div key={i} style={{ ...G, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={AV}>{s.name.split(' ').map(n=>n[0]).join('')}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040', marginBottom:2 }}>{s.name}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)' }}>{s.sessions} sessions · {s.level}</div>
            </div>
            <div style={{ fontSize:11, color:'rgba(30,16,64,0.3)' }}>{s.last}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
