import { useEffect, useState } from 'react'
import localLessons from '../../data/lessons.json'
import { getLessons } from '../utils/api'
import type { Lesson } from '../data/lessons'

export type { Lesson }

export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>(localLessons)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    getLessons()
      .then((remoteLessons) => {
        if (!active) return
        setLessons(remoteLessons)
      })
      .catch((err) => {
        if (!active) return
        setError(err?.message ?? 'Could not load lessons from the backend.')
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { lessons, loading, error }
}
