'use client'

import { Box, Typography, Button, Stack, Fade, Grow, useTheme, alpha, Chip } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n';
import { useState, useEffect } from "react";
import { Construction, RocketLaunch, Schedule } from '@mui/icons-material';

export function ComingSoon() {
  const t = useTranslations('components.coming_soon');
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <Stack sx={{
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
  }}>
    <Stack gap={4} sx={{alignItems: 'center', textAlign: 'center', width: '100%'}}>
      <Fade in={mounted} timeout={600}>
        <Chip
          icon={<Construction />}
          label={t('under_development')}
          color="primary"
          variant="outlined"
          sx={{
            fontWeight: 500,
            fontSize: '0.9rem',
            px: 2,
            py: 1,
          }}
        />
      </Fade>
      <Fade in={mounted} timeout={800}>
        <Typography 
          variant='h1'
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
          }}
        >
          {t('title')}
        </Typography>
      </Fade>
      <Fade in={mounted} timeout={1200}>
        <Stack direction="row" gap={2} alignItems="center">
          <RocketLaunch 
            sx={{ 
              color: 'primary.main',             fontSize: { xs: '2rem', sm: '2.5rem' },
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                '40%': { transform: 'translateY(-10px)' },
                '60%': { transform: 'translateY(-5px)' },
              }
            }} 
          />
          <Typography variant='h4' color='text.primary' sx={{fontWeight: 500, fontSize: { xs: '1.5rem', sm: '2rem' }}}>
            {t('subtitle')}
          </Typography>
        </Stack>
      </Fade>
      <Fade in={mounted} timeout={1600}>
        <Typography variant='h6' color='text.secondary' sx={{fontSize: { xs: '1rem', sm: '1.2rem' }, fontWeight: 400}}>
          {t('description')}
        </Typography>
      </Fade>
      <Fade in={mounted} timeout={2000}>
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mt: 2 }}>
          <Box sx={{
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
          }}>
            <Schedule color='primary' sx={{ fontSize: '2rem', mb: 1 }} />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
              {t('stay_updated')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('stay_updated_desc')}
            </Typography>
          </Box>
          <Box sx={{
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
          }}>
            <RocketLaunch color='secondary' sx={{ fontSize: '2rem', mb: 1 }} />
            <Typography variant="h6" color="secondary" sx={{ fontWeight: 600, mb: 1 }}>
              {t('exciting_features')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('exciting_features_desc')}
            </Typography>
          </Box>
        </Stack>
      </Fade>
      <Grow in={mounted} timeout={2400}>
        <Link href="/">
          <Button
            variant="contained"
            size="large"
            color="primary"
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
            {t('back_home')}
          </Button>
        </Link>
      </Grow>
      <Fade in={mounted} timeout={2800}>
        <Box sx={{ width: '100%', maxWidth: '300px' }}>
          <Box sx={{
            width: '100%',
            height: '6px',
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <Box sx={{
              width: '75%',
              height: '100%',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '3px',
              animation: 'progress 3s ease-in-out infinite',
              '@keyframes progress': {
                '0%': { transform: 'translateX(-100%)' },
                '50%': { transform: 'translateX(0%)' },
                '100%': { transform: 'translateX(100%)' },
              }
            }} />
          </Box>
        </Box>
      </Fade>
    </Stack>
  </Stack>
}