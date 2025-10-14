'use client'

import { SpecificLesson } from "@/components"
import { Card } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { Link } from "@/i18n"
import { useMemo } from "react"

//mui components
import Stack from "@mui/material/Stack"

interface TomorrowTimetableProps {
  id: string
  accountType: 'teacher' | 'student'
  tomorrowTimetable: (IPersonHome & { profileType: 'teacher' | 'student' })['tomorrowTimetable']
}

export function TomorrowTimetable({id, accountType, tomorrowTimetable}: TomorrowTimetableProps) {

  const link = useMemo(() => {
    if (accountType === 'teacher') {
      return `/core/diary/teachers/${id}/${tomorrowTimetable[0].school}/`
    }
    return `/core/diary/students/${id}`
  }, [accountType, id, tomorrowTimetable])

  return <Stack sx={{width: {xs: '100%', md: '50%'}}}>
    <Link href={link}>
      <Card index={0}>
        <Stack gap={2} sx={{flex: 1}}>
          {tomorrowTimetable.map((lessonTime, i) => <SpecificLesson
            key={i}
            lessonTime={lessonTime}
            lesson={lessonTime.lesson}
            specificLesson={lessonTime.specificLesson}
            accountType={accountType}
            disableLink
          />)}
        </Stack>
      </Card>
    </Link>
  </Stack>
}