'use client'

import { useTheme } from "@mui/material"
import { useMemo } from "react"

export function useIsDark() {
  const theme = useTheme()
  const isDark = useMemo(() => theme.palette.mode === 'dark', [theme.palette.mode])
  
  return isDark
}