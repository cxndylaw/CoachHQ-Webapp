import { useState } from 'react'
import { signOut } from '../lib/auth'
import { supabase } from '../lib/supabase'
import { PencilIcon, CheckIcon, BellIcon, MoonIcon, ShieldIcon, HelpIcon, InfoIcon, LogoutIcon, ChevronRight, MailIcon } from './Icons'

const G = {
  position: 'relative',
  background: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.85)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  boxShadow: '0 2px 20px rgba(90,60,170,0.07)',
  overflow: 'hidden',
}

const ROW = {
  display: 'flex', alignItems: 'center', gap: 14,
  padding: '15px 18px',
  borderBottom: '1px solid rgba(90,60,170,0.06)',
  cursor: 'pointer',
}

const ICON_WRAP = {
  width: 36, height: 36, borderRadius: 10,
  background: 'rgba(90,60,170,0.08)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
}

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 12,
  border: '1px solid rgba(90,60,170,0.15)',
  background: 'rgba(255,255,255,0.6)',
  fontSize: 14, color: '#1e1040', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
}

const labelStyle = {
  fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)',
  textTransform: 'uppercase', letterSpacing: '0.08em',
  display: 'block', marginBottom: 6,
}

export default function Settings({ user, coachName, onNameUpdate }) {
  const [name, setName] = useState(coachName || '')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, name: name.trim() })
    setSaving(false)
    if (!error) {
      onNameUpdate(name.trim())
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px', marginBottom: 24 }}>Settings</div>

      {/* Profile card */}
      <div style={{ ...G, padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: editing ? 20 : 0 }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(90,60,170,0.12)', border: '2px solid rgba(90,60,170,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#5a3aaa', flexShrink: 0,
          }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1e1040', marginBottom: 3 }}>{name || 'Coach'}</div>
            <div style={{ fontSize: 13, color: 'rgba(30,16,64,0.45)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <MailIcon size={13} /> {user?.email}
            </div>
          </div>
          <button onClick={() => editing ? handleSave() : setEditing(true)} style={{
            padding: '8px 14px', borderRadius: 10,
            border: '1.5px solid rgba(90,60,170,0.15)',
            background: editing ? '#5a3aaa' : 'rgba(255,255,255,0.6)',
            color: editing ? '#fff' : '#5a3aaa',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
          }}>
            {editing ? <CheckIcon size={14} /> : <PencilIcon size={14} />}
            {saving ? 'Saving...' : editing ? 'Save' : 'Edit'}
          </button>
        </div>

        {editing && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={labelStyle}>Display name</label>
              <input value={name} onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                style={inputStyle} autoFocus />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input value={user?.email} disabled style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }} />
            </div>
            <div>
              <label style={labelStyle}>New password</label>
              <input type="password" placeholder="Leave blank to keep current" style={inputStyle} />
            </div>
          </div>
        )}

        {saved && (
          <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 12, background: 'rgba(34,197,94,0.1)', color: '#16a34a', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckIcon size={15} /> Profile saved successfully!
          </div>
        )}
      </div>

      {/* Preferences */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginLeft: 4 }}>Preferences</div>
      <div style={{ ...G, marginBottom: 12 }}>
        <div style={ROW}>
          <div style={ICON_WRAP}><BellIcon size={18} color="#5a3aaa" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#1e1040' }}>Notifications</div>
            <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.4)', marginTop: 1 }}>Session reminders & alerts</div>
          </div>
          <div onClick={() => setNotifications(!notifications)} style={{
            width: 44, height: 24, borderRadius: 12, cursor: 'pointer', transition: 'background 0.2s',
            background: notifications ? '#5a3aaa' : 'rgba(90,60,170,0.15)',
            position: 'relative', flexShrink: 0,
          }}>
            <div style={{
              position: 'absolute', top: 3, left: notifications ? 23 : 3,
              width: 18, height: 18, borderRadius: '50%', background: '#fff',
              transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            }} />
          </div>
        </div>
        <div style={ROW}>
          <div style={ICON_WRAP}><MoonIcon size={18} color="#5a3aaa" /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: '#1e1040' }}>Appearance</div></div>
          <span style={{ fontSize: 13, color: 'rgba(30,16,64,0.4)', marginRight: 6 }}>Light</span>
          <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
        </div>
        <div style={{ ...ROW, borderBottom: 'none' }}>
          <div style={ICON_WRAP}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a3aaa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><path d="M2 12h20"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: '#1e1040' }}>Language</div></div>
          <span style={{ fontSize: 13, color: 'rgba(30,16,64,0.4)', marginRight: 6 }}>English</span>
          <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
        </div>
      </div>

      {/* Account */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginLeft: 4 }}>Account</div>
      <div style={{ ...G, marginBottom: 12 }}>
        <div style={ROW}>
          <div style={ICON_WRAP}><ShieldIcon size={18} color="#5a3aaa" /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: '#1e1040' }}>Privacy</div></div>
          <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
        </div>
        <div style={ROW}>
          <div style={ICON_WRAP}><HelpIcon size={18} color="#5a3aaa" /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: '#1e1040' }}>Help & Support</div></div>
          <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
        </div>
        <div style={{ ...ROW, borderBottom: 'none' }}>
          <div style={ICON_WRAP}><InfoIcon size={18} color="#5a3aaa" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#1e1040' }}>About</div>
            <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.4)', marginTop: 1 }}>coachHQ v1.0.0</div>
          </div>
          <ChevronRight size={16} color="rgba(90,60,170,0.25)" />
        </div>
      </div>

      {/* Sign out */}
      <div style={{ ...G, marginBottom: 40 }}>
        <div style={{ ...ROW, borderBottom: 'none' }} onClick={async () => { await signOut(); localStorage.clear(); window.location.reload() }}>
          <div style={{ ...ICON_WRAP, background: 'rgba(239,68,68,0.08)' }}>
            <LogoutIcon size={18} color="#ef4444" />
          </div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: '#ef4444' }}>Sign out</div></div>
        </div>
      </div>
    </div>
  )
}
