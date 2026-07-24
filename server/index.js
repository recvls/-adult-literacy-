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
