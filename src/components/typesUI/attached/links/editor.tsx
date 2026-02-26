'use client'

import { useTranslations } from "next-intl";
import { useAttachedLinksContext } from "@/providers";
import { IWithLinks } from "@/interfaces";
import { Panel } from "@/ui";

//mui components
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
//icons
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"

interface AttachedLinksEditorProps {
  instance: IWithLinks
  small?: boolean
}

export function AttachedLinksEditor({instance: {links}, small = true}: AttachedLinksEditorProps) {
  const { openLinks, editLink, deleteLink } = useAttachedLinksContext()
  const t = useTranslations('attached.links')
  
  return <Panel gap={2}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography variant={small ? 'h6' : 'h5'}>{t('plural')}:</Typography>
      <AddIcon onClick={openLinks} color='primary' sx={{cursor: 'pointer'}} />
    </Stack>
    {links && links.map((link, i) => <Stack key={i} direction='row' sx={{alignItems: 'center'}} gap={2}>
      <TextField sx={{flex: 1}} label={t('singular')} value={link} onChange={e => editLink(e.target.value, i)} />
      <CloseIcon onClick={() => deleteLink(i)} color='primary' sx={{cursor: 'pointer'}} />
    </Stack>)}
  </Panel>
}