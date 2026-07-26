import { useState } from 'react'
import { ClockIcon } from './Icons'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

const SESSIONS = [
  { time:'10:30 AM', student:'Alex Thompson', drill:'Footwork drill', level:'Advanced', dur:'60 min' },
  { time:'11:45 AM', student:'Jordan Davis', drill:'Smash technique', level:'Inter', dur:'45 min' },
  { time:'2:00 PM', student:'Sam Martinez', drill:'Net play basics', level:'Beginner', dur:'50 min' },
  { time:'3:30 PM', student:'Lee Smith', drill:'Advanced tactics', level:'Advanced', dur:'60 min' },
  { time:'5:00 PM', student:'Rachel Park', drill:'Serve practice', level:'Inter', dur:'40 min' },
]

export default function Schedule() {
  const [filter, setFilter] = useState('Today')

  return (
    <div>
      <div style={{ fontSize:36, fontWeight:800, color:'#1e1040', letterSpacing:'-0.5px', marginBottom:20 }}>Schedule</div>
      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {['Today','Tomorrow','Next 7 days'].map(f => (
          <button key={f} onClick={()=>setFilter(f)} style={{
            padding:'7px 14px', borderRadius:10, border:'1.5px solid rgba(90,60,170,0.15)',
            background: filter===f ? '#5a3aaa' : 'rgba(255,255,255,0.55)',
            color: filter===f ? '#fff' : '#5a3aaa',
            fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap',
          }}>{f}</button>
        ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {SESSIONS.map((s,i) => (
          <div key={i} style={{ ...G, padding:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
              <ClockIcon size={14} color="#5a3aaa" />
              <span style={{ fontSize:12, fontWeight:800, color:'#5a3aaa' }}>{s.time}</span>
            </div>
            <div style={{ borderLeft:'2px solid rgba(90,60,170,0.15)', paddingLeft:12 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#1e1040', marginBottom:2 }}>{s.student}</div>
              <div style={{ fontSize:12, color:'rgba(30,16,64,0.4)', marginBottom:8 }}>{s.drill}</div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:11, fontWeight:700, color:'#5a3aaa', background:'rgba(90,60,170,0.08)', border:'1.5px solid rgba(90,60,170,0.15)', padding:'3px 10px', borderRadius:20 }}>{s.level}</span>
                <span style={{ fontSize:11, color:'rgba(30,16,64,0.35)', display:'flex', alignItems:'center', gap:4 }}>
                  <ClockIcon size={11} color="rgba(30,16,64,0.35)" />{s.dur}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}