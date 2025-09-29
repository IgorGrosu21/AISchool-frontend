'use client'

import { Card } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { Stack, Typography } from "@mui/material"
import { LineChart } from "./lineChart"

interface AnalyticsProps {
  analytics: (IPersonHome & { profileType: 'student' })['analytics']
}

export function Analytics({analytics}: AnalyticsProps) {
  return <Stack gap={4} sx={{width: '100%'}}>
    {analytics.filter(a => a.points.length > 0).map((analytic, index) => <Card key={index} index={index}>
      <Stack gap={2} sx={{width: '100%'}}>
        <Typography variant="h6" color='primary' sx={{textAlign: 'center'}}>
          {analytic.subject.verboseName}
        </Typography>
        <LineChart data={analytic.points} />
      </Stack>
    </Card>)}
  </Stack>
}