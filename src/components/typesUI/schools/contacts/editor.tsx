'use client'

import { Panel } from '@/ui';
import { IDetailedSchool } from '@/interfaces';
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react';

//mui components
import Grid2 from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface ContactsEditorProps {
  school: IDetailedSchool,
  setSchool: Dispatch<SetStateAction<IDetailedSchool>>
}

export function ContactsEditor({school, setSchool}: ContactsEditorProps) {
  const t = useTranslations('schools.details');

  return <Grid2 container columns={12} spacing={2}>
    <Grid2 size={12}>
      <Panel>
        <Typography variant='h5' sx={{textAlign: 'center'}}>{t('contacts')}</Typography>
      </Panel>
    </Grid2>
    {[0, 1, 2].map((i) => <Grid2 key={i} size={{xs: 12, md: 4}}>
      <Panel>
        <TextField sx={{width: '100%'}} label={t('phone') + (i + 1)} value={school.phones[i] ?? ''} onChange={e => 
          setSchool({...school, phones: school.phones.map((phone, index) => index === i ? e.target.value : phone)})
        } />
      </Panel>
    </Grid2>)}
    {[0, 1, 2].map((i) => <Grid2 key={i} size={{xs: 12, md: 4}}>
      <Panel>
        <TextField sx={{width: '100%'}} label={t('email') + (i + 1)} value={school.emails[i] ?? ''} onChange={e =>
          setSchool({...school, emails: school.emails.map((email, index) => index === i ? e.target.value : email)})
        } />
      </Panel>
    </Grid2>)}
    <Grid2 size={{xs: 12, md: 8}}>
      <Panel>
        <TextField sx={{width: '100%'}} label={t('address')} value={school.address} onChange={e =>
          setSchool({...school, address: e.target.value})
        } />
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 12, md: 4}}>
      <Panel>
        <TextField sx={{width: '100%'}} label={t('work_hours')} value={school.workHours} onChange={e =>
          setSchool({...school, workHours: e.target.value})
        } />
      </Panel>
    </Grid2>
  </Grid2>
}