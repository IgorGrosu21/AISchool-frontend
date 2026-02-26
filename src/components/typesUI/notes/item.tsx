'use client'

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { type Absences, absences, descriptors } from "@/utils/notes"

//mui components
import Stack from "@mui/material/Stack"
import Button, { type ButtonProps } from "@mui/material/Button"
import Typography, { type TypographyProps } from "@mui/material/Typography"

interface NoteProps extends ButtonProps {
  value?: string
  big?: boolean
  onClick?: () => void
  typographyVariant?: TypographyProps['variant']
  styled?: boolean
}

export function Note({value, big = false, onClick, typographyVariant, styled = true, disabled = false, ...props}: NoteProps) {
  const t = useTranslations('notes')

  const normalizedValue = useMemo(() => {
    if (!value) {
      return ''
    }
    if (absences.includes(value as keyof Absences)) {
      return t('short_absences.' + value)
    }
    if (descriptors.includes(value)) {
      return t('short_descriptors.' + value)
    }
    return value
  }, [t, value])

  return styled ? <Stack
    sx={{justifyContent: 'center', cursor: disabled ? 'default' : 'pointer'}}
    onClick={disabled ? undefined : onClick}
  >
    <Button variant={props.variant ?? 'outlined'} sx={{
      ...props.sx,
      p: 1,
      minWidth: 'unset',
      height: big ? 67.5 : 50,
      aspectRatio: 1
    }} disabled={disabled} {...props}>
      <Typography variant={typographyVariant ?? 'h6'}>{normalizedValue}</Typography>
    </Button>
  </Stack> : <Typography variant={typographyVariant ?? 'h6'}>{normalizedValue}</Typography>
}