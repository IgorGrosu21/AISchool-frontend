'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { usePluses } from '@/hooks'
import { Section, SectionHeader, Card } from '@/ui'
import { useMemo } from 'react'

//mui components
import Box from "@mui/material/Box"
import Grid2 from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
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

interface PlusesSectionProps {
  userType: 'student' | 'teacher' | 'parent'
  animationGroup?: React.ReactNode
}

export function PlusesSection({ userType, animationGroup }: PlusesSectionProps) {
  const gradient = useMemo(() => animationGroup !== undefined, [animationGroup])
  const pluses = usePluses(userType, gradient)
  const t = useTranslations('components.landing.pluses')
  
  const getIconAndColor = (index: number) => {
    const iconSets = {
      student: [
        { icon: AutoAwesomeIcon, color: '#FF6B6B' },
        { icon: SchoolIcon, color: '#4ECDC4' },
        { icon: AssignmentIcon, color: '#45B7D1' },
        { icon: GroupIcon, color: '#96CEB4' }
      ],
      teacher: [
        { icon: AutoStoriesIcon, color: '#FFEAA7' },
        { icon: TrendingUpIcon, color: '#DDA0DD' },
        { icon: SpeedIcon, color: '#98D8C8' },
        { icon: PsychologyIcon, color: '#F7DC6F' }
      ],
      parent: [
        { icon: PeopleIcon, color: '#FF6B6B' },
        { icon: ScheduleIcon, color: '#4ECDC4' },
        { icon: AnalyticsIcon, color: '#45B7D1' },
        { icon: CheckCircleIcon, color: '#96CEB4' }
      ]
    }
    return iconSets[userType][index]
  }

  return <Section
    animationGroup={animationGroup}
    color={gradient ? (userType === 'teacher' ? 'tertiary' : 'secondary') : undefined}
    id={gradient ? undefined : `${userType}_pluses`}
  >
    <SectionHeader 
      onGradient={gradient}
      text1={t('title', { userType, paid: gradient ? 1 : 0 })} 
      text2={t(`desc.${userType}_${gradient ? 'paid' : 'free'}`)} 
    />
    <Grid2 container spacing={4} sx={{ maxWidth: 'md' }}>
      {pluses.map((plus, index) => {
        const { icon: Icon, color } = getIconAndColor(index)
        return <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
          <Card index={index}>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 8px 32px ${color}40`
              }}>
                <Icon sx={{ fontSize: 40, color: 'background.default' }} />
              </Box>
            </motion.div>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2, 
              color: gradient ? 'background.default' : 'text.primary',
              textAlign: 'center'
            }}>
              {plus}
            </Typography>
          </Card>
        </Grid2>}
      )}
    </Grid2>
  </Section>
}
