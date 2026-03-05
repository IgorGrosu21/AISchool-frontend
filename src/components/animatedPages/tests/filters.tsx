"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useTestsContext, type TestsFiltering } from "@/providers";
import type { ISubject } from "@/interfaces";
import {
  buildSubjectOptionsByCuttedSlug,
  getAvailableLangsForSubject,
} from "@/utils/tests";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ALL_YEARS = {
  exams: [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023, 2024, 2025,
  ].reverse(),
  olympiads: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].reverse(),
} as const;
const ALL_GRADES = {
  exams: [4, 9, 12],
  olympiads: [7, 8, 9, 10, 11, 12],
} as const;
const ALL_LANGS = {
  exams: ["en", "fr", "sp", "tu", "it", "ga", "bu", "ru", "ro", "ge", "uk"],
  olympiads: ["uk", "ge", "ru", "sp", "ga", "fr", "bu", "ro", "en"],
} as const;
const ALL_TYPES = {
  exams: ["T", "P", "E", "S"],
  olympiads: [],
} as const;
const ALL_PROFILES = {
  exams: ["U", "R", "A", "S", "-"],
  olympiads: [],
} as const;

export function TestsFilters({
  subjects,
  type,
}: {
  subjects: ISubject[];
  type: "exams" | "olympiads";
}) {
  const t = useTranslations(`animated_pages.tests`);
  const { filtering, setFiltering, allTests } = useTestsContext(type);

  const subjectOptionsByCuttedSlug = useMemo(() => {
    return buildSubjectOptionsByCuttedSlug(
      subjects,
      allTests,
      (item) => item.subject.slug,
    );
  }, [subjects, allTests]);

  const availableLangs = useMemo(() => {
    return getAvailableLangsForSubject(
      subjectOptionsByCuttedSlug,
      filtering.subjectCuttedSlug ?? undefined,
      ALL_LANGS[type],
    );
  }, [filtering.subjectCuttedSlug, subjectOptionsByCuttedSlug, type]);

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
    <K extends keyof TestsFiltering>(
      key: K,
      value: TestsFiltering[K] | undefined,
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
        <Grid2
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: type === "exams" ? 2 : 3,
            xl: type === "exams" ? 1 : 3,
          }}
        >
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
              {ALL_YEARS[type].map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: type === "exams" ? 2 : 3,
            xl: type === "exams" ? 1 : 3,
          }}
        >
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
              {ALL_GRADES[type].map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: type === "exams" ? 2 : 4,
            xl: type === "exams" ? 5 : 4,
          }}
        >
          <FormControl size="small" fullWidth>
            <InputLabel>{t("filters.subject")}</InputLabel>
            <Select
              value={filtering.subjectCuttedSlug ?? ""}
              label={t("filters.subject")}
              onChange={(e) => {
                const cuttedSlug = (e.target.value as string) || undefined;
                setFiltering((prev) => ({
                  ...prev,
                  subject: undefined,
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
        <Grid2
          size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: type === "exams" ? 1 : 2 }}
        >
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
        {type === "exams" && (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>{t("filters.type")}</InputLabel>
              <Select
                value={filtering.type ?? ""}
                label={t("filters.type")}
                onChange={(e) =>
                  updateFilter(
                    "type",
                    e.target.value === "" ? undefined : String(e.target.value),
                  )
                }
                onClose={blurOnClose}
              >
                <MenuItem value="">{t("filters.all")}</MenuItem>
                {ALL_TYPES[type].map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(`filters.types.${type}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        )}
        {type === "exams" && (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>{t("filters.profile")}</InputLabel>
              <Select
                value={filtering.profile ?? ""}
                label={t("filters.profile")}
                onChange={(e) =>
                  updateFilter(
                    "profile",
                    e.target.value === "" ? undefined : String(e.target.value),
                  )
                }
                onClose={blurOnClose}
              >
                <MenuItem value="">{t("filters.all")}</MenuItem>
                {ALL_PROFILES[type].map((p) => (
                  <MenuItem key={p} value={p}>
                    {t(`filters.profiles.${p}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
}
