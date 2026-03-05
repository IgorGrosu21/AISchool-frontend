"use client";

import { useTranslations } from "next-intl";
import type { IExam, IOlympiad, ITest } from "@/interfaces";
import { partitionTests } from "@/utils/tests";
import { ExamsTable, ExamsGrid } from "./exams";
import { OlympiadsTable, OlympiadsGrid } from "./olympiads";
import { CollapsibleGroup } from "@/ui";

import List from "@mui/material/List";
import Box from "@mui/material/Box";

export type TestsListLevelProps = {
  tests: ITest[];
  groupingKeys: string[];
  depth: number;
  getGroupLabel: (key: string, value: string, tests: ITest[]) => string;
  isMdOrUp: boolean;
  type: "exams" | "olympiads";
};

export function TestsListLevel({
  tests,
  groupingKeys,
  depth,
  getGroupLabel,
  isMdOrUp,
  type,
}: TestsListLevelProps) {
  const t = useTranslations(`animated_pages.tests`);

  if (tests.length === 0) return null;
  const pl = (depth + 1) * 3;

  if (groupingKeys.length === 0) {
    const castTests = (tests: ITest[]) => tests as IExam[] & IOlympiad[];
    const LeafVariants =
      type === "exams"
        ? [ExamsTable, ExamsGrid]
        : [OlympiadsTable, OlympiadsGrid];
    const LeafContent = LeafVariants[isMdOrUp ? 0 : 1];
    const langSet = new Set(tests.map((e) => e.lang));
    const hasMultipleLangs = langSet.size > 1;

    if (hasMultipleLangs && type === "exams") {
      const byLang = partitionTests(tests, "lang");
      const sortedLangEntries = Array.from(byLang.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .filter(([, groupTests]) => groupTests.length > 0);
      return (
        <>
          {sortedLangEntries.map(([langValue, groupTests]) => (
            <CollapsibleGroup
              key={langValue}
              label={t("groupFormat.lang", { value: langValue })}
              pl={pl}
            >
              <Box>
                <LeafContent tests={castTests(groupTests)} />
              </Box>
            </CollapsibleGroup>
          ))}
        </>
      );
    }

    return (
      <Box>
        <LeafContent tests={castTests(tests)} />
      </Box>
    );
  }

  const [firstKey, ...restKeys] = groupingKeys;
  const partitions = partitionTests(tests, firstKey);
  const sortedEntries = Array.from(partitions.entries()).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

  return (
    <>
      {sortedEntries.map(([value, groupTests]) => {
        const label = getGroupLabel(firstKey, value, groupTests);
        return (
          <CollapsibleGroup key={value} label={label} pl={pl}>
            <List disablePadding component="div">
              <TestsListLevel
                tests={groupTests}
                groupingKeys={restKeys}
                depth={depth + 1}
                getGroupLabel={getGroupLabel}
                isMdOrUp={isMdOrUp}
                type={type}
              />
            </List>
          </CollapsibleGroup>
        );
      })}
    </>
  );
}
