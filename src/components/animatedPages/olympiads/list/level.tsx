"use client";

import type { IOlympiad } from "@/interfaces";
import type { OlympiadsSupportedOrdering } from "@/providers/olympiads";
import { partitionOlympiads } from "@/utils/olympiads";
import { OlympiadsTable } from "./table";
import { OlympiadsGrid } from "./grid";
import { CollapsibleGroup } from "@/ui";

import List from "@mui/material/List";
import Box from "@mui/material/Box";

export type OlympiadsListLevelProps = {
  olympiads: IOlympiad[];
  groupingKeys: OlympiadsSupportedOrdering[];
  depth: number;
  getGroupLabel: (
    key: OlympiadsSupportedOrdering,
    value: string,
    olympiads: IOlympiad[],
  ) => string;
  isMdOrUp: boolean;
};

export function OlympiadsListLevel({
  olympiads,
  groupingKeys,
  depth,
  getGroupLabel,
  isMdOrUp,
}: OlympiadsListLevelProps) {
  if (olympiads.length === 0) return null;

  if (groupingKeys.length === 0) {
    return (
      <Box>
        {isMdOrUp ? (
          <OlympiadsTable olympiadList={olympiads} />
        ) : (
          <OlympiadsGrid olympiadList={olympiads} />
        )}
      </Box>
    );
  }

  const [firstKey, ...restKeys] = groupingKeys;
  const partitions = partitionOlympiads(olympiads, firstKey);
  const sortedEntries = Array.from(partitions.entries()).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
  const pl = (depth + 1) * 3;

  return (
    <>
      {sortedEntries.map(([value, groupOlympiads]) => {
        const label = getGroupLabel(firstKey, value, groupOlympiads);
        return (
          <CollapsibleGroup key={value} label={label} pl={pl}>
            <List disablePadding component="div">
              <OlympiadsListLevel
                olympiads={groupOlympiads}
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
