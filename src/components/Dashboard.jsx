export default function Dashboard() {
  const stats = [
    { label: 'Today', value: '3' },
    { label: 'Students', value: '12' },
    { label: 'Drills', value: '48' },
    { label: 'This week', value: '18' }
  ]

  const sessions = [
    { name: 'Alex Thompson', drill: 'Footwork drill', level: 'Advanced', time: '10:30 AM' },
    { name: 'Jordan Davis', drill: 'Smash technique', level: 'Inter', time: '11:45 AM' },
    { name: 'Sam Martinez', drill: 'Net play', level: 'Beginner', time: '2:00 PM' }
  ]

  return (
    <div>
      <div className="mb-6">
        <div className="text-xs font-semibold text-frost-text/50 uppercase tracking-wider mb-1">Good morning</div>
        <h1 className="text-3xl font-bold">Coach Sarah</h1>
      </div>

      {/* Bar chart */}
      <div className="glass-card p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold text-frost-text/50 uppercase">Sessions this week</span>
          <span className="text-frost-accent font-semibold">18 total</span>
        </div>
        <div className="flex gap-1 items-end h-16">
          {[42, 58, 35, 88, 65, 95, 50].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t ${h > 80 ? 'bg-frost-accent/60' : 'bg-frost-accent/18'}`}
                style={{ height: h + '%' }}
              />
              <div className="text-xs text-frost-text/30">{'MTWTFSS'[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card p-4">
            <div className="text-2xl font-bold text-frost-accent">{s.value}</div>
            <div className="text-xs text-frost-text/50 uppercase mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sessions */}
      <div className="section-title">📅 Upcoming sessions</div>
      <div className="space-y-2">
        {sessions.map((s, i) => (
          <div key={i} className="glass-card p-4 flex gap-3">
            <div className="w-8 h-8 rounded-full bg-frost-accent/15 flex items-center justify-center text-xs font-bold text-frost-accent flex-shrink-0">
              {s.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{s.name}</div>
              <div className="text-xs text-frost-text/50">{s.drill}</div>
            </div>
            <div className="text-xs font-semibold bg-frost-accent/10 text-frost-accent px-2 py-1 rounded-full self-start">{s.level}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
