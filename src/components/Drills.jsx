import { useState } from 'react'

export default function Drills() {
  const [search, setSearch] = useState('')

  const categories = [
    { name: 'Footwork', drills: 8, icon: '👣' },
    { name: 'Technique', drills: 12, icon: '🎾' },
    { name: 'Smash', drills: 6, icon: '⚡' },
    { name: 'Serve', drills: 5, icon: '🎯' },
    { name: 'Speed & Stamina', drills: 9, icon: '💨' },
    { name: 'Tactics', drills: 7, icon: '🧠' }
  ]

  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Drills</h1>
      
      <input
        type="text"
        placeholder="Search drills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-frost-accent/20 rounded-lg bg-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-frost-accent"
      />

      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c.name} className="glass-card p-4 flex gap-3 items-center cursor-pointer hover:bg-white/65">
            <div className="text-2xl">{c.icon}</div>
            <div className="flex-1">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-frost-text/50">{c.drills} drills</div>
            </div>
            <div className="text-frost-text/40">→</div>
          </div>
        ))}
      </div>
    </div>
  )
}
