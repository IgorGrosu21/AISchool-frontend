'use server'

import { getTranslations } from "next-intl/server"

//mui components
import Typography from "@mui/material/Typography"

interface ExperienceProps {
  experience: number
}

export async function Experience({experience}: ExperienceProps) {
  const t = await getTranslations('teachers')

  return <Typography variant='h6'>{t('experience', {years: experience})}</Typography>
}