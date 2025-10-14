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
  accountType: 'student' | 'teacher'
  analytics: WithPoints[]
}

export function Analytics({analytics, accountType}: AnalyticsProps) {
  return analytics.map((subject, i) => <Card key={i} index={i}>
    <Typography variant="h6" color='primary' sx={{textAlign: 'center'}}>
      {subject.subjectName.verboseName}
    </Typography>
    {accountType === 'student' ? <LineChart
      data={(subject as StudentWithPoints).points}
    /> : <BarChart
      data={(subject as TeacherWithPoints).points}
    />}
  </Card>)
}