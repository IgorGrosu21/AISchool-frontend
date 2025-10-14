'use client'

import { Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAttachedFilesContext } from "@/providers";
import { IDetailedMedia } from "@/interfaces";
import { Panel } from "@/ui";

//icons
import CloseIcon from "@mui/icons-material/Close"
import RestoreIcon from "@mui/icons-material/Restore"
import UploadIcon from "@mui/icons-material/Upload"
import VisibilityIcon from "@mui/icons-material/Visibility"

interface AttachedFilesEditorProps {
  files: IDetailedMedia[]
  filesData?: File[]
  small?: boolean
}

export function AttachedFilesEditor({files, filesData, small = true}: AttachedFilesEditorProps) {
  const { openFilePicker, setActiveFile, setActiveFileData, restoreFile, deleteFile } = useAttachedFilesContext()
  const t = useTranslations('timetable.specific_lessons')
  
  return <Panel gap={2} sx={{height: '100%'}}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography variant={small ? 'h6' : 'h5'}>{t('files.plural')}:</Typography>
      <UploadIcon onClick={openFilePicker} color='primary' />
    </Stack>
    <Stack direction='row' gap={2}>
      {files.map((file, i) => <Button key={i} variant='outlined' color={file.delete ? 'secondary' : 'primary'} sx={{gap: 2, p: 2}}>
        <Typography>{file.file.split('/').at(-1)}</Typography>
        <VisibilityIcon onClick={() => setActiveFile(file)} />
        {file.delete ? <RestoreIcon onClick={() => restoreFile(i)} /> : <CloseIcon onClick={() => deleteFile(i, 'file')} />}
      </Button>)}
      {filesData && filesData.map((file, i) => <Button key={i} variant='outlined' sx={{gap: 2, p: 2}}>
        <Typography>{file.name}</Typography>
        <VisibilityIcon onClick={() => setActiveFileData(file)} />
        <CloseIcon onClick={() => deleteFile(i, 'fileData')} />
      </Button>)}
    </Stack>
  </Panel>
}