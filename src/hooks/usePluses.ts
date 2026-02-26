"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

export function usePluses(currentSectionIndex: number) {
  const t = useTranslations("animated_pages.subscriptions");

  const sectionTypes = useMemo(
    () => [
      { type: "student" as const, paid: false },
      { type: "student" as const, paid: true },
      { type: "teacher" as const, paid: false },
      { type: "teacher" as const, paid: true },
      { type: "parent" as const, paid: false },
    ],
    [],
  );

  const iconColors = useMemo(
    () => ({
      student: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
      teacher: ["#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"],
      parent: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    }),
    [],
  );

  const sections = useMemo(() => {
    return sectionTypes.map((section) => {
      const { type, paid } = section;
      let pluses: string = "";
      let indexes: number[] = [0, 1, 2, 3];
      if (type === "student") {
        pluses = paid ? t("pluses.solo.list") : t("free_pluses.student");
        if (paid) {
          indexes = [0, 1, 6, 9];
        }
      } else if (type === "teacher") {
        pluses = paid ? t("pluses.group.list") : t("free_pluses.teacher");
        if (paid) {
          indexes = [1, 3, 4, 5];
        }
      } else {
        pluses = t("free_pluses.parent");
      }
      return {
        pluses: pluses
          .split(";")
          .filter((_, i) => indexes.includes(i))
          .map((plus, i) => ({
            plus,
            color: iconColors[type][i],
          })),
        type: type,
        paid,
      };
    });
  }, [iconColors, sectionTypes, t]);

  const currentSection = useMemo(
    () => sections[currentSectionIndex],
    [sections, currentSectionIndex],
  );

  return { sections, currentSection };
}
