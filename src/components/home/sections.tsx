'use client'

import { Stack, Typography } from "@mui/material"
import { Section, SectionHeader } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { useTranslations } from "next-intl"
import { TomorrowTimetable } from "./tomorrowTimetable"
import { LatestData } from "./latestData"
import { Analytics } from "./analytics"

interface SectionsProps {
  personHome: IPersonHome
}

export function Sections({personHome}: SectionsProps) {
  const t = useTranslations('components.home')

  return <Stack>
    <Section id='section1'>
      <SectionHeader text1={t(`sections.${personHome.profileType}.1.title`)} />
      {personHome.profileType === 'parent' ? <Stack sx={{minHeight: '70vh'}}>
      </Stack> : (personHome.tomorrowTimetable.length > 0 ? <TomorrowTimetable
        id={personHome.id}
        accountType={personHome.profileType}
        tomorrowTimetable={personHome.tomorrowTimetable}
      /> : <Typography variant='h5' color='primary'>
        {t('no_lessons_tomorrow')}
      </Typography>)}
    </Section>
    <Section id='section2'>
      <SectionHeader text1={t(`sections.${personHome.profileType}.2.title`)} />
      {personHome.profileType === 'parent' ? <Stack sx={{minHeight: '70vh'}}>
      </Stack> : <LatestData
        accountType={personHome.profileType}
        latestData={personHome.latestData}
      />}
    </Section>
    <Section id='section3'>
      <SectionHeader text1={t(`sections.${personHome.profileType}.3.title`)} />
      {personHome.profileType === 'parent' ? <Stack sx={{minHeight: '70vh'}}>
      </Stack> : <Stack gap={4} sx={{width: '100%'}}>
        {personHome.profileType === 'student' ? <Analytics
          analytics={personHome.analytics}
          accountType='student'
        /> : personHome.analytics.map((analytic, i) => <Stack gap={4} key={i}>
          <Typography variant='h5' color='primary'>{analytic.school.name}</Typography>
          <Analytics analytics={analytic.subjects} accountType='teacher' />
        </Stack>)}
      </Stack>}
    </Section>
  </Stack>
}