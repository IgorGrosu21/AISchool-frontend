'use server'

import { Panel } from "@/ui";
import { IDetailedSchool } from "@/interfaces";
import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n';

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Grid2 from "@mui/material/Grid2";

interface AboutProps {
  school: IDetailedSchool
}

export async function About({school}: AboutProps) {
  const t = await getTranslations('schools');
  return <Grid2 container spacing={2} columns={2}>
    <Grid2 size={2}>
      <Panel>
        <Typography variant='h5' sx={{textAlign: 'center'}}>{t('details.about')}</Typography>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel>
        <Typography variant='h6'>{t('details.city')}: {school.city.name}</Typography>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel>
        <Typography variant='h6'>{t('details.lang')}: {school.lang}</Typography>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel>
        <Typography variant='h6'>{t('details.type')}: {school.type ? t(`filters.types.${school.type}`) : ''}</Typography>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel direction={{xs: 'column', md: 'row'}} gap={1}>
        <Typography variant='h6'>{t('filters.profiles.title')}:</Typography>
        <Stack direction='row' gap={2} sx={{alignItems: 'center', flexWrap: 'wrap'}}>
          {school.profiles.split(',').filter(p => p !== '').map((profile, i) => <Typography key={i} variant='h6'>
            {t(`filters.profiles.${profile}`)}
          </Typography>)}
        </Stack>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Link href={`/core/schools/${school.slug}/klasses`}>
        <Panel>
          <Typography variant='h6' color='primary'>{t('klass_list')}</Typography>
        </Panel>
      </Link>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Link href={`/core/schools/${school.slug}/timetable`}>
        <Panel>
          <Typography variant='h6' color='primary'>{t('timetable')}</Typography>
        </Panel>
      </Link>
    </Grid2>
  </Grid2>
}