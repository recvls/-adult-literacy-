import React from 'react'
import { useUser } from '../hooks/useUser'

export const LessonCard: React.FC<{
  id: string
  title: string
  icon?: string
  description?: string
  questionCount: number
  isCompleted: boolean
  isCurrentLesson?: boolean
  onClick: () => void
}> = ({ id, title, icon, description, questionCount, isCompleted, isCurrentLesson = false, onClick }) => {
  const cardStyle = {
    background: isCompleted
      ? 'rgba(76, 175, 80, 0.1)'
      : isCurrentLesson
      ? 'rgba(255, 193, 7, 0.12)'
      : 'rgba(31, 144, 255, 0.1)',
    border: isCompleted
      ? '1px solid rgba(76, 175, 80, 0.3)'
      : isCurrentLesson
      ? '1px solid rgba(255, 193, 7, 0.35)'
      : '1px solid rgba(31, 144, 255, 0.3)',
    padding: '18px',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  return (
    <div
      onClick={onClick}
      style={cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}>
        <div style={{ fontSize: '2.25rem' }}>{icon || '📘'}</div>
        <div>
          <h4 style={{ margin: '0 0 6px 0', color: 'var(--text)' }}>
            {isCompleted ? '✓' : isCurrentLesson ? '▶️ Next Up:' : '→'} {title}
          </h4>
          <small style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            {description || 'Practice this topic to build confidence.'}
          </small>
          <small style={{ color: 'var(--text-secondary)' }}>{questionCount} questions</small>
        </div>
      </div>
      <div style={{ fontSize: '1.8rem' }}>
        {isCompleted ? '🏆' : isCurrentLesson ? '✨' : '🔓'}
      </div>
    </div>
  )
}
