import React from 'react'
import { useUser } from '../hooks/useUser'

export const StreakCounter: React.FC = () => {
  const { user } = useUser()

  if (!user) return null

  return (
    <div style={{
      background: 'rgba(255, 165, 0, 0.1)',
      border: '1px solid rgba(255, 165, 0, 0.3)',
      padding: '12px 16px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px'
    }}>
      <span style={{ fontSize: '1.5rem' }}>🔥</span>
      <div>
        <div style={{ fontWeight: 600, color: 'var(--text)' }}>{user.streak} Day Streak</div>
        <small style={{ color: 'var(--text-secondary)' }}>Keep it going!</small>
      </div>
    </div>
  )
}
