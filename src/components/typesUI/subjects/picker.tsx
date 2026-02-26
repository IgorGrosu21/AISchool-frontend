'use client'

import { ISubject, ISubjectName } from "@/interfaces"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

//mui components
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { SxProps } from "@mui/material/styles"

interface SubjectsPickerProps {
  readonly allSubjects: ReadonlyArray<ISubject>
  pickedSubjectSlug?: string
  onChange: (value: ISubjectName | null) => void
  sx?: SxProps
}

export function SubjectsPicker({allSubjects, pickedSubjectSlug, onChange, sx}: SubjectsPickerProps) {
  const pickedSubject = useMemo(() => allSubjects.find(s => s.slug === pickedSubjectSlug), [allSubjects, pickedSubjectSlug])
  const t = useTranslations('subjects')

  return <Autocomplete
    isOptionEqualToValue={(option, value) => option.slug === value.slug}
    sx={sx}
    value={pickedSubject ?? null}
    onChange={(_, s: {slug: string, name: string} | null) => onChange(s)}
    options={allSubjects}
    renderInput={(params) => <TextField {...params} label={t('singular')} />}
    getOptionLabel={(option) => option.name}
  />
}