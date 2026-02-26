"use client";

import { useCallback } from "react";

//mui components
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
//icons
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import AppsIcon from "@mui/icons-material/Apps";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";

interface TypePickerProps {
  type: "year" | "month" | "week";
  currentMonth: Date;
  updateMonth: (month: Date | null) => void;
  currentDay: Date;
  updateDay: (day: Date | null) => void;
}

export function TypePicker({
  type,
  currentMonth,
  updateMonth,
  currentDay,
  updateDay,
}: TypePickerProps) {
  const updateType = useCallback(
    (type: "year" | "month" | "week" | null) => {
      if (type === null) {
        return; //either state should be choosen
      }
      switch (type) {
        case "year": {
          updateMonth(null);
          break;
        }
        case "month": {
          updateMonth(currentMonth);
          updateDay(null);
          break;
        }
        case "week": {
          //if active day is undefined, set the current day and month
          updateDay(currentDay);
          break;
        }
      }
    },
    [currentDay, currentMonth, updateMonth, updateDay],
  );

  return (
    <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={(_, v) => updateType(v)}
      >
        <ToggleButton value="year">
          <ViewCompactIcon />
        </ToggleButton>
        <ToggleButton value="month">
          <AppsIcon />
        </ToggleButton>
        <ToggleButton value="week">
          <ViewWeekIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
