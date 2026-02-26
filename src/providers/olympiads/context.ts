"use client";

import { IOlympiad } from "@/interfaces";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type OlympiadsSupportedOrdering =
  | "grade"
  | "year"
  | "subject"
  | "lang";

export type OlympiadsFiltering = Partial<
  Pick<IOlympiad, "grade" | "year" | "lang">
> & {
  subjectCuttedSlug?: string;
};

export type OlympiadsContextType = {
  olympiads: IOlympiad[];
  allOlympiads: IOlympiad[];
  filtering: OlympiadsFiltering;
  setFiltering: Dispatch<SetStateAction<OlympiadsFiltering>>;
};

export const OlympiadsContext =
  createContext<OlympiadsContextType | null>(null);

export const useOlympiadsContext = () => useContext(OlympiadsContext)!;
