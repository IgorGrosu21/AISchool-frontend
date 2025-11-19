'use client'

import { m } from "framer-motion"

//mui components
import { useTheme } from "@mui/material/styles"
import Box, { type BoxProps } from "@mui/material/Box"
import Stack from "@mui/material/Stack"

interface SectionProps extends BoxProps {
  animationGroup?: React.ReactNode,
  color?: 'primary' | 'secondary' | 'tertiary'
}

export function Section({children, animationGroup, color, ...props}: SectionProps) {
  const theme = useTheme()

  return <Box component='section' {...props} sx={{
    py: 12,
    position: 'relative',
    overflow: 'hidden',
    background: color ? `linear-gradient(135deg, ${theme.palette[color].light} 0%, ${theme.palette[color].dark} 100%)` : 'transparent',
    ...props.sx,
  }}>
    {animationGroup}
    <Box sx={{width: '100%', maxWidth: 'lg', mx: 'auto', px: 4, zIndex: 2}}>
      <m.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Stack gap={4} sx={{alignItems: 'center', textAlign: 'center'}}>
          {children}
        </Stack>
      </m.div>
    </Box>
  </Box>
}