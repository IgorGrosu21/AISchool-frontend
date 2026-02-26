import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

export type Weekday = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";
export const weekdays: ReadonlyArray<Weekday> = [
  "MO",
  "TU",
  "WE",
  "TH",
  "FR",
  "SA",
  "SU",
];
export const weekdayMap: Record<Weekday, number> = {
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6,
  SU: 0,
};

export function dateToNormal(date: Date) {
  return format(date, "yyyy.MM.dd");
}

export function dateToVerbose(date: Date) {
  return format(date, " EEEE, d MMMM", { locale: ru });
}

export function dateToShortMonth(date: Date) {
  return format(date, "MMM", { locale: ru }).replace(".", "");
}

export function dateToLongMonth(date: Date) {
  return format(date, "LLLL", { locale: ru });
}

export function dateToDay(date: Date) {
  return format(date, "d");
}

export function dateToDayAndMonth(date: Date) {
  return format(date, "d.MM");
}
