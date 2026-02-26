import type { ISubject } from "@/interfaces";
import { getCuttedSlug } from "@/utils/cuttedSlug";

/**
 * Builds subject options grouped by cutted slug, only including cutted slugs
 * that appear in the given items (via getSubjectSlug).
 */
export function buildSubjectOptionsByCuttedSlug<T>(
  subjects: ISubject[],
  items: T[],
  getSubjectSlug: (item: T) => string,
): [string, ISubject[]][] {
  const cuttedSlugsPresent = new Set(
    items.map((item) => getCuttedSlug(getSubjectSlug(item))),
  );
  const map = new Map<string, ISubject[]>();
  for (const s of subjects) {
    const cutted = getCuttedSlug(s.slug);
    if (!cuttedSlugsPresent.has(cutted)) continue;
    if (!map.has(cutted)) map.set(cutted, []);
    map.get(cutted)!.push(s);
  }
  return Array.from(map.entries());
}

/**
 * Returns the list of language codes available for the selected subject group,
 * or allLangs when no subject is selected or the group is empty.
 */
export function getAvailableLangsForSubject(
  subjectOptionsByCuttedSlug: [string, ISubject[]][],
  subjectCuttedSlug: string | undefined,
  allLangs: string[],
): string[] {
  if (!subjectCuttedSlug) return allLangs;
  const group = subjectOptionsByCuttedSlug.find(
    ([cutted]) => cutted === subjectCuttedSlug,
  )?.[1];
  if (!group?.length) return allLangs;
  const langs = Array.from(new Set(group.map((s) => s.lang)));
  return allLangs.filter((lang) => langs.includes(lang));
}
