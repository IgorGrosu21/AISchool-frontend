'use client'

import { Lesson } from "../lessons"
import { ILessonTimeName, ILessonName, ISpecificLessonName } from "@/interfaces"
import { Note } from "@/components"

//mui components
import Stack, { type StackProps } from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface SpecificLessonsProps extends StackProps {
  lessonTime: ILessonTimeName
  lesson?: ILessonName;
  specificLesson?: ISpecificLessonName
  accountType: 'student' | 'teacher'
  onClick?: () => void
  disableLink?: boolean
}

export function SpecificLesson({lessonTime, lesson, specificLesson, accountType, onClick, disableLink = false}: SpecificLessonsProps) {
  return <Lesson
    lessonTime={lessonTime}
    lesson={lesson}
    disableLink={disableLink}
    onClick={onClick}
  >
    <Stack direction='row' gap={2}>
      <Stack gap={1} sx={{flex: 1, alignItems: 'flex-start'}}>
        {accountType == 'student' ? <Typography color='secondary'>
          {lesson?.teacher?.user.surname ?? ''} {lesson?.teacher?.user.name ?? ''}
        </Typography> : <Typography color='secondary'>
          {lesson?.klassSlug}
        </Typography>}
        {specificLesson && <Typography>{specificLesson?.title}</Typography>}
      </Stack>
      {specificLesson?.note && <Note value={specificLesson.note} big />}
    </Stack>
  </Lesson>
}