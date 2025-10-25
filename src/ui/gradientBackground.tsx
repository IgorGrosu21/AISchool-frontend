'use client'

import { useMemo } from 'react'

//mui
import Box, { type BoxProps} from '@mui/material/Box'

export function GradientBackground({children, sx, ...props}: BoxProps) {
  const modifiedSx = useMemo(() => ({
    background: `linear-gradient(135deg, 
      rgba(59, 130, 246, 0.12) 0%, 
      rgba(16, 185, 129, 0.1) 15%, 
      rgba(139, 92, 246, 0.08) 30%, 
      rgba(236, 72, 153, 0.06) 45%, 
      rgba(248, 250, 252, 0.95) 70%, 
      rgba(255, 255, 255, 0.98) 100%
    )`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.18) 0%, transparent 60%),
        radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
        radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
        radial-gradient(circle at 60% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)
      `
    },
    ...sx,
  }), [sx])

  return <Box {...props} sx={[modifiedSx, theme => theme.applyStyles('dark', {
    background: `linear-gradient(135deg, 
      rgba(30, 58, 138, 0.25) 0%, 
      rgba(16, 185, 129, 0.2) 15%, 
      rgba(139, 92, 246, 0.18) 30%, 
      rgba(236, 72, 153, 0.15) 45%, 
      rgba(22, 13, 8, 0.95) 70%, 
      rgba(0, 0, 0, 0.98) 100%
    )`,
    '&::before': {
      background: `
        radial-gradient(circle at 20% 80%, rgba(30, 58, 138, 0.25) 0%, transparent 60%),
        radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.22) 0%, transparent 60%),
        radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.2) 0%, transparent 60%),
        radial-gradient(circle at 60% 70%, rgba(236, 72, 153, 0.18) 0%, transparent 60%)
      `
    }
  })]}>
    {children}
  </Box>
}