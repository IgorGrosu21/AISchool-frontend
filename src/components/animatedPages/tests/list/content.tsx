"use client";

import { useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ITest } from "@/interfaces";
import { useTestsContext } from "@/providers";
import { WithLoader } from "@/ui";

import { TestsListLevel } from "./level";

//mui components
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import FilterListIcon from "@mui/icons-material/FilterList";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const GROUP_KEYS = ["grade", "year", "subject"];

export function TestsList({ type }: { type: "exams" | "olympiads" }) {
  const t = useTranslations(`animated_pages.tests`);
  const theme = useTheme();
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md"));
  const { tests, filtering, loading } = useTestsContext(type);

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
    });
    return isMdOrUp ? base : [...base, type === "exams" ? "profile" : "lang"];
  }, [filtering, isMdOrUp, type]);

  const getGroupLabel = useCallback(
    (key: string, value: string, groupTests: ITest[]): string => {
      if (key === "grade") return t("groupFormat.grade", { value });
      if (key === "year") return t("groupFormat.year", { value });
      if (key === "lang") return t("groupFormat.lang", { value });
      if (key === "profile") return t("groupFormat.profile", { value });
      if (key === "subject") {
        const names = [
          ...new Set(
            groupTests
              .map((t) => t.subject?.name)
              .filter((n): n is string => Boolean(n)),
          ),
        ];
        return names.length > 0 ? names.join(" - ") : value;
      }
      return value;
    },
    [t],
  );

  if (!hasAnyFilter || (tests !== null && tests.length === 0)) {
    const isPickFilter = !hasAnyFilter;
    return (
      <Fade key="tests-list-empty" in={true} timeout={300}>
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
              {t(`${isPickFilter ? "pickFilter" : "empty"}`, { type: type })}
            </Typography>
          </Paper>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade key="tests-list" in={true} timeout={300}>
      <Box id="section1" sx={{ py: 2, px: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t(`plural.${type}`)}
        </Typography>
        <WithLoader loading={loading}>
          <Paper variant="outlined" sx={{ overflow: "hidden" }}>
            <List disablePadding>
              {tests && (
                <TestsListLevel
                  tests={tests}
                  groupingKeys={groupingKeys}
                  depth={0}
                  getGroupLabel={getGroupLabel}
                  isMdOrUp={isMdOrUp}
                  type={type}
                />
              )}
            </List>
          </Paper>
        </WithLoader>
      </Box>
    </Fade>
  );
}
