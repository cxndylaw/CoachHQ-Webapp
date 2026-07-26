import { useState } from 'react'

const G = {
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

const CATS = [
  { name:'Footwork', n:8, icon:'👣' },
  { name:'Technique', n:12, icon:'🎾' },
  { name:'Smash', n:6, icon:'⚡' },
  { name:'Serve', n:5, icon:'🎯' },
  { name:'Speed & Stamina', n:9, icon:'💨' },
  { name:'Tactics', n:7, icon:'🧠' },
]

export default function Drills() {
  const [search, setSearch] = useState('')
  const filtered = CATS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ fontSize:36, fontWeight:800, color:'#1e1040', letterSpacing:'-0.5px', marginBottom:20 }}>Drills</div>

      <input placeholder="Search drills..." value={search} onChange={e=>setSearch(e.target.value)}
        style={{ width:'100%', padding:'12px 16px', borderRadius:14, border:'1px solid rgba(90,60,170,0.15)', background:'rgba(255,255,255,0.55)', WebkitBackdropFilter:'blur(10px)', backdropFilter:'blur(10px)', fontSize:14, color:'#1e1040', marginBottom:16, outline:'none', boxSizing:'border-box' }} />

      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {filtered.map((c,i) => (
          <div key={i} style={{ ...G, padding:'16px', display:'flex', alignItems:'center', gap:14, cursor:'pointer' }}>
            <span style={{ fontSize:26 }}>{c.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040', marginBottom:2 }}>{c.name}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)' }}>{c.n} drills</div>
            </div>
            <div style={{ fontSize:20, color:'rgba(90,60,170,0.3)' }}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}
