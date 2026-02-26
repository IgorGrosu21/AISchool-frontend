'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useIsMobile } from '@/hooks'

//mui components
import Stack from "@mui/material/Stack"
import Fade from "@mui/material/Fade"
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

interface StepperProps {
  components: Array<{
    label: string
    component: React.ReactNode
  }>
}

export function Stepper({components}: StepperProps) {
  const t = useTranslations('stepper')
  const [activeStep, setActiveStep] = useState(0)
  const isMobile = useIsMobile()

  return <Stack gap={8}>
    <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={activeStep}
        onChange={(_, value) => setActiveStep(value)}
        centered
        selectionFollowsFocus
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        {components.map((component, i) => <Tab
          key={i}
          label={t(component.label)}
          sx={{fontSize: '1.25rem', maxWidth: {xs: '100%', md: 'unset'}}}
        />)}
      </Tabs>
    </Box>
    <Fade in={true} key={activeStep} timeout={300} style={{
      transitionDelay: '50ms',
    }}>
      <Box>
        {components[activeStep].component}
      </Box>
    </Fade>
  </Stack>
}
