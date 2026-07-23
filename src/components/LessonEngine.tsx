import React, { useEffect, useState } from 'react'
import { lessons, Question } from '../data/lessons'
import {
  speakText,
  stopSpeech,
  isSpeechSynthesisSupported,
  startSpeechRecognition,
  stopSpeechRecognition,
  isSpeechRecognitionSupported
} from '../utils/speechService'
import { useUser } from '../hooks/useUser'

export const LessonEngine: React.FC<{ user: string; initialLessonIndex?: number; onFinishLesson?: () => void }> = ({ user, initialLessonIndex = 0, onFinishLesson }) => {
  const [lessonIndex, setLessonIndex] = useState(() => Math.min(Math.max(initialLessonIndex, 0), lessons.length - 1))
  const [qIndex, setQIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const recognitionRef = React.useRef<any>(null)
  const { addXP, completeLesson } = useUser()

  const lesson = lessons[lessonIndex]
  const q: Question = lesson.questions[qIndex]
  const totalQuestions = lessons.reduce((sum, lessonItem) => sum + lessonItem.questions.length, 0)
  const currentQuestionIndex = lessons.slice(0, lessonIndex).reduce((sum, lessonItem) => sum + lessonItem.questions.length, 0) + qIndex + 1
  const progress = (currentQuestionIndex / totalQuestions) * 100

  useEffect(() => {
    setFeedback(null)
    setAnswer('')
    if (isSpeechSynthesisSupported()) {
      setIsSpeaking(true)
      speakText(q.prompt, () => {
        setIsSpeaking(false)
      })
    }
  }, [lessonIndex, qIndex])

  const speakQuestion = () => {
    if (!isSpeechSynthesisSupported()) return
    setIsSpeaking(true)
    speakText(q.prompt, () => {
      setIsSpeaking(false)
    })
  }

  const listenForAnswer = () => {
    if (!isSpeechRecognitionSupported()) {
      setFeedback({ type: 'incorrect', message: 'Speech recognition not supported on this device' })
      return
    }

    setIsListening(true)
    recognitionRef.current = startSpeechRecognition(
      (transcript) => {
        setAnswer(transcript)
        setIsListening(false)
      },
      (error) => {
        setFeedback({ type: 'incorrect', message: `Listening error: ${error}` })
        setIsListening(false)
      },
      () => {
        setIsListening(false)
      }
    )
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      stopSpeechRecognition(recognitionRef.current)
      setIsListening(false)
    }
  }

  const handleComplete = () => {
    completeLesson(lesson.id)
    addXP(10)
  }

  const goToNextQuestion = (nextLesson = false) => {
    if (nextLesson) {
      const isFinalLesson = lessonIndex + 1 >= lessons.length
      handleComplete()
      if (isFinalLesson) {
        speakText('Congratulations! You have completed all lessons!', () => {
          setFeedback({ type: 'correct', message: '🏆 All done! Great job! Go to Dashboard to restart.' })
          onFinishLesson?.()
        })
        return
      }
      setLessonIndex((current) => current + 1)
      setQIndex(0)
      return
    }

    setQIndex((current) => current + 1)
  }

  const submit = () => {
    const correct = q.answer.trim().toLowerCase() === answer.trim().toLowerCase()
    const onAdvance = () => {
      const isLastQuestionInLesson = qIndex + 1 >= lesson.questions.length
      const isLastLesson = lessonIndex + 1 >= lessons.length
      if (!isLastQuestionInLesson) {
        setQIndex((current) => current + 1)
        setAnswer('')
        setFeedback(null)
        return
      }
      goToNextQuestion(true)
    }

    if (correct) {
      setFeedback({ type: 'correct', message: '🎉 Correct! Great job!' })
      speakText('Correct! Well done!', () => {
        setTimeout(onAdvance, 1500)
      })
    } else {
      setFeedback({
        type: 'incorrect',
        message: `❌ Not quite. The answer is: ${q.answer}`
      })
      speakText(`The answer is ${q.answer}`, () => {
        setTimeout(onAdvance, 2000)
      })
    }
  }

  const handleReset = () => {
    stopSpeech()
    stopListening()
    setQIndex(0)
    setLessonIndex(0)
    setFeedback(null)
    setShowReset(false)
  }

  return (
    <div className="card">
      <div className="header">
        <div>
          <h3>{lesson.title}</h3>
          <small>Learner: {user}</small>
        </div>
        <button
          className="secondary"
          onClick={() => setShowReset(!showReset)}
          style={{ padding: '8px 12px', fontSize: '0.9rem' }}
          title="Reset progress"
        >
          ⚙️
        </button>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 16, color: 'var(--text-secondary)' }}>
        <small>
          Lesson {lessonIndex + 1}/{lessons.length} • Question {qIndex + 1}/{lesson.questions.length}
        </small>
      </div>

      <div className="lesson-area">
        <div
          style={{
            background: 'rgba(31, 144, 255, 0.1)',
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid rgba(31, 144, 255, 0.2)',
            marginBottom: '20px'
          }}
        >
          <p style={{ fontSize: '1.15rem', fontWeight: 500, margin: 0 }}>{q.prompt}</p>
        </div>

        {q.type === 'mcq' && q.choices?.map((c) => (
          <div
            key={c}
            className={`option ${answer === c ? 'selected' : ''}`}
            onClick={() => setAnswer(c)}
          >
            <span style={{ fontSize: '1.1rem' }}>{c}</span>
          </div>
        ))}

        {q.type !== 'mcq' && (
          <div style={{ marginBottom: '16px' }}>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="Type your answer here..."
              style={{ width: '100%', fontSize: '1.05rem' }}
              autoFocus
            />
          </div>
        )}

        {feedback && (
          <div className={`feedback ${feedback.type}`}>
            {feedback.message}
          </div>
        )}

        <div className="button-group">
          <button onClick={submit} style={{ flex: 1 }}>
            ✓ Submit
          </button>
          {isSpeechSynthesisSupported() && (
            <button
              className="secondary"
              onClick={speakQuestion}
              disabled={isSpeaking}
              title="Read the question aloud"
              style={{ flex: 1 }}
            >
              {isSpeaking ? '🔊 ...' : '🔊 Repeat'}
            </button>
          )}
          {isSpeechRecognitionSupported() && (
            <button
              className={isListening ? 'danger' : 'secondary'}
              onClick={isListening ? stopListening : listenForAnswer}
              title="Listen for answer"
              style={{ flex: 1 }}
            >
              {isListening ? '⏹️ Stop' : '🎤 Listen'}
            </button>
          )}
        </div>
      </div>

      {showReset && (
        <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(244, 67, 54, 0.1)', borderRadius: '8px', border: '1px solid rgba(244, 67, 54, 0.3)' }}>
          <p style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>Restart the current lesson from the first question?</p>
          <div className="button-group">
            <button className="danger" onClick={handleReset} style={{ flex: 1 }}>
              🔄 Restart Lesson
            </button>
            <button className="secondary" onClick={() => setShowReset(false)} style={{ flex: 1 }}>
              ✕ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
