import { useState } from 'react'
import { CheckIcon } from './Icons'
import { updateStudentRatings, getCurrentCoachId } from '../lib/supabase-db'

function StarRating({ value, onChange, size = 24 }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} onClick={() => onChange(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width={size} height={size} viewBox="0 0 24 24"
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

export default function SessionRatingPopup({ student, onClose, onSave }) {
  const studentData = student || {}
  const [overall, setOverall] = useState(0)
  const [skills, setSkills] = useState({
    Technique: 0, Footwork: 0, Speed: 0, Stamina: 0, Tactics: 0
  })

  const initials = student.name.split(' ').map(n => n[0]).join('')
  const currentRatings = {
    Technique: studentData.technique_rating || 0,
    Footwork: studentData.footwork_rating || 0,
    Speed: studentData.speed_rating || 0,
    Stamina: studentData.stamina_rating || 0,
    Tactics: studentData.tactics_rating || 0,
  }

  const handleSave = async () => {
    // Update student's current ratings (average with new ratings)
    if (student.id) {
      const coachId = await getCurrentCoachId()
      const updatedRatings = Object.entries(skills).reduce((acc, [skill, newRating]) => {
        if (newRating > 0) {
          const current = currentRatings[skill] || 0
          const fieldName = `${skill.toLowerCase()}_rating`
          acc[fieldName] = Math.round((current + newRating) / 2)
        }
        return acc
      }, {})
      
      await updateStudentRatings(coachId, student.id, updatedRatings)
    }
    onSave({ overall, skills })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'flex-end', zIndex: 999,
    }}>
      <div style={{
        width: '100%', background: 'linear-gradient(160deg,#e2ecff 0%,#ede8ff 45%,#e6f2ff 100%)',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: '24px 20px 32px', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 -4px 32px rgba(90,60,170,0.2)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(90,60,170,0.12)', border: '2px solid rgba(90,60,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#5a3aaa', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Session Complete</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1e1040' }}>{student.name}</div>
          </div>
        </div>

        {/* Overall rating */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 12 }}>Overall Performance</label>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
            <StarRating value={overall} onChange={setOverall} size={28} />
          </div>
          {overall > 0 && (
            <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(30,16,64,0.5)', marginTop: 8 }}>
              {['', 'Needs improvement', 'Fair effort', 'Good session', 'Great session', 'Excellent work'][overall]}
            </div>
          )}
        </div>

        {/* Skill ratings with current values */}
        <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 16, padding: '16px 0', marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', paddingLeft: 16, marginBottom: 12 }}>Skill Ratings</label>
          {Object.entries(skills).map(([skill, rating], idx, arr) => {
            const current = currentRatings[skill] || 0
            return (
              <div key={skill} style={{ padding: '14px 16px', borderTop: '1px solid rgba(90,60,170,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1e1040', marginBottom: 4 }}>{skill}</div>
                  <div style={{ fontSize: 11, color: 'rgba(30,16,64,0.4)' }}>Current: {current > 0 ? <span style={{ color: '#5a3aaa', fontWeight: 700 }}>{'⭐'.repeat(current)}</span> : 'None'}</div>
                </div>
                <StarRating value={rating} onChange={r => setSkills(s => ({ ...s, [skill]: r }))} size={18} />
              </div>
            )
          })}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(90,60,170,0.08)', border: '1.5px solid rgba(90,60,170,0.15)', color: '#5a3aaa', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Skip
          </button>
          <button onClick={handleSave} style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#5a3aaa', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <CheckIcon size={16} color="#fff" /> Save Ratings
          </button>
        </div>
      </div>
    </div>
  )
}