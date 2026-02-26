'use server'

import { Panel } from "@/ui";
import { IDetailedSchool } from "@/interfaces";
import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n';

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Grid2 from "@mui/material/Grid2";

interface ContactsProps {
  school: IDetailedSchool
}

export async function Contacts({school}: ContactsProps) {
  const t = await getTranslations('schools.details');
  
  return <Grid2 container spacing={2} columns={2}>
    <Grid2 size={2}>
      <Panel>
        <Typography variant='h5' sx={{textAlign: 'center'}}>{t('contacts')}</Typography>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel>
        <Typography variant='h6'>{t('address')}: {school.city.name}, {school.address}</Typography>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel>
        <Typography variant='h6'>{t('work_hours')}: {school.workHours}</Typography>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel direction={{xs: 'column', md: 'row'}} gap={1}>
        <Typography variant='h6'>{t('phones')}:</Typography>
        <Stack direction='row' gap={2} sx={{alignItems: 'center', flexWrap: 'wrap'}}>
          {school.links.map((link, i) => {
            const cleanLink = link.endsWith('/') ? link.slice(0, -1) : link
            return <Link key={i} href={link} target='_blank'>
              <Typography variant='h6' color='primary'>
                {cleanLink.replace('https://', '').replace('http://', '')}
              </Typography>
            </Link>
          })}
        </Stack>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel direction={{xs: 'column', md: 'row'}} gap={1}>
        <Typography variant='h6'>{t('phones')}:</Typography>
        <Stack direction='row' gap={2} sx={{alignItems: 'center', flexWrap: 'wrap'}}>
          {school.phones.map((phone, i) => <Link key={i} href={`tel:${phone}`}>
            <Typography variant='h6' color='primary'>{phone}</Typography>
          </Link>)}
        </Stack>
      </Panel>
    </Grid2>
    <Grid2 size={2}>
      <Panel direction={{xs: 'column', md: 'row'}} gap={1}>
        <Typography variant='h6'>{t('emails')}:</Typography>
        <Stack direction='row' gap={2} sx={{alignItems: 'center', flexWrap: 'wrap'}}>
          {school.emails.map((email, i) => <Link key={i} href={`mailto:${email}`}>
            <Typography variant='h6' color='primary'>{email}</Typography>
          </Link>)}
        </Stack>
      </Panel>
    </Grid2>
  </Grid2>
}