'use client'

import { SmallProfile } from "@/components";
import { IStudentName } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

//mui components
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Panel } from "@/ui";
//icons
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from "@mui/icons-material/Close"

interface StudentsProps<T extends IStudentName> {
  readonly students: ReadonlyArray<T>
}

export function Students<T extends IStudentName>({students}: StudentsProps<T>) {
  const t = useTranslations('students');

  const isManager = useCallback((student: T) => {
    if ('isManager' in student) {
      return student.isManager
    }
    return null
  }, [])

  return <Stack gap={2}>
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('list')}:</Typography>
    </Panel>
    <Grid2 container spacing={4} columns={4}>
      {students.map((student, i) => {
        const isManagerValue = isManager(student)
        return <Grid2 key={i} size={{xs: 4, md: 2, lg: 2, xl: 1}}>
          <Panel gap={2}>
            <SmallProfile user={student.user} />
            {isManagerValue !== null && <Stack direction='row' sx={{height: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant='h6'>{t('is_manager')}</Typography>
              {isManagerValue ? <CheckIcon color='primary' /> : <CloseIcon color='primary' />}
            </Stack>}
          </Panel>
        </Grid2>
      })}
    </Grid2>
  </Stack>
}