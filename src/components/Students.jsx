import { useState } from 'react'

export default function Students() {
  const [search, setSearch] = useState('')

  const students = [
    { id: 1, name: 'Lee Smith', sessions: 24, level: 'Advanced', lastSeen: 'Today' },
    { id: 2, name: 'Jordan Davis', sessions: 18, level: 'Intermediate', lastSeen: 'Yesterday' },
    { id: 3, name: 'Alex Thompson', sessions: 16, level: 'Advanced', lastSeen: '2 days ago' },
    { id: 4, name: 'Sam Martinez', sessions: 12, level: 'Beginner', lastSeen: '3 days ago' },
    { id: 5, name: 'Rachel Park', sessions: 11, level: 'Intermediate', lastSeen: 'Today' }
  ]

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-frost-accent/20 rounded-lg bg-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-frost-accent"
      />

      <div className="flex gap-2 mb-4">
        {['All', 'Beginner', 'Inter', 'Advanced'].map((f) => (
          <button key={f} className="px-3 py-1 text-sm rounded-lg border border-frost-accent/20 bg-white/50 hover:bg-white/70">
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((s) => (
          <div key={s.id} className="glass-card p-4 flex gap-3">
            <div className="w-10 h-10 rounded-full bg-frost-accent/15 flex items-center justify-center font-bold text-frost-accent flex-shrink-0">
              {s.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-frost-text/50">{s.sessions} sessions · {s.level}</div>
            </div>
            <div className="text-xs text-frost-text/40 self-center text-right">{s.lastSeen}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
