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
  incrementStreak: () => void
  addAchievement: (achievementId: string) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProgress | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('user-progress')
    if (saved) {
      setUser(JSON.parse(saved))
    }
  }, [])

  const saveUser = (updatedUser: UserProgress) => {
    setUser(updatedUser)
    localStorage.setItem('user-progress', JSON.stringify(updatedUser))
  }

  const addXP = (amount: number) => {
    if (user) {
      saveUser({ ...user, xp: user.xp + amount })
    }
  }

  const completeLesson = (lessonId: string) => {
    if (user && !user.completedLessons.includes(lessonId)) {
      const updated = { ...user, completedLessons: [...user.completedLessons, lessonId] }
      saveUser(updated)
    }
  }

  const incrementStreak = () => {
    if (user) {
      saveUser({ ...user, streak: user.streak + 1, lastLoginDate: new Date().toISOString() })
    }
  }

  const addAchievement = (achievementId: string) => {
    if (user && !user.achievements.includes(achievementId)) {
      const updated = { ...user, achievements: [...user.achievements, achievementId] }
      saveUser(updated)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, addXP, completeLesson, incrementStreak, addAchievement }}>
      {children}
    </UserContext.Provider>
  )
}
