"use client";

import { useWeekCarousel } from "@/hooks";
import { dateToDayAndMonth } from "@/utils/dates";

//mui components
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface WeekCarouselProps extends React.PropsWithChildren {
  startDay: Date;
  endDay: Date;
  year: number;
  setActiveDay: (day: Date) => void;
  currentDay: Date;
}

export function WeekCarousel({
  startDay,
  endDay,
  year,
  setActiveDay,
  currentDay,
  children,
}: WeekCarouselProps) {
  const { isCurrent, canSubDays, canAddDays, goToPrevWeek, goToNextWeek } =
    useWeekCarousel(startDay, endDay, year, setActiveDay, currentDay);

  return (
    <Stack gap={2} sx={{ alignItems: "center" }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Button color="primary" onClick={goToPrevWeek} disabled={!canSubDays}>
          <ChevronLeftIcon />
        </Button>
        <Stack
          direction="row"
          gap={2}
          sx={{
            color: isCurrent ? "secondary.main" : "primary.main",
            alignItems: "center",
            transition: "1s",
          }}
        >
          <Typography variant="h6">{dateToDayAndMonth(startDay)}</Typography>
          <Typography variant="h6">-</Typography>
          <Typography variant="h6">{dateToDayAndMonth(endDay)}</Typography>
        </Stack>
        <Button color="primary" onClick={goToNextWeek} disabled={!canAddDays}>
          <ChevronRightIcon />
        </Button>
      </Stack>
      {children}
    </Stack>
  );
}
