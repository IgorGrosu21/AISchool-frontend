'use client'

import { useMemo } from "react"

//mui components
import Stack, { type StackOwnProps } from "@mui/material/Stack"

export function Panel({children, sx, ...props}: StackOwnProps) {

  const modifiedSx = useMemo(() => ({
    flex: 1,
    background: 'rgba(233, 242, 247, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    p: props.p ?? 2,
    borderRadius: 2,
    animation: 'fadein 0.8s ease-in-out',
    transition: 'transform 0.4s',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
    ...sx,
  }), [sx, props.p])
  
  return <Stack
    {...props}
    sx={[modifiedSx, theme => theme.applyStyles('dark', {
      background: 'rgba(8, 8, 22, 0.2)',
      boxShadow: '0 4px 30px rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.3)',
    })]}
  >
    {children}
  </Stack>
}