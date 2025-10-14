'use client'

import { Link } from '@/i18n';

//mui components
import Fab from "@mui/material/Fab"
//icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

interface ReturnButtonProps {
  link: string
}

export function ReturnButton({link}: ReturnButtonProps) {
  return <Link href={link}>
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
      <ArrowBackIcon />
    </Fab>
  </Link>
}