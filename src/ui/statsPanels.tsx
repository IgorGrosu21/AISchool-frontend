"use client";

import { useCallback } from "react";

//mui components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

interface StatsPanelsProps {
  panels: Array<{
    text: string;
    onClick?: () => void;
    Icon: typeof SvgIcon;
  }>;
}

export function StatsPanels({ panels }: StatsPanelsProps) {
  const scrollToSection = useCallback((index: number) => {
    const sectionElement = document.getElementById(`section${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      gap={4}
      sx={{
        mt: 4,
        animation: "fadeInUp 0.4s ease-out 0.8s both",
        "@keyframes fadeInUp": {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {panels.map((panel, i) => (
        <Box
          key={i}
          onClick={panel.onClick ?? (() => scrollToSection(i + 1))}
          sx={{
            flex: 1,
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "scale(1.05) translateY(-5px)",
            },
          }}
        >
          <Stack
            gap={2}
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              minWidth: 200,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <panel.Icon sx={{ fontSize: 40, color: "background.default" }} />
            <Typography
              variant="h6"
              sx={{ color: "background.default", fontWeight: 500 }}
            >
              {panel.text}
            </Typography>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
