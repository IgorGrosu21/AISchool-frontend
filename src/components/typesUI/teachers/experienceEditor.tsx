'use client'

import { IPersonProfile } from "@/interfaces";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

//mui components
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface ExperienceEditorProps {
  teacher: IPersonProfile & { profileType: 'teacher' },
  setTeacher: Dispatch<SetStateAction<IPersonProfile & { profileType: 'teacher' }>>
}

export function ExperienceEditor({teacher, setTeacher}: ExperienceEditorProps) {
  const t = useTranslations('teachers')

  return <Stack gap={2}>
    <Typography variant='h5'>{t('edit_experience')}</Typography>
    <TextField
      label={t('experience', {years: teacher.experience})}
      type='number'
      value={teacher.experience}
      onChange={(e) => setTeacher(t => ({...t, experience: Number(e.target.value)}))}
    />
  </Stack>
}