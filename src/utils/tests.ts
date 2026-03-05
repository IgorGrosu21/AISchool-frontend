import type { IExam, ITest } from "@/interfaces";

import type { ISubject } from "@/interfaces";
/**
 * Returns the subject slug without the language suffix.
 * Slug is split by '-', the last segment (lang) is removed, then joined again.
 * e.g. "mathematics-en" -> "mathematics", "algebra-geometry-ro" -> "algebra-geometry"
 * Exception: "french-frbill" is returned as-is (not unified with other french-* subjects).
 */
const UNIFIED_EXCEPTION_SLUG = "french-frbill";

export function getCuttedSlug(slug: string): string {
  if (slug === UNIFIED_EXCEPTION_SLUG) return slug;
  const parts = slug.split("-");
  if (parts.length <= 1) return slug;
  parts.pop();
  return parts.join("-");
}

/**
 * Partitions an array into a Map of arrays by a key derived from each item.
 */
export function partitionBy<T>(
  items: T[],
  getKey: (item: T) => string,
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = getKey(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  }
  return map;
}

/**
 * Builds subject options grouped by cutted slug, only including cutted slugs
 * that appear in the given items (via getSubjectSlug).
 */
export function buildSubjectOptionsByCuttedSlug<T>(
  subjects: ISubject[],
  items: T[] | null,
  getSubjectSlug: (item: T) => string,
): [string, ISubject[]][] {
  const cuttedSlugsPresent = new Set(
    items ? items.map((item) => getCuttedSlug(getSubjectSlug(item))) : [],
  );
  const map = new Map<string, ISubject[]>();
  for (const s of subjects) {
    const cutted = getCuttedSlug(s.slug);
    if (!cuttedSlugsPresent.has(cutted) && items !== null) continue;
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
  allLangs: ReadonlyArray<string>,
): ReadonlyArray<string> {
  if (!subjectCuttedSlug) return allLangs;
  const group = subjectOptionsByCuttedSlug.find(
    ([cutted]) => cutted === subjectCuttedSlug,
  )?.[1];
  if (!group?.length) return allLangs;
  const langs = Array.from(new Set(group.map((s) => s.lang)));
  return allLangs.filter((lang) => langs.includes(lang));
}

export const ALL_TYPES = ["T", "P", "E", "S"] as const;
export const ALL_PROFILES = ["U", "R", "A", "S"] as const;

export function getPresentProfilesAndTypes(examList: IExam[]) {
  const profileSet = new Set(examList.map((e) => e.profile));
  const typeSet = new Set(examList.map((e) => e.type));
  const knownProfiles = ALL_PROFILES.filter((p) => profileSet.has(p));
  const knownTypes = ALL_TYPES.filter((t) => typeSet.has(t));
  const knownProfileSet = new Set<string>(knownProfiles);
  const knownTypeSet = new Set<string>(knownTypes);
  const otherProfiles = [...profileSet]
    .filter((p) => !knownProfileSet.has(p))
    .sort();
  const otherTypes = [...typeSet].filter((t) => !knownTypeSet.has(t)).sort();
  return {
    profiles: [...knownProfiles, ...otherProfiles],
    types: [...knownTypes, ...otherTypes],
  };
}

export function getTestGroupValue<T extends ITest>(
  test: T,
  key: string,
): string | number {
  const v = test[key];
  if (typeof v === "object") return v.slug ?? "";
  return v;
}

export function partitionTests<T extends ITest>(
  tests: T[],
  key: string,
): Map<string, T[]> {
  return partitionBy(tests, (test) => String(getTestGroupValue(test, key)));
}
