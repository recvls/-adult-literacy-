import React from 'react'
import { useUser } from '../hooks/useUser'

export const LessonCard: React.FC<{
  id: string
  title: string
  questionCount: number
  isCompleted: boolean
  onClick: () => void
}> = ({ id, title, questionCount, isCompleted, onClick }) => {
  const { user } = useUser()
  const isCurrentLesson = user?.completedLessons.length === 0 && user?.completedLessons.indexOf(id) === -1

  return (
    <div
      onClick={onClick}
      style={{
        background: isCompleted ? 'rgba(76, 175, 80, 0.1)' : 'rgba(31, 144, 255, 0.1)',
        border: isCompleted ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(31, 144, 255, 0.3)',
        padding: '16px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 4px 0', color: 'var(--text)' }}>
          {isCompleted ? '✓' : '→'} {title}
        </h4>
        <small style={{ color: 'var(--text-secondary)' }}>{questionCount} questions</small>
      </div>
      <div style={{ fontSize: '1.5rem' }}>
        {isCompleted ? '🏆' : isCurrentLesson ? '▶️' : '🔓'}
      </div>
    </div>
  )
}
