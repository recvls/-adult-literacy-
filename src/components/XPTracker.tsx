import React from 'react'
import { useUser } from '../hooks/useUser'

export const XPTracker: React.FC = () => {
  const { user } = useUser()

  if (!user) return null

  const nextLevel = Math.ceil(user.xp / 100) * 100
  const currentXP = user.xp % 100
  const progress = (currentXP / 100) * 100

  return (
    <div style={{
      background: 'rgba(31, 144, 255, 0.05)',
      border: '1px solid rgba(31, 144, 255, 0.2)',
      padding: '16px',
      borderRadius: '10px',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <small style={{ fontWeight: 600 }}>Level {Math.floor(user.xp / 100) + 1}</small>
        <small style={{ color: 'var(--text-secondary)' }}>{currentXP}/100 XP</small>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
