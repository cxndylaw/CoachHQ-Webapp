import { useState, useEffect } from 'react'
import { SearchIcon, ChevronRight, CalendarIcon, ClockIcon, ClipboardIcon, UsersIcon, PencilIcon } from './Icons'
import { getStudents, addStudent, updateStudent, deleteStudent, getCurrentCoachId, addSession, getDrills } from '../lib/supabase-db'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

function AddStudentModal({ onClose, onAdd, coachId }) {
  const [form, setForm] = useState({ name: '', level: 'Beginner', age: '', dob: '', contact: '', address: '' })
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!form.name || !form.contact) {
      alert('Name and contact required')
      return
    }
    setLoading(true)
    await onAdd(form)
    setLoading(false)
    onClose()
  }

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
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1040', marginBottom: 20 }}>Add Student</div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Name *</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Level</label>
            <select value={form.level} onChange={e => setForm({...form, level: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', cursor: 'pointer' }}>
              <option>Beginner</option>
              <option>Inter</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Age</label>
            <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="Age" style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>DOB</label>
          <input value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} placeholder="DD/MM/YYYY" style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Contact *</label>
          <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} placeholder="Phone or email" style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Address</label>
          <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Full address" style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)', color: '#5a3aaa', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={handleAdd} disabled={loading} style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#5a3aaa', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Adding...' : 'Add Student'}</button>
        </div>
      </div>
    </div>
  )
}

