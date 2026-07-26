const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 4000
const dataPath = path.join(__dirname, 'data', 'users.json')
const lessons = require('../data/lessons.json')

app.use(cors())
app.use(express.json())

const readUsers = () => {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const writeUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf-8')
}

const createUserRecord = (user) => ({
  userId: user.userId,
  name: user.name,
  xp: user.xp ?? 0,
  streak: user.streak ?? 1,
  completedLessons: Array.isArray(user.completedLessons) ? user.completedLessons : [],
  achievements: Array.isArray(user.achievements) ? user.achievements : [],
  lastLoginDate: user.lastLoginDate || new Date().toISOString()
})

app.get('/api/lessons', (req, res) => {
  res.json(lessons)
})

app.get('/api/users/:userId', (req, res) => {
  const users = readUsers()
  const user = users[req.params.userId]

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

app.post('/api/users', (req, res) => {
  const { userId, name } = req.body
  const id = typeof userId === 'string' && userId.trim() ? userId : `user-${Date.now()}`
  const user = createUserRecord({ userId: id, name: name || 'Learner', ...req.body })
  const users = readUsers()
  users[id] = user
  writeUsers(users)
  res.status(201).json(user)
})

app.put('/api/users/:userId', (req, res) => {
  const users = readUsers()
  const existing = users[req.params.userId]

  const updated = createUserRecord({
    ...existing,
    ...req.body,
    userId: req.params.userId,
    name: req.body.name || existing?.name || 'Learner'
  })

  users[req.params.userId] = updated
  writeUsers(users)
  res.json(updated)
})

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const buildLocalHint = ({ question, answer, lessonTitle, userName }) => {
  const normalizedAnswer = answer.trim().toLowerCase()
  const firstCharacter = normalizedAnswer.charAt(0).toUpperCase()
  const length = normalizedAnswer.length
  const defaultHint = `Try the answer that begins with ${firstCharacter} and is ${length} ${length === 1 ? 'letter' : 'letters'} long.`

  if (question.toLowerCase().includes('letter')) {
    return `Listen to the sound and choose the letter that matches it. The right answer starts with ${firstCharacter}.`
  }

  if (question.toLowerCase().includes('word')) {
    return `The word starts with ${firstCharacter} and has ${length} letters. Say it out loud, then type it.`
  }

  if (question.toLowerCase().includes('which')) {
    return `Choose the answer that best matches the question. The correct option starts with ${firstCharacter}.`
  }

  return defaultHint
}

const getAIHint = async ({ question, answer, lessonTitle, userName }) => {
  const prompt = `You are an adult literacy tutor helping learners understand short spelling and reading questions. Provide a friendly, simple hint for this question without giving the full answer away. Question: "${question}". Lesson: "${lessonTitle}". Learner name: "${userName}".`

  if (!OPENAI_API_KEY) {
    return {
      hint: buildLocalHint({ question, answer, lessonTitle, userName }),
      source: 'local'
    }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful adult literacy tutor.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 120,
        temperature: 0.7
      })
    })

    const data = await response.json()

    if (!response.ok || !data?.choices?.[0]?.message?.content) {
      throw new Error('OpenAI response invalid')
    }

    return {
      hint: data.choices[0].message.content.trim(),
      source: 'openai'
    }
  } catch (err) {
    return {
      hint: buildLocalHint({ question, answer, lessonTitle, userName }),
      source: 'local'
    }
  }
}

app.post('/api/ai/hint', async (req, res) => {
  const { question, answer, lessonTitle, userName } = req.body
  if (!question || !answer || !lessonTitle || !userName) {
    return res.status(400).json({ error: 'Missing required hint fields' })
  }

  const hintResult = await getAIHint({ question, answer, lessonTitle, userName })
  res.json(hintResult)
})

app.get('/api/status', (req, res) => {
  res.json({ healthy: true, lessons: lessons.length })
})

const staticPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'Not found' })
    }
    res.sendFile(path.join(staticPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Adult Literacy backend running on http://localhost:${PORT}`)
})
