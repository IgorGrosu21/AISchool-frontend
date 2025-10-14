'use client'

import { m } from 'framer-motion'

//mui components
import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card"
import MuiCardContent from "@mui/material/CardContent"

interface CardProps extends MuiCardProps {
  index: number
}

export function Card({index, children, ...props}: CardProps) {
  return <m.div
    style={{height: '100%'}}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
  >
    <MuiCard
      sx={{
        bgcolor: 'transparent',
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
        }
      }}
      {...props}
    >
      <MuiCardContent sx={{ height: '100%', p: 4 }}>
        {children}
      </MuiCardContent>
    </MuiCard>
  </m.div>
}