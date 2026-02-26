'use client'

import { useCallback } from "react";

//mui components
import IconButton from "@mui/material/IconButton"
import { useColorScheme } from "@mui/material/styles"
//icons
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"

export function NightNodeToggler() {
  const { setMode } = useColorScheme();

  const toggleMode = useCallback((mode: 'light' | 'dark') => {
    setMode(mode);
  }, [setMode])

  return <IconButton color='primary'>
    <DarkModeOutlinedIcon
      onClick={() => toggleMode('light')}
      sx={[
        {display: 'none', cursor: 'pointer'},
        theme => theme.applyStyles('dark', { display: 'block' })
      ]}
    />
    <LightModeOutlinedIcon
      onClick={() => toggleMode('dark')}
      sx={[
        {display: 'block', cursor: 'pointer'},
        theme => theme.applyStyles('dark', { display: 'none' })
      ]} />
  </IconButton>
}