'use client'

import { type Group } from "@/providers"
import { useTranslations } from "next-intl"
import { Panel } from "@/ui"
import { Performance } from "../performance"

//mui components
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface AnnualNoteListProps {
  groups: Array<Omit<Group, 'notes' | 'extraNotes'> & {notes: string[]}>
}

export function AnnualNoteList({groups}: AnnualNoteListProps) {
  const t = useTranslations('journal')

  return <Stack gap={4}>
    {groups.map((group, i) => <Panel key={i} direction='row' gap={2}>
      <Grid2 container spacing={2} sx={{flex: 1}}>
        <Grid2 size={{xs: 12, md: 2}}>
          <Typography variant='h5' color='primary'>{group.name}</Typography>
        </Grid2>
        <Grid2 size={{xs: 12, md: 8}}>
          <Stack direction='row' gap={2} sx={{height: '100%', alignItems: 'center', flexWrap: 'wrap'}}>
            {group.notes.map((note, i) => <Performance
              key={i}
              variant='h5'
              color='primary'
              sx={{flex: 1, textAlign: 'center'}}
              performance={note}
            />)}
            <Performance variant='h5' color='primary' sx={{flex: 1, textAlign: 'center'}} performance={group.performance} />
          </Stack>
        </Grid2>
        <Grid2 size={{xs: 12, md: 2}}>
          <Stack direction='row' gap={2} sx={{height: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Typography color='secondary' variant='h6'>{t('absences.plural')}: {group.absences.total}</Typography>
          </Stack>
        </Grid2>
      </Grid2>
    </Panel>)}
  </Stack>
}