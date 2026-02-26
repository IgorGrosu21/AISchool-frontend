"use client";

import { Section, StatsPanels, SectionHeader, AnimationGroup1 } from "@/ui";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Link } from "@/i18n";

//mui components
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
//icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LaptopChromebook from "@mui/icons-material/LaptopChromebook";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const heroFeatures = [LaptopChromebook, DescriptionIcon, AutoAwesomeIcon].map(
  (Icon) => ({
    icon: Icon,
  }),
);

export function LandingHero() {
  const t = useTranslations(`animated_pages.landing.hero`);

  return (
    <Section
      color="primary"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      animationGroup={<AnimationGroup1 />}
    >
      <SectionHeader isTitle onGradient text1={t(`title`)} text2={t(`desc`)} />
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={2}
          alignItems="center"
        >
          {[1, 2].map((buttonIndex) => (
            <Button
              key={buttonIndex}
              component={Link}
              href={buttonIndex === 1 ? "/core" : "/auth"}
              variant={buttonIndex === 1 ? "contained" : "outlined"}
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 3,
                color: "background.default",
                "&:hover": {
                  transform: "translateY(-2px)",
                  ...(buttonIndex === 1
                    ? {
                        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                      }
                    : {
                        borderColor: "background.default",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }),
                },
                transition: "all 0.3s ease",
                ...(buttonIndex === 1
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    }
                  : {
                      borderColor: "background.default",
                    }),
              }}
            >
              {t(`buttons.${buttonIndex}`)}
            </Button>
          ))}
        </Stack>
      </m.div>
      <StatsPanels
        panels={heroFeatures.map((feature, index) => ({
          text: t(`features.${index + 1}.title`),
          Icon: feature.icon,
        }))}
      />
    </Section>
  );
}
