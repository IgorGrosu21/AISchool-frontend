'use client'

import { AnimationGroup2, Section, SectionHeader } from "@/ui";
import { useTranslations } from "next-intl";


export function NewsHero() {
  const t = useTranslations('news');

  return <Section
    color='tertiary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={<AnimationGroup2 />}
  >
    <SectionHeader isTitle onGradient text1={t(`hero.title`)} text2={t(`hero.desc`)} />
  </Section>
}