'use client'

import { useCallback, useRef, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { WithLoader } from '@/ui';
import { IError, IMedia } from '@/interfaces';
import { isError } from '@/requests';

//mui components
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
//icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import SaveIcon from '@mui/icons-material/Save';

interface ImageUploaderProps {
  renderImage: (src: string | null) => React.ReactNode,
  existing: string | null
  setExisting: (val: IMedia | null) => void,
  sendFile: (formData: FormData) => Promise<IMedia | IError>
  deleteFile: () => Promise<null | IError>
}

export function ImageUploader({renderImage, existing, setExisting, sendFile, deleteFile}: ImageUploaderProps) {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(existing);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations('layout.edit');

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || undefined;
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(preview => {
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        return URL.createObjectURL(uploadedFile);
      });
    } else {
      setPreview(preview => {
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        return null;
      });
    }
  }, [setFile]);

  const onSend = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      const formData = new FormData();
      formData.append('file', file!);
      
      startTransition(async() => {
        const url = await sendFile(formData)
        if (!isError(url)) {
          setPreview(url)
          setExisting(url)
        }
      })
      setFile(undefined);
    }
  }, [file, sendFile, setExisting]);

  const onDelete = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      startTransition(async () => {
        const url = await deleteFile()
        if (!isError(url)) {
          setPreview(null)
          setExisting(null)
        }
      })
      setFile(undefined);
    }
  }, [deleteFile, setExisting]);

  return <Stack gap={2} sx={{flex: 1, height: '100%'}}>
    <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onFileChange} />
    <WithLoader loading={isPending} gap={2} sx={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Box>
        {renderImage(preview ?? existing)}
      </Box>
      <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
        <Button variant='contained' color='secondary' onClick={onDelete} disabled={preview === null}>
          {t(existing ? 'delete' : 'discard')}&nbsp;<DeleteOutlineIcon />
        </Button>
        <Button variant='contained' onClick={openFilePicker}>
          {t('upload')}&nbsp;<FileUploadIcon />
        </Button>
        <Button variant='contained' color='tertiary' onClick={onSend} disabled={file === undefined}>
          {t('save')}&nbsp;<SaveIcon />
        </Button>
      </Stack>
    </WithLoader>
  </Stack>
}