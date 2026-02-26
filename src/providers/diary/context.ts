'use client'

import { ILessonTimeName, ILessonName, IPersonDiary } from "@/interfaces"
import { createContext, useContext } from "react"

export type DiaryContextType = {
  lessons: ILessonName[]
  profileType: 'teacher' | 'student' | 'parent'
  schoolSlug?: string
  childId?: string
  readonly timetable: ReadonlyArray<ILessonTimeName>
  readonly holidays: (IPersonDiary & {profileType: 'student'})['school']['holidays']
}

export const DiaryContext = createContext<DiaryContextType | null>(null)

export const useDiaryContext = () => useContext(DiaryContext)!