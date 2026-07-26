import { useState } from 'react'
import { signUp, signIn } from '../lib/auth'

export default function Auth({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: err } = isSignUp 
      ? await signUp(email, password)
      : await signIn(email, password)

    if (err) {
      setError(err.message)
    } else if (!isSignUp) {
      onSuccess()
    } else {
      setError('Account created! Check your email to verify.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(160deg, #e2ecff 0%, #ede8ff 45%, #e6f2ff 100%)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-frost-accent mb-2">coachHQ</h1>
          <p className="text-sm text-frost-text/60 uppercase tracking-widest">Badminton Coaching</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8 shadow-lg" 
          style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.85)', backdropFilter: 'blur(24px)' }}>
          
          <h2 className="text-2xl font-bold text-frost-text mb-1">{isSignUp ? 'Create account' : 'Welcome back'}</h2>
          <p className="text-sm text-frost-text/60 mb-8">{isSignUp ? 'Start coaching' : 'Sign in to continue'}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-frost-text/70 mb-2 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-frost-accent transition"
                style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(90,60,170,0.15)', color: '#1e1040' }}
                placeholder="coach@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-frost-text/70 mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-frost-accent transition"
                style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(90,60,170,0.15)', color: '#1e1040' }}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: error.includes('created') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: error.includes('created') ? '#22c55e' : '#ef4444' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              style={{ background: '#5a3aaa' }}
            >
              {loading ? 'Loading...' : isSignUp ? 'Create account' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'rgba(90,60,170,0.1)' }}></div>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="w-full text-sm text-frost-accent font-medium hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <p className="text-xs text-frost-text/50 text-center mt-8">By signing in, you agree to our Terms of Service</p>
      </div>
    </div>
  )
}