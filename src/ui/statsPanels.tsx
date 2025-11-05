'use client'

import { useCallback, useMemo, useState } from "react"
import { m } from "framer-motion"

//mui components
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Backdrop from "@mui/material/Backdrop"
import IconButton from "@mui/material/IconButton"
import SvgIcon from "@mui/material/SvgIcon"
import Typography from "@mui/material/Typography"
import { Panel } from "./panel"

//icons
import CloseIcon from "@mui/icons-material/Close"

interface StatsPanelsProps {
  panels: Array<{
    text: string
    desc?: string
    Icon: typeof SvgIcon
  }>
}

export function StatsPanels({panels}: StatsPanelsProps) {
  const [active, setActive] = useState<number>(-1)
  const panel = useMemo(() => panels[active], [active, panels])

  const scrollToSection = useCallback((index: number) => {
    const sectionElement = document.getElementById(`section${index}`)
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return <>
    <Stack 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={4} 
      sx={{ 
        mt: 4,
        animation: 'fadeInUp 0.4s ease-out 0.8s both',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      {panels.map((panel, i) => <Box
        key={i}
        onClick={panel.desc ? () => setActive(i) : () => scrollToSection(i + 1)}
        sx={{
          flex: 1,
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05) translateY(-5px)',
          }
        }}
      >
        <Stack gap={2} sx={{
          height: '100%',
          p: 3,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          minWidth: 200,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <panel.Icon sx={{ fontSize: 40, color: 'background.default' }} />
          <Typography variant="h6" sx={{ color: 'background.default', fontWeight: 500 }}>
            {panel.text}
          </Typography>
        </Stack>
      </Box>)}
    </Stack>
    <Backdrop
      open={active > -1}
      onClick={() => setActive(-1)}
      sx={{
        zIndex: 1300,
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {panel && <m.div
        initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 1500,
          margin: 0
        }}
      >
        <Panel gap={4} sx={{
          minWidth: { xs: '90vw', sm: 500 },
          maxWidth: 600,
          minHeight: { xs: '70vh', sm: 500 },
          maxHeight: '90vh',
          alignItems: 'center',
          position: 'relative',
          color: '#fff',
          backdropFilter: 'unset',
        }}>
          <IconButton onClick={() => setActive(-1)} sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#fff',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            }
          }}>
            <CloseIcon />
          </IconButton>
          <panel.Icon sx={{ fontSize: 60 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
            {panel.text}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, textAlign: 'center' }}>
            {panel.desc}
          </Typography>
        </Panel>
      </m.div>}
    </Backdrop>
  </>
}