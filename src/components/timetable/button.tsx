'use server'

import { getTranslations } from "next-intl/server"

//mui components
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"

interface TimetableButtonProps {
  schoolSlug: string
}

export async function TimetableButton({schoolSlug}: TimetableButtonProps) {
  const t = await getTranslations('timetable')

  return <Link href={`/core/schools/${schoolSlug}/timetable`}>
    <Button variant='contained'>
      <Typography>{t('singular')}</Typography>
    </Button>
  </Link>
}