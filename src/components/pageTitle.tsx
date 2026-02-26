'use client'

import { Link } from '@/i18n';
import { grantPermission, type Resource } from '@/utils/permissions';
import { usePermissions } from '@/hooks';
import { useMemo } from 'react';

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Fab from "@mui/material/Fab"
//icons
import EditIcon from "@mui/icons-material/Edit"

interface PageTitleProps {
  label: string
  link: string
  resource: Resource
}

export function PageTitle({label, link, resource}: PageTitleProps) {
  const { permissions } = usePermissions()
  const permissionGranted = useMemo(() => grantPermission(permissions, resource), [permissions, resource])

  return <Stack direction='row' gap={2} sx={{alignItems: 'center', justifyContent: 'space-between'}}>
    <Typography 
      variant='h4'
      sx={{ 
        textAlign: { xs: 'center', md: 'left' },
        fontSize: { xs: '1.5rem', md: '2.125rem' }
      }}
    >
      {label}
    </Typography>
    {permissionGranted && <Link href={`${link}/edit`}>
      <Fab 
        color='primary'
        size='medium'
        sx={{
          width: { xs: 48, md: 56 },
          height: { xs: 48, md: 56 },
          '& .MuiSvgIcon-root': {
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }
        }}
      >
        <EditIcon />
      </Fab>
    </Link>}
  </Stack>
}