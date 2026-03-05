"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import type { IExam } from "@/interfaces";
import { ALL_TYPES } from "@/utils/tests";
import { ExamsTableCell } from "./cell";

//mui components
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export type ExamsGridProps = {
  tests: IExam[];
};

export function ExamsGrid({ tests }: ExamsGridProps) {
  const t = useTranslations("animated_pages.tests");

  return (
    <Paper variant="outlined" sx={{ mb: 2, border: "0", p: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 1.5,
          alignItems: "start",
        }}
      >
        {ALL_TYPES.map((type) => (
          <Fragment key={type}>
            <Stack
              sx={{ fontWeight: 500, justifyContent: "center", height: "100%" }}
            >
              {t(`filters.types.${type}`)}
            </Stack>
            <Box>
              <ExamsTableCell tests={tests.filter((t) => t.type === type)} />
            </Box>
          </Fragment>
        ))}
      </Box>
    </Paper>
  );
}
