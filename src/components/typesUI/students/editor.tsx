'use client'

import { IDetailedKlass } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { SmallProfile } from '../profile';
import { Dispatch, SetStateAction } from 'react';
import { Panel } from '@/ui';

//mui components
import Checkbox from "@mui/material/Checkbox"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Grid2 from '@mui/material/Grid2';

interface StudentsEditorProps {
  klass: IDetailedKlass
  setKlass: Dispatch<SetStateAction<IDetailedKlass>>
}

export function StudentsEditor({klass, setKlass}: StudentsEditorProps) {
  const t = useTranslations('students');

  return <Stack gap={2}>
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('list')}:</Typography>
    </Panel>
    <Grid2 container spacing={4} columns={4}>
      {klass.students.map((student, i) => <Grid2 key={i} size={{xs: 4, md: 2, lg: 2, xl: 1}}>
        <Panel gap={2}>
          <SmallProfile user={student.user} />
          <Stack direction='row' sx={{height: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant='h6'>{t('is_manager')}</Typography>
            <Checkbox checked={student.isManager} onChange={() => setKlass(k => (
              {...k, students: k.students.map((s, j) => i === j ? ({...s, isManager: !s.isManager}) : s)})
            )} />
          </Stack>
        </Panel>
      </Grid2>)}
    </Grid2>
  </Stack>
}