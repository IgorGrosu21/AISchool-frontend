'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

//mui components
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Fade from "@mui/material/Fade"
import Box from '@mui/material/Box'

interface TimetableStepperContainerProps {
  subjectsComponent: React.ReactNode
  lessonTimeComponent: React.ReactNode
  groupComponent: React.ReactNode
  lessonsComponent: React.ReactNode
}

export function TimetableStepperContainer({subjectsComponent, lessonTimeComponent, groupComponent, lessonsComponent}: TimetableStepperContainerProps) {
  const t = useTranslations('timetable')
  const [activeStep, setActiveStep] = useState(1)
  const steps = useMemo(() => [
    {label: t('subjects.plural'), component: subjectsComponent},
    {label: t('lesson_time.singular'), component: lessonTimeComponent},
    {label: t('group.plural'), component: groupComponent},
    {label: t('singular'), component: lessonsComponent}
  ], [subjectsComponent, lessonTimeComponent, groupComponent, lessonsComponent, t])

  return <Stack gap={8}>
    <Stack direction='row' gap={2} sx={{justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
      {steps.map((step, i) => <Button
        key={i}
        variant={activeStep === i ? 'contained' : 'outlined'}
        onClick={() => setActiveStep(i)}
      >
        {step.label}
      </Button>)}
    </Stack>
    <Fade 
      in={true} 
      key={activeStep}
      timeout={300}
      style={{
        transitionDelay: '50ms',
      }}
    >
      <Box>
        {steps[activeStep].component}
      </Box>
    </Fade>
  </Stack>
}
