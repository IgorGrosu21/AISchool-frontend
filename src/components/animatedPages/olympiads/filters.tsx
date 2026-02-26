"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useOlympiadsContext } from "@/providers/olympiads";
import type { IOlympiad } from "@/interfaces";
import type { ISubject } from "@/interfaces";
import {
  buildSubjectOptionsByCuttedSlug,
  getAvailableLangsForSubject,
} from "@/utils/manuals";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ALL_YEARS = [
  2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
].reverse();
const ALL_GRADES = [7, 8, 9, 10, 11, 12];
const ALL_LANGS = ["uk", "ge", "ru", "sp", "ga", "fr", "bu", "ro", "en"];

export function OlympiadsFilters({ subjects }: { subjects: ISubject[] }) {
  const t = useTranslations("animated_pages.olympiads");
  const { filtering, setFiltering, allOlympiads } = useOlympiadsContext();

  const subjectOptionsByCuttedSlug = useMemo(() => {
    return buildSubjectOptionsByCuttedSlug(
      subjects,
      allOlympiads,
      (item) => item.subject.slug,
    );
  }, [subjects, allOlympiads]);

  const availableLangs = useMemo(() => {
    return getAvailableLangsForSubject(
      subjectOptionsByCuttedSlug,
      filtering.subjectCuttedSlug ?? undefined,
      ALL_LANGS,
    );
  }, [filtering.subjectCuttedSlug, subjectOptionsByCuttedSlug]);

  useEffect(() => {
    if (
      filtering.lang &&
      availableLangs.length > 0 &&
      !availableLangs.includes(filtering.lang)
    ) {
      setFiltering((prev) => ({ ...prev, lang: undefined }));
    }
  }, [filtering.lang, availableLangs, setFiltering]);

  const updateFilter = useCallback(
    <K extends keyof Pick<IOlympiad, "grade" | "year" | "lang">>(
      key: K,
      value: IOlympiad[K] | undefined,
    ) => {
      setFiltering((prev) => ({ ...prev, [key]: value }));
    },
    [setFiltering],
  );

  const blurOnClose = useCallback(() => {
    (document.activeElement as HTMLElement)?.blur();
  }, []);

  return (
    <Box id="section0" sx={{ py: 4, px: 2 }}>
      <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
        {t("filters.title")}
      </Typography>
      <Grid2 container spacing={2} sx={{ alignItems: "flex-end" }}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>{t("filters.year")}</InputLabel>
            <Select
              value={filtering.year ?? ""}
              label={t("filters.year")}
              onChange={(e) =>
                updateFilter(
                  "year",
                  e.target.value === "" ? undefined : Number(e.target.value),
                )
              }
              onClose={blurOnClose}
            >
              <MenuItem value="">{t("filters.all")}</MenuItem>
              {ALL_YEARS.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>{t("filters.grade")}</InputLabel>
            <Select
              value={filtering.grade ?? ""}
              label={t("filters.grade")}
              onChange={(e) =>
                updateFilter(
                  "grade",
                  e.target.value === "" ? undefined : Number(e.target.value),
                )
              }
              onClose={blurOnClose}
            >
              <MenuItem value="">{t("filters.all")}</MenuItem>
              {ALL_GRADES.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>{t("filters.subject")}</InputLabel>
            <Select
              value={filtering.subjectCuttedSlug ?? ""}
              label={t("filters.subject")}
              onChange={(e) => {
                const cuttedSlug = (e.target.value as string) || undefined;
                setFiltering((prev) => ({
                  ...prev,
                  subjectCuttedSlug: cuttedSlug,
                }));
              }}
              onClose={blurOnClose}
            >
              <MenuItem value="">{t("filters.all")}</MenuItem>
              {subjectOptionsByCuttedSlug.map(([cuttedSlug, group]) => (
                <MenuItem key={cuttedSlug} value={cuttedSlug}>
                  {group.map((s) => s.name).join(" - ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>{t("filters.lang")}</InputLabel>
            <Select
              value={filtering.lang ?? ""}
              label={t("filters.lang")}
              onChange={(e) =>
                updateFilter(
                  "lang",
                  e.target.value === "" ? undefined : String(e.target.value),
                )
              }
              onClose={blurOnClose}
            >
              <MenuItem value="">{t("filters.all")}</MenuItem>
              {availableLangs.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
    </Box>
  );
}
