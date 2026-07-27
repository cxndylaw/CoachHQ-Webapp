import { useState, useEffect } from 'react'
import { ChevronRight, ClockIcon } from './Icons'
import { getSessionsForWeek, getAvailabilitiesByDay, updateSession, addSession, deleteSession, addAvailability, deleteAvailability, getDrills, getStudents, getCurrentCoachId } from '../lib/supabase-db'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function EditSessionModal({ session, drills, onClose, onSave, coachId }) {
  const [time, setTime] = useState(session.time)
  const [editMode, setEditMode] = useState('single')
  const [drillId, setDrillId] = useState(session.drill_id)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await onSave({ ...session, time, drill_id: drillId, editMode })
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
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1040', marginBottom: 4 }}>Edit Session</div>
        <div style={{ fontSize: 13, color: 'rgba(30,16,64,0.5)', marginBottom: 20 }}>{session.student_name}</div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Time</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Drill</label>
          <select value={drillId || ''} onChange={e => setDrillId(Number(e.target.value))} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040', cursor: 'pointer' }}>
            <option value="">Select drill...</option>
            {drills.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        {session.recurring && (
          <div style={{ marginBottom: 16, background: 'rgba(90,60,170,0.08)', border: '1px solid rgba(90,60,170,0.1)', borderRadius: 12, padding: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Apply Changes</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={() => setEditMode('single')} style={{
                padding: '10px 12px', borderRadius: 10, border: editMode === 'single' ? '2px solid #5a3aaa' : '1.5px solid rgba(90,60,170,0.2)',
                background: editMode === 'single' ? 'rgba(90,60,170,0.08)' : 'transparent',
                color: '#1e1040', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>This week only</button>
              <button onClick={() => setEditMode('all')} style={{
                padding: '10px 12px', borderRadius: 10, border: editMode === 'all' ? '2px solid #5a3aaa' : '1.5px solid rgba(90,60,170,0.2)',
                background: editMode === 'all' ? 'rgba(90,60,170,0.08)' : 'transparent',
                color: '#1e1040', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>All future sessions</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)', color: '#5a3aaa', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={handleSave} disabled={loading} style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#5a3aaa', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  )
}

function AvailabilityModal({ day, onClose, onAdd, coachId }) {
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('12:00')
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    setLoading(true)
    await onAdd({ day, start_time: startTime, end_time: endTime })
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
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1040', marginBottom: 20 }}>Add Availability</div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>From</label>
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>To</label>
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(90,60,170,0.15)', background: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: 'inherit', color: '#1e1040' }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)', color: '#5a3aaa', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={handleAdd} disabled={loading} style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#5a3aaa', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Adding...' : 'Add'}</button>
        </div>
      </div>
    </div>
  )
}

export default function Schedule({ onViewSession }) {
  const [weekData, setWeekData] = useState([])
  const [drills, setDrills] = useState([])
  const [students, setStudents] = useState([])
  const [editingSession, setEditingSession] = useState(null)
  const [showAvailModal, setShowAvailModal] = useState(null)
  const [showAvailabilities, setShowAvailabilities] = useState(false)
  const [showAllDays, setShowAllDays] = useState(true)
  const [loading, setLoading] = useState(true)
  const [coachId, setCoachId] = useState(null)
  const [availabilities, setAvailabilities] = useState({})

  const daysToShow = showAllDays ? weekData : weekData.filter(d => d.sessions.length > 0)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const cId = await getCurrentCoachId()
      setCoachId(cId)
      
      const [weekSessions, drilsData, studentsData] = await Promise.all([
        getSessionsForWeek(cId),
        getDrills(cId),
        getStudents(cId)
      ])
      
      setWeekData(weekSessions)
      setDrills(drilsData)
      setStudents(studentsData)
      
      // Load availabilities for all days
      const availMap = {}
      for (const day of DAYS) {
        availMap[day] = await getAvailabilitiesByDay(cId, day)
      }
      setAvailabilities(availMap)
    } catch (error) {
      console.error('Error loading schedule:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveEdit = async (updated) => {
    if (coachId) {
      await updateSession(coachId, updated.id, {
        time: updated.time,
        drill_id: updated.drill_id,
        updated_at: new Date()
      })
      await loadData()
    }
    setEditingSession(null)
  }

  const handleAddAvailability = async (avail) => {
    if (coachId) {
      await addAvailability(coachId, avail)
      setAvailabilities(prev => ({
        ...prev,
        [avail.day]: [...(prev[avail.day] || []), avail]
      }))
    }
    setShowAvailModal(null)
  }

  const handleDeleteAvailability = async (availId, day) => {
    if (coachId) {
      await deleteAvailability(coachId, availId)
      setAvailabilities(prev => ({
        ...prev,
        [day]: prev[day].filter(a => a.id !== availId)
      }))
    }
  }

  const getLevelColor = (studentId) => {
    const student = students.find(s => s.id === studentId)
    const colors = { Advanced: '#5a3aaa', Inter: '#3b82f6', Beginner: '#16a34a' }
    return colors[student?.level] || '#5a3aaa'
  }

  if (loading) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px' }}>Schedule</div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(90,60,170,0.1)', animation: 'pulse 2s infinite' }} />
        </div>

        <div style={{ marginBottom: 16, height: 44, borderRadius: 12, background: 'rgba(90,60,170,0.08)', animation: 'pulse 2s infinite' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ ...G, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: `pulse 2s infinite ${i * 0.1}s` }}>
              <div style={{ background: 'rgba(90,60,170,0.08)', padding: '12px 16px', borderBottom: '1px solid rgba(90,60,170,0.1)', height: 60 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, padding: 12, minHeight: 200 }}>
                {[...Array(2)].map((_, j) => (
                  <div key={j} style={{ background: 'rgba(90,60,170,0.08)', borderRadius: 12, height: 60 }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ ...G, padding: 16, height: 80, background: 'rgba(90,60,170,0.08)', animation: 'pulse 2s infinite' }} />
          <div style={{ ...G, padding: 16, height: 80, background: 'rgba(90,60,170,0.08)', animation: 'pulse 2s infinite' }} />
        </div>

        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
      </div>
    )
  }

  return (
    <div>
      {editingSession && coachId && (
        <EditSessionModal session={editingSession} drills={drills} onClose={() => setEditingSession(null)} onSave={handleSaveEdit} coachId={coachId} />
      )}

      {showAvailModal && coachId && (
        <AvailabilityModal day={showAvailModal} onClose={() => setShowAvailModal(null)} onAdd={handleAddAvailability} coachId={coachId} />
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 8, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px' }}>Schedule</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowAllDays(!showAllDays)} style={{
            padding: '8px 14px', borderRadius: 12, background: !showAllDays ? '#5a3aaa' : 'rgba(90,60,170,0.08)',
            border: '1.5px solid rgba(90,60,170,0.15)', color: !showAllDays ? '#fff' : '#5a3aaa',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {showAllDays ? 'All Days' : 'Coaching Only'}
          </button>
          <button onClick={() => setShowAvailabilities(!showAvailabilities)} style={{
            padding: '8px 14px', borderRadius: 12, background: showAvailabilities ? '#5a3aaa' : 'rgba(90,60,170,0.08)',
            border: '1.5px solid rgba(90,60,170,0.15)', color: showAvailabilities ? '#fff' : '#5a3aaa',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {showAvailabilities ? 'Hide' : 'Show'} Availabilities
          </button>
        </div>
      </div>

      {/* Weekly view */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
        {daysToShow.map(({ day, sessions }) => (
          <div key={day} style={{ ...G, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Day header */}
            <div style={{ background: 'rgba(90,60,170,0.08)', padding: '12px 16px', borderBottom: '1px solid rgba(90,60,170,0.1)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#5a3aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{day}</div>
              <div style={{ fontSize: 11, color: 'rgba(30,16,64,0.4)' }}>{sessions.length} session{sessions.length !== 1 ? 's' : ''}</div>
            </div>

            {/* Sessions list */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, padding: 12, minHeight: 200 }}>
              {sessions.map(session => {
                const student = students.find(s => s.id === session.student_id)
                const initials = session.student_name?.split(' ').map(n => n[0]).join('') || '?'
                return (
                  <div key={session.id} onClick={() => onViewSession?.(session)} style={{
                    background: 'rgba(90,60,170,0.08)', borderRadius: 12, padding: 12, cursor: 'pointer',
                    border: '1.5px solid rgba(90,60,170,0.15)', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(90,60,170,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(90,60,170,0.08)'}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', background: `${getLevelColor(session.student_id)}20`,
                      border: `2px solid ${getLevelColor(session.student_id)}40`, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 11, fontWeight: 700, color: getLevelColor(session.student_id), flexShrink: 0,
                    }}>
                      {initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1e1040', marginBottom: 2 }}>{session.student_name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(30,16,64,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <ClockIcon size={10} color="rgba(30,16,64,0.4)" />{session.time}
                      </div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setEditingSession(session) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'rgba(30,16,64,0.3)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                  </div>
                )
              })}

              {sessions.length === 0 && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(30,16,64,0.2)', fontSize: 12, fontWeight: 500 }}>
                  No sessions
                </div>
              )}
            </div>

            {/* Availabilities for this day (if showing) */}
            {showAvailabilities && (
              <div style={{ borderTop: '1px solid rgba(90,60,170,0.1)', padding: 12, background: 'rgba(90,60,170,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Availability</div>
                  <button onClick={() => setShowAvailModal(day)} style={{ background: 'none', border: 'none', color: '#5a3aaa', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add</button>
                </div>
                {(availabilities[day] || []).map(avail => (
                  <div key={avail.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#1e1040', marginBottom: 6, padding: '6px 8px', background: 'rgba(255,255,255,0.3)', borderRadius: 8 }}>
                    <span>{avail.start_time} – {avail.end_time}</span>
                    <button onClick={() => handleDeleteAvailability(avail.id, day)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(239,68,68,0.6)', padding: 0 }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ ...G, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Total Sessions</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#5a3aaa' }}>{weekData.reduce((acc, d) => acc + d.sessions.length, 0)}</div>
        </div>
        <div style={{ ...G, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Days Scheduled</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#5a3aaa' }}>{daysToShow.filter(d => d.sessions.length > 0).length}</div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  )
}
