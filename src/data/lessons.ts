import lessonsData from '../../data/lessons.json'

export type Question = {
  id: string
  type: 'letter' | 'word' | 'mcq'
  prompt: string
  choices?: string[]
  answer: string
}

export type Lesson = {
  id: string
  title: string
  icon: string
  description: string
  questions: Question[]
}

export const lessons: Lesson[] = lessonsData
