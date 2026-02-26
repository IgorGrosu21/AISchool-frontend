'use client'

import { AnimationGroup3, Section, SectionHeader, StatsPanels } from "@/ui";
import { useTranslations } from "next-intl";

//icons
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const features = [
  { icon: SupervisorAccountIcon, section: 'us' },
  { icon: QuestionMarkIcon, section: 'motives' },
  { icon: TrendingUpIcon, section: 'goals' },
]

export function AboutHero() {
  const t = useTranslations('animated_pages.info.about');

  return <Section
    color='primary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={<AnimationGroup3 />}
  >
    <SectionHeader isTitle onGradient text1={t(`hero.title`)} text2={t(`hero.desc`)} />
    <StatsPanels panels={features.map(feature => ({
      text: t(`${feature.section}.title`),
      Icon: feature.icon,
    }))} />
  </Section>
}