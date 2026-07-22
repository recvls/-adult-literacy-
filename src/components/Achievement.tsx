import React from 'react'
import { useUser } from '../hooks/useUser'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

const achievements: Achievement[] = [
  { id: 'first-lesson', title: 'First Step', description: 'Complete your first lesson', icon: '👣', unlocked: false },
  { id: 'five-lessons', title: 'Learning Path', description: 'Complete 5 lessons', icon: '📖', unlocked: false },
  { id: 'perfect-streak-7', title: 'Fire! 🔥', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: false },
  { id: 'hundred-xp', title: 'XP Collector', description: 'Earn 100 XP', icon: '⭐', unlocked: false },
  { id: 'all-letters', title: 'Letter Master', description: 'Complete all letter lessons', icon: '🔤', unlocked: false },
  { id: 'all-words', title: 'Word Wizard', description: 'Complete all word lessons', icon: '📚', unlocked: false }
]

export const Achievement: React.FC = () => {
  const { user } = useUser()

  if (!user) return null

  const userAchievements = achievements.map(a => ({
    ...a,
    unlocked: user.achievements.includes(a.id)
  }))

  return (
    <div className="card">
      <h3 style={{ margin: '0 0 16px 0', color: 'var(--accent-light)' }}>🏆 Achievements</h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '12px'
      }}>
        {userAchievements.map(ach => (
          <div
            key={ach.id}
            style={{
              background: ach.unlocked ? 'rgba(76, 175, 80, 0.1)' : 'rgba(0, 0, 0, 0.2)',
              border: ach.unlocked ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              opacity: ach.unlocked ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
            title={ach.description}
          >
            <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{ach.icon}</div>
            <small style={{ color: 'var(--text-secondary)', display: 'block' }}>{ach.title}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
