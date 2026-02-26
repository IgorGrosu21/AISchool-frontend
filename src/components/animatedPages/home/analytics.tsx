'use client'

import { IPersonHome } from "@/interfaces"
import { Card } from "@/ui"
import { LineChart, BarChart } from "./charts"

//mui components
import Typography from "@mui/material/Typography"

type StudentWithPoints = (IPersonHome & { profileType: 'student' })['analytics'][number]
type TeacherWithPoints = (IPersonHome & { profileType: 'teacher' })['analytics'][number]['subjects'][number]

type WithPoints = StudentWithPoints | TeacherWithPoints

interface AnalyticsProps extends React.PropsWithChildren {
  readonly profileType: 'student' | 'teacher'
  readonly analytics: ReadonlyArray<WithPoints>
}

export function Analytics({analytics, profileType}: AnalyticsProps) {
  return analytics.map((subject, i) => <Card key={i} index={i}>
    <Typography variant="h6" color='primary' sx={{textAlign: 'center'}}>
      {subject.subjectName}
    </Typography>
    {profileType === 'student' ? <LineChart
      points={(subject as StudentWithPoints).points}
    /> : <BarChart
      points={(subject as TeacherWithPoints).points}
    />}
  </Card>)
}