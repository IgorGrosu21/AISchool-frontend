"use client";

import { isSameMonth } from "date-fns";
import { useMemo } from "react";
import { dateToLongMonth } from "@/utils/dates";

//mui components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface MonthButtonProps {
  month: Date;
  activeMonth: Date;
  onClick: () => void;
}

export function MonthButton({ month, activeMonth, onClick }: MonthButtonProps) {
  const isActive = useMemo(
    () => isSameMonth(activeMonth, month),
    [activeMonth, month],
  );

  const monthName = useMemo(() => {
    const name = dateToLongMonth(month);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [month]);

  return (
    <Button
      color={isActive ? "secondary" : "primary"}
      sx={{ width: "100%", justifyContent: "center" }}
      onClick={onClick}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {monthName}
      </Typography>
    </Button>
  );
}
