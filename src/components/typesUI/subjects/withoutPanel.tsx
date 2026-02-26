'use client'

import { ISubject } from '@/interfaces';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n';
import { useIsMobile } from '@/hooks';

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface SubjectsProps {
  readonly subjects: ReadonlyArray<ISubject>,
  lang?: string
  small?: boolean
  showText?: boolean
  hrefTemplate?: string
}

export function SubjectsWithoutPanel({subjects, small = false, showText = true, hrefTemplate}: SubjectsProps) {
  const t = useTranslations('subjects')
  const isMobile = useIsMobile();

  return <>
    {showText && <Typography variant={small ? 'h6' : 'h5'} sx={{textAlign: 'center'}}>{t('plural')}:</Typography>}
    <Stack gap={4} direction='row' sx={{flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
      {subjects.map((subject, i) => {
        const subjectContent = <Stack key={i} gap={2} sx={{alignItems: 'center'}}>
          <Stack sx={{
            p: small ? {xs: 0.125, md: 0.25} : {xs: 0.25, md: 0.5},
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image
              src={subject.image}
              alt={subject.name}
              width={small ? (isMobile ? 50 : 100) : (isMobile ? 100 : 150)}
              height={small ? (isMobile ? 50 : 100) : (isMobile ? 100 : 150)}
              style={{padding: 8, borderRadius: '50%'}}
              loading='lazy'
            />
          </Stack>
          <Typography variant={small ? 'h6' : 'h5'} sx={{fontSize: {xs: '0.875rem', md: '1rem'}}}>{subject.name}</Typography>
        </Stack>

        if (hrefTemplate) {
          return <Link key={i} href={hrefTemplate.replace('<subjectSlug>', subject.slug)} style={{ textDecoration: 'none', color: 'inherit' }}>
            {subjectContent}
          </Link>
        }

        return subjectContent
      })}
    </Stack>
  </>
}