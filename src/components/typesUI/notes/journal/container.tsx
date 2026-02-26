'use client'

import { useTranslations } from "next-intl"
import { useJournalContext } from "@/providers"
import { AnnualNoteList } from "./annual"
import { useGroupedNotes } from "@/hooks"
import { Panel, WithLoader } from "@/ui"
import { Performance } from "../performance"

//mui components
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface NotesContainerProps extends React.PropsWithChildren {
  loading: boolean
}

const semesters: Array<'frst' | 'scnd' | 'annual'> = ['frst', 'scnd', 'annual']

export function NotesContainer({loading, children}: NotesContainerProps) {
  const t = useTranslations('journal')
  const {semester, setSemester} = useJournalContext()
  const {performance, absences, annualGroups, isFirstSemester} = useGroupedNotes()

  return <Stack gap={2}>
    <Stack direction={{xs: 'column-reverse', md: 'row'}} gap={2}>
      <Performance variant='h4' color='primary' template={`${t('performance')}: <performance>`} performance={performance} />
      <Box sx={{flex: 1}} />
      <Stack direction={{xs: 'column', md: 'row'}} gap={2}>
        {semesters.map((s, i) => <Button
          key={i}
          variant={semester === s ? 'contained' : 'outlined'}
          color='primary'
          onClick={() => setSemester(s)}
          disabled={s === 'scnd' && isFirstSemester}
        >
          {t(`periods.${s}`)}
        </Button>)}
      </Stack>
    </Stack>
    <WithLoader loading={loading} gap={8}>
      {semester === 'annual' ? <AnnualNoteList groups={annualGroups!} /> : children}
      <Stack direction={{xs: 'column', md: 'row'}} gap={4}>
        {absences.map((absence, i) => <Panel key={i} direction='row' gap={2} sx={{justifyContent: 'space-between'}}>
          <Typography variant='h6' color='primary'>{t(`absences.${absence.name}`)}:</Typography>
          <Typography variant='h6' color='secondary'>{absence.value}</Typography>
        </Panel>)}
      </Stack>
    </WithLoader>
  </Stack>
}