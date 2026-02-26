"use client";

import {
  ProviderProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CalendarContext } from "./context";
import { TypePicker } from "./typePicker";
import { isSameMonth, setDate } from "date-fns";
import { dateToNormal } from "@/utils/dates";
import { useTranslations } from "next-intl";
import { domAnimation, LazyMotion } from "framer-motion";
import { useQueryParams, useYear } from "@/hooks";

//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function CalendarProvider({
  children,
  value: { currentDay },
}: ProviderProps<{ currentDay: Date }>) {
  const [type, setType] = useState<"year" | "month" | "week">("week");

  const year = useYear(currentDay);
  const currentMonth = useMemo(() => setDate(currentDay, 1), [currentDay]); //store the first day of each month
  const monthGroups = useMemo(() => {
    const fall = [8, 9, 10];
    const winter = [11, 0, 1];
    const spring = [2, 3, 4];
    const seasons = [fall, winter, spring].map((s) =>
      s.map((m) => new Date(m < 8 ? year : year - 1, m, 1)),
    ); //store the first day of each month

    //current month should be on top
    const currentIndex = seasons.findIndex((season) =>
      season.some((m) => isSameMonth(currentDay, m)),
    );
    if (currentIndex > -1) {
      return [0, 1, 2].map((i) => seasons[(currentIndex + i) % 3]);
    }
  }, [currentDay, year]);
  const [activeMonth, setActiveMonth] = useState<Date | null>(currentMonth);
  const [activeDay, setActiveDay] = useState<Date | null>(currentDay);
  const updateQueryParam = useQueryParams();
  const t = useTranslations("diary");

  const updateMonth = useCallback((month: Date | null) => {
    setType(month ? "month" : "year");
    setActiveMonth(month);
    if (month === null) {
      setActiveDay(null);
    }
  }, []);

  const updateDay = useCallback(
    (day: Date | null) => {
      setType(day ? "week" : "month");
      setActiveDay(day);
      setActiveMonth((m) => (day ? setDate(day, 1) : m)); //if day is undefined leave the month unchanged
      updateQueryParam("rawDate", day ? dateToNormal(day) : undefined);
    },
    [updateQueryParam],
  );

  useEffect(() => {
    console.log(type);
  }, [type]);

  return (
    <CalendarContext.Provider
      value={{
        year: year,
        monthGroups: monthGroups!,
        activeMonth: activeMonth,
        setActiveMonth: updateMonth,
        currentMonth: currentMonth,
        activeDay: activeDay,
        setActiveDay: updateDay,
        currentDay: currentDay,
      }}
    >
      {monthGroups ? (
        <Stack gap={8}>
          <TypePicker
            type={type}
            currentMonth={currentMonth}
            updateMonth={updateMonth}
            currentDay={currentDay}
            updateDay={updateDay}
          />
          <LazyMotion features={domAnimation} strict>
            {children}
          </LazyMotion>
        </Stack>
      ) : (
        <Stack sx={{ flex: 1, justifyContent: "center" }}>
          <Typography variant="h4" color="primary" sx={{ textAlign: "center" }}>
            {t("summertime")}
          </Typography>
        </Stack>
      )}
    </CalendarContext.Provider>
  );
}
