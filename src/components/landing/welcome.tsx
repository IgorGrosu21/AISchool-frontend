'use client'

import dynamic from 'next/dynamic'
import { Section, StatsPanel, StatsPanelsContainer, SectionHeader } from '@/ui'
import { LandingButtons } from './buttons'
import { useTranslations } from 'next-intl'

//icons
import SmartToy from '@mui/icons-material/SmartToy'
import LaptopChromebook from '@mui/icons-material/LaptopChromebook'
import School from '@mui/icons-material/School'
import AutoAwesome from '@mui/icons-material/AutoAwesome'
import TrendingUp from '@mui/icons-material/TrendingUp'
import BarChart from '@mui/icons-material/BarChart'

// Lazy load animation groups
const AnimationGroup1 = dynamic(() => import('@/ui/animationsGroups/group1').then(mod => ({ default: mod.AnimationGroup1 })), { ssr: false })
const AnimationGroup4 = dynamic(() => import('@/ui/animationsGroups/group4').then(mod => ({ default: mod.AnimationGroup4 })), { ssr: false })

const heroFeatures = [SmartToy, LaptopChromebook, School].map(Icon => ({ icon: Icon }))
const ctaFeatures = [AutoAwesome, TrendingUp, BarChart].map(Icon => ({ icon: Icon }))

export function Welcome({type}: {type: 'hero' | 'cta'}) {
  const t = useTranslations(`components.landing.welcome`);

  return <Section
    color='primary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={type === 'hero' ? <AnimationGroup1 /> : <AnimationGroup4 />}
  >
    <SectionHeader isTitle={type === 'hero'} onGradient text1={t(`${type}.title`)} text2={t(`${type}.desc`)} />
    <LandingButtons buttons={[
      {variant: 'contained', text: t('buttons.1')},
      {variant: 'outlined', text: t('buttons.2')}
    ]} />
    <StatsPanelsContainer>
      {(type === 'hero' ? heroFeatures : ctaFeatures).map((feature, index) => <StatsPanel
        key={index}
        text={t(`${type}.features.${index + 1}.title`)}
        desc={t(`${type}.features.${index + 1}.desc`)}
        Icon={feature.icon}
      />)}
    </StatsPanelsContainer>
  </Section>
}
