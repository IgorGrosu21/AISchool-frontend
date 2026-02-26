'use client'

import { ILessonTimeName, ISchoolWithTimetable } from "@/interfaces";
import { useTranslations } from "next-intl";
import { TimetableContainer } from "./container";
import { useLessonTimeEditor } from "@/hooks";

//mui components
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface LessonTimeEditorProps {
  school: ISchoolWithTimetable
  setTimetable: (val: ILessonTimeName[]) => void
}

export function LessonTimeEditor({school, setTimetable}: LessonTimeEditorProps) {
  const t = useTranslations('lesson_time')
  const { duration, setDuration, updateTime } = useLessonTimeEditor(school, setTimetable)

  return <Stack gap={8}>
    <Stack gap={2} direction={{xs: 'column', md: 'row'}} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Stack>
        <Typography variant='h5'>{t('desc')}</Typography>
        <Typography>{t('helper')}</Typography>
        <Typography>({t('delete_helper')})</Typography>
      </Stack>
      <TextField value={duration} onChange={e => setDuration(Number(e.target.value))} label={t('duration')} />
    </Stack>
    <TimetableContainer timetable={school.timetable} render={lessonTime => <Stack key={lessonTime.order} direction='row' gap={2} sx={{alignItems: 'center'}}>
      <Typography variant='h6'>{lessonTime.order + 1}.</Typography>
      <TextField value={lessonTime.starting} label={t('starting')} onChange={e => updateTime(
        lessonTime.weekday, lessonTime.order, 'starting', e.target.value
      )} />
      <Typography variant='h6'>-</Typography>
      <TextField value={lessonTime.ending} label={t('ending')} onChange={e => updateTime(
        lessonTime.weekday, lessonTime.order, 'ending', e.target.value
      )} />
    </Stack>} />
  </Stack>
}