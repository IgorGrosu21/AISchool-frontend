'use client'

import { useTranslations } from "next-intl";
import { Link } from '@/i18n';
import { useRouter } from "@/i18n";

//mui components
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { alpha } from "@mui/material/styles"
//icons
import HomeIcon from "@mui/icons-material/Home"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export function ErrorButtons() {
  const t = useTranslations('errors');
  const router = useRouter();
  
  return <Stack direction={{ xs: 'column', sm: 'row' }} gap={3}>
    <Button 
      variant="contained" 
      size="large" 
      startIcon={<HomeIcon />} 
      component={Link} 
      href="/core" 
      sx={theme => ({
        px: 4,
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: 3,
        textTransform: 'none',
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
          transform: 'translateY(-2px) scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
          transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      })}
    >
      {t('home')}
    </Button>
    <Button 
      variant="outlined" 
      size="large" 
      startIcon={<ArrowBackIcon />} 
      onClick={() => router.back()} 
      sx={theme => ({
        px: 4,
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: 3,
        textTransform: 'none',
        borderWidth: 2,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderWidth: 2,
          transform: 'translateY(-2px) scale(1.05)',
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
        '&:active': {
          transform: 'scale(0.95)',
          transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      })}
    >
      {t('back')}
    </Button>
  </Stack>
}
