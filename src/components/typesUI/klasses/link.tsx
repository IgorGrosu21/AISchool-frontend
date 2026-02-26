'use client'

import { Link } from '@/i18n'
import { useMemo } from 'react'

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface KlassLinkProps {
  hrefTemplate: string
  klass: { grade: number, letter: string, slug: string }
  big?: boolean
}

export function KlassLink({hrefTemplate, klass, big}: KlassLinkProps) {
  const href = useMemo(() => {
    if (hrefTemplate.includes('<klassSlug>')) {
      return hrefTemplate.replace('<klassSlug>', klass.slug)
    }
    return `${hrefTemplate}/${klass.slug}`
  }, [hrefTemplate, klass.slug])

  return <Link href={href}>
    <Stack sx={{
      bgcolor: 'primary.main',
      borderRadius: '15%',
      height: big ? 100 : 67.5,
      aspectRatio: 1,
      justifyContent: 'center',
    }}>
      <Typography variant={big ? 'h5' : 'h6'} sx={{
        color: 'primary.contrastText',
        textAlign: 'center',
      }}>{klass.grade}{klass.letter}</Typography>
    </Stack>
  </Link>
}