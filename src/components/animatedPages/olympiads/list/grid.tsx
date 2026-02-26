"use client";

import { useTranslations } from "next-intl";
import type { IOlympiad } from "@/interfaces";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { OlympiadsTableCell } from "./cell";

const LINK_KEYS = [
  "test1",
  "barem1",
  "answers1",
  "test2",
  "barem2",
  "answers2",
  "results",
] as const;

export type OlympiadsGridProps = {
  olympiadList: IOlympiad[];
};

export function OlympiadsGrid({ olympiadList }: OlympiadsGridProps) {
  const t = useTranslations("animated_pages.olympiads");

  if (olympiadList.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
      {olympiadList.map((olympiad, i) => (
        <Paper
          key={i}
          variant="outlined"
          sx={{
            p: 2,
            border: "0",
            "&:last-of-type": { mb: 0 },
          }}
        >
          <Box
            component="span"
            sx={{
              display: "block",
              fontWeight: 600,
              mb: 1.5,
              color: "text.secondary",
            }}
          >
            {t("filters.lang")}: {olympiad.lang}
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
              "& > *:last-child": {
                gridColumn: "1 / -1",
              },
            }}
          >
            {LINK_KEYS.map((key) => (
              <OlympiadsTableCell key={key} olympiad={olympiad} linkKey={key} />
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
