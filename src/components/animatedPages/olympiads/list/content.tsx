"use client";

import { useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  useOlympiadsContext,
  type OlympiadsSupportedOrdering,
} from "@/providers/olympiads";
import type { IOlympiad } from "@/interfaces";

import { OlympiadsListLevel } from "./level";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import FilterListIcon from "@mui/icons-material/FilterList";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const GROUP_KEYS: OlympiadsSupportedOrdering[] = ["grade", "year", "subject"];

export function OlympiadsList() {
  const t = useTranslations("animated_pages.olympiads");
  const theme = useTheme();
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md"));
  const { olympiads, filtering } = useOlympiadsContext();

  const hasAnyFilter = useMemo(() => {
    return (
      filtering.year != null ||
      filtering.grade != null ||
      (filtering.subjectCuttedSlug != null &&
        filtering.subjectCuttedSlug !== "") ||
      (filtering.lang != null && filtering.lang !== "")
    );
  }, [filtering]);

  const groupingKeys: OlympiadsSupportedOrdering[] = useMemo(() => {
    const base = GROUP_KEYS.filter((key) => {
      if (key === "subject") {
        return (
          filtering.subjectCuttedSlug == null ||
          filtering.subjectCuttedSlug === ""
        );
      }
      const v = filtering[key];
      return v === undefined || v === null || v === "";
    });
    return isMdOrUp ? base : [...base, "lang"];
  }, [filtering, isMdOrUp]);

  const getGroupLabel = useCallback(
    (
      key: OlympiadsSupportedOrdering,
      value: string,
      groupOlympiads: IOlympiad[],
    ): string => {
      if (key === "grade") return t("list.groupFormat.grade", { value });
      if (key === "year") return t("list.groupFormat.year", { value });
      if (key === "lang") return t("list.groupFormat.lang", { value });
      if (key === "subject") {
        const names = [
          ...new Set(
            groupOlympiads
              .map((o) => o.subject?.name)
              .filter((n): n is string => Boolean(n)),
          ),
        ];
        return names.length > 0 ? names.join(" - ") : value;
      }
      return value;
    },
    [t],
  );

  if (!hasAnyFilter || olympiads.length === 0) {
    const isPickFilter = !hasAnyFilter;
    return (
      <Fade key="olympiads-list-empty" in={true} timeout={300}>
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
    <Fade key="olympiads-list" in={true} timeout={300}>
      <Box id="section1" sx={{ py: 2, px: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("list.title")}
        </Typography>
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <List disablePadding>
            <OlympiadsListLevel
              olympiads={olympiads}
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
