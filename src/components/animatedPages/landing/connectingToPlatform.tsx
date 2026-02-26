"use client";

import { Panel, Section, SectionHeader } from "@/ui";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";

//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//icons
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

const roles = [
  { type: "administration", color: "#FF6B6B", icon: SchoolIcon },
  { type: "teacher", color: "#DDA0DD", icon: GroupIcon },
  { type: "student", color: "#45B7D1", icon: PersonIcon },
  { type: "parent", color: "#96CEB4", icon: FamilyRestroomIcon },
];

export function ConnectingToPlatform() {
  const t = useTranslations(`animated_pages.landing.connecting_to_platform`);

  return (
    <Section id="section3">
      <SectionHeader text1={t(`title`)} text2={t(`desc`)} />
      <Stack
        gap={2}
        sx={{ width: "100%", maxWidth: "lg", mx: "auto", px: 4, zIndex: 2 }}
      >
        {roles.map(({ type, color, icon: Icon }, index) => (
          <m.div
            key={`goals-${index}`}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
            style={{ height: "100%" }}
          >
            <Panel
              direction="row"
              gap={2}
              sx={{
                height: "100%",
                alignItems: "center",
                position: "relative",
                p: 4,
              }}
            >
              <Stack
                sx={{
                  width: { xs: 40, md: 80 },
                  height: { xs: 40, md: 80 },
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 8px 32px ${color}40`,
                }}
              >
                <Icon
                  sx={{
                    fontSize: { xs: 24, md: 40 },
                    color: "background.default",
                  }}
                />
              </Stack>
              <Stack gap={1} sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    textAlign: "left",
                    fontSize: { xs: "1rem", md: "1.25rem" },
                  }}
                >
                  {t(`roles.${type}.title`)}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    textAlign: "left",
                    fontSize: { xs: "0.75rem", md: "1rem" },
                  }}
                >
                  {t(`roles.${type}.desc`)}
                </Typography>
              </Stack>
            </Panel>
          </m.div>
        ))}
      </Stack>
    </Section>
  );
}
