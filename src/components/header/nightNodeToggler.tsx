'use client'

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"
import { IconButton, useColorScheme } from "@mui/material"
import { useIsDark } from "@/hooks"
import { useCallback } from "react";

export function NightNodeToggler() {
  const { setMode } = useColorScheme();
  const isDark = useIsDark()

  const toggleMode = useCallback(() => {
    setMode(isDark ? 'light' : 'dark');
  }, [isDark, setMode])

  return <IconButton onClick={toggleMode} color='primary' suppressHydrationWarning>
    <DarkModeOutlined sx={{display: isDark ? 'block' : 'none'}} />
    <LightModeOutlined sx={{display: isDark ? 'none' : 'block'}} />
  </IconButton>
}