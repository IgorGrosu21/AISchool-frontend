'use client'

import { School, TrendingUp, SmartToy, LaptopChromebook, AutoAwesome, BarChart } from '@mui/icons-material'
import { Section, StatsPanel, StatsPanelsContainer, SectionHeader, AnimationGroup1, AnimationGroup4 } from '@/ui'
import { LandingButtons } from './buttons'
import { useTranslations } from 'next-intl'

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