function ScheduleSessionModal({ student, onClose, onSchedule, coachId }) {
  const [form, setForm] = useState({ day: 'Monday', time: '18:00', drill_id: '' })
  const [drills, setDrills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDrills = async () => {
      try {
        const data = await getDrills(coachId)
        setDrills(data)
      } catch (error) {
        console.error('Error loading drills:', error)
      } finally {
        setLoading(false)
      }
    }
    loadDrills()
  }, [coachId])

  const handleSchedule = async () => {
    if (!form.drill_id) {
      alert('Please select a drill')
      return
    }
    await onSchedule({
      student_id: student.id,
      student_name: student.name,
      day: form.day,
      time: form.time,
      drill_id: form.drill_id,
    })
    onClose()
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1040', marginBottom: 20 }}>
          Schedule Session for {student.name}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Day</label>
          <select value={form.day} onChange={e => setForm({...form, day: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }}>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Time</label>
          <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Drill *</label>
          {loading ? (
            <div style={{ color: 'rgba(30,16,64,0.4)', fontSize: 14 }}>Loading drills...</div>
          ) : (
            <select value={form.drill_id} onChange={e => setForm({...form, drill_id: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }}>
              <option value="">Select a drill...</option>
              {drills.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '12px', borderRadius: 12, background: 'rgba(90,60,170,0.1)', border: '1.5px solid rgba(90,60,170,0.15)', color: '#5a3aaa', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={handleSchedule} style={{ padding: '12px', borderRadius: 12, background: '#5a3aaa', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Schedule</button>
        </div>
      </div>
    </div>
  )
}

function StudentDetailView({ student, onBack, onEdit, onDelete, onScheduleSession, coachId }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Delete ${student.name}? This cannot be undone.`)) return
    setIsDeleting(true)
    await onDelete(student.id)
    setIsDeleting(false)
  }

  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a3aaa', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, padding: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        Back
      </button>

      <div style={{ ...G, padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(90,60,170,0.12)', border: '2px solid rgba(90,60,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#5a3aaa', flexShrink: 0 }}>
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1040', marginBottom: 4 }}>{student.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.4)' }}>{student.sessions_count} sessions</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <button onClick={() => onScheduleSession(student)} style={{ padding: '10px', borderRadius: 12, background: 'rgba(90,183,182,0.08)', border: '1.5px solid rgba(90,183,182,0.15)', color: '#06b6d4', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <CalendarIcon size={14} color="#06b6d4" /> Schedule
          </button>
          <button onClick={() => onEdit(student)} style={{ padding: '10px', borderRadius: 12, background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)', color: '#5a3aaa', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <PencilIcon size={14} color="#5a3aaa" /> Edit
          </button>
          <button onClick={handleDelete} disabled={isDeleting} style={{ padding: '10px', borderRadius: 12, background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.15)', color: '#dc2626', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: isDeleting ? 0.6 : 1 }}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div style={{ ...G, padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Level</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#5a3aaa' }}>{student.level}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Age</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1e1040' }}>{student.age} years old</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Contact</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1e1040' }}>{student.contact}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Address</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1e1040' }}>{student.address || 'Not provided'}</div>
        </div>
      </div>

      <div style={{ ...G, padding: 16, marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Skill Ratings</div>
        {['technique_rating', 'footwork_rating', 'speed_rating', 'stamina_rating', 'tactics_rating'].map(skill => {
          const skillName = skill.replace('_rating', '').charAt(0).toUpperCase() + skill.replace('_rating', '').slice(1)
          const rating = student[skill] || 0
          return (
            <div key={skill} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid rgba(90,60,170,0.1)' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#1e1040' }}>{skillName}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#5a3aaa' }}>{'⭐'.repeat(rating)}{rating === 0 ? 'None' : ''}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Students({ onNavigateToSchedule }) {
  const [search, setSearch] = useState('')
  const [students, setStudents] = useState([])
  const [selected, setSelected] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [coachId, setCoachId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [studentToSchedule, setStudentToSchedule] = useState(null)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    setLoading(true)
    try {
      const cId = await getCurrentCoachId()
      setCoachId(cId)
      const data = await getStudents(cId)
      setStudents(data)
    } catch (error) {
      console.error('Error loading students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddStudent = async (data) => {
    if (coachId) {
      await addStudent(coachId, data)
      await loadStudents()
    }
  }

  const handleUpdateStudent = async (student) => {
    const newName = prompt('Update name:', student.name)
    if (!newName) return
    if (coachId) {
      await updateStudent(coachId, student.id, { name: newName })
      await loadStudents()
      setSelected(null)
    }
  }

  const handleDeleteStudent = async (studentId) => {
    if (coachId) {
      await deleteStudent(coachId, studentId)
      await loadStudents()
      setSelected(null)
    }
  }

  const handleScheduleSession = (student) => {
    setStudentToSchedule(student)
  }

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  if (selected) {
    return (
      <StudentDetailView 
        student={selected} 
        onBack={() => setSelected(null)} 
        onEdit={handleUpdateStudent}
        onDelete={handleDeleteStudent}
        onScheduleSession={handleScheduleSession}
        coachId={coachId}
      />
    )
  }

  const handleScheduleSessionConfirm = async (sessionData) => {
    if (coachId) {
      try {
        await addSession(coachId, sessionData)
        alert(`Session scheduled for ${studentToSchedule.name}!`)
        setStudentToSchedule(null)
      } catch (error) {
        console.error('Error scheduling session:', error)
        alert('Failed to schedule session')
      }
    }
  }

  return (
    <div>
      {showAddModal && coachId && (
        <AddStudentModal onClose={() => setShowAddModal(false)} onAdd={handleAddStudent} coachId={coachId} />
      )}

      {studentToSchedule && coachId && (
        <ScheduleSessionModal 
          student={studentToSchedule}
          onClose={() => setStudentToSchedule(null)}
          onSchedule={handleScheduleSessionConfirm}
          coachId={coachId}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px' }}>Students</div>
        <button onClick={() => setShowAddModal(true)} style={{ width: 40, height: 40, borderRadius: '50%', background: '#5a3aaa', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontWeight: 800, fontSize: 20 }}>+</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ position: 'relative' }}>
          <SearchIcon size={18} color="rgba(30,16,64,0.3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search students..." 
            style={{ width: '100%', padding: '11px 12px 11px 40px', borderRadius: 12, border: '1.5px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'rgba(30,16,64,0.4)' }}>Loading students...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'rgba(30,16,64,0.4)' }}>No students yet. Add your first one!</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(s => (
            <div 
              key={s.id} 
              onClick={() => setSelected(s)}
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
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(90,60,170,0.1)', border: '1.5px solid rgba(90,60,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#5a3aaa', flexShrink: 0 }}>
                {s.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1040', marginBottom: 3 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: s.level === 'Advanced' ? '#5a3aaa' : s.level === 'Inter' ? '#3b82f6' : '#16a34a', background: s.level === 'Advanced' ? 'rgba(90,60,170,0.1)' : s.level === 'Inter' ? 'rgba(59,130,246,0.1)' : 'rgba(22,163,74,0.1)', padding: '2px 8px', borderRadius: 12 }}>{s.level}</span>
                  {s.sessions_count} sessions
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
