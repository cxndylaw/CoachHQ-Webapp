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

const TechniqueIcon = (p) => (
  <svg width={p.size||22} height={p.size||22} viewBox="0 0 24 24" fill="none" stroke={p.color||'currentColor'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
)

const CATS = [
  { name:'Footwork', n:8, Icon: RunIcon },
  { name:'Technique', n:12, Icon: TechniqueIcon },
  { name:'Smash', n:6, Icon: BoltIcon },
  { name:'Serve', n:5, Icon: TargetIcon },
  { name:'Speed & Stamina', n:9, Icon: FlameIcon },
  { name:'Tactics', n:7, Icon: ChessIcon },
]

export default function Drills() {
  const [search, setSearch] = useState('')
  const filtered = CATS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ fontSize:36, fontWeight:800, color:'#1e1040', letterSpacing:'-0.5px', marginBottom:20 }}>Drills</div>
      <div style={{ position:'relative', marginBottom:16 }}>
        <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}>
          <SearchIcon size={16} color="rgba(90,60,170,0.4)" />
        </div>
        <input placeholder="Search drills..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{ width:'100%', padding:'12px 16px 12px 40px', borderRadius:14, border:'1px solid rgba(90,60,170,0.15)', background:'rgba(255,255,255,0.55)', fontSize:14, color:'#1e1040', outline:'none', boxSizing:'border-box' }} />
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {filtered.map(({ name, n, Icon }, i) => (
          <div key={i} style={{ ...G, padding:'16px', display:'flex', alignItems:'center', gap:14, cursor:'pointer' }}>
            <div style={{ width:44, height:44, borderRadius:12, background:'rgba(90,60,170,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon size={22} color="#5a3aaa" />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040', marginBottom:2 }}>{name}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)' }}>{n} drills</div>
            </div>
            <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
          </div>
        ))}
      </div>
    </div>
  )
}