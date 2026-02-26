'use client'

import { ILessonTimeName } from "@/interfaces"
import { useTranslations } from "next-intl"
import React, { useMemo } from "react"
import { Panel } from "@/ui"
import { weekdays } from "@/utils/dates"

//mui components
import Divider from "@mui/material/Divider"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface TimetableContainerProps {
  readonly timetable: ReadonlyArray<ILessonTimeName>
  readonly dates?: ReadonlyArray<string>
  render: (lessonTime: ILessonTimeName, groupIndex: number) => React.ReactNode
}

export function TimetableContainer({timetable, dates, render}: TimetableContainerProps) {
  const lessonTimeGroups = useMemo(() => weekdays.slice(0, -1).map(w => ({
    weekday: w,
    timetable: timetable.filter(l => l.weekday === w)
  })), [timetable])
  const t = useTranslations('lesson_time');

  return <Grid2 container spacing={4} columns={{xs: 1, md: 3}} sx={{width: '100%'}}>
    {lessonTimeGroups.map((lessonTimeGroup, i) => <Grid2 key={i} size={1}>
      <Panel gap={4} sx={{height: '100%'}}>
        <Typography variant='h6' color='secondary' sx={{textAlign: 'center'}}>
          {t(`weekdays.${lessonTimeGroup.weekday}`)}{dates && `, ${dates[i]}`}
        </Typography>
        <Divider />
        <Stack gap={2}>
          {lessonTimeGroup.timetable.length > 0 ? lessonTimeGroup.timetable.map(
            lessonTime => render(lessonTime, i)
          ) : <Typography variant='h5' color='primary' sx={{textAlign: 'center'}}>
            {t('no_timetable')}
          </Typography>}
        </Stack>
      </Panel>
    </Grid2>)}
  </Grid2>
}