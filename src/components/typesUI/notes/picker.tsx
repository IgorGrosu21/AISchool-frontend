'use client'

import { useTranslations } from "next-intl"
import { INoteName, INote } from "@/interfaces"
import { useNotePicker } from "@/hooks"
import { Note } from "./item"
import { Panel } from "@/ui"
import { useState } from "react"
import { absences, notes, descriptors } from "@/utils/notes"

//mui components
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"

type Note = Omit<INoteName | INote, 'studentId' | 'student' | 'specificLesson'>

interface NotePickerProps {
  notesOpened: boolean
  closeNotes: () => void
  activeNote: Note | undefined
  updateNote: (note: Note | undefined) => void
  link?: string
}

export function NotePicker({notesOpened, closeNotes, activeNote, updateNote, link}: NotePickerProps) {
  const {
    newNote,
    discard, save,
    updateNoteValue, updateNoteComment
  } = useNotePicker(activeNote, updateNote, closeNotes)
  const [hasDescriptors, setHasDescriptors] = useState(descriptors.includes(activeNote?.value ?? ''))
  const t = useTranslations('notes')

  return <Backdrop sx={{ zIndex: 1300 }} open={notesOpened} onClick={closeNotes}>
    <Stack gap={2} onClick={(e) => e.stopPropagation()}>
      <Panel direction='row' sx={{justifyContent: 'space-between'}} gap={2}>
        <Typography variant='h6'>{t('has_descriptors')}</Typography>
        <Switch checked={hasDescriptors} onChange={e => setHasDescriptors(e.target.checked)} />
      </Panel>
      <Panel direction='row' sx={{flexWrap: 'wrap', justifyContent: 'space-between'}} gap={2}>
        {hasDescriptors ? descriptors.map(descriptor => <Note
          key={descriptor}
          value={t('descriptors.' + descriptor)}
          variant={newNote?.value === descriptor ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(descriptor)}
          sx={{p: 2, flex: 1, aspectRatio: 'unset'}}
          typographyVariant='body1'
        />) : notes.map(note => <Note
          key={note}
          value={note}
          variant={newNote?.value === note ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(note)}
        />)}
      </Panel>
      <Panel direction={{xs: 'column', md: 'row'}} gap={2}>
        {absences.map(absence => <Note
          key={absence}
          value={t('absences.' + absence)}
          variant={newNote?.value === absence ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(absence)}
          sx={{p: 2, flex: 1, aspectRatio: 'unset'}}
          typographyVariant='body1'
        />)}
      </Panel>
      <Panel>
        <TextField
          label={t('comment')}
          value={newNote?.comment ?? ''}
          onChange={e => updateNoteComment(e.target.value)}
        />
      </Panel>
      <Panel direction={{xs: 'column', md: 'row'}} gap={2}>
        <Button variant='outlined' onClick={closeNotes}>{t('close')}</Button>
        {link && <Link href={link}>
          <Button variant='outlined'>{t('open_lesson')}</Button>
        </Link>}
        <Box sx={{flex: 1}} />
        <Button variant='outlined' onClick={discard}>{t('discard')}</Button>
        <Button variant='contained' onClick={save}>{t('save')}</Button>
      </Panel>
    </Stack>
  </Backdrop>
}