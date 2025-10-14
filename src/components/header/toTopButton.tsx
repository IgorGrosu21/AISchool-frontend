'use client'

import { Fab } from "@mui/material";

//icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

export function ToTopButton() {
  return <Fab
    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
    color='primary'
    size='medium'
    sx={{
      display: {xs: 'none', md: 'inline-flex'},
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 1300,
      width: { xs: 48, md: 56 },
      height: { xs: 48, md: 56 },
    }}
  >
    <KeyboardArrowUpIcon fontSize='large' />
  </Fab>
}