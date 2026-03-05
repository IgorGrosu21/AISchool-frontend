"use client";

import { IExam, IOlympiad, ITest } from "@/interfaces";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TestsFiltering = Partial<
  Pick<IExam, "grade" | "year" | "lang" | "type" | "profile">
> & {
  subjectCuttedSlug?: string;
  [key: string]: string | number | undefined;
};

export type TestsContextType<T> = {
  tests: T[] | null;
  allTests: T[] | null;
  filtering: TestsFiltering;
  setFiltering: Dispatch<SetStateAction<TestsFiltering>>;
  loading: boolean;
};

export const ExamsContext = createContext<TestsContextType<IExam> | null>(null);

export const useExamsContext = () => useContext(ExamsContext);

export const OlympiadsContext =
  createContext<TestsContextType<IOlympiad> | null>(null);

export const useOlympiadsContext = () => useContext(OlympiadsContext);

export const useTestsContext = (
  type: "exams" | "olympiads",
): TestsContextType<ITest> => {
  const examsContext = useExamsContext();
  const olympiadsContext = useOlympiadsContext();
  if (type === "exams") {
    return examsContext!;
  }
  return olympiadsContext!;
};
