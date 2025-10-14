'use client'

import { useTranslations } from "next-intl";
import { AnimationGroup2, Section, SectionHeader, StatsPanels } from "@/ui";

//icons
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import SmartToyIcon from "@mui/icons-material/SmartToy"

const features = [RocketLaunchIcon, TrendingUpIcon, SmartToyIcon].map(Icon => ({ icon: Icon }))

export function SubscriptionHero() {
  const t = useTranslations('subscriptions.hero');

  return <Section
    color='tertiary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={<AnimationGroup2 />}
  >
    <SectionHeader isTitle onGradient text1={t(`title`)} text2={t(`desc`)} />
    <StatsPanels panels={features.map((feature, index) => ({
      text: t(`features.${index + 1}`),
      Icon: feature.icon,
    }))} />
  </Section>
}
