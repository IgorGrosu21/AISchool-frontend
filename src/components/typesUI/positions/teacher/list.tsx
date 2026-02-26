'use server'

import { SchoolLink, Subjects } from '@/components';
import { Panel } from '@/ui';
import { Link } from '@/i18n'
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { IPosition, ISubject } from '@/interfaces';

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface TeacherPositionsProps {
  positions: IPosition[]
  link?: (slug: string) => string
  allSubjects: ISubject[]
}

export async function TeacherPositions({positions, link, allSubjects}: TeacherPositionsProps) {
  const t = await getTranslations('positions')

  return <Stack gap={4}>
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('work_places')}:</Typography>
    </Panel>
    {positions.map((position, i) => <Stack key={i} gap={2}>
      <Panel>
        <SchoolLink school={position.school} />
      </Panel>
      <Stack gap={2} direction={{xs: 'column', md: 'row'}}>
        <Stack gap={2} sx={{flex: 1}}>
          <Subjects
            subjects={allSubjects.filter(subject => position.subjectSlugs.includes(subject.slug))}
            sx={{alignItems: 'center'}}
            small
          />
        </Stack>
        <Panel sx={{justifyContent: 'center'}}>
          <Link href={link ? link(position.school.slug) : `/core/schools/${position.school.slug}/`}>
            <Image
              width={1792}
              height={1024}
              src={position.school.preview ?? '/images/default-school.png'}
              alt='school-image'
              style={{width: '100%', height: 'auto'}}
              loading='lazy'
            />
          </Link>
        </Panel>
      </Stack>
    </Stack>)}
  </Stack>
}