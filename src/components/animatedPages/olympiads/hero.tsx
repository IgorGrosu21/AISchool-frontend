"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { AnimationGroup3, Section, SectionHeader, StatsPanels } from "@/ui";
import { useOlympiadsContext } from "@/providers/olympiads";

//icons
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const features = [
  { icon: RocketLaunchIcon, section: "2025" },
  { icon: AutoAwesomeIcon, section: "2024" },
  { icon: TrendingUpIcon, section: "2023" },
];

export function OlympiadsHero() {
  const t = useTranslations("animated_pages.olympiads");
  const { setFiltering } = useOlympiadsContext();

  const scrollToFilters = useCallback(
    (year: number) => {
      setFiltering({ year });
      document
        .getElementById("section0")
        ?.scrollIntoView({ behavior: "smooth" });
    },
    [setFiltering],
  );

  return (
    <Section
      color="tertiary"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      animationGroup={<AnimationGroup3 />}
    >
      <SectionHeader
        isTitle
        onGradient
        text1={t("hero.title")}
        text2={t("hero.desc")}
      />
      <StatsPanels
        panels={features.map((feature) => ({
          text: t(`${feature.section}.title`),
          onClick: () => scrollToFilters(Number(feature.section)),
          Icon: feature.icon,
        }))}
      />
    </Section>
  );
}
