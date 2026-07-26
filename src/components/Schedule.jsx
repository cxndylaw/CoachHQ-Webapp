import { useState } from 'react'

export default function Schedule() {
  const [filter, setFilter] = useState('today')

  const sessions = [
    { time: '10:30 AM', student: 'Alex Thompson', drill: 'Footwork drill', level: 'Advanced', duration: '60 min' },
    { time: '11:45 AM', student: 'Jordan Davis', drill: 'Smash technique', level: 'Inter', duration: '45 min' },
    { time: '2:00 PM', student: 'Sam Martinez', drill: 'Net play basics', level: 'Beginner', duration: '50 min' },
    { time: '3:30 PM', student: 'Lee Smith', drill: 'Advanced tactics', level: 'Advanced', duration: '60 min' },
    { time: '5:00 PM', student: 'Rachel Park', drill: 'Serve practice', level: 'Inter', duration: '40 min' }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Schedule</h1>

      <div className="flex gap-2 mb-4">
        {['Today', 'Tomorrow', 'Next 7 days'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f.toLowerCase())}
            className={`px-3 py-1 text-sm rounded-lg transition ${
              filter === f.toLowerCase()
                ? 'bg-frost-accent text-white'
                : 'border border-frost-accent/20 bg-white/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {sessions.map((s, i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex gap-3">
              <div className="text-sm font-bold text-frost-accent min-w-[60px]">{s.time}</div>
              <div className="flex-1 border-l border-frost-accent/15 pl-3">
                <div className="font-medium">{s.student}</div>
                <div className="text-xs text-frost-text/50 mb-2">{s.drill}</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-frost-accent/10 text-frost-accent px-2 py-0.5 rounded">{s.level}</span>
                  <span className="text-frost-text/40">{s.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
