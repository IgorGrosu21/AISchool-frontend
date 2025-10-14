'use server'

import { Balance, SmallProfile } from "@/components";
import { IStudent } from "@/interfaces";
import { getTranslations } from "next-intl/server";

//mui components
import Checkbox from "@mui/material/Checkbox"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface StudentsProps {
  students: IStudent[]
}

export async function Students({students}: StudentsProps) {
  const t = await getTranslations('students');

  return <Stack gap={2}>
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('list')}:</Typography>
    <Stack gap={4}>
      {students.map((student, i) => <Grid2 key={i} container spacing={4} columns={4}>
        <Grid2 size={{xs: 4, md: 'auto'}} sx={{display: 'flex', justifyContent: 'center'}}>
          <SmallProfile user={student.user} />
        </Grid2>
        <Grid2 size={{xs: 4, md: 'auto'}}>
          <Stack direction='row' sx={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Balance balance={student.balance} showText={false} />
          </Stack>
        </Grid2>
        <Grid2 size={{xs: 2, md: 'grow'}}>
          <Stack direction={{xs: 'column', md: 'row'}} sx={{height: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Typography variant='h6'>{t('subscription')}</Typography>
            <Checkbox checked={student.subscription != undefined} />
          </Stack>
        </Grid2>
        <Grid2 size={{xs: 2, md: 'grow'}}>
          <Stack direction={{xs: 'column', md: 'row'}} sx={{height: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Typography variant='h6'>{t('is_manager')}</Typography>
            <Checkbox checked={student.isManager} />
          </Stack>
        </Grid2>
      </Grid2>)}
    </Stack>
  </Stack>
}