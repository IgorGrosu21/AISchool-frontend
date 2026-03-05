"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { AnimationGroup3, Section, SectionHeader, StatsPanels } from "@/ui";
import { useTestsContext } from "@/providers";

//icons
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const features = [
  { icon: RocketLaunchIcon, section: "2025" },
  { icon: AutoAwesomeIcon, section: "2024" },
  { icon: TrendingUpIcon, section: "2023" },
];

export function TestsHero({ type }: { type: "exams" | "olympiads" }) {
  const t = useTranslations(`animated_pages.tests`);
  const { setFiltering } = useTestsContext(type);

  const scrollToFilters = useCallback(
    (year: number) => {
      setFiltering((filtering) => ({ ...filtering, year }));
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
        text1={t(`plural.${type}`)}
        text2={t(`desc.${type}`)}
      />
      <StatsPanels
        panels={features.map((feature) => ({
          text: `${t("plural." + type)} ${feature.section}`,
          onClick: () => scrollToFilters(Number(feature.section)),
          Icon: feature.icon,
        }))}
      />
    </Section>
  );
}
