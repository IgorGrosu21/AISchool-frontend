"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader, Panel } from "@/ui";
import { useTranslations } from "next-intl";
import { m, useInView } from "framer-motion";
import { Link } from "@/i18n";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const DURATION_MS = 2200;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CIRCLES = [
  {
    type: "exams",
    target: 2891,
    gradient:
      "linear-gradient(135deg, rgba(102, 126, 234, 0.55) 0%, rgba(118, 75, 162, 0.55) 100%)",
  },
  {
    type: "olympiads",
    target: 754,
    gradient:
      "linear-gradient(135deg, rgba(17, 153, 142, 0.55) 0%, rgba(56, 239, 125, 0.55) 100%)",
  },
  {
    type: "schools",
    target: 145,
    gradient:
      "linear-gradient(135deg, rgba(240, 147, 251, 0.55) 0%, rgba(245, 87, 108, 0.55) 100%)",
  },
];

export function ExamsAndOlympiads() {
  const t = useTranslations("animated_pages.landing.exams_and_olympiads");
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const [displayValues, setDisplayValues] = useState<number[]>(
    CIRCLES.map(() => 0),
  );
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    const targets = CIRCLES.map((c) => c.target);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeOutCubic(progress);
      setDisplayValues(
        targets.map((target) => Math.round(eased * target)),
      );
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValues(targets);
      }
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <Section id="section2">
      <SectionHeader text1={t("title")} text2={t("desc")} />
      <m.div
        ref={containerRef}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{ width: "100%", maxWidth: "lg", margin: "0 auto" }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={4}
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          sx={{ px: 2 }}
        >
          {CIRCLES.map(({ type, gradient }, index) => (
            <m.div
              key={`circle-${index}`}
              variants={{
                hidden: { opacity: 0, scale: 0.5, y: 20 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
            >
              <Box
                component={Link}
                href={`/${type}`}
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <m.div
                  whileHover={{
                    scale: 1.04,
                    y: -6,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  style={{ display: "block" }}
                >
                  <Panel
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={0.5}
                    sx={{
                      width: { xs: 180, sm: 200, md: 240 },
                      height: { xs: 180, sm: 200, md: 240 },
                      flex: "none",
                      p: 0,
                      borderRadius: "50%",
                      background: `${gradient} !important`,
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid",
                      borderColor: `${gradient.split(" 0%,")[0].replace("linear-gradient(135deg, ", "")} !important`,
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
                      "&:hover": {
                        boxShadow:
                          "0 16px 48px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)",
                      },
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "2.25rem", sm: "2.5rem", md: "3rem" },
                        color: "#fff",
                        textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      {displayValues[index]}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "#fff",
                        textAlign: "center",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        textShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      {t(type)}
                    </Typography>
                  </Panel>
                </m.div>
              </Box>
            </m.div>
          ))}
        </Stack>
      </m.div>
    </Section>
  );
}
