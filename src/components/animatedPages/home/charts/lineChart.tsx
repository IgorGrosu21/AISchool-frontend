"use client";

import { IPersonHome } from "@/interfaces";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import {
  parseNoteValue,
  roundToHundreeds,
  usesDescriptors,
} from "@/utils/notes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

interface LineChartProps {
  readonly points: (IPersonHome & {
    profileType: "student";
  })["analytics"][number]["points"];
}

export function LineChart({ points }: LineChartProps) {
  const theme = useTheme();

  const progressData = useMemo(() => {
    let sum = 0;
    const cleanedPoints = points.filter(
      (point) => point.value !== "" && !point.value.includes("a"),
    );
    const useDescriptors = usesDescriptors(
      cleanedPoints.map((point) => ({ value: point.value })),
    );
    return cleanedPoints.map((point, i) => {
      sum += parseNoteValue(point.value, useDescriptors);
      return {
        date: point.date,
        value: roundToHundreeds(sum, i + 1),
      };
    });
  }, [points]);

  return (
    <Line
      options={{ responsive: true }}
      data={{
        labels: progressData.map((point) => point.date.slice(5)),
        datasets: [
          {
            data: progressData.map((point) => point.value),
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
          },
        ],
      }}
    />
  );
}
