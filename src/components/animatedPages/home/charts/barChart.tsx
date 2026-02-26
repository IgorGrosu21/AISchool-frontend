'use client'

import { useMemo } from "react";
import { IPersonHome } from "@/interfaces"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from "@mui/material/styles";
import { parseNoteValue, performanceToHundreds, usesDescriptors } from "@/utils/notes"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip
);

interface BarChartProps {
  readonly points: (IPersonHome & { profileType: 'teacher' })['analytics'][number]['subjects'][number]['points']
}

export function BarChart({points}: BarChartProps) {
  const theme = useTheme()

  const progressData = useMemo(() => points.map(point => {
    const values = point.values.filter(value => value !== '' && !value.includes('a'))
    const useDescriptors = usesDescriptors(values.map(value => ({value})))
    const sum = values.reduce((acc, value) => acc + parseNoteValue(value, useDescriptors), 0)
    const count = values.length
    return {
      slug: point.slug,
      performance: performanceToHundreds(sum, useDescriptors, count)
    }
  }), [points])
  
  return <Bar options={{responsive: true}} data={{
    labels: progressData.map((klass) => klass.slug),
    datasets: [
      {
        data: progressData.map((klass) => klass.performance),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        maxBarThickness: 50,
      },
    ],
  }} />
}
