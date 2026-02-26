'use client'

import { ProviderProps } from "react"
import { ILessonTimeName, ILessonName, IPersonDiary } from "@/interfaces";

import { DiaryContext } from "./context";

type DiaryProviderValue = {
  lessons: ILessonName[]
  profileType: 'teacher' | 'student' | 'parent'
  schoolSlug?: string
  childId?: string
  readonly timetable: ReadonlyArray<ILessonTimeName>
  readonly holidays: (IPersonDiary & {profileType: 'student'})['school']['holidays']
}

export function DiaryProvider({children, value}: ProviderProps<DiaryProviderValue>) {
  return <DiaryContext.Provider value={{
    lessons: value.lessons,
    profileType: value.profileType,
    schoolSlug: value.profileType === 'teacher' ? value.schoolSlug : undefined,
    childId: value.profileType === 'parent' ? value.childId : undefined,
    timetable: value.timetable,
    holidays: value.holidays,
  }}>
    {children}
  </DiaryContext.Provider>
}