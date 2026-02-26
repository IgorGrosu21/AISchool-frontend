'use client'

import { useCallback } from "react"
import { isWithinInterval } from "date-fns"
import { IPersonDiary } from "@/interfaces"

export function useHolidayChecker(holidays: (IPersonDiary & {profileType: 'student'})['school']['holidays']) {
  const isHoliday = useCallback((date: Date) => {
    return holidays.some(holiday => isWithinInterval(date, {start: new Date(holiday.start), end: new Date(holiday.end)}))
  }, [holidays])

  return isHoliday
}