import React from 'react'
import { Navbar } from '../components/Navbar'
import { LessonCard } from '../components/LessonCard'
import { lessons } from '../data/lessons'
import { useUser } from '../hooks/useUser'

export const Learn: React.FC<{ onSelectLesson: (index: number) => void; onLogout: () => void }> = ({ onSelectLesson, onLogout }) => {
  const { user } = useUser()

  if (!user) return null

  const nextLesson = lessons.find((lesson) => !user.completedLessons.includes(lesson.id))
  const allComplete = !nextLesson

  return (
    <>
      <Navbar onLogout={onLogout} />
      
      <div className="card">
        <h2 style={{ margin: '0 0 16px 0', color: 'var(--accent-light)' }}>📚 Available Lessons</h2>
        <small style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '16px' }}>
          {user.completedLessons.length} of {lessons.length} completed
        </small>

        {allComplete ? (
          <div style={{ padding: '16px', background: 'rgba(76, 175, 80, 0.08)', borderRadius: '10px', marginBottom: '16px' }}>
            <p style={{ margin: 0, color: 'var(--text)' }}>
              🎉 You finished every lesson! Revisit any module to practice or go back to the dashboard for your progress.
            </p>
          </div>
        ) : (
          <div style={{ padding: '16px', background: 'rgba(255, 193, 7, 0.08)', borderRadius: '10px', marginBottom: '16px' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Next lesson to try</strong>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{nextLesson?.title}</p>
          </div>
        )}

        {lessons.map((lesson, idx) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            questionCount={lesson.questions.length}
            isCompleted={user.completedLessons.includes(lesson.id)}
            isCurrentLesson={nextLesson?.id === lesson.id}
            onClick={() => onSelectLesson(idx)}
          />
        ))}
      </div>
    </>
  )
}
