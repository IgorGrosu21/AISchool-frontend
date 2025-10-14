'use client'

import { ErrorButtons } from "./buttons";
import { useTranslations } from "next-intl";
import { useIsMounted } from "@/hooks";
import { useMemo } from "react";

//mui components
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import Grow from "@mui/material/Grow"
import Slide from "@mui/material/Slide"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { alpha } from "@mui/material/styles"

interface AnimatedErrorContentProps {
  code: number;
}

export function AnimatedErrorContent({ code }: AnimatedErrorContentProps) {
  const t = useTranslations('errors');
  const isMounted = useIsMounted();

  const errorColor = useMemo(() => {
    switch (code) {
      case 404:
        return 'primary';
      case 500:
        return 'error';
      default:
        return 'warning';
    }
  }, [code]);

  return <Stack gap={4} sx={{
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    minHeight: '90vh',
    position: 'relative',
  }}>
    <Slide direction="up" in={isMounted} timeout={800}>
      <Typography variant="h1" sx={theme => ({
        fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
        fontWeight: 900,
        color: `${errorColor}.main`,
        lineHeight: 1,
        background: `linear-gradient(135deg, ${theme.palette[errorColor].main}, ${alpha(theme.palette[errorColor].main, 0.7)})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: `0 4px 20px ${alpha(theme.palette[errorColor].main, 0.3)}`,
        animation: 'glow 3s ease-in-out infinite alternate',
        '@keyframes glow': {
          '0%': { filter: 'brightness(1)' },
          '100%': { filter: 'brightness(1.2)' },
        }
      })}>
        {code}
      </Typography>
    </Slide>
    <Fade in={isMounted} timeout={1200}>
      <Typography variant="h3" sx={theme => ({
        fontWeight: 700,
        color: 'text.primary',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        textShadow: `0 2px 4px ${alpha(theme.palette.text.primary, 0.1)}`,
      })}>
        {t(`${code}.title`)}
      </Typography>
    </Fade>
    <Slide direction="up" in={isMounted} timeout={1400}>
      <Typography variant="h6" sx={{
        color: 'text.secondary',
        maxWidth: '500px',
        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
        lineHeight: 1.6,
        fontWeight: 400,
      }}>
        {t(`${code}.desc`)}
      </Typography>
    </Slide>
    <Grow in={isMounted} timeout={1600}>
      <Box sx={{ mt: 2 }}>
        <ErrorButtons />
      </Box>
    </Grow>
  </Stack>
}
