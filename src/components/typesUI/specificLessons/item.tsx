'use client'

import { Lesson } from "../lessons"
import { ILessonTimeName, ILessonName, ISpecificLessonName } from "@/interfaces"
import { Note } from "@/components"
import { useTranslations } from "next-intl";

//mui components
import Stack, { type StackProps } from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface SpecificLessonsProps extends StackProps {
  lessonTime: ILessonTimeName
  lesson?: ILessonName;
  specificLesson?: ISpecificLessonName
  profileType: 'student' | 'teacher' | 'parent'
  onClick?: () => void
  isReplacement?: boolean
}

export function SpecificLesson({lessonTime, lesson, specificLesson, profileType, onClick, isReplacement = false}: SpecificLessonsProps) {
  const t = useTranslations('specific_lessons')
  
  return <Lesson
    lessonTime={lessonTime}
    lesson={lesson}
    onClick={onClick}
  >
    <Stack direction='row' gap={2}>
      <Stack gap={1} sx={{flex: 1, alignItems: 'flex-start'}}>
        {lesson && <Typography color='secondary'>
          {profileType === 'teacher'
          ?
          lesson.klassOrGroupSlug.split('-')[0]
          :
          (lesson.teacher?.user.surname ?? '') + ' ' + (lesson.teacher?.user.name ?? '')
          }
          {isReplacement ? ` (${t('replacement')})` : ''}
        </Typography>}
        {specificLesson && <Typography>{specificLesson?.title}</Typography>}
      </Stack>
      {specificLesson?.noteValue && <Note value={specificLesson.noteValue} big />}
    </Stack>
  </Lesson>
}