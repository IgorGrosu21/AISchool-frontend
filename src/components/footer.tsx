'use server'

import { ThemeImage } from "@/ui"
import { Link } from '@/i18n'
import { getTranslations } from "next-intl/server";

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Divider from "@mui/material/Divider";

export async function Footer() {
  const t = await getTranslations('components.footer');

  return <Stack direction='column' gap={2} component='footer' sx={{
    pt: 4,
    pb: 2,
    px: { xs: 2, sm: 4, md: 8, lg: 16 },
    bgcolor: 'background.paper',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  }}>
    <Stack gap={{xs: 4, md: 8, lg: 16}} direction={{xs: 'column-reverse', md: 'row'}} sx={{alignItems: {xs: 'center', md: 'flex-start'}}}>
      <Stack sx={{direction: 'row', justifyContent: 'center'}}>
        <Link href='/'>
          <ThemeImage srcDark='/images/logo-blue-dark.png' srcLight='/images/logo-blue-light.png' alt='logo' width={100} height={94} />
        </Link>
      </Stack>
      <Stack direction={{xs: 'column', md: 'row'}} gap={{xs: 4, md: 8, lg: 16}}>
        <Stack gap={2}>
          <Typography color='primary' variant='h6' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            {t('info')}
          </Typography>
          <Stack gap={1}>
            <Link href='/about'>
              <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
                {t('about')}
              </Typography>
            </Link>
            <Link href='/news'>
              <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
                {t('news')}
              </Typography>
            </Link>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Typography color='primary' variant='h6' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            {t('support')}
          </Typography>
          <Stack gap={1}>
            <Link href='/help/faq'>
              <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
                {t('help')}
              </Typography>
            </Link>
            <Link href='/help/privacy-policy'>
              <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
                {t('privacy_policy')}
              </Typography>
            </Link>
            <Link href='/help/user-agreement'>
              <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
                {t('user_agreement')}
              </Typography>
            </Link>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Typography color='primary' variant='h6' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            {t('contacts')}
          </Typography>
          <Stack gap={1}>
            <Link href='tel:+37360578524'>
              <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
                +373 60 578 524
              </Typography>
            </Link>
            <Link href='mailto:aischool.md@gmail.com'>
              <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
                aischool.md@gmail.com
              </Typography>
            </Link>
            <Stack direction='row' gap={1} sx={{justifyContent: {xs: 'center', md: 'flex-start'}}}>
              <FacebookIcon color='primary' fontSize='large' />
              <InstagramIcon color='primary' fontSize='large' />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    <Divider flexItem />
    <Stack direction='row' sx={{justifyContent: 'center'}}>
      <Typography variant='body2' color='textSecondary'>Copyright © 2025. SRL AISchool</Typography>
    </Stack>
  </Stack>
}