'use client'

import { AttachedItemsProvider, useSpecificLessonEditorContext } from '@/providers'
import { useTranslations } from 'next-intl'
import { AttachedFilesEditor, AttachedLinksEditor, Note, AttachedFiles, AttachedLinks, SpecificLessonHeader, NotePicker, StudentsPicker } from '@/components'
import { Panel, WithLoader } from '@/ui'
import { usePermissions, useSpecificLessonEditor } from '@/hooks'
import { useMemo, useState } from 'react'
import { grantPermission } from '@/utils/permissions'

//mui components
import Box from "@mui/material/Box"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface ContainerProps {
  date: string
  studentId?: string
}

export function Editor({date, studentId}: ContainerProps) {
  const { instance: specificLesson, setInstance: setSpecificLesson } = useSpecificLessonEditorContext()
  const {
    isPending,
    students, activeStudent, setActiveStudent,
    activeHomework, activeNote, updateNote, updateNoteComment
  } = useSpecificLessonEditor(studentId)
  const [notesOpened, openNotes] = useState(false)
  const t = useTranslations('specific_lessons')
  const [studentsPickerAnchor, setStudentsPickerAnchor] = useState<HTMLDivElement | null>(null)
  const { permissions } = usePermissions()
  const permissionGranted = useMemo(() => grantPermission(permissions, { type: 'specificLesson' }), [permissions])

  return <Stack gap={8}>
    <AttachedItemsProvider value={{ setInstance: setSpecificLesson }}>
      <SpecificLessonHeader specificLesson={specificLesson} date={date}>
        <Grid2 container spacing={2} columns={{xs: 1, md: 2}}>
          <Grid2 size={1}>
            <Panel gap={2} sx={{height: '100%'}}>
              <Typography variant='h5'>{t('title')}</Typography>
              <TextField value={specificLesson.title} onChange={e => setSpecificLesson(l => ({...l, title: e.target.value}))} />
            </Panel>
          </Grid2>
          <Grid2 size={1}>
            <AttachedLinksEditor instance={specificLesson} small={false} />
          </Grid2>
          <Grid2 size={1}>
            <Panel gap={2} sx={{height: '100%'}}>
              <Typography variant='h5'>{t('desc')}</Typography>
              <TextField multiline maxRows={10} value={specificLesson.desc} onChange={e => setSpecificLesson(l => ({...l, desc: e.target.value}))} />
            </Panel>
          </Grid2>
          <Grid2 size={1}>
            <AttachedFilesEditor instance={specificLesson} small={false} />
          </Grid2>
        </Grid2>
      </SpecificLessonHeader>
    </AttachedItemsProvider>
    {permissionGranted && <WithLoader loading={isPending} gap={4}>
      <Box ref={(el: HTMLDivElement | null) => setStudentsPickerAnchor(el)} sx={{position: 'relative'}}>
        <Panel direction='row' gap={{xs: 2, md: 4}} sx={{alignItems: 'center', justifyContent: 'space-between'}}>
          <StudentsPicker
            anchorEl={studentsPickerAnchor}
            students={students}
            activeStudent={activeStudent}
            setActiveStudent={setActiveStudent}
          />
          <Box sx={{flex: 1, display: {xs: 'none', md: 'block'}}} />
          <Note value={activeNote?.value} onClick={() => openNotes(true)} big />
        </Panel>
      </Box>
      <Grid2 container spacing={2} columns={{xs: 1, md: 2}}>
        <Grid2 size={1}>
          <Panel gap={2} sx={{height: '100%'}}>
            <Typography variant='h5'>{t('student_comment')}:</Typography>
            <Typography variant='h6'>{activeHomework?.comment}</Typography>
          </Panel>
        </Grid2>
        <Grid2 size={1}>
          <AttachedLinks links={activeHomework?.links} />
        </Grid2>
        <Grid2 size={1}>
          <Panel gap={2} sx={{height: '100%'}}>
            <Typography variant='h5'>{t('teacher_comment')}:</Typography>
            <TextField value={activeNote?.comment ?? ''} onChange={e => updateNoteComment(e.target.value)} />
          </Panel>
        </Grid2>
        <Grid2 size={1}>
          <AttachedFiles files={activeHomework?.files} />
        </Grid2>
      </Grid2>
    </WithLoader>}
    <NotePicker
      notesOpened={notesOpened}
      closeNotes={() => openNotes(false)}
      activeNote={activeNote}
      updateNote={updateNote}
    />
  </Stack>
}