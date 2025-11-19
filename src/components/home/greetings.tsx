'use client'

import { Section, SectionHeader, StatsPanels, AnimationGroup1 } from "@/ui"
import { useTranslations } from "next-intl"
import { IPersonHome } from "@/interfaces"

//icons
import AssignmentIcon from "@mui/icons-material/Assignment"
import HomeIcon from "@mui/icons-material/Home"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"

interface GreetingsProps {
  profileType: IPersonHome['profileType']
  user: IPersonHome['user']
}

const sections = [AssignmentIcon, HomeIcon, TrendingUpIcon].map(Icon => ({ icon: Icon }))

export function Greetings({profileType, user}: GreetingsProps) {
  const t = useTranslations('components.home')

  return <Section
    color='primary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={<AnimationGroup1 />}
  >
    <SectionHeader
      isTitle
      onGradient
      text1={`${t(`greetings.title`)}, ${user.name} ${user.surname}`}
      text2={t('greetings.desc')}
    />
    {profileType !== 'staff' && <StatsPanels panels={sections.map((feature, index) => ({
      text: t(`sections.${profileType}.${index + 1}`),
      Icon: feature.icon
    }))} />}
  </Section>
}