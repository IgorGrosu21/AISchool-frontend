'use client'

import { ICanEdit } from "@/interfaces";
import { Link } from '@/i18n';

//mui components
import Fab from "@mui/material/Fab"
//icons
import EditIcon from "@mui/icons-material/Edit"

interface EditButtonProps<T> {
  link: string
  editable: T
}

export function EditButton<T extends ICanEdit>({link, editable}: EditButtonProps<T>) {
  return editable.canEdit ? <Link href={`${link}/edit`}>
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
  </Link> : <></>
}