import React from 'react'
import { useUser } from '../hooks/useUser'
import { Navbar } from '../components/Navbar'
import { StreakCounter } from '../components/StreakCounter'
import { XPTracker } from '../components/XPTracker'
import { Achievement } from '../components/Achievement'

export const Dashboard: React.FC<{ onStartLearning: () => void; onLogout: () => void; lessonCount: number; loading: boolean }> = ({ onStartLearning, onLogout, lessonCount, loading }) => {
  const { user } = useUser()

  if (!user) return null

  return (
    <>
      <Navbar onLogout={onLogout} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        <StreakCounter />
        <XPTracker />

        <div className="card">
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--accent-light)' }}>📊 Statistics</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(31, 144, 255, 0.05)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Available lessons</span>
              <strong style={{ color: 'var(--text)' }}>{loading ? 'Loading…' : lessonCount}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(31, 144, 255, 0.05)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Completed lessons</span>
              <strong style={{ color: 'var(--text)' }}>{user.completedLessons.length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(31, 144, 255, 0.05)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Achievements</span>
              <strong style={{ color: 'var(--text)' }}>{user.achievements.length}</strong>
            </div>
          </div>
        </div>

        <Achievement />

        <button onClick={onStartLearning} style={{ fontSize: '1rem', padding: '14px' }}>
          ▶️ Continue Learning
        </button>
      </div>
    </>
  )
}
