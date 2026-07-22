import React from 'react'
import { useUser } from '../hooks/useUser'

export const Navbar: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const { user } = useUser()

  return (
    <nav style={{
      background: 'var(--card)',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(31, 144, 255, 0.1)',
      marginBottom: '16px',
      borderRadius: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.5rem' }}>📚</span>
        <h2 style={{ margin: 0, color: 'var(--accent-light)' }}>Adult Literacy</h2>
      </div>
      
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600 }}>{user.name}</div>
            <small style={{ color: 'var(--text-secondary)' }}>{user.xp} XP</small>
          </div>
          {onLogout && (
            <button className="secondary" onClick={onLogout} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
