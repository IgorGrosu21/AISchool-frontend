"use client";

import { useTranslations } from "next-intl";
import type { IExam } from "@/interfaces";
import type { SupportedOrdering } from "@/providers";
import { partitionExams } from "@/utils/exams";
import { ExamsTable } from "./table";
import { ExamsGrid } from "./grid";
import { CollapsibleGroup } from "@/ui";

import List from "@mui/material/List";
import Box from "@mui/material/Box";

export type ExamsListLevelProps = {
  exams: IExam[];
  groupingKeys: SupportedOrdering[];
  depth: number;
  getGroupLabel: (
    key: SupportedOrdering,
    value: string,
    exams: IExam[],
  ) => string;
  isMdOrUp: boolean;
};

export function ExamsListLevel({
  exams,
  groupingKeys,
  depth,
  getGroupLabel,
  isMdOrUp,
}: ExamsListLevelProps) {
  const t = useTranslations("animated_pages.exams");

  if (exams.length === 0) return null;

  if (groupingKeys.length === 0) {
    const langSet = new Set(exams.map((e) => e.lang));
    const hasMultipleLangs = langSet.size > 1;
    const pl = (depth + 1) * 3;

    const LeafContent = isMdOrUp ? ExamsTable : ExamsGrid;

    if (hasMultipleLangs) {
      const byLang = partitionExams(exams, "lang");
      const sortedLangEntries = Array.from(byLang.entries()).sort(([a], [b]) =>
        a.localeCompare(b),
      );
      return (
        <>
          {sortedLangEntries.map(([langValue, groupExams]) => (
            <CollapsibleGroup
              key={langValue}
              label={t("list.groupFormat.lang", { value: langValue })}
              pl={pl}
            >
              <Box>
                <LeafContent examList={groupExams} />
              </Box>
            </CollapsibleGroup>
          ))}
        </>
      );
    }

    return (
      <Box>
        <LeafContent examList={exams} />
      </Box>
    );
  }

  const [firstKey, ...restKeys] = groupingKeys;
  const partitions = partitionExams(exams, firstKey);
  const sortedEntries = Array.from(partitions.entries()).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
  const pl = (depth + 1) * 3;

  return (
    <>
      {sortedEntries.map(([value, groupExams]) => {
        const label = getGroupLabel(firstKey, value, groupExams);
        return (
          <CollapsibleGroup key={value} label={label} pl={pl}>
            <List disablePadding component="div">
              <ExamsListLevel
                exams={groupExams}
                groupingKeys={restKeys}
                depth={depth + 1}
                getGroupLabel={getGroupLabel}
                isMdOrUp={isMdOrUp}
              />
            </List>
          </CollapsibleGroup>
        );
      })}
    </>
  );
}
