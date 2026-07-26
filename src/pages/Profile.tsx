import React, { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { Navbar } from '../components/Navbar'
import { Achievement } from '../components/Achievement'

export const Profile: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user } = useUser()
  const [apiKey, setApiKey] = useState('')
  const [siriMode, setSiriMode] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    setApiKey(localStorage.getItem('openai-api-key') || '')
    setSiriMode(localStorage.getItem('siri-mode') === 'true')
  }, [])

  if (!user) return null

  const saveSettings = () => {
    if (typeof window === 'undefined') return
    localStorage.setItem('openai-api-key', apiKey.trim())
    localStorage.setItem('siri-mode', String(siriMode))
    setSavedMessage('Saved! Your AI key is stored locally only.')
    setTimeout(() => setSavedMessage(''), 3000)
  }

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
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--accent-light)' }}>AI Settings</h3>
          <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            Add your own OpenAI API key for smarter hints, or keep using the built-in assistant.
            The key is stored locally in your browser only.
          </p>
          <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
              style={{ width: '100%' }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={siriMode}
                onChange={(e) => setSiriMode(e.target.checked)}
              />
              Enable Siri-style voice assistant
            </label>
            <button className="secondary" onClick={saveSettings}>
              Save AI Settings
            </button>
            {savedMessage && <small style={{ color: 'var(--accent-light)' }}>{savedMessage}</small>}
          </div>
        </div>

        <Achievement />
      </div>
    </>
  )
}
