import { useState, useEffect } from 'react'
import { SearchIcon, ChevronRight, PencilIcon } from './Icons'
import { getDrills, addDrill, updateDrill, deleteDrill, getCurrentCoachId } from '../lib/supabase-db'
import BadmintonCourt from './BadmintonCourt'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

function StarPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} onClick={() => onChange(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="32" height="32" viewBox="0 0 24 24"
            fill={i <= value ? '#f59e0b' : 'none'}
            stroke={i <= value ? '#f59e0b' : 'rgba(30,16,64,0.15)'}
            strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function AddDrillModal({ onClose, onAdd, coachId }) {
  const [form, setForm] = useState({ name: '', category: 'Footwork', difficulty: 3, description: '', focus_points: '' })
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!form.name) {
      alert('Drill name required')
      return
    }
    setLoading(true)
    const focusArray = form.focus_points.split('\n').filter(p => p.trim())
    await onAdd({ ...form, focus_points: focusArray })
    setLoading(false)
    onClose()
  }

  const categories = ['Footwork', 'Technique', 'Smash', 'Serve', 'Speed & Stamina', 'Tactics', 'Net Play']

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999,
      padding: 20,
    }}>
      <div style={{
        width: '100%', maxWidth: 440, background: 'linear-gradient(160deg,#e2ecff 0%,#ede8ff 45%,#e6f2ff 100%)',
        borderRadius: 24, padding: '24px', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(90,60,170,0.3)',
      }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1040', marginBottom: 20 }}>Add Drill</div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Name *</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Drill name" style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', cursor: 'pointer' }}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Difficulty</label>
            <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(30,16,64,0.5)' }}>{'⭐'.repeat(form.difficulty)} Level {form.difficulty}</div>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Difficulty (Click Stars)</label>
          <StarPicker value={form.difficulty} onChange={difficulty => setForm({...form, difficulty})} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Description</label>
          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="What's this drill about?" style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box', minHeight: 80, resize: 'vertical' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Focus Points (one per line)</label>
          <textarea value={form.focus_points} onChange={e => setForm({...form, focus_points: e.target.value})} placeholder="• Quick footwork&#10;• Anticipation&#10;• Reaction time" style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box', minHeight: 80, resize: 'vertical' }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)', color: '#5a3aaa', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={handleAdd} disabled={loading} style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#5a3aaa', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Adding...' : 'Add Drill'}</button>
        </div>
      </div>
    </div>
  )
}

