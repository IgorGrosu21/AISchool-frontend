import type { IOlympiad } from "@/interfaces";
import type { OlympiadsSupportedOrdering } from "@/providers/olympiads";
import { getCuttedSlug } from "./cuttedSlug";
import { partitionBy } from "@/utils/grouping";

export function getOlympiadGroupValue(
  item: IOlympiad,
  key: OlympiadsSupportedOrdering,
): string | number {
  if (key === "subject")
    return getCuttedSlug(item.subject?.slug ?? "");
  const v = item[key];
  return v as string | number;
}

export function partitionOlympiads(
  items: IOlympiad[],
  key: OlympiadsSupportedOrdering,
): Map<string, IOlympiad[]> {
  return partitionBy(items, (item) =>
    String(getOlympiadGroupValue(item, key)),
  );
}
