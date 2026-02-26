'use server'

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { IPersonProfile, ISubject } from '@/interfaces';
import { Panel, ThemeImage } from '@/ui';
import { langs } from '@/i18n';
import { NavigationContainer } from '../../layout';
import { Socials } from './socials';
import { ParentProfile, StudentProfile, TeacherProfile } from './userTypes';
import { PageTitle } from '@/components/pageTitle';
import { QuickButtons } from './quickButtons';

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Grid2 from "@mui/material/Grid2"

interface ProfileProps {
  profile: IPersonProfile
  subjects?: ISubject[]
}

export async function Profile({profile, subjects = []}: ProfileProps) {
  const t = await getTranslations('profile')
  const account = profile.account

  return <NavigationContainer last={account.id ? `${account.surname} ${account.name}` : t('title')}>
    <PageTitle
      label={account.id ? `${account.surname} ${account.name}` : t('title')} 
      link='/core/profile' 
      resource={{ type: 'account', accountId: account.id }} 
    />
    <Grid2 container spacing={4} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      <Grid2 size={1}>
        <Stack gap={4}>
          <Panel gap={4} sx={{justifyContent: 'center'}}>
            <Stack sx={{
              borderRadius: '50%',
              width: '80%',
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}>
              <ThemeImage
                srcDark={account.avatar ? account.avatar : '/images/default-avatar-dark.png'}
                srcLight={account.avatar ? account.avatar : '/images/default-avatar-light.png'}
                alt='avatar'
                width={200}
                height={200}
                style={{
                  borderRadius: '50%',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} 
              />
            </Stack>
            <Stack direction='row' gap={1} sx={{
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              <Image 
                loading='lazy' 
                width={40} 
                height={20} 
                src={account.city.region.country.flag} 
                alt='' 
              />
              <Typography variant='h6' sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {account.city.region.country.name}, {account.city.name}
              </Typography>
            </Stack>
            <Typography variant='h6' sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              {t('lang')}: {langs.find(lang => lang.code.toUpperCase() === account.lang)?.name}
            </Typography>
            <Socials user={account} />
          </Panel>
          <QuickButtons accountId={account.id} />
        </Stack>
      </Grid2>
      <Grid2 size='grow'>
        <Stack gap={{ xs: 6, md: 8 }}>
          {profile.profileType === 'parent' && <ParentProfile profile={profile} />}
          {profile.profileType === 'teacher' && <TeacherProfile profile={profile} allSubjects={subjects} />}
          {profile.profileType === 'student' && <StudentProfile profile={profile} />}
        </Stack>
      </Grid2>
    </Grid2>
  </NavigationContainer>
}