function DrillDetailView({ drill, onBack, onEdit, onDelete, coachId }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCourt, setShowCourt] = useState(false)
  const [courtData, setCourtData] = useState(drill.court_data || null)

  const handleDelete = async () => {
    if (!confirm(`Delete ${drill.name}? This cannot be undone.`)) return
    setIsDeleting(true)
    await onDelete(drill.id)
    setIsDeleting(false)
  }

  const handleSaveCourt = async (newCourtData) => {
    setCourtData(newCourtData)
    // Save to Supabase
    await updateDrill(coachId, drill.id, { court_data: newCourtData })
    setShowCourt(false)
  }

  if (showCourt) {
    return (
      <div>
        <button onClick={() => setShowCourt(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a3aaa', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
          Back to Drill
        </button>
        <BadmintonCourt courtData={courtData} onSave={handleSaveCourt} />
      </div>
    )
  }

  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a3aaa', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, padding: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        Back
      </button>

      <div style={{ ...G, padding: 20, marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1040', marginBottom: 8 }}>{drill.name}</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '4px 10px', borderRadius: 20 }}>{'⭐'.repeat(drill.difficulty)}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#5a3aaa', background: 'rgba(90,60,170,0.1)', padding: '4px 10px', borderRadius: 20 }}>{drill.category}</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(30,16,64,0.6)', lineHeight: '1.5' }}>{drill.description || 'No description'}</p>
        </div>

        {drill.focus_points && drill.focus_points.length > 0 && (
          <div style={{ marginBottom: 16, paddingTop: 16, borderTop: '1px solid rgba(90,60,170,0.1)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Focus Points</div>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'rgba(30,16,64,0.6)', fontSize: 13 }}>
              {(Array.isArray(drill.focus_points) ? drill.focus_points : drill.focus_points.split('\n')).map((point, i) => (
                <li key={i} style={{ marginBottom: 6 }}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {courtData && (
          <div style={{ marginBottom: 16, paddingTop: 16, borderTop: '1px solid rgba(90,60,170,0.1)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Court Tactics Diagram</div>
            <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.6)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <span>📊 {courtData.players?.reduce((sum, p) => sum + p.points.length, 0) || 0} player positions • {courtData.lines?.length || 0} movement paths</span>
              <button onClick={() => setShowCourt(true)} style={{ padding: '6px 12px', borderRadius: 10, background: 'rgba(90,60,170,0.12)', border: '1.5px solid rgba(90,60,170,0.2)', color: '#5a3aaa', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <button onClick={() => setShowCourt(true)} style={{ padding: '10px', borderRadius: 12, background: 'rgba(59,130,246,0.08)', border: '1.5px solid rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            🎾 Court
          </button>
          <button onClick={() => onEdit(drill)} style={{ padding: '10px', borderRadius: 12, background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)', color: '#5a3aaa', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <PencilIcon size={14} color="#5a3aaa" /> Edit
          </button>
          <button onClick={handleDelete} disabled={isDeleting} style={{ padding: '10px', borderRadius: 12, background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.15)', color: '#dc2626', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: isDeleting ? 0.6 : 1 }}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Drills() {
  const [search, setSearch] = useState('')
  const [drills, setDrills] = useState([])
  const [selected, setSelected] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [coachId, setCoachId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    loadDrills()
  }, [])

  const loadDrills = async () => {
    setLoading(true)
    try {
      const cId = await getCurrentCoachId()
      setCoachId(cId)
      const data = await getDrills(cId)
      setDrills(data)
    } catch (error) {
      console.error('Error loading drills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDrill = async (data) => {
    if (coachId) {
      await addDrill(coachId, data)
      await loadDrills()
    }
  }

  const handleUpdateDrill = async (drill) => {
    const newName = prompt('Update drill name:', drill.name)
    if (!newName) return
    if (coachId) {
      await updateDrill(coachId, drill.id, { name: newName })
      await loadDrills()
      setSelected(null)
    }
  }

  const handleDeleteDrill = async (drillId) => {
    if (coachId) {
      await deleteDrill(coachId, drillId)
      await loadDrills()
      setSelected(null)
    }
  }

  // Extract main categories (before the " - ")
  const mainCategories = [...new Set(drills.map(d => d.category ? d.category.split(' - ')[0] : null).filter(Boolean))].sort()
  
  const filtered = drills.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || d.category?.startsWith(selectedCategory)
    return matchesSearch && matchesCategory
  })

  if (selected) {
    return (
      <DrillDetailView 
        drill={selected} 
        onBack={() => setSelected(null)} 
        onEdit={handleUpdateDrill}
        onDelete={handleDeleteDrill}
        coachId={coachId}
      />
    )
  }

  return (
    <div>
      {showAddModal && coachId && (
        <AddDrillModal onClose={() => setShowAddModal(false)} onAdd={handleAddDrill} coachId={coachId} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px' }}>Drills</div>
        <button onClick={() => setShowAddModal(true)} style={{ width: 40, height: 40, borderRadius: '50%', background: '#5a3aaa', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontWeight: 800, fontSize: 20 }}>+</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <SearchIcon size={18} color="rgba(30,16,64,0.3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search drills..." 
            style={{ width: '100%', padding: '11px 12px 11px 40px', borderRadius: 12, border: '1.5px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>

        {/* Category Filter Dropdown */}
        <div style={{ marginBottom: 12 }}>
          <select 
            value={selectedCategory || ''} 
            onChange={e => setSelectedCategory(e.target.value || null)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 12,
              border: '1.5px solid rgba(90,60,170,0.15)',
              background: 'rgba(255,255,255,0.55)',
              fontSize: 14,
              fontFamily: 'inherit',
              color: '#1e1040',
              outline: 'none',
              boxSizing: 'border-box',
              cursor: 'pointer'
            }}
          >
            <option value="">All Drills</option>
            {mainCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'rgba(30,16,64,0.4)' }}>Loading drills...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'rgba(30,16,64,0.4)' }}>No drills yet. Create your first one!</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(d => (
            <div 
              key={d.id} 
              onClick={() => setSelected(d)}
              style={{
                ...G, 
                padding: '14px 16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 12, 
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(90,60,170,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.55)'}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1040', marginBottom: 6 }}>{d.name}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b' }}>{'⭐'.repeat(d.difficulty)}</span>
                  <span style={{ fontSize: 12, color: 'rgba(30,16,64,0.4)', background: 'rgba(90,60,170,0.08)', padding: '2px 8px', borderRadius: 12, fontWeight: 500 }}>{d.category}</span>
                </div>
              </div>
              <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}