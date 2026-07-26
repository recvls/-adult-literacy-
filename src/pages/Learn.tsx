import React from 'react'
import { Navbar } from '../components/Navbar'
import { LessonCard } from '../components/LessonCard'
import { useUser } from '../hooks/useUser'
import type { Lesson } from '../hooks/useLessons'

export const Learn: React.FC<{
  lessons: Lesson[]
  loading: boolean
  onSelectLesson: (index: number) => void
  onLogout: () => void
}> = ({ lessons, loading, onSelectLesson, onLogout }) => {
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

        <div style={{ display: 'grid', gap: '16px', marginBottom: '20px' }}>
          <div style={{ padding: '18px', background: 'rgba(31, 144, 255, 0.08)', borderRadius: '14px' }}>
            <strong style={{ display: 'block', marginBottom: '10px', color: 'var(--text)' }}>Choose the topic you want to practice</strong>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Each topic is a mini lesson with picture-style words and letter sounds. Tap one to start learning quickly.
            </p>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255, 193, 7, 0.08)', borderRadius: '10px' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Lessons available</strong>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              {loading ? 'Loading lesson topics…' : `${lessons.length} topics ready for practice.`}
            </p>
          </div>
          {allComplete && !loading ? (
            <div style={{ padding: '16px', background: 'rgba(76, 175, 80, 0.08)', borderRadius: '10px' }}>
              <p style={{ margin: 0, color: 'var(--text)' }}>
                🎉 You finished every lesson! Revisit any module to practice or go back to the dashboard for your progress.
              </p>
            </div>
          ) : null}
        </div>

        {lessons.map((lesson, idx) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            icon={lesson.icon}
            description={lesson.description}
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
