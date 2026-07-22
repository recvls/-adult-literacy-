import React from 'react'
import { Navbar } from '../components/Navbar'
import { LessonCard } from '../components/LessonCard'
import { lessons } from '../data/lessons'
import { useUser } from '../hooks/useUser'

export const Learn: React.FC<{ onSelectLesson: (index: number) => void; onLogout: () => void }> = ({ onSelectLesson, onLogout }) => {
  const { user } = useUser()

  if (!user) return null

  return (
    <>
      <Navbar onLogout={onLogout} />
      
      <div className="card">
        <h2 style={{ margin: '0 0 16px 0', color: 'var(--accent-light)' }}>📚 Available Lessons</h2>
        <small style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '16px' }}>
          {user.completedLessons.length} of {lessons.length} completed
        </small>

        {lessons.map((lesson, idx) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            questionCount={lesson.questions.length}
            isCompleted={user.completedLessons.includes(lesson.id)}
            onClick={() => onSelectLesson(idx)}
          />
        ))}
      </div>
    </>
  )
}
