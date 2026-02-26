"use client";

import { ProviderProps, useMemo, useState } from "react";
import { IOlympiad } from "@/interfaces";

import { OlympiadsContext, type OlympiadsFiltering } from "./context";
import { getCuttedSlug } from "@/utils/cuttedSlug";

interface OlympiadsProviderValue {
  olympiads: IOlympiad[];
}

export function OlympiadsProvider({
  children,
  value,
}: ProviderProps<OlympiadsProviderValue>) {
  const [filtering, setFiltering] = useState<OlympiadsFiltering>({
    grade: undefined,
    year: undefined,
    lang: undefined,
    subjectCuttedSlug: undefined,
  });

  const olympiads = useMemo(() => {
    return value.olympiads.filter((item) => {
      const subjectMatch =
        filtering.subjectCuttedSlug == null ||
        filtering.subjectCuttedSlug === "" ||
        getCuttedSlug(item.subject.slug) === filtering.subjectCuttedSlug;
      return (
        (item.year === filtering.year || filtering.year === undefined) &&
        (item.grade === filtering.grade || filtering.grade === undefined) &&
        subjectMatch &&
        (item.lang === filtering.lang || filtering.lang === undefined)
      );
    });
  }, [value.olympiads, filtering]);

  return (
    <OlympiadsContext.Provider
      value={{
        olympiads,
        allOlympiads: value.olympiads,
        filtering,
        setFiltering,
      }}
    >
      {children}
    </OlympiadsContext.Provider>
  );
}
