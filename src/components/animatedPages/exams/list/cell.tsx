"use client";

import { useTranslations } from "next-intl";
import type { IExam } from "@/interfaces";

//mui components
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type ExamsTableCellProps = {
  exams: IExam[];
};

export function ExamsTableCell({ exams }: ExamsTableCellProps) {
  const t = useTranslations("animated_pages.exams");

  if (exams.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center" }}>
        —
      </Typography>
    );
  }

  return (
    <Stack gap={1} sx={{ py: 1.5 }}>
      {exams.map((exam, i) => (
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={1}
          key={i}
          sx={{ justifyContent: "center" }}
        >
          <Button
            component="a"
            href={exam.test}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="outlined"
            color="primary"
          >
            {exam.order !== 0 ? `#${exam.order}` : t("list.test")}
          </Button>
          {exam.answers && (
            <Button
              component="a"
              href={exam.answers}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              color="secondary"
            >
              {t("list.answers")}
            </Button>
          )}
        </Stack>
      ))}
    </Stack>
  );
}
