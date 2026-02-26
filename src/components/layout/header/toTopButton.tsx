'use client'

import { useState, useEffect } from "react"

//mui components
import Fab from "@mui/material/Fab"
import Slide from "@mui/material/Slide"
//icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

export function ToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      setVisible(scrollY > 100)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <Slide direction="up" in={visible}>
    <Fab
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
  </Slide>
}