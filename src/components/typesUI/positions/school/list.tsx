'use client'

import { Subjects, SmallProfile } from "@/components";
import { Panel } from "@/ui";
import { IPosition, ISubject } from "@/interfaces";
import { useTranslations } from "next-intl";

//mui components
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from "@mui/icons-material/Close"

interface SchoolPositionsProps {
  staff: Array<IPosition & { isManager: boolean }>
  allSubjects: ISubject[]
}

export function SchoolPositions({staff, allSubjects}: SchoolPositionsProps) {
  const t = useTranslations('positions');
  
  return <Stack gap={2}>
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('staff')}</Typography>
    </Panel>
    <Stack gap={4}>
      {staff.map((position, i) => <Grid2 key={i} container spacing={4} columns={12}>
        <Grid2 size={{xs: 12, md: 6, xl: 4}}>
          <Panel gap={2} sx={{height: '100%', justifyContent: 'center'}}>
            <Stack direction='row' sx={{height: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
              <SmallProfile user={position.teacher.user} />
              <Stack direction='row' gap={2} sx={{height: '100%', alignItems: 'center'}}>
                <Typography variant='h6'>{t('is_manager')}</Typography>
                {position.isManager ? <CheckIcon color='primary' /> : <CloseIcon color='primary' />}
              </Stack>
            </Stack>
            <Subjects
              subjects={allSubjects.filter(subject => position.subjectSlugs.includes(subject.slug))}
              small
              showText={false}
              applyPanel={false}
            />
          </Panel>
        </Grid2>
      </Grid2>)}
    </Stack>
  </Stack>
}