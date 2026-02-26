"use client";

import { useTranslations } from "next-intl";
import type { IOlympiad } from "@/interfaces";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type OlympiadsTableCellProps = {
  olympiad: IOlympiad | null;
  linkKey: keyof IOlympiad;
};

export function OlympiadsTableCell({
  olympiad,
  linkKey,
}: OlympiadsTableCellProps) {
  const t = useTranslations("animated_pages.olympiads");

  if (!olympiad || !olympiad[linkKey]) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center" }}>
        —
      </Typography>
    );
  }

  const url = olympiad[linkKey];
  const labelKey = `list.links.${linkKey}`;
  return (
    <Stack sx={{ py: 1.5 }}>
      <Button
        component="a"
        href={url as string}
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        variant="outlined"
        color="primary"
      >
        {t(labelKey)}
      </Button>
    </Stack>
  );
}
