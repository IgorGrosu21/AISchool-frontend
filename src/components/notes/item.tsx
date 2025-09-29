'use client'

import { Stack, Button, Typography, type ButtonProps, type TypographyProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { abscences, descriptors } from "./utils"

interface NoteProps extends ButtonProps {
  value?: string
  big?: boolean
  onClick?: () => void
  typographyVariant?: TypographyProps['variant']
  styled?: boolean
}

export function Note({value, big = false, onClick, typographyVariant, styled = true, ...props}: NoteProps) {
  const t = useTranslations('timetable.specific_lessons.notes')

  const normalizedValue = useMemo(() => {
    if (!value) {
      return ''
    }
    if (abscences.includes(value)) {
      return t('short_absences.' + value)
    }
    if (descriptors.includes(value)) {
      return t('notes.' + value)
    }
    return value
  }, [t, value])

  return styled ? <Stack sx={{justifyContent: 'center'}} onClick={onClick}>
    <Button variant={props.variant ?? 'outlined'} sx={{
      ...props.sx,
      p: 1,
      minWidth: 'unset',
      height: big ? 67.5 : 50,
      aspectRatio: 1
    }} {...props}>
      <Typography variant={typographyVariant ?? 'h6'}>{normalizedValue}</Typography>
    </Button>
  </Stack> : <Typography variant={typographyVariant ?? 'h6'}>{normalizedValue}</Typography>
}