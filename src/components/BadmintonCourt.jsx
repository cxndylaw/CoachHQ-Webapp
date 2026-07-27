import { useState } from 'react'

const PLAYER_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b']
const PLAYER_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4']

export default function BadmintonCourt({ courtData, onSave }) {
  const [selectedPlayer, setSelectedPlayer] = useState(0) // 0-3 for players 1-4
  const [mode, setMode] = useState('add') // 'add', 'line', 'delete'
  const [startPoint, setStartPoint] = useState(null)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  // Initialize or use provided data
  const [players, setPlayers] = useState(
    courtData?.players || [
      { id: 0, name: PLAYER_NAMES[0], color: PLAYER_COLORS[0], points: [] },
      { id: 1, name: PLAYER_NAMES[1], color: PLAYER_COLORS[1], points: [] },
      { id: 2, name: PLAYER_NAMES[2], color: PLAYER_COLORS[2], points: [] },
      { id: 3, name: PLAYER_NAMES[3], color: PLAYER_COLORS[3], points: [] },
    ]
  )
  const [lines, setLines] = useState(courtData?.lines || [])

  const courtWidth = 600
  const courtHeight = 400
  const padding = 20
  const currentPlayer = players[selectedPlayer]

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is within court bounds
    if (x < padding || x > courtWidth - padding || y < padding || y > courtHeight - padding) return

    if (mode === 'add') {
      // Add point to selected player
      const newPoint = { id: Date.now(), x, y }
      setPlayers(prev => prev.map(p => 
        p.id === selectedPlayer 
          ? { ...p, points: [...p.points, newPoint] }
          : p
      ))
      setUnsavedChanges(true)
    } else if (mode === 'line') {
      if (!startPoint) {
        setStartPoint({ x, y })
      } else {
        setLines([...lines, { id: Date.now(), start: startPoint, end: { x, y }, playerFrom: selectedPlayer }])
        setStartPoint(null)
        setUnsavedChanges(true)
      }
    } else if (mode === 'delete') {
      // Delete point from selected player if clicking on it
      const clickedPoint = currentPlayer.points.find(p => Math.hypot(p.x - x, p.y - y) < 15)
      if (clickedPoint) {
        setPlayers(prev => prev.map(p =>
          p.id === selectedPlayer
            ? { ...p, points: p.points.filter(pt => pt.id !== clickedPoint.id) }
            : p
        ))
        // Also delete lines connected to this point
        setLines(lines.filter(l => 
          !(Math.hypot(l.start.x - x, l.start.y - y) < 15 || Math.hypot(l.end.x - x, l.end.y - y) < 15)
        ))
        setUnsavedChanges(true)
      }
    }
  }

  const handleClear = () => {
    if (confirm('Clear all player points and lines?')) {
      setPlayers(prev => prev.map(p => ({ ...p, points: [] })))
      setLines([])
      setUnsavedChanges(true)
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave({ players, lines })
    }
    setUnsavedChanges(false)
  }

  const handleDeleteLine = (lineId) => {
    setLines(lines.filter(l => l.id !== lineId))
    setUnsavedChanges(true)
  }

  const totalPoints = players.reduce((sum, p) => sum + p.points.length, 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#1e1040', letterSpacing: '-0.5px' }}>Court Tactics</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {unsavedChanges && (
            <button onClick={handleSave} style={{ padding: '8px 14px', borderRadius: 12, background: '#4ade80', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              💾 Save
            </button>
          )}
          <button onClick={handleClear} style={{ padding: '8px 14px', borderRadius: 12, background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.15)', color: '#dc2626', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Player selection buttons */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'block' }}>Select Player</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {players.map((player, idx) => (
            <button key={idx} onClick={() => setSelectedPlayer(idx)} style={{
              padding: '12px 8px', borderRadius: 12,
              background: selectedPlayer === idx ? player.color : 'rgba(255,255,255,0.55)',
              border: selectedPlayer === idx ? '2px solid rgba(30,16,64,0.3)' : '1.5px solid rgba(90,60,170,0.15)',
              color: selectedPlayer === idx ? '#fff' : '#1e1040',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: selectedPlayer === idx ? `0 4px 12px ${player.color}40` : 'none',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 10, marginBottom: 4 }}>Player {idx + 1}</div>
              <div style={{ fontSize: 12, fontWeight: 800 }}>{player.points.length}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => { setMode('add'); setStartPoint(null) }} style={{
          padding: '10px 16px', borderRadius: 12,
          background: mode === 'add' ? currentPlayer.color : 'rgba(90,60,170,0.08)',
          border: '1.5px solid rgba(90,60,170,0.15)',
          color: mode === 'add' ? '#fff' : '#5a3aaa',
          fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>➕ Add Points</button>
        <button onClick={() => { setMode('line'); setStartPoint(null) }} style={{
          padding: '10px 16px', borderRadius: 12,
          background: mode === 'line' ? '#3b82f6' : 'rgba(90,60,170,0.08)',
          border: '1.5px solid rgba(90,60,170,0.15)',
          color: mode === 'line' ? '#fff' : '#5a3aaa',
          fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>➔ Draw Paths</button>
        <button onClick={() => { setMode('delete'); setStartPoint(null) }} style={{
          padding: '10px 16px', borderRadius: 12,
          background: mode === 'delete' ? '#dc2626' : 'rgba(90,60,170,0.08)',
          border: '1.5px solid rgba(90,60,170,0.15)',
          color: mode === 'delete' ? '#fff' : '#5a3aaa',
          fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>✕ Delete</button>
      </div>

      {/* Instructions */}
      <div style={{ fontSize: 12, color: 'rgba(30,16,64,0.5)', marginBottom: 16, background: 'rgba(90,60,170,0.04)', padding: 12, borderRadius: 12, border: '1px solid rgba(90,60,170,0.1)' }}>
        {mode === 'add' && `👆 Click court to add ${currentPlayer.name} points`}
        {mode === 'line' && `👆 Click start → click end to draw movement path from ${currentPlayer.name}`}
        {mode === 'delete' && `👆 Click a point to delete (connected paths also deleted)`}
      </div>

      {/* Court Canvas */}
      <svg
        onClick={handleCanvasClick}
        style={{
          width: '100%', maxWidth: courtWidth, height: 'auto',
          border: '2px solid rgba(90,60,170,0.2)', borderRadius: 16,
          background: '#e8f4db', cursor: mode === 'add' ? 'crosshair' : 'default',
          marginBottom: 16, display: 'block',
        }}
        viewBox={`0 0 ${courtWidth} ${courtHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Court background */}
        <rect x={padding} y={padding} width={courtWidth - padding * 2} height={courtHeight - padding * 2}
          fill="rgba(76,175,80,0.15)" stroke="#1e1040" strokeWidth="2" />

        {/* Doubles boundary (outer) - left and right sidelines */}
        <line x1={padding + 20} y1={padding} x2={padding + 20} y2={courtHeight - padding}
          stroke="#1e1040" strokeWidth="2" />
        <line x1={courtWidth - padding - 20} y1={padding} x2={courtWidth - padding - 20} y2={courtHeight - padding}
          stroke="#1e1040" strokeWidth="2" />

        {/* Singles boundary (inner) - left and right sidelines */}
        <line x1={padding + 60} y1={padding} x2={padding + 60} y2={courtHeight - padding}
          stroke="#1e1040" strokeWidth="1.5" />
        <line x1={courtWidth - padding - 60} y1={padding} x2={courtWidth - padding - 60} y2={courtHeight - padding}
          stroke="#1e1040" strokeWidth="1.5" />

        {/* Top baseline (doubles) */}
        <line x1={padding + 20} y1={padding} x2={courtWidth - padding - 20} y2={padding}
          stroke="#1e1040" strokeWidth="2" />

        {/* Bottom baseline (doubles) */}
        <line x1={padding + 20} y1={courtHeight - padding} x2={courtWidth - padding - 20} y2={courtHeight - padding}
          stroke="#1e1040" strokeWidth="2" />

        {/* Service line (top) - horizontal line dividing service box */}
        <line x1={padding + 20} y1={padding + 70} x2={courtWidth - padding - 20} y2={padding + 70}
          stroke="#1e1040" strokeWidth="1.5" />

        {/* Service line (bottom) - horizontal line dividing service box */}
        <line x1={padding + 20} y1={courtHeight - padding - 70} x2={courtWidth - padding - 20} y2={courtHeight - padding - 70}
          stroke="#1e1040" strokeWidth="1.5" />

        {/* Net line (center) - dashed */}
        <line x1={padding + 20} y1={courtHeight / 2} x2={courtWidth - padding - 20} y2={courtHeight / 2}
          stroke="#fff" strokeWidth="3" strokeDasharray="8,4" />

        {/* Center service line (vertical) */}
        <line x1={courtWidth / 2} y1={padding} x2={courtWidth / 2} y2={courtHeight - padding}
          stroke="#1e1040" strokeWidth="1.5" />

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Draw lines */}
        {lines.map(line => (
          <g key={line.id}>
            <line
              x1={line.start.x} y1={line.start.y}
              x2={line.end.x} y2={line.end.y}
              stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowhead)"
              onClick={(e) => { e.stopPropagation(); handleDeleteLine(line.id) }}
              style={{ cursor: 'pointer', opacity: 0.7 }}
            />
            <circle cx={line.start.x} cy={line.start.y} r="3" fill="#3b82f6" />
            <circle cx={line.end.x} cy={line.end.y} r="3" fill="#3b82f6" />
          </g>
        ))}

        {/* Start point indicator for line drawing */}
        {startPoint && mode === 'line' && (
          <circle cx={startPoint.x} cy={startPoint.y} r="6" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
        )}

        {/* All player points */}
        {players.map((player) => (
          <g key={`player-${player.id}`}>
            {player.points.map((point, idx) => (
              <g key={point.id}>
                <circle
                  cx={point.x} cy={point.y} r="10"
                  fill={player.color} opacity={selectedPlayer === player.id ? 0.95 : 0.7}
                  stroke={selectedPlayer === player.id ? '#1e1040' : 'rgba(30,16,64,0.2)'}
                  strokeWidth={selectedPlayer === player.id ? '2' : '1'}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                />
                <text x={point.x} y={point.y} textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fontWeight="800" fill="#fff" pointerEvents="none">
                  {idx + 1}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: 'rgba(90,60,170,0.04)', padding: 12, borderRadius: 12, border: '1px solid rgba(90,60,170,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Total Points</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#5a3aaa' }}>{totalPoints}</div>
        </div>
        <div style={{ background: 'rgba(90,60,170,0.04)', padding: 12, borderRadius: 12, border: '1px solid rgba(90,60,170,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Paths Drawn</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#3b82f6' }}>{lines.length}</div>
        </div>
      </div>

      {/* Player list */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(30,16,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Player Movements
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {players.map((player, idx) => (
            <div key={idx} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(90,60,170,0.1)',
              borderRadius: 12,
              borderLeft: `4px solid ${player.color}`,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e1040', marginBottom: 2 }}>
                  {player.name}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(30,16,64,0.4)' }}>
                  {player.points.length} point{player.points.length !== 1 ? 's' : ''} on court
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: player.color }}>
                {player.points.length > 0 ? player.points.map((_, i) => i + 1).join('→') : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {unsavedChanges && (
        <div style={{
          marginTop: 16, padding: 12, borderRadius: 12,
          background: 'rgba(251, 146, 60, 0.1)', border: '1.5px solid rgba(251, 146, 60, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <span style={{ fontSize: 12, color: 'rgba(30,16,64,0.6)', fontWeight: 500 }}>Unsaved changes</span>
          <button onClick={handleSave} style={{
            padding: '8px 14px', borderRadius: 10, background: '#4ade80', border: 'none',
            color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>Save Changes</button>
        </div>
      )}
    </div>
  )
}
