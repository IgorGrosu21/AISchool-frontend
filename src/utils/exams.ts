import type { IExam } from "@/interfaces";
import type { SupportedOrdering } from "@/providers";
import { partitionBy } from "@/utils/grouping";

export { getCuttedSlug } from "./cuttedSlug";

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

export function getExamGroupValue(
  exam: IExam,
  key: SupportedOrdering,
): string | number {
  if (key === "subject") return exam.subject?.slug ?? "";
  const v = exam[key];
  return v as string | number;
}

export function partitionExams(
  exams: IExam[],
  key: SupportedOrdering,
): Map<string, IExam[]> {
  return partitionBy(exams, (exam) => String(getExamGroupValue(exam, key)));
}
