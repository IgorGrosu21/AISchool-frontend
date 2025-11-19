'use client'

import { m } from "framer-motion"

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface SectionHeaderProps {
  isTitle?: boolean
  onGradient?: boolean
  text1: string
  text2?: string
}

export function SectionHeader({isTitle = false, onGradient = false, text1, text2}: SectionHeaderProps) {
  return <m.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <Stack gap={{xs: 0, md: 4}} sx={{textAlign: 'center', mb: {xs: 0, md: 8}}}>
      <Typography variant={isTitle ? "h1" : "h2"} sx={{
        fontSize: isTitle ? { xs: '2.5rem', md: '4rem', lg: '5rem' } : { xs: '2rem', md: '3rem' },
        fontWeight: 700,
        color: onGradient ? 'background.default' : 'text.primary',
        textShadow: onGradient ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
        mb: 2
      }}>
        {text1}
      </Typography>
      {text2 && <Typography variant={isTitle ? "h4" : "h6"} sx={{
        fontSize: isTitle ? { xs: '1.2rem', md: '1.8rem' } : { xs: '0.9rem', md: '1.1rem' },
        color: onGradient ? 'background.default' : 'text.secondary',
        opacity: onGradient ? 0.9 : 1,
        fontWeight: onGradient ? 300 : 400,
        maxWidth: isTitle ? 800 : 700,
        mx: 'auto'
      }}>
        {text2}
      </Typography>}
    </Stack>
  </m.div>
}