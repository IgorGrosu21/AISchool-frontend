'use client'

import { Link } from '@/i18n';
import { useTranslations } from 'next-intl';
import { useIsMounted } from '@/hooks';
import { useMemo } from 'react';

//mui components
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Fade from "@mui/material/Fade"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { alpha } from "@mui/material/styles"
//icons
import StarIcon from "@mui/icons-material/Star"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import ScheduleIcon from "@mui/icons-material/Schedule"

export function Content({translations}: {translations: string}) {
  const t = useTranslations(`components.${translations}`);
  const FeatureIcon = useMemo(() => translations === 'ad' ? StarIcon : ScheduleIcon, [translations]);
  const isMounted = useIsMounted();

  return <Stack sx={theme => ({
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
    position: 'relative',
    padding: 4,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%)
      `,
    }
  })}>
    <Stack gap={4} sx={{alignItems: 'center', textAlign: 'center', width: '100%'}}>
      <Fade in={isMounted} timeout={800}>
        <Typography variant='h1' sx={theme => ({
          fontWeight: 'bold',
          color: 'primary.main',
          fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1,
        })}>
          {t('title')}
        </Typography>
      </Fade>
      <Fade in={isMounted} timeout={1200}>
        <Typography variant='h4' color='text.primary' sx={{fontWeight: 500, fontSize: { xs: '1.5rem', sm: '2rem' }, maxWidth: 'md'}}>
          {t('subtitle')}
        </Typography>
      </Fade>
      <Fade in={isMounted} timeout={1600}>
        <Typography variant='h6' color='text.secondary' sx={{fontSize: { xs: '1rem', sm: '1.2rem' }, fontWeight: 400}}>
          {t('info.title')}
        </Typography>
      </Fade>
      <Fade in={isMounted} timeout={2000}>
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mt: 2 }}>
          <Box sx={theme => ({
            flex: 1,
            p: 3,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            minWidth: '200px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 2,
            }
          })}>
            <FeatureIcon color='primary' sx={{ fontSize: '2rem', mb: 1 }} />
            <Typography variant='h6' color='primary' sx={{ fontWeight: 600, mb: 1 }}>
              {t('info.features.1')}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {t('info.features.1_desc')}
            </Typography>
          </Box>
          <Box sx={theme => ({
            flex: 1,
            p: 3,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
            minWidth: '200px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 2,
            }
          })}>
            <RocketLaunchIcon color='secondary' sx={{ fontSize: '2rem', mb: 1 }} />
            <Typography variant='h6' color='secondary' sx={{ fontWeight: 600, mb: 1 }}>
              {t('info.features.2')}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {t('info.features.2_desc')}
            </Typography>
          </Box>
        </Stack>
      </Fade>
      <Fade in={isMounted} timeout={2400}>
        <Link href={`/core${translations === 'ad' ? '/subscriptions' : ''}`}>
          <Button
            variant='contained'
            size='large'
            color='primary'
            sx={{
              fontSize: '1.2rem',
              padding: '16px 40px',
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: 3,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6,
              },
            }}
          >
            {t('redirect')}
          </Button>
        </Link>
      </Fade>
    </Stack>
  </Stack>
}
