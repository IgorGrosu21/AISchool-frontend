'use client'

import { AttachedItemsProvider, useHomeworkEditorContext } from '@/providers'
import { useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { SmallProfile, Note, AttachedLinksEditor, AttachedFilesEditor, AttachedLinks, AttachedFiles, SpecificLessonHeader } from '@/components'
import { Panel } from '@/ui'
import { grantPermission } from '@/utils/permissions'
import { usePermissions } from '@/hooks'

//mui components
import Box from "@mui/material/Box"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface ContainerProps {
  date: string
}

export function Editor({date}: ContainerProps) {
  const { instance: homework, setInstance: setHomework } = useHomeworkEditorContext()
  const specificLesson = useMemo(() => homework.specificLesson, [homework.specificLesson])
  const lesson = useMemo(() => specificLesson.lesson, [specificLesson.lesson])
  const note = useMemo(() => homework.note, [homework.note])
  const { permissions } = usePermissions()
  const permissionGranted = useMemo(() => grantPermission(permissions, { type: 'notes' }), [permissions])
    
  const t = useTranslations('specific_lessons')

  const updateComment = useCallback((comment: string) => {
    setHomework(h => ({...h, comment}))
  }, [setHomework])

  return <Stack gap={8}>
    <SpecificLessonHeader specificLesson={specificLesson} date={date} canEdit={permissionGranted}>
      <Grid2 container spacing={2} columns={{xs: 1, md: 2}}>
        <Grid2 size={1}>
          <Panel gap={2} sx={{height: '100%'}}>
            <Typography variant='h5'>{t('title')}</Typography>
            <Typography variant='h6'>{specificLesson.title}</Typography>
          </Panel>
        </Grid2>
        <Grid2 size={1}>
          <AttachedLinks links={specificLesson.links} />
        </Grid2>
        <Grid2 size={1}>
          <Panel gap={2} sx={{height: '100%'}}>
            <Typography variant='h5'>{t('desc')}</Typography>
            <Typography variant='h6'>{specificLesson.desc}</Typography>
          </Panel>
        </Grid2>
        <Grid2 size={1}>
          <AttachedFiles files={specificLesson.files} />
        </Grid2>
      </Grid2>
    </SpecificLessonHeader>
    <AttachedItemsProvider value={{ setInstance: setHomework }}>
      <Stack gap={4}>
        <Panel direction='row' gap={{xs: 2, md: 4}} sx={{alignItems: 'center'}}>
          <SmallProfile user={lesson.teacher?.user ?? null} extraSmall />
          <Box sx={{flex: 1}} />
          <Note value={note?.value} big />
        </Panel>
        <Grid2 container spacing={2} columns={{xs: 1, md: 2}}>
          <Grid2 size={1}>
            <Panel gap={2} sx={{height: '100%'}}>
              <Typography variant='h5'>{t('student_comment')}:</Typography>
              <TextField value={homework?.comment ?? ''} onChange={e => updateComment(e.target.value)} />
            </Panel>
          </Grid2>
          <Grid2 size={1}>
            <AttachedLinksEditor instance={homework} />
          </Grid2>
          <Grid2 size={1}>
            <Panel gap={2} sx={{height: '100%'}}>
              <Typography variant='h5'>{t('teacher_comment')}:</Typography>
              <Typography variant='h6'>{note?.comment}</Typography>
            </Panel>
          </Grid2>
          <Grid2 size={1}>
            <AttachedFilesEditor instance={homework} />
          </Grid2>
        </Grid2>
      </Stack>
    </AttachedItemsProvider>
  </Stack>
}