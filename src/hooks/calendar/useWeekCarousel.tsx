'use client'

import { addDays, compareAsc, compareDesc, isSameWeek, subDays } from 'date-fns';
import { useCallback, useMemo } from 'react';

export function useWeekCarousel(startDay: Date, endDay: Date, year: number, setActiveDay: (day: Date) => void, currentDay: Date) {
  const isCurrent = useMemo(() => isSameWeek(startDay, currentDay, { weekStartsOn: 1 }), [currentDay, startDay])
  
  //we store the dates in memo, to not recreate constant dates every time active day changes
  const firstDay = useMemo(() => new Date(year - 1, 8, 1), [year]) //the year comes as the end of the academic year so we subtract one
  const lastDay = useMemo(() => new Date(year, 4, 31), [year]) //31 of may is the end of the academic year so we keep the year as it is
  const canSubDays = useMemo(() => compareAsc(subDays(endDay, 7), firstDay) > -1, [endDay, firstDay]) //we need the subbed end day to be greater than first day
  const canAddDays = useMemo(() => compareDesc(addDays(startDay, 7), lastDay) > -1, [lastDay, startDay]) //we need the added start day to be less than last day

  const goToPrevWeek = useCallback(() => {
    setActiveDay(subDays(startDay, 7))
  }, [startDay, setActiveDay])
  
  const goToNextWeek = useCallback(() => {
    setActiveDay(addDays(endDay, 7))
  }, [endDay, setActiveDay])

  return {
    startDay, endDay,
    isCurrent, canSubDays, canAddDays,
    goToPrevWeek, goToNextWeek
  }
}