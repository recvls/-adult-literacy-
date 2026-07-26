const API_BASE = import.meta.env.VITE_API_BASE || ''

const fetchJson = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`API request failed: ${response.status} ${errorBody}`)
  }

  return response.json()
}

export type UserProgressPayload = {
  userId: string
  name: string
  xp: number
  streak: number
  completedLessons: string[]
  achievements: string[]
  lastLoginDate: string
}

export type Lesson = {
  id: string
  title: string
  icon: string
  description: string
  questions: {
    id: string
    type: 'letter' | 'word' | 'mcq'
    prompt: string
    choices?: string[]
    answer: string
  }[]
}

export const getLessons = async () => {
  return fetchJson('/api/lessons') as Promise<Lesson[]>
}

export const getUser = async (userId: string) => {
  return fetchJson(`/api/users/${userId}`) as Promise<UserProgressPayload>
}

export const createUser = async (user: UserProgressPayload) => {
  return fetchJson('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  }) as Promise<UserProgressPayload>
}

export type AIHintRequest = {
  question: string
  answer: string
  lessonTitle: string
  userName: string
}

export type AIHintResponse = {
  hint: string
  source: 'openai' | 'local'
}

export const requestAIHint = async (request: AIHintRequest) => {
  return fetchJson('/api/ai/hint', {
    method: 'POST',
    body: JSON.stringify(request)
  }) as Promise<AIHintResponse>
}

export const saveUser = async (user: UserProgressPayload) => {
  return fetchJson(`/api/users/${user.userId}`, {
    method: 'PUT',
    body: JSON.stringify(user)
  }) as Promise<UserProgressPayload>
}
