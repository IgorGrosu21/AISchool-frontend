'use client'

import { ITeacherName } from "@/interfaces"
import { useTranslations } from "next-intl"

//mui components
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { type SxProps } from "@mui/material/styles"

interface TeachersPickerProps {
  teachers: ITeacherName[]
  pickedTeacher: ITeacherName | null
  onChange: (value: ITeacherName | null) => void
  sx?: SxProps
}

export function TeachersPicker({teachers, pickedTeacher, onChange, sx}: TeachersPickerProps) {
  const t = useTranslations('teachers')

  return <Autocomplete
    isOptionEqualToValue={(option, value) => option.id === value.id}
    disabled={teachers.length === 0}
    sx={sx}
    value={pickedTeacher ?? null}
    onChange={(_, t: ITeacherName | null) => onChange(t)}
    options={teachers}
    renderInput={(params) => <TextField {...params} label={t('singular')} />}
    getOptionLabel={(option) => `${option.user.surname} ${option.user.name}`}
  />
}