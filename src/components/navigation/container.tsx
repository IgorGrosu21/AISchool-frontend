'use server'

import { getTranslations } from "next-intl/server"
import { Link } from '@/i18n'
import { Panel } from "@/ui"
import { TitleSetter } from "./title"

//mui components
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import HomeIcon from "@mui/icons-material/Home"

interface NavigationContainerProps extends React.PropsWithChildren {
  segments: Array<{
    label: string
    href: string
  }>
  last: string
}

export async function NavigationContainer({segments, last, children}: NavigationContainerProps) {
  const t = await getTranslations('components.edit');

  for (let i = 1; i < segments.length; i++) {
    const [prev, curr] = segments.slice(i - 1, i + 1).map(s => s.href)
    if (curr.startsWith(prev)) {
      continue
    }
    segments[i].href = `${prev}/${curr}`
  }

  return <Stack gap={{ xs: 4, md: 8 }} sx={{flex: 1, px: { xs: 2, sm: 4, md: 8, lg: 16 }, py: { xs: 4, md: 8 }}}>
    <TitleSetter title={last} />
    <Panel>
      <Breadcrumbs sx={{
        ['& ol']: {
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: { xs: 1, md: 0 }
        },
        ['& ol > li:first-child']: {
          lineHeight: 1
        },
        ['& ol > li > a']: {
          transition: '0.5s',
          fontSize: { xs: '0.875rem', md: 'inherit' },
          [':hover']: {
            color: 'primary.main'
          }
        },
        ['& ol > li']: {
          fontSize: { xs: '0.875rem', md: 'inherit' }
        }
      }}>
        <Link href='/core'>
          <HomeIcon sx={{
            color: last === '' ? 'primary.main' : 'inherit',
            fontSize: { xs: '1.25rem', md: 'inherit' }
          }} />
        </Link>
        {segments.map((segment, i) => <Link key={i} href={'/core/' + segment.href}>
          {segment.label}
        </Link>)}
        {last !== '' && <Typography 
          color='primary' 
          sx={{ fontSize: { xs: '0.875rem', md: 'inherit' } }}
        >
          {last === 'edit' ? t('edit') : last}
        </Typography>}
      </Breadcrumbs>
    </Panel>
    <Stack gap={{ xs: 4, md: 8 }} sx={{height: '100%', width: '100%', minHeight: '70vh'}}>
      {children}
    </Stack>
  </Stack>
}