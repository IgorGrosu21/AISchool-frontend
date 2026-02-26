"use client";

import { IExam } from "@/interfaces";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type SupportedOrdering =
  | "grade"
  | "year"
  | "subject"
  | "lang"
  | "type"
  | "profile";

export type ExamsFiltering = Partial<IExam> & { subjectCuttedSlug?: string };

export type ExamsContextType = {
  exams: IExam[];
  allExams: IExam[];
  filtering: ExamsFiltering;
  setFiltering: Dispatch<SetStateAction<ExamsFiltering>>;
};

export const ExamsContext = createContext<ExamsContextType | null>(null);

export const useExamsContext = () => useContext(ExamsContext)!;
