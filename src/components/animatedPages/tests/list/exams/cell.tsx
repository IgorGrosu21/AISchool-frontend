"use client";

import { useTranslations } from "next-intl";
import type { IExam } from "@/interfaces";

//mui components
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type ExamsTableCellProps = {
  tests: IExam[];
};

export function ExamsTableCell({ tests }: ExamsTableCellProps) {
  const t = useTranslations("animated_pages.tests");

  if (tests.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center" }}>
        —
      </Typography>
    );
  }

  return (
    <Stack gap={1} sx={{ py: 1.5 }}>
      {tests.map((test, i) => (
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={1}
          key={i}
          sx={{ justifyContent: "center" }}
        >
          <Button
            component="a"
            href={test.test}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="outlined"
            color="primary"
          >
            {test.order !== 0 ? `#${test.order}` : t("test")}
          </Button>
          {test.answers && (
            <Button
              component="a"
              href={test.answers}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              color="secondary"
            >
              {t("answers")}
            </Button>
          )}
        </Stack>
      ))}
    </Stack>
  );
}
