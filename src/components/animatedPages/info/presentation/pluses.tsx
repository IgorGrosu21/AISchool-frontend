'use client'

import { m } from 'framer-motion'
import { Panel, SectionHeader } from '@/ui'
import { useTranslations } from 'next-intl'

//mui components
import Typography from "@mui/material/Typography"
import Stack from '@mui/material/Stack'
//icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import SchoolIcon from "@mui/icons-material/School"
import AssignmentIcon from "@mui/icons-material/Assignment"
import GroupIcon from "@mui/icons-material/Group"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import SpeedIcon from "@mui/icons-material/Speed"
import PsychologyIcon from "@mui/icons-material/Psychology"
import PeopleIcon from "@mui/icons-material/People"
import ScheduleIcon from "@mui/icons-material/Schedule"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import PersonIcon from "@mui/icons-material/Person"
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom"

const plusesIcons = {
  student: [ AutoAwesomeIcon, SchoolIcon, AssignmentIcon, GroupIcon],
  teacher: [ AutoStoriesIcon, TrendingUpIcon, SpeedIcon, PsychologyIcon],
  parent: [ PeopleIcon, ScheduleIcon, AnalyticsIcon, CheckCircleIcon]
}

const sectionIcons = [PersonIcon, PersonIcon, SupervisorAccountIcon, SupervisorAccountIcon, FamilyRestroomIcon]

interface PlusesProps {
  currentSectionIndex: number
  currentSection: {
    pluses: Array<{
      plus: string
      color: string
    }>,
    type: 'student' | 'teacher' | 'parent',
    paid: boolean,
  }
  scrollToSection: (index: number) => void
}

export function Pluses({ currentSectionIndex, currentSection, scrollToSection }: PlusesProps) {
  const t = useTranslations('animated_pages.presentation.pluses')

  return <Stack direction={{xs: 'column', md: 'row'}} gap={{xs: 0, md: 4}} sx={{ width: '100%' }}>
    <Stack sx={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Stack gap={4} sx={{ alignItems: 'center', width: '100%' }}>
        <m.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader 
            onGradient={false}
            text1={t('title', { userType: currentSection?.type || 'student', paid: currentSection.paid ? 1 : 0 })} 
            text2={currentSection ? t(`desc.${currentSection.type}_${currentSection.paid ? 'paid' : 'free'}`) : ''} 
          />
        </m.div>
        <Stack direction='row' gap={2} sx={{ justifyContent: 'center', alignItems: 'center', display: {xs: 'none', md: 'flex'} }}>
          {sectionIcons.map((Icon, index) => {
            return <Stack key={index} onClick={() => scrollToSection(index)} sx={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: 2,
              border: 2,
              transition: 'all 0.3s ease',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              ...(index === currentSectionIndex ? {
                borderColor: 'primary.main',
                color: 'primary.main',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  transform: 'scale(1.15)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                }
              } : {
                borderColor: 'divider',
                color: 'text.disabled',
                backgroundColor: 'action.hover',
                '&:hover': {
                  transform: 'scale(1.05)',
                  borderColor: 'text.secondary',
                  color: 'text.secondary',
                  backgroundColor: 'action.selected',
                }
              })
            }}>
              <Icon sx={{ fontSize: 32 }} />
              {index % 2 === 1 && <Stack sx={{
                position: 'absolute',
                top: -6,
                right: -6,
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: '2px solid',
                alignItems: 'center',
                justifyContent: 'center',
                '&::before': {
                  content: '"+"',
                  fontSize: 10,
                  lineHeight: 1,
                }
              }}/>}
            </Stack>
          })}
        </Stack>
      </Stack>
    </Stack>
    <Stack gap={2} sx={{flex: 1}}>
      {currentSection?.pluses.map(({plus, color}, index) => {
        const Icon = plusesIcons[currentSection.type][index]
        return <m.div
          key={`${currentSectionIndex}-${index}`}
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        >
          <Panel direction='row' gap={2} sx={{
            height: '100%',
            alignItems: 'center',
            p: 4
          }}>
            <Stack sx={{
              width: {xs: 40, md: 80},
              height: {xs: 40, md: 80},
              flexShrink: 0,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${color}, ${color}CC)`,
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 32px ${color}40`
            }}>
              <Icon sx={{ fontSize: {xs: 24, md: 40}, color: 'background.default' }} />
            </Stack>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'left',
              fontSize: {xs: '1rem', md: '1.25rem'}
            }}>
              {plus}
            </Typography>
          </Panel>
        </m.div>}
      )}
    </Stack>
  </Stack>
}