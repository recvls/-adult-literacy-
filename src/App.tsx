import React, { useState, useEffect } from 'react'
import { UserProvider } from './context/UserContext'
import Onboarding from './components/Onboarding'
import { LessonEngine } from './components/LessonEngine'
import { Dashboard } from './pages/Dashboard'
import { Learn } from './pages/Learn'
import { Profile } from './pages/Profile'
import { useUser } from './hooks/useUser'

type Page = 'dashboard' | 'learn' | 'lesson' | 'profile'

const AppContent = () => {
  const { user, setUser, logout } = useUser()
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0)

  useEffect(() => {
    if (!user) {
      setCurrentPage('dashboard')
    }
  }, [user])

  if (!user) {
    return (
      <div className="app">
        <div className="card" style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📚</div>
          <h1 style={{ margin: '0 0 4px 0' }}>Adult Literacy</h1>
          <small style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Learn to read and practice letters</small>
        </div>
        <Onboarding onDone={(name) => {
          setUser({
            userId: `user-${Date.now()}`,
            name,
            xp: 0,
            streak: 0,
            completedLessons: [],
            achievements: [],
            lastLoginDate: new Date().toISOString()
          })
          setCurrentPage('dashboard')
        }} />
      </div>
    )
  }

  return (
    <div className="app">
      {currentPage === 'dashboard' && (
        <Dashboard
          onStartLearning={() => setCurrentPage('learn')}
          onLogout={() => logout()}
        />
      )}

      {currentPage === 'learn' && (
        <>
          <Learn
            onSelectLesson={(idx) => {
              setSelectedLessonIndex(idx)
              setCurrentPage('lesson')
            }}
            onLogout={() => logout()}
          />
          <button
            className="secondary"
            onClick={() => setCurrentPage('dashboard')}
            style={{ marginTop: '16px', width: '100%' }}
          >
            ← Back to Dashboard
          </button>
        </>
      )}

      {currentPage === 'lesson' && (
        <>
          <LessonEngine
            user={user.name}
            initialLessonIndex={selectedLessonIndex}
            onFinishLesson={() => setCurrentPage('dashboard')}
          />
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              className="secondary"
              onClick={() => setCurrentPage('learn')}
              style={{ flex: 1 }}
            >
              ← Back to Lessons
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              style={{ flex: 1 }}
            >
              🏠 Dashboard
            </button>
          </div>
        </>
      )}

      {currentPage === 'profile' && (
        <>
          <Profile onLogout={() => logout()} />
          <button
            className="secondary"
            onClick={() => setCurrentPage('dashboard')}
            style={{ marginTop: '16px', width: '100%' }}
          >
            ← Back to Dashboard
          </button>
        </>
      )}

      {currentPage !== 'lesson' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
          <button
            className={currentPage === 'dashboard' ? '' : 'secondary'}
            onClick={() => setCurrentPage('dashboard')}
            style={{ padding: '10px' }}
          >
            🏠 Home
          </button>
          <button
            className={currentPage === 'profile' ? '' : 'secondary'}
            onClick={() => setCurrentPage('profile')}
            style={{ padding: '10px' }}
          >
            👤 Profile
          </button>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}
