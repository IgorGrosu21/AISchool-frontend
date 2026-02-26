'use client'

import { ISchoolName } from "@/interfaces"
import { useTranslations } from "next-intl"

//mui components
import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useMemo } from "react"

interface PickSchoolProps {
  pickedSchoolSlug?: string
  setValue: (value: ISchoolName) => void,
  options: ISchoolName[]
}

export function PickSchool({pickedSchoolSlug, setValue, options}: PickSchoolProps) {
  const t = useTranslations('schools')

  const pickedSchool = useMemo(() => options.find(s => s.slug === pickedSchoolSlug), [options, pickedSchoolSlug])

  return <Stack gap={2}>
    <Typography variant='h5'>{t('pick_one')}</Typography>
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={options}
      value={pickedSchool ?? null}
      onChange={(_, v: ISchoolName | null) => (v ? setValue(v) : undefined)}
      getOptionLabel={(option) => `${option.name}`}
      renderInput={(params) => <TextField {...params} label={t('singular')} />}
    />
  </Stack>
}