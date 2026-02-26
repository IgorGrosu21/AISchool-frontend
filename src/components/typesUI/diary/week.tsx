"use client";

import { SpecificLessons } from "@/components";
import { useWeekView } from "@/hooks";
import { WeekCarousel } from "./weekCarousel";
import { useMemo } from "react";
import { useCalendarContext } from "@/providers";
import { WithLoader } from "@/ui";

interface WeekProps {
  dates: Date[];
}

export function Week({ dates }: WeekProps) {
  const { year, setActiveDay, currentDay } = useCalendarContext();

  const startDay = useMemo(() => dates[0], [dates]);
  const endDay = useMemo(() => dates[dates.length - 1], [dates]);
  const { replacements, specificLessons, isPending } = useWeekView(
    startDay,
    endDay,
  );

  return (
    <WeekCarousel
      startDay={startDay}
      endDay={endDay}
      year={year}
      setActiveDay={setActiveDay}
      currentDay={currentDay}
    >
      <WithLoader loading={isPending}>
        <SpecificLessons
          replacements={replacements}
          specificLessons={specificLessons}
          dates={dates}
        />
      </WithLoader>
    </WeekCarousel>
  );
}
