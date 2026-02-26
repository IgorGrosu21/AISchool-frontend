'use client'

import { useTranslations } from "next-intl";
import { useAttachedFilesContext } from "@/providers";
import { IWithFilesData } from "@/interfaces";
import { Panel } from "@/ui";

//mui components
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import CloseIcon from "@mui/icons-material/Close"
import RestoreIcon from "@mui/icons-material/Restore"
import UploadIcon from "@mui/icons-material/Upload"
import VisibilityIcon from "@mui/icons-material/Visibility"

interface AttachedFilesEditorProps {
  instance: IWithFilesData
  small?: boolean
}

export function AttachedFilesEditor({instance: {files, filesData}, small = true}: AttachedFilesEditorProps) {
  const { openFilePicker, setActiveFile, setActiveFileData, restoreFile, deleteFile } = useAttachedFilesContext()
  const t = useTranslations('attached.files')

  return <Panel gap={2}>
    <Stack direction='column' gap={2}>
      <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant={small ? 'h6' : 'h5'}>{t('plural')}:</Typography>
        <UploadIcon onClick={openFilePicker} color='primary' sx={{cursor: 'pointer'}} />
      </Stack>
      <Typography variant='body1'>({t('helper')})</Typography>
    </Stack>
    <Stack direction='row' gap={2}>
      {files.map((file, i) => <Button key={i} variant='outlined' color={file.delete ? 'secondary' : 'primary'} sx={{gap: 2, p: 2}}>
        <Typography>{file.url.split('/').at(-1)?.replace(/[^\p{L}\p{N}]+/gu, '-')}</Typography>
        <VisibilityIcon onClick={() => setActiveFile(file)} sx={{cursor: 'pointer'}} />
        {file.delete ? <RestoreIcon
          onClick={() => restoreFile(i)}
          sx={{cursor: 'pointer'}}
        /> : <CloseIcon
          onClick={() => deleteFile(i, 'file')}
          sx={{cursor: 'pointer'}}
        />}
      </Button>)}
      {filesData && filesData.map((file, i) => <Button key={i} variant='outlined' sx={{gap: 2, p: 2}}>
        <Typography>{file.name.replace(/[^\p{L}\p{N}]+/gu, '-')}</Typography>
        <VisibilityIcon onClick={() => setActiveFileData(file)} sx={{cursor: 'pointer'}} />
        <CloseIcon onClick={() => deleteFile(i, 'fileData')} sx={{cursor: 'pointer'}} />
      </Button>)}
    </Stack>
  </Panel>
}