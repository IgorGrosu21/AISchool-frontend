"use client";

import { AnimatePresence, m } from "framer-motion";
import { MonthButton } from "./monthButton";
import { useMonthView } from "@/hooks";
import { Days } from "./days";
import { Week } from "./week";

//mui components
import Divider from "@mui/material/Divider";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";

interface MonthProps {
  month: Date;
}

export function Month({ month }: MonthProps) {
  const {
    isActive,
    weeks,
    activeWeek,
    setActiveMonth,
    setActiveDay,
    currentMonth,
  } = useMonthView(month);

  return (
    <m.div
      layout
      layoutId={`month-${month}`}
      transition={{ layout: { type: "spring", stiffness: 120, damping: 18 } }}
      style={{
        width: "100%",
        margin: isActive ? "0 auto" : undefined,
        zIndex: isActive ? 10 : 1,
        cursor: "pointer",
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).dataset.day) {
          return; //if we click on the day, the month will automatically be set, so prevent useless state mutations
        }
        if (!isActive) setActiveMonth(month); //if the month is active no need to make it active
      }}
    >
      <Stack gap={2}>
        <MonthButton
          month={month}
          activeMonth={currentMonth}
          onClick={() => setActiveDay(null)}
        />
        <Divider />
        <AnimatePresence mode="wait">
          {activeWeek ? (
            <m.div
              layout
              layoutRoot
              key="zoomed-week"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {/*as mentioned, unactive weeks have klass as undefined*/}
              <Week dates={activeWeek} />
            </m.div>
          ) : (
            <m.div layout key="month-view">
              <Grid2 container spacing={2} columns={7}>
                {weeks.map((week, i) => (
                  <Days key={i} week={week} />
                ))}
              </Grid2>
            </m.div>
          )}
        </AnimatePresence>
      </Stack>
    </m.div>
  );
}
