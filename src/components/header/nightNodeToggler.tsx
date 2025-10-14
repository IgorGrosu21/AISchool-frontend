'use client'

import { IconButton, useColorScheme } from "@mui/material"
import { useCallback } from "react";

//icons
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"

export function NightNodeToggler() {
  const { setMode } = useColorScheme();

  const toggleMode = useCallback((mode: 'light' | 'dark') => {
    setMode(mode);
  }, [setMode])

  return <IconButton color='primary' suppressHydrationWarning>
    <DarkModeOutlinedIcon
      onClick={() => toggleMode('dark')}
      sx={[
        {display: 'none'},
        theme => theme.applyStyles('dark', { display: 'block' })
      ]}
    />
    <LightModeOutlinedIcon
      onClick={() => toggleMode('light')}
      sx={[
        {display: 'block'},
        theme => theme.applyStyles('dark', { display: 'none' })
      ]} />
  </IconButton>
}