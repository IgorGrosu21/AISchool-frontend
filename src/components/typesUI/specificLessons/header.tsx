'use client'

import Image from 'next/image';
import { Link } from '@/i18n'
import { ISpecificLesson } from '@/interfaces';
import { useMemo } from 'react';
import { KlassLink } from '@/components';
import { Panel } from '@/ui';

//mui components
import Fab from "@mui/material/Fab"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import EditIcon from "@mui/icons-material/Edit"

interface SpecificLessonHeaderProps extends React.PropsWithChildren {
  specificLesson: ISpecificLesson
  date: string
  canEdit?: boolean
}

export function SpecificLessonHeader({specificLesson, date, canEdit = false, children}: SpecificLessonHeaderProps) {
  const lesson = useMemo(() => specificLesson.lesson, [specificLesson.lesson])
  const klassOrGroup = useMemo(() => lesson.klassOrGroup, [lesson.klassOrGroup])
  const klass = useMemo(() => {
    if (lesson.type === 'klass') {
      return lesson.klass
    }
    const groupSlug = lesson.group.slug
    const klassSlug = groupSlug.split('-')[0]
    return {
      grade: Number(klassSlug.slice(0, -1)),
      letter: klassSlug.at(-1)!,
      slug: klassSlug,
    }
  }, [lesson])
  
  return <Stack gap={2} sx={{flex: 1}}>
    <Panel direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Link href={`/core/diary/?schoolSlug=${klassOrGroup.schoolSlug}&rawDate=${specificLesson.date}`}>
        <Typography variant='h5' color='primary'>{lesson.subjectName}</Typography>
        <Typography color='textDisabled' variant='h6' sx={{textAlign: {xs: 'start', md: 'end'}}}>{date}, {lesson.lessonTime.starting}</Typography>
      </Link>
      <Stack direction='row' gap={2} sx={{justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap'}}>
        <KlassLink hrefTemplate={`/core/schools/${klass.slug}/klasses`} klass={klass} />
        <Image
          src={`${process.env.NEXT_PUBLIC_MANUALS_URL}/media/subjects/${lesson.subjectSlug.split('-')[0]}.png`}
          alt={lesson.subjectName}
          width={67.5}
          height={67.5}
          loading='lazy'
        />
        {canEdit && <Link href={`/core/lessons/${klassOrGroup.schoolSlug}/${klassOrGroup.slug}/${lesson.lessonTime.slug}/${specificLesson.date}`}>
          <Fab 
            color='primary'
            size='medium'
            sx={{
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }
            }}
          >
            <EditIcon />
          </Fab>
        </Link>}
      </Stack>
    </Panel>
    {children}
  </Stack>
}