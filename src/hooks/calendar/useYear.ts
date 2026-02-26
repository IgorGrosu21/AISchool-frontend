'use client'

import { useMemo } from 'react'

export function useYear(currentDay: Date) {
  const year = useMemo(() => {
    return currentDay.getMonth() < 8 ? currentDay.getFullYear() : currentDay.getFullYear() + 1
  }, [currentDay]) // set the year when the klass ends 2025/2026 -> 2026
  return year
}