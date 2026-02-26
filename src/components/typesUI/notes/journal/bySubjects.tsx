'use client'

import { IPersonJournal } from "@/interfaces"
import { useTranslations } from "next-intl"
import { Link } from '@/i18n';
import { NotesContainer } from "./container";
import { useJournalContext } from "@/providers";
import { useNotesBySubjects } from "@/hooks"
import { Panel } from "@/ui";
import { Note } from "../item";
import { Performance } from "../performance"

//mui components
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface NotesBySubjectsProps {
  childId?: string
  subjects: (IPersonJournal & { profileType: 'student' })['subjects']
}

export function NotesBySubjects({childId, subjects}: NotesBySubjectsProps) {
  const t = useTranslations('journal')
  const { groups } = useJournalContext()
  const { isPending, getHref } = useNotesBySubjects(subjects, childId)

  return <NotesContainer loading={isPending}>
    <Stack gap={4}>
      {groups.map((group, i) => <Panel key={i} direction='row' gap={2}>
        <Grid2 container spacing={2} sx={{flex: 1}}>
          <Grid2 size={{xs: 12, md: 2}}>
            <Typography variant='h5' color='primary'>{group.name}</Typography>
          </Grid2>
          <Grid2 size={{xs: 12, md: 10}}>
            <Stack direction='row' gap={2} sx={{height: '100%', alignItems: 'center', flexWrap: 'wrap'}}>
              {group.notes.map((note, i) => <Link key={i} href={getHref(note)}>
                <Note value={note.value} styled={false} />
              </Link>)}
            </Stack>
          </Grid2>
          <Grid2 size={{xs: 12, md: 2}}>
            <Typography color='secondary'>{t('absences.plural')}: {group.absences.total}</Typography>
          </Grid2>
          <Grid2 size={{xs: 12, md: 10}}>
            {group.extraNotes > 0 && <Typography color='secondary'>
              {t('extra_notes')}:&nbsp;
              <Typography component='span'>{group.extraNotes}</Typography>
            </Typography>}
          </Grid2>
        </Grid2>
        <Stack direction='row' sx={{alignItems: {xs: 'flex-start', md: 'center'}}}>
          <Performance variant='h5' color='primary' sx={{textAlign: 'end'}} performance={group.performance} />
        </Stack>
      </Panel>)}
    </Stack>
  </NotesContainer>
}