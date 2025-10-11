'use client'

import { Home, ArrowBack } from "@mui/icons-material";
import { Stack, Button, alpha } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n';
import { useRouter } from "@/i18n";
import { motion } from "framer-motion";

export function ErrorButtons() {
  const t = useTranslations('errors');
  const router = useRouter();
  
  return <Stack direction={{ xs: 'column', sm: 'row' }} gap={3}>
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button variant="contained" size="large" startIcon={<Home />} component={Link} href="/core" sx={theme => ({
        px: 4,
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: 3,
        textTransform: 'none',
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
          transform: 'translateY(-2px)',
        }
      })} suppressHydrationWarning>
        {t('home')}
      </Button>
    </motion.div>
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button variant="outlined" size="large" startIcon={<ArrowBack />} onClick={() => router.back()} sx={theme => ({
        px: 4,
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: 3,
        textTransform: 'none',
        borderWidth: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderWidth: 2,
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
        }
      })}>
        {t('back')}
      </Button>
    </motion.div>
  </Stack>
}