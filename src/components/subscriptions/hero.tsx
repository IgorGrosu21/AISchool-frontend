'use client'

import { useTranslations } from "next-intl";
import { RocketLaunch, TrendingUp, SmartToy } from '@mui/icons-material';
import { AnimationGroup2, Section, SectionHeader, StatsPanel, StatsPanelsContainer } from "@/ui";

const features = [RocketLaunch, TrendingUp, SmartToy].map(Icon => ({ icon: Icon }))

export function SubscriptionHero() {
  const t = useTranslations('subscriptions.hero');

  return <Section
    color='tertiary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={<AnimationGroup2 />}
  >
    <SectionHeader isTitle onGradient text1={t(`title`)} text2={t(`desc`)} />
    <StatsPanelsContainer>
      {features.map((feature, index) => <StatsPanel
        key={index}
        text={t(`features.${index + 1}`)}
        Icon={feature.icon}
      />)}
    </StatsPanelsContainer>
  </Section>
}
