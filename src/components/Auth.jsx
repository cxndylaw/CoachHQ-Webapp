import { useState } from 'react'
import { signUp, signIn } from '../lib/auth'
import { supabase } from '../lib/supabase'

const BG = 'linear-gradient(160deg,#e2ecff 0%,#ede8ff 45%,#e6f2ff 100%)'
const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 14,
  border: '1px solid rgba(90,60,170,0.15)',
  background: 'rgba(255,255,255,0.55)',
  fontSize: 14, color: '#1e1040', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
}
const labelStyle = {
  fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)',
  textTransform: 'uppercase', letterSpacing: '0.08em',
  display: 'block', marginBottom: 6,
}

export default function Auth({ onSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (isSignUp) {
      const { data, error: err } = await signUp(email, password)
      if (err) { setError(err.message); setLoading(false); return }
      // Save name to profile
      if (data?.user) {
        await supabase.from('profiles').upsert({ id: data.user.id, name })
      }
      setError('Account created! Check your email to verify, then sign in.')
    } else {
      const { error: err } = await signIn(email, password)
      if (err) { setError(err.message); setLoading(false); return }
      onSuccess()
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: BG, fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 42, fontWeight: 800, color: '#5a3aaa', letterSpacing: '-1px' }}>coachHQ</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(30,16,64,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>Badminton Coaching</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 24, padding: 32, boxShadow: '0 8px 40px rgba(90,60,170,0.1)' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1e1040', marginBottom: 4 }}>{isSignUp ? 'Create account' : 'Welcome back'}</div>
          <div style={{ fontSize: 13, color: 'rgba(30,16,64,0.45)', marginBottom: 24 }}>{isSignUp ? 'Start coaching today' : 'Sign in to continue'}</div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {isSignUp && (
              <div>
                <label style={labelStyle}>Your name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Coach Sarah" required style={inputStyle} />
              </div>
            )}
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="coach@example.com" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle} />
            </div>

            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 10, fontSize: 13, background: error.includes('created') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.08)', color: error.includes('created') ? '#16a34a' : '#dc2626' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ padding: '13px', borderRadius: 14, background: '#5a3aaa', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', opacity: loading ? 0.6 : 1, fontFamily: 'inherit', marginTop: 4 }}>
              {loading ? 'Loading...' : isSignUp ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <button onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={{ width: '100%', marginTop: 16, background: 'none', border: 'none', color: '#5a3aaa', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'rgba(30,16,64,0.35)' }}>By continuing, you agree to our Terms of Service</div>
      </div>
    </div>
  )
}