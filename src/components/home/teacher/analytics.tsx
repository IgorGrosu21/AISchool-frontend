'use client'

import { Card } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { Stack, Typography } from "@mui/material"
import { BarChart } from "./barChart"

interface AnalyticsProps {
  analytics: (IPersonHome & { profileType: 'teacher' })['analytics']
}

export function Analytics({analytics}: AnalyticsProps) {
  return <Stack gap={4} sx={{width: '100%'}}>
    {analytics.map((analytic, i) => <Stack gap={4} key={i}>
      <Typography variant='h5' color='primary'>{analytic.school.name}</Typography>
      {analytic.subjects.map((subject, j) => <Card key={j} index={j}>
        <Typography variant="h6" color='primary' sx={{textAlign: 'center'}}>
          {subject.subjectName.verboseName}
        </Typography>
        <BarChart data={subject.klasses} />
      </Card>)}
    </Stack>)}
  </Stack>
}