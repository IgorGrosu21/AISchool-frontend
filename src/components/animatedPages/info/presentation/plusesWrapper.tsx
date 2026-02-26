'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { usePluses } from '@/hooks'
import { Pluses } from './pluses'
import { GradientBackground } from '@/ui'

//mui components
import Box from "@mui/material/Box"
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'

export function PlusesWrapper() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const {sections, currentSection} = usePluses(currentSectionIndex)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      
      // Get the container's position relative to the viewport
      const rect = container.getBoundingClientRect()
      const scrollTop = window.scrollY || window.pageYOffset
      const containerTop = rect.top + scrollTop
      
      // Calculate scroll progress within the container
      const currentScroll = window.scrollY
      const scrollPosition = currentScroll - containerTop
      
      // Each section should be visible for 1 viewport height
      const sectionHeight = window.innerHeight
      const sectionIndex = Math.floor(scrollPosition / sectionHeight)
      
      setCurrentSectionIndex(Math.max(0, Math.min(sectionIndex, sections.length - 1)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sections.length])

  const scrollToSection = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    
    const rect = container.getBoundingClientRect()
    const scrollTop = window.scrollY || window.pageYOffset
    const containerTop = rect.top + scrollTop
    
    // Calculate the target scroll position
    const sectionHeight = window.innerHeight
    const targetScroll = containerTop + (index * sectionHeight)
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }, [])

  return <Box ref={containerRef} sx={{ 
    position: 'relative',
    width: '100%',
    zIndex: 1400,
    height: `${(sections.length + 1) * 100}vh`,
    minHeight: `${(sections.length + 1) * 100}vh`,
    bgcolor: 'background.default',
    scrollSnapType: 'y mandatory'
  }}>
    <GradientBackground sx={{
      position: 'sticky',
      top: 0,
      width: '100%',
      height: '100vh',
      py: 4,
      px: {xs: 0, md: 4},
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <m.div
            key={currentSectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', maxWidth: 'lg', margin: '0 auto', padding: '0 2rem' }}
          >
            <Pluses currentSectionIndex={currentSectionIndex} currentSection={currentSection} scrollToSection={scrollToSection} />
          </m.div>
        </AnimatePresence>
      </Stack>
      <Box sx={{ width: '100%', px: 4, pb: 4 }}>
        <LinearProgress 
          variant="determinate" 
          value={(currentSectionIndex + 1) * 20}
          sx={{ 
            height: 6, 
            borderRadius: 3,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
            },
            cursor: 'pointer'
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const clickX = e.clientX - rect.left
            const percentage = clickX / rect.width
            const targetIndex = Math.floor(percentage * sections.length)
            scrollToSection(targetIndex)
          }}
        />
      </Box>
    </GradientBackground>
  </Box>
}