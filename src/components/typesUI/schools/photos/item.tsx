'use client'

import { IDetailedSchool } from "@/interfaces";
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

//mui components
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import ButtonBase from "@mui/material/ButtonBase"
//icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

interface PhotosProps {
  school: IDetailedSchool
}

export function Photos({school}: PhotosProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const images = useMemo(() => school.files, [school.files])

  const goToSlide = useCallback((index: number) => {
    if (index < 0) {
      setCurrentIndex(images.length - 1)
    } else if (index >= images.length) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(index)
    }
    setTranslateX(0)
  }, [images.length])

  const goToPrev = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide])
  const goToNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide])

  // Handle touch/mouse events for swiping
  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setStartY(clientY)
    setTranslateX(0)
    setIsHorizontalSwipe(false)
  }, [])

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return
    const diffX = clientX - startX
    const diffY = clientY - startY
    
    // Determine if this is primarily a horizontal swipe
    if (!isHorizontalSwipe && Math.abs(diffX) > 10) {
      // If horizontal movement is greater than vertical, it's a horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY)) {
        setIsHorizontalSwipe(true)
      }
    }
    
    // Only apply horizontal translation if it's a horizontal swipe
    if (isHorizontalSwipe || Math.abs(diffX) > Math.abs(diffY)) {
      setTranslateX(diffX)
    }
  }, [isDragging, startX, startY, isHorizontalSwipe])

  const handleEnd = useCallback(() => {
    if (!isDragging) return
    
    const threshold = 50 // Minimum swipe distance
    if (isHorizontalSwipe && Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        goToPrev()
      } else {
        goToNext()
      }
    } else {
      setTranslateX(0)
    }
    setIsDragging(false)
    setIsHorizontalSwipe(false)
  }, [isDragging, translateX, isHorizontalSwipe, goToPrev, goToNext])

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }, [handleStart])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isHorizontalSwipe || (isDragging && Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startY))) {
      e.preventDefault() // Prevent scrolling when swiping horizontally
    }
    const touch = e.touches[0]
    handleMove(touch.clientX, touch.clientY)
  }, [handleMove, isHorizontalSwipe, isDragging, startX, startY])

  const handleTouchEnd = useCallback(() => {
    handleEnd()
  }, [handleEnd])

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }, [handleStart])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX, e.clientY)
  }, [isDragging, handleMove])

  const handleMouseUp = useCallback(() => {
    handleEnd()
  }, [handleEnd])

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleEnd()
    }
  }, [isDragging, handleEnd])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrev, goToNext])

  if (images.length === 0) {
    return null
  }

  return <Stack sx={{alignItems: 'center', width: '100%'}} gap={2}>
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: { xs: '100%', md: '75%' },
        overflow: 'hidden',
        borderRadius: 2,
        userSelect: 'none',
        touchAction: 'pan-x pan-y pinch-zoom'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Images container */}
      <Box
        sx={{
          display: 'flex',
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
          willChange: 'transform'
        }}
      >
        {images.map((photo, i) => <Box
          key={i}
          sx={{
            minWidth: '100%',
            width: '100%',
            position: 'relative',
            aspectRatio: '16/9',
            flexShrink: 0
          }}
        >
          <Image
            fill
            src={photo.url}
            alt={`School photo #${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, 75vw"
            style={{
              objectFit: 'contain',
              pointerEvents: 'none'
            }}
          />
        </Box>)}
      </Box>

      {/* Navigation buttons */}
      {images.length > 1 && <>
        <IconButton
          onClick={goToPrev}
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)'
            },
            zIndex: 2
          }}
          aria-label="Previous photo"
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={goToNext}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)'
            },
            zIndex: 2
          }}
          aria-label="Next photo"
        >
          <ChevronRightIcon />
        </IconButton>
      </>}

      {/* Indicators */}
      {images.length > 1 && <Stack
        direction="row"
        gap={1}
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}
      >
        {images.map((_, i) => (
          <ButtonBase
            key={i}
            onClick={() => goToSlide(i)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: i === currentIndex ? 'primary.main' : 'rgba(255, 255, 255, 0.5)',
              transition: 'background-color 0.3s',
              '&:hover': {
                bgcolor: i === currentIndex ? 'primary.dark' : 'rgba(255, 255, 255, 0.7)'
              }
            }}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </Stack>}
    </Box>
  </Stack>
}