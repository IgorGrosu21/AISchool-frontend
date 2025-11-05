'use client'

import { useTranslations } from "next-intl";
import { AnimationGroup2, Section, SectionHeader, StatsPanels } from "@/ui";

//icons
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import InfoIcon from "@mui/icons-material/Info"

const features = [
  { icon: RocketLaunchIcon, section: 'pluses' },
  { icon: AutoAwesomeIcon, section: 'plans' },
  { icon: InfoIcon, section: 'description' },
]

export function SubscriptionHero() {
  const t = useTranslations('subscriptions');

  return <Section
    color='tertiary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={<AnimationGroup2 />}
  >
    <SectionHeader isTitle onGradient text1={t(`hero.title`)} text2={t(`hero.desc`)} />
    <StatsPanels panels={features.map(feature => ({
      text: t(`${feature.section}.title`),
      Icon: feature.icon,
    }))} />
  </Section>
}
