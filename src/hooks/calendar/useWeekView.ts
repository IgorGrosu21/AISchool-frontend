'use client'

import { getReplacements, getSpecificLessons } from '@/app/actions';
import { useDiaryContext } from '@/providers';
import { IReplacementName, ISpecificLessonName } from '@/interfaces';
import { dateToNormal } from '@/utils/dates';
import { useEffect, useState, useTransition } from 'react';

const DEBOUNCE_MS = 500;

export function useWeekView(startDay: Date, endDay: Date) {
  const { childId, schoolSlug } = useDiaryContext()
  
  const [replacements, setReplacements] = useState<IReplacementName[]>([])
  const [specificLessons, setSpecificLessons] = useState<ISpecificLessonName[]>([])
  const [isPending, startTransition] = useTransition()

  //debouncing values to not fetch the server until the user stops jumping between weeks
  const [debouncedStart, setDebouncedStart] = useState(startDay);
  const [debouncedEnd, setDebouncedEnd] = useState(endDay);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedStart(startDay);
      setDebouncedEnd(endDay);
    }, DEBOUNCE_MS);

    /*as I understand, when the dependencies update, useEffect calls clearTimeout,
      so the state doesn't change if the dependencies don't change long enough (DEBOUNCE_MS)*/
    return () => clearTimeout(timeout);
  }, [startDay, endDay])

  useEffect(() => {
    startTransition(async () => {
      //though this is client component, we still want to fetch on the server to cache the data
      const [startDay, endDay] = [
        dateToNormal(debouncedStart),
        dateToNormal(debouncedEnd)
      ]
      const [replacements, specificLessons] = await Promise.all([
        getReplacements(startDay, endDay, schoolSlug, childId),
        getSpecificLessons(startDay, endDay, schoolSlug, childId)
      ])
      setReplacements(replacements)
      setSpecificLessons(specificLessons)
    })
  }, [debouncedStart, debouncedEnd, schoolSlug, childId])

  return { replacements, specificLessons, isPending }
}