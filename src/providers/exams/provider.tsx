"use client";

import { ProviderProps, useMemo, useState } from "react";
import { IExam } from "@/interfaces";

import { ExamsContext, type ExamsFiltering } from "./context";
import { getCuttedSlug } from "@/utils/cuttedSlug";

interface ExamsProviderValue {
  exams: IExam[];
}

export function ExamsProvider({
  children,
  value,
}: ProviderProps<ExamsProviderValue>) {
  const [filtering, setFiltering] = useState<ExamsFiltering>({
    grade: undefined,
    year: undefined,
    subject: undefined,
    lang: undefined,
    type: undefined,
    profile: undefined,
    subjectCuttedSlug: undefined,
  });

  const filteredExams = useMemo(() => {
    return value.exams.filter((exam) => {
      const subjectMatch =
        filtering.subjectCuttedSlug == undefined ||
        filtering.subjectCuttedSlug === "" ||
        getCuttedSlug(exam.subject.slug) === filtering.subjectCuttedSlug;
      return (
        (exam.year === filtering.year || filtering.year === undefined) &&
        (exam.grade === filtering.grade || filtering.grade === undefined) &&
        subjectMatch &&
        (exam.lang === filtering.lang || filtering.lang === undefined) &&
        (exam.type === filtering.type || filtering.type === undefined) &&
        (exam.profile === filtering.profile || filtering.profile === undefined)
      );
    });
  }, [value.exams, filtering]);

  const exams = useMemo(() => {
    return [...filteredExams].sort((a, b) => a.order - b.order);
  }, [filteredExams]);

  return (
    <ExamsContext.Provider
      value={{
        exams,
        allExams: value.exams,
        filtering,
        setFiltering,
      }}
    >
      {children}
    </ExamsContext.Provider>
  );
}
