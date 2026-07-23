import React from 'react'
import { useUser } from '../hooks/useUser'
import { Navbar } from '../components/Navbar'
import { Achievement } from '../components/Achievement'

export const Profile: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user } = useUser()

  if (!user) return null

  return (
    <>
      <Navbar onLogout={onLogout} />
      
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '12px' }}>👤</div>
          <h2 style={{ margin: '0 0 4px 0' }}>{user.name}</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Member since {new Date(user.lastLoginDate).toLocaleDateString()}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(31, 144, 255, 0.1)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent-light)', marginBottom: '4px' }}>
              {user.xp}
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Total XP</small>
          </div>

          <div style={{ background: 'rgba(255, 165, 0, 0.1)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#ffa500', marginBottom: '4px' }}>
              {user.streak}
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Day Streak 🔥</small>
          </div>

          <div style={{ background: 'rgba(76, 175, 80, 0.1)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#4caf50', marginBottom: '4px' }}>
              {user.completedLessons.length}
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Lessons Done</small>
          </div>

          <div style={{ background: 'rgba(156, 39, 176, 0.1)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#9c27b0', marginBottom: '4px' }}>
              {user.achievements.length}
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Achievements</small>
          </div>
        </div>

        <div className="card" style={{ background: 'rgba(0, 0, 0, 0.2)', marginBottom: 0 }}>
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--accent-light)' }}>About</h3>
          <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            You are making great progress on your literacy journey! Keep practicing daily to maintain your streak and unlock all achievements.
          </p>
        </div>

        <Achievement />
      </div>
    </>
  )
}
