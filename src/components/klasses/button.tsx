'use client'

import { useTranslations } from "next-intl"

//mui components
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"

interface KlassesButtonProps {
  schoolSlug: string
}

export function KlassesButton({schoolSlug}: KlassesButtonProps) {
  const t = useTranslations('klasses')

  return <Link href={`/core/schools/${schoolSlug}/klasses`}>
    <Button variant='contained'>
      <Typography>{t('list')}</Typography>
    </Button>
  </Link>
}