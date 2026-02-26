'use client'

import { SpecificLesson } from "@/components"
import { Card } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { Link } from "@/i18n"

//mui components
import Stack from "@mui/material/Stack"

interface TomorrowTimetableProps {
  readonly profileType: 'teacher' | 'student'
  readonly tomorrowTimetable: (IPersonHome & { profileType: 'teacher' | 'student' })['tomorrowTimetable']
}

export function TomorrowTimetable({profileType, tomorrowTimetable}: TomorrowTimetableProps) {
  return <Stack sx={{width: {xs: '100%', md: '50%'}}}>
    <Link href='/core/diary/'>
      <Card index={0}>
        <Stack gap={2} sx={{flex: 1}}>
          {tomorrowTimetable.map((lessonTime, i) => <SpecificLesson
            key={i}
            lessonTime={lessonTime}
            lesson={lessonTime.lesson ?? undefined}
            specificLesson={lessonTime.specificLesson ?? undefined}
            profileType={profileType}
          />)}
        </Stack>
      </Card>
    </Link>
  </Stack>
}