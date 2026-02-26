'use client'

import { ILessonTimeName } from "@/interfaces"
import { TimetableContainer } from "./container"

//mui components
import Typography from "@mui/material/Typography"

interface LessonTimeProps {
  timetable: ReadonlyArray<ILessonTimeName>
}

export function LessonTime({timetable}: LessonTimeProps) {
  return <TimetableContainer timetable={timetable} render={(lessonTime) => <Typography key={lessonTime.order} variant='h6' sx={{textAlign: 'center'}}>
    {lessonTime.order + 1}. {lessonTime.starting} - {lessonTime.ending}
  </Typography>} />
}