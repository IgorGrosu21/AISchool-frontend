"use client";

import { createContext, useContext } from "react";

export type CalendarContextType = {
  year: number;
  monthGroups: Date[][];
  activeMonth: Date | null;
  setActiveMonth: (month: Date | null) => void;
  currentMonth: Date;
  activeDay: Date | null;
  setActiveDay: (day: Date | null) => void;
  currentDay: Date;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);

export const useCalendarContext = () => useContext(CalendarContext)!;
