'use client'

import { IGroupWithLessons, ILessonName, ILessonTimeName } from "@/interfaces";
import { useCallback } from "react";
import { TimetableContainer } from "../lessonsTime";
import { Link } from '@/i18n';
import { Lesson } from "./item";

//mui components
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"

interface LessonsProps {
  readonly groups: IGroupWithLessons[]
  readonly timetable: ReadonlyArray<ILessonTimeName>
  readonly lessons: ReadonlyArray<ILessonName>
}

export function Lessons({groups, timetable, lessons}: LessonsProps) {
  const getGroups = useCallback((subjectSlug: string) => groups.filter(g => g.subjectSlug === subjectSlug), [groups])

  return <TimetableContainer timetable={timetable} render={lessonTime => {
    const lesson = lessons.find(l => l.lessonTimeId === lessonTime.id)
    const groups = lesson ? getGroups(lesson.subjectSlug) : []

    return <Lesson key={lessonTime.order} lessonTime={lessonTime} lesson={lesson}>
      {groups.length === 0 ? <Link href={`/core/teachers/${lesson?.teacher?.id}`}>
        <Typography color='primary'>{lesson?.teacher?.user.surname ?? ''} {lesson?.teacher?.user.name ?? ''}</Typography>
      </Link> : <Breadcrumbs>
        {groups.map((group, k) => <Link key={k} href={`/core/teachers/${group.teacher?.id}`}>
          <Typography color='primary'>{group.teacher?.user.surname ?? ''} {group.teacher?.user.name ?? ''}</Typography>
        </Link>)}
      </Breadcrumbs>}
    </Lesson>
  }} />
}