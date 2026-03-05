"use client";

import {
  ProviderProps,
  useMemo,
  useState,
  useEffect,
  useTransition,
} from "react";

import { ExamsContext, OlympiadsContext, type TestsFiltering } from "./context";
import { getCuttedSlug } from "@/utils/tests";
import { IExam, IOlympiad } from "@/interfaces";

interface TestsProviderValue {
  type: "exams" | "olympiads";
  getTests: () => Promise<IExam[] | IOlympiad[]>;
}

export function TestsProvider({
  children,
  value: { type, getTests },
}: ProviderProps<TestsProviderValue>) {
  const [isPending, startTransition] = useTransition();
  const [tests, setTests] = useState<IExam[] | IOlympiad[] | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const response = await getTests();
      setTests(response);
    });
  }, [getTests]);

  const [filtering, setFiltering] = useState<TestsFiltering>({
    grade: undefined,
    year: undefined,
    lang: undefined,
    type: undefined,
    profile: undefined,
    subjectCuttedSlug: undefined,
  });

  const filteredTests = useMemo(() => {
    if (!tests) return null;
    const filtered = tests.filter((test) => {
      const subjectMatch =
        filtering.subjectCuttedSlug == undefined ||
        filtering.subjectCuttedSlug === "" ||
        getCuttedSlug(test.subject.slug) === filtering.subjectCuttedSlug;
      return (
        (test.year === filtering.year || filtering.year === undefined) &&
        (test.grade === filtering.grade || filtering.grade === undefined) &&
        subjectMatch &&
        (test.lang === filtering.lang || filtering.lang === undefined) &&
        (type === "exams"
          ? (test.type === filtering.type || filtering.type === undefined) &&
            (test.profile === filtering.profile ||
              filtering.profile === undefined)
          : true)
      );
    });
    if (type === "exams") {
      return filtered.sort((a, b) => Number(a.order) - Number(b.order));
    }
    return filtered;
  }, [tests, type, filtering]);

  if (type === "exams") {
    return (
      <ExamsContext.Provider
        value={{
          tests: filteredTests as IExam[] | null,
          allTests: tests as IExam[] | null,
          filtering,
          setFiltering,
          loading: isPending,
        }}
      >
        {children}
      </ExamsContext.Provider>
    );
  }
  return (
    <OlympiadsContext.Provider
      value={{
        tests: filteredTests as IOlympiad[] | null,
        allTests: tests as IOlympiad[] | null,
        filtering,
        setFiltering,
        loading: isPending,
      }}
    >
      {children}
    </OlympiadsContext.Provider>
  );
}
