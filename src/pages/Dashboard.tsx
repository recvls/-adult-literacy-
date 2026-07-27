import React from 'react'
import { useUser } from '../hooks/useUser'
import { Navbar } from '../components/Navbar'
import { StreakCounter } from '../components/StreakCounter'
import { XPTracker } from '../components/XPTracker'
import { Achievement } from '../components/Achievement'
import { lessons } from '../data/lessons'

export const Dashboard: React.FC<{ onStartLearning: () => void; onLogout: () => void }> = ({ onStartLearning, onLogout }) => {
  const { user } = useUser()
  console.log("User:", user);
  console.log("Completed Lessons:", user?.completedLessons);

  if (!user) return null

const completedLessons = user.completedLessons ?? []

const nextLesson =
  lessons.find(
    lesson => !completedLessons.includes(lesson.id)
  ) ?? lessons[0]

return (
    <>
      <Navbar onLogout={onLogout} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        <StreakCounter />
        <XPTracker />

        <div className="card">
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--accent-light)' }}>📊 Statistics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(31, 144, 255, 0.05)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-light)' }}>
                {user.completedLessons?.length ?? 0}
              </div>
              <small style={{ color: 'var(--text-secondary)' }}>Lessons Completed</small>
            </div>
            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(31, 144, 255, 0.05)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-light)' }}>
                {user.achievements?.length ?? 0}
              </div>
              <small style={{ color: 'var(--text-secondary)' }}>Achievements</small>
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
