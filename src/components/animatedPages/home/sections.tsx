'use client'

import { Section, SectionHeader } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { useTranslations } from "next-intl"
import { TomorrowTimetable } from "./tomorrowTimetable"
import { LatestData } from "./latestData"
import { Analytics } from "./analytics"

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface SectionsProps {
  readonly personHome: IPersonHome
}

export function Sections({personHome}: SectionsProps) {
  const t = useTranslations('animated_pages.home')

  return <>
    <Section id='section1'>
      <SectionHeader text1={t(`sections.${personHome.profileType}.1`)} />
      {personHome.profileType === 'parent' ? <Stack sx={{minHeight: '70vh'}}>
      </Stack> : (personHome.tomorrowTimetable.length > 0 ? <TomorrowTimetable
        profileType={personHome.profileType}
        tomorrowTimetable={personHome.tomorrowTimetable}
      /> : <Typography variant='h5' color='primary'>
        {t('no_lessons_tomorrow')}
      </Typography>)}
    </Section>
    <Section id='section2'>
      <SectionHeader text1={t(`sections.${personHome.profileType}.2`)} />
      {personHome.profileType === 'parent' ? <Stack sx={{minHeight: '70vh'}}>
      </Stack> : (personHome.latestData.length > 0 ? <LatestData
        profileType={personHome.profileType}
        latestData={personHome.latestData}
      /> : <Typography variant='h5' color='primary'>
        {t('no_latest_data')}
      </Typography>)}
    </Section>
    <Section id='section3'>
      <SectionHeader text1={t(`sections.${personHome.profileType}.3`)} />
      {personHome.profileType === 'parent' ? <Stack sx={{minHeight: '70vh'}}>
      </Stack> : <Stack gap={4} sx={{width: '100%'}}>
        {personHome.analytics.length > 0 ? (personHome.profileType === 'student' ? <Analytics
          analytics={personHome.analytics}
          profileType='student'
        /> : personHome.analytics.map((analytic, i) => <Stack gap={4} key={i}>
          <Typography variant='h5' color='primary'>{analytic.school.name}</Typography>
          <Analytics analytics={analytic.subjects} profileType='teacher' />
        </Stack>)) : <Typography variant='h5' color='primary'>
          {t('no_analytics')}
        </Typography>}
      </Stack>}
    </Section>
  </>
}