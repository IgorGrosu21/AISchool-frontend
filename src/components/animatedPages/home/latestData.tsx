'use client'

import { Note, SmallProfile } from "@/components"
import { Card } from "@/ui"
import { INote, IDetailedHomework, IPersonHome } from "@/interfaces"
import { Link } from "@/i18n"
import { useCallback } from "react"

//mui components
import Box from "@mui/material/Box"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

type LatestDataProps = {
  readonly profileType: 'student' | 'teacher'
  readonly latestData: (IPersonHome & { profileType: 'student' | 'teacher' })['latestData']
}

export function LatestData({profileType, latestData}: LatestDataProps) {
  const getLink = useCallback((data: typeof latestData[number]) => {
    const specificLesson = data.specificLesson
    const date = specificLesson.date
    const lesson = specificLesson.lesson

    const type = profileType === 'student' ? 'homeworks' : 'lessons'
    const schoolSlug = lesson.klassOrGroup.schoolSlug
    const klassOrGroupSlug = lesson.klassOrGroup.slug
    const lessonTimeSlug = lesson.lessonTime.slug
    const studentId = data.student.id

    return `/core/${type}/${schoolSlug}/${klassOrGroupSlug}/${lessonTimeSlug}/${date}/?studentId=${studentId}`
  }, [profileType])

  return <Grid2 container spacing={4} sx={{width: {xs: '100%', md: latestData.length > 1 ? '100%' : '50%'}}}>
    {latestData.map((data, i) => <Grid2 size={{ xs: 12, md: latestData.length > 1 ? 6 : 12 }} key={i}>
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
                user={profileType === 'student' ? data.specificLesson.lesson.teacher?.user ?? null : (data as IDetailedHomework).student.user ?? null}
                disableLink
              />
              <Note
                big={true}
                value={profileType === 'student' ? (data as INote).value : (data as IDetailedHomework).note?.value}
              />
            </Stack>
          </Stack>
        </Link>
      </Card>
    </Grid2>)}
  </Grid2>
}