'use client'

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { descriptors } from "@/utils/notes"

//mui components
import Typography, { type TypographyProps } from "@mui/material/Typography"

interface PerformanceProps extends TypographyProps {
  template?: string
  performance: string
}

export function Performance({template, performance, ...props}: PerformanceProps) {
  const t = useTranslations('notes')

  const normalizedPerformance = useMemo(() => {
    if (!performance) {
      return '-'
    }
    if (descriptors.includes(performance)) {
      return t('descriptors.' + performance)
    }
    return performance
  }, [performance, t])

  return <Typography {...props}>
    {template ? template.replace('<performance>', normalizedPerformance) : normalizedPerformance}
  </Typography>
}