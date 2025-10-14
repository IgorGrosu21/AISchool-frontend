'use server'

import { Link } from '@/i18n';

//mui components
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

type ModuleListProps<T> = {
  list: T[]
  baseLink: string
  renderCost?: (item: T) => React.ReactNode
} & ({
  complex?: true
  children: React.ReactNode | React.ReactNode[]
} | {
  complex?: false
  children: string
})

export async function ModuleList<T extends { slug: string, name: string, startPage?: number, endPage?: number}>({list, baseLink, renderCost, complex, children}: ModuleListProps<T>) {
  return <Stack>
    <Stack direction='row' sx={{
      p: 2,
      bgcolor: 'secondary.main',
      color: 'secondary.contrastText',
      ...(complex ? {
        transition: '0.5s',
        ['&:hover']: {
          bgcolor: 'primary.main',
          color: 'primary.contrastText'
        }
      } : {})
    }}>
      {complex ? children : <Typography variant='h6'>{children}</Typography>}
    </Stack>
    {list.map((item, j) => <Stack key={j}>
      {j > 0 && <Divider />}
      <Link href={`/core/manuals/${baseLink}/${item.slug}`}>
        <Stack direction='row' sx={{
          p: 2,
          pl: 4,
          justifyContent: 'space-between',
          ['&:hover']: {
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }
        }}>
          <Typography variant='h6'>{j + 1}. {item.name} ({item.startPage}-{item.endPage})</Typography>
          {renderCost && renderCost(item)}
        </Stack>
      </Link>
    </Stack>)}
  </Stack>
}