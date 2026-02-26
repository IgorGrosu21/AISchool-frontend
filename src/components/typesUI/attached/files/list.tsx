'use client'

import { useTranslations } from "next-intl";
import { IWithFiles } from "@/interfaces";
import { Link } from '@/i18n';
import { Panel } from "@/ui";

//mui components
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import DownloadIcon from "@mui/icons-material/Download";

interface AttachedFilesProps {
  files?: IWithFiles['files']
}

export function AttachedFiles({files}: AttachedFilesProps) {
  const t = useTranslations('attached.files')
  
  return <Panel gap={2} sx={{height: '100%'}}>
    <Typography variant='h5'>{t('plural')}:</Typography>
    {files && <Stack direction={{xs: 'column', md: 'row'}} gap={2}>
      {files.map((file, i) => <Button key={i} variant='outlined' sx={{gap: 2, p: 2}}>
        <Typography>{file.url.split('/').at(-1)?.replace(/[^\p{L}\p{N}]+/gu, '-')}</Typography>
        <Link style={{display: 'flex', alignItems: 'center'}} href={file.url} target='_blank'>
          <DownloadIcon />
        </Link>
      </Button>)}
    </Stack>}
  </Panel>
}