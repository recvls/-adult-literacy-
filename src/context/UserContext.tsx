import React, { createContext, useState, useEffect } from 'react'

export interface UserProgress {
  userId: string
  name: string
  xp: number
  streak: number
  completedLessons: string[]
  achievements: string[]
  lastLoginDate: string
}

interface UserContextType {
  user: UserProgress | null
  setUser: (user: UserProgress | null) => void
  addXP: (amount: number) => void
  completeLesson: (lessonId: string) => void
  logout: () => void
  addAchievement: (achievementId: string) => void
}

const achievementRules = [
  { id: 'first-lesson', condition: (user: UserProgress) => user.completedLessons.length >= 1 },
  { id: 'five-lessons', condition: (user: UserProgress) => user.completedLessons.length >= 5 },
  { id: 'perfect-streak-7', condition: (user: UserProgress) => user.streak >= 7 },
  { id: 'hundred-xp', condition: (user: UserProgress) => user.xp >= 100 },
  { id: 'all-letters', condition: (user: UserProgress) => user.completedLessons.includes('letters-1') && user.completedLessons.includes('letters-2') },
  { id: 'all-words', condition: (user: UserProgress) => user.completedLessons.includes('words-1') && user.completedLessons.includes('words-2') }
]

export const UserContext = createContext<UserContextType | undefined>(undefined)

const getDayKey = (date = new Date()) => date.toISOString().slice(0, 10)

const normalizeUser = (user: UserProgress): UserProgress => {
  const lastLoginDay = getDayKey(new Date(user.lastLoginDate))
  const today = getDayKey()
  const yesterday = getDayKey(new Date(Date.now() - 24 * 60 * 60 * 1000))

  if (lastLoginDay === today) {
    return user
  }

  const streak = lastLoginDay === yesterday ? user.streak + 1 : 1
  return { ...user, streak, lastLoginDate: new Date().toISOString() }
}

const buildAchievements = (user: UserProgress): string[] => {
  const unlocked = achievementRules
    .filter((rule) => rule.condition(user))
    .map((rule) => rule.id)

  return Array.from(new Set([...user.achievements, ...unlocked]))
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProgress | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('user-progress')
    if (!saved) return

    try {
      const parsed = JSON.parse(saved) as Partial<UserProgress>
      const loadedUser: UserProgress = {
        userId: parsed.userId ?? `user-${Date.now()}`,
        name: parsed.name ?? 'Learner',
        xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
        streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
        completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
        achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
        lastLoginDate: typeof parsed.lastLoginDate === 'string' ? parsed.lastLoginDate : new Date().toISOString()
      }
      setUser({
  ...loadedUser,
  achievements: buildAchievements(loadedUser)
})
    } catch {
      localStorage.removeItem('user-progress')
    }
  }, [])

  useEffect(() => {
    if (!user) return

    const normalized = normalizeUser(user)
    if (normalized.streak !== user.streak || normalized.lastLoginDate !== user.lastLoginDate) {
      saveUser(normalized)
    }
  }, [user])

  const saveUser = (updatedUser: UserProgress) => {
    const withAchievements = { ...updatedUser, achievements: buildAchievements(updatedUser) }
    setUser(withAchievements)
    localStorage.setItem('user-progress', JSON.stringify(withAchievements))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user-progress')
  }

  const addXP = (amount: number) => {
    if (user) {
      saveUser({ ...user, xp: user.xp + amount })
    }
  }

  const completeLesson = (lessonId: string) => {
    if (!user) return
    if (user.completedLessons.includes(lessonId)) return

    saveUser({ ...user, completedLessons: [...user.completedLessons, lessonId] })
  }

  const addAchievement = (achievementId: string) => {
    if (!user || user.achievements.includes(achievementId)) return
    saveUser({ ...user, achievements: [...user.achievements, achievementId] })
  }

  return (
    <UserContext.Provider value={{ user, setUser, addXP, completeLesson, logout, addAchievement }}>
      {children}
    </UserContext.Provider>
  )
}
