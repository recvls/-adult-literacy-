import React, { useState } from 'react'
import { speakText, isSpeechSynthesisSupported } from '../utils/speechService'

export default function Onboarding({ onDone }: { onDone: (name: string) => void }) {
  const [name, setName] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleSpeak = () => {
    setIsSpeaking(true)
    speakText('Welcome to Adult Literacy. Please enter your name to get started.', () => {
      setIsSpeaking(false)
    })
  }

  const handleStart = () => {
    if (name.trim()) {
      speakText(`Hello ${name}, let's begin learning!`, () => {
        onDone(name)
      })
    } else {
      onDone('Learner')
    }
  }

  return (
    <div className="card">
      <div className="header">
        <h2>🎓 Welcome</h2>
        <small>Adult Literacy Practice</small>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
          Learn to read and master letters with personalized lessons. Track your progress as you grow!
        </p>
      </div>

      <div className="grid">
        <label style={{ color: 'var(--accent-light)', fontWeight: 600, marginBottom: 8 }}>
          What's your name?
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleStart()}
          placeholder="Enter your name..."
          style={{ fontSize: '1.05rem' }}
          autoFocus
        />
      </div>

      <div className="button-group">
        <button onClick={handleStart} style={{ flex: 1 }}>
          ▶️ Start Learning
        </button>
        {isSpeechSynthesisSupported() && (
          <button
            className="secondary"
            onClick={handleSpeak}
            disabled={isSpeaking}
            style={{ flex: 1 }}
          >
            {isSpeaking ? '🔊 Speaking...' : '🔊 Read Aloud'}
          </button>
        )}
      </div>

      <div style={{ marginTop: 20, textAlign: 'center', color: 'var(--text-secondary)' }}>
        <small>✓ Works offline • ✓ Your progress is saved locally • ✓ No sign-up required</small>
      </div>
    </div>
  )
}

