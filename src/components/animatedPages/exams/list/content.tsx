"use client";

import { useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useExamsContext, type SupportedOrdering } from "@/providers";
import type { IExam } from "@/interfaces";

import { ExamsListLevel } from "./level";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import FilterListIcon from "@mui/icons-material/FilterList";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const GROUP_KEYS: SupportedOrdering[] = ["grade", "year", "subject"];

export function ExamsList() {
  const t = useTranslations("animated_pages.exams");
  const theme = useTheme();
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md"));
  const { exams, filtering } = useExamsContext();

  const hasAnyFilter = useMemo(() => {
    return (
      filtering.year != undefined ||
      filtering.grade != undefined ||
      (filtering.subjectCuttedSlug != undefined &&
        filtering.subjectCuttedSlug !== "") ||
      (filtering.lang != undefined && filtering.lang !== "") ||
      (filtering.type != undefined && filtering.type !== "") ||
      (filtering.profile != undefined && filtering.profile !== "")
    );
  }, [filtering]);

  const groupingKeys = useMemo(() => {
    const base = GROUP_KEYS.filter((key) => {
      if (key === "subject") {
        return (
          filtering.subjectCuttedSlug == undefined ||
          filtering.subjectCuttedSlug === ""
        );
      }
      const v = filtering[key];
      return v === undefined || v === "";
    }) as SupportedOrdering[];
    return isMdOrUp ? base : ([...base, "profile"] as SupportedOrdering[]);
  }, [filtering, isMdOrUp]);

  const getGroupLabel = useCallback(
    (key: SupportedOrdering, value: string, groupExams: IExam[]): string => {
      if (key === "grade") return t("list.groupFormat.grade", { value });
      if (key === "year") return t("list.groupFormat.year", { value });
      if (key === "profile") return t("list.groupFormat.profile", { value });
      if (key === "subject") {
        const exam = groupExams[0];
        return exam?.subject?.name ?? value;
      }
      return value;
    },
    [t],
  );

  if (!hasAnyFilter || exams.length === 0) {
    const isPickFilter = !hasAnyFilter;
    return (
      <Fade key="exams-list-empty" in={true} timeout={300}>
        <Box id="section1" sx={{ py: 4, px: 2 }}>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              py: 6,
              px: 3,
              textAlign: "center",
              bgcolor: "action.hover",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            {isPickFilter ? (
              <FilterListIcon sx={{ fontSize: 48, color: "text.disabled" }} />
            ) : (
              <InboxOutlinedIcon
                sx={{ fontSize: 48, color: "text.disabled" }}
              />
            )}
            <Typography variant="body1" color="text.secondary">
              {t(`list.${isPickFilter ? "pickFilter" : "empty"}`)}
            </Typography>
          </Paper>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade key="exams-list" in={true} timeout={300}>
      <Box id="section1" sx={{ py: 2, px: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("list.title")}
        </Typography>
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <List disablePadding>
            <ExamsListLevel
              exams={exams}
              groupingKeys={groupingKeys}
              depth={0}
              getGroupLabel={getGroupLabel}
              isMdOrUp={isMdOrUp}
            />
          </List>
        </Paper>
      </Box>
    </Fade>
  );
}
