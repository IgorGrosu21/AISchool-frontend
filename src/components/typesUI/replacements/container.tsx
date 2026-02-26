'use client'

import { ILessonTimeName, ILessonName, ITeacherWithReplacements, IReplacementName } from "@/interfaces";
import { useCallback, useMemo, useState } from "react";
import { addDays, isWithinInterval, parse, startOfWeek } from "date-fns";
import { WeekCarousel } from "../diary";
import { useYear } from "@/hooks";
import { dateToDayAndMonth, weekdays } from "@/utils/dates";
import { TimetableContainer } from "../lessonsTime";
import { Lesson } from "../lessons";

interface ReplacementsContainerProps {
  teachers: ITeacherWithReplacements[]
  readonly timetable: ReadonlyArray<ILessonTimeName>
  readonly lessons: ReadonlyArray<ILessonName>
  render: (lesson: ILessonName, date: Date, replacement?: IReplacementName) => React.ReactNode
  showSubject?: boolean
}

export function ReplacementsContainer({teachers, timetable, lessons, render, showSubject = true}: ReplacementsContainerProps) {
  const today = useMemo(() => new Date(), [])
  const [currentDay, setCurrentDay] = useState<Date>(today)
  const year = useYear(currentDay)

  const startDay = useMemo(() => startOfWeek(currentDay, { weekStartsOn: 1 }), [currentDay])
  const endDay = useMemo(() => addDays(startDay, 6), [startDay])
  const dates = useMemo(() => Array.from({length: 7}, (_, i) => dateToDayAndMonth(addDays(startDay, i))), [startDay])

  const replacements = useMemo(() => teachers.flatMap(t => t.replacements).filter(
    r => isWithinInterval(parse(r.date, 'yyyy.MM.dd', new Date()), {
      start: startDay,
      end: endDay
    })
  ), [startDay, endDay, teachers])

  const getDate = useCallback((lessonTime: ILessonTimeName) => {
    const index = weekdays.indexOf(lessonTime.weekday)
    return addDays(startDay, index !== -1 ? index : 6)
  }, [startDay])

  return <WeekCarousel
    startDay={startDay}
    endDay={endDay}
    year={year}
    setActiveDay={setCurrentDay}
    currentDay={currentDay}
  >
    <TimetableContainer timetable={timetable} dates={dates} render={lessonTime => {
      const lesson = lessons.find(l => l.lessonTimeId === lessonTime.id)
      const replacement = replacements.find(r => r.lesson.id === lesson?.id)
      if (!replacement) return null
      return <Lesson key={lessonTime.order} lessonTime={lessonTime} lesson={lesson} showSubject={showSubject}>
        {lesson && render(lesson, getDate(lessonTime), replacement)}
      </Lesson>
    }} />
  </WeekCarousel>
}