'use client'

import { ILessonTime, ISchoolWithTimetable } from "@/interfaces";
import { Lessons } from "../../lessons";
import { useCallback } from "react";
import { useKlassContext } from "@/providers";

interface SchoolLessonsProps {
  school: ISchoolWithTimetable
}

export function SchoolLessons({school}: SchoolLessonsProps) {
  const { klass } = useKlassContext()

  const getLessonName = useCallback((lessonTime: ILessonTime) => lessonTime.lessons.find(l => l.klass === klass.id), [klass])

  return <Lessons
    groups={klass.groups}
    timetable={school.timetable}
    getLessonName={getLessonName}
  />
}