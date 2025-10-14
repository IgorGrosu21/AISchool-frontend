'use client'

import { Note, SmallProfile } from "@/components"
import { Card } from "@/ui"
import { INote, IDetailedHomework } from "@/interfaces"
import { Link } from "@/i18n"
import { useCallback } from "react"

//mui components
import Box from "@mui/material/Box"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

type LatestDataProps = {
  accountType: 'student' | 'teacher'
  latestData: INote[] | IDetailedHomework[]
}

export function LatestData({accountType,latestData}: LatestDataProps) {
  const getLink = useCallback((data: typeof latestData[number]) => {
    const specificLesson = data.specificLesson
    const lesson = specificLesson.lesson
    const klass = lesson.klass
    const school = klass.school
    const personId = data.student.id

    return `/core/homeworks/${school.slug}/${klass.slug}/${personId}/${lesson.id}/${specificLesson.id}`
  }, [])

  return <Grid2 container spacing={4}>
    {latestData.map((data, i) => <Grid2 size={{ xs: 12, md: 6 }} key={i}>
      <Card index={i}>
        <Link href={getLink(data)} style={{display: 'block', height: '100%'}}>
          <Stack gap={2} sx={{height: '100%'}}>
            <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{
              justifyContent: 'space-between',
              alignItems: {xs: 'center', md: 'flex-start'}
            }}>
              <Stack gap={1} sx={{alignItems: {xs: 'center', md: 'flex-start'}}}>
                <Typography variant="h6" color='primary' sx={{textAlign: 'start'}}>
                  {data.specificLesson.title}
                </Typography>
                <Typography variant="h6" sx={{color: 'text.primary'}}>
                  {data.comment}
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{color: 'text.secondary'}}>
                {data.specificLesson.date}
              </Typography>
            </Stack>
            <Box sx={{flex: 1}} />
            <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
              <SmallProfile
                user={accountType === 'student' ? data.specificLesson.lesson.teacher?.user : (data as IDetailedHomework).student.user}
                disableLink
              />
              <Note
                big={true}
                value={accountType === 'student' ? (data as INote).value : (data as IDetailedHomework).note?.value}
              />
            </Stack>
          </Stack>
        </Link>
      </Card>
    </Grid2>)}
  </Grid2>
}