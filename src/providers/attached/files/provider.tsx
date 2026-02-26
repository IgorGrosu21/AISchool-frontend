'use client'

import { Dispatch, ProviderProps, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { FilesContext } from "./context";
import { useTranslations } from "next-intl";
import { IDetailedMedia, IWithFilesData } from "@/interfaces";
import Image from "next/image";
import { Link } from '@/i18n';

//mui components
import Backdrop from "@mui/material/Backdrop"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

interface ValueType<T> {
  setInstance: Dispatch<SetStateAction<T>>
}

export function AttachedFilesProvider<T extends IWithFilesData>({children, value: {setInstance}}: ProviderProps<ValueType<T>>) {
  const [activeFile, setActiveFile] = useState<IDetailedMedia>()
  const [activeFileData, setActiveFileData] = useState<File>()
  const [imageLink, setImageLink] = useState<string>()
  const [fileLink, setFileLink] = useState<string>()
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createdUrlsRef = useRef<Set<string>>(new Set());
  const t = useTranslations('attached.files')
  
  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setInstance(instance => ({
      ...instance,
      filesData: instance.filesData ? [...instance.filesData, ...droppedFiles] : droppedFiles,
    }))
  }, [setInstance])

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || undefined;
    if (uploadedFile) {
      setInstance(instance => ({...instance, filesData: instance.filesData ? [...instance.filesData, uploadedFile] : [uploadedFile]}));
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [setInstance]);

  const restoreFile = useCallback((i: number) => {
    setInstance(instance => ({...instance, files: instance.files.map((f, j) => j === i ? {...f, delete: false} : f)}));
  }, [setInstance])

  const deleteFile = useCallback((i: number, type: 'file' | 'fileData') => {
    if (type === 'file') {
      setInstance(instance => ({...instance, files: instance.files.map((f, j) => j === i ? {...f, delete: true} : f)}));
    } else {
      setInstance(instance => ({...instance, filesData: instance.filesData ? instance.filesData.filter((_, j) => j !== i) : []}));
    }
  }, [setInstance])

  // Cleanup function to revoke all created URLs
  const cleanupUrls = useCallback(() => {
    createdUrlsRef.current.forEach(url => {
      URL.revokeObjectURL(url);
    });
    createdUrlsRef.current.clear();
  }, []);

  useEffect(() => {
    if (activeFile) {
      const isImage = activeFile.url.match(/\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i);
      if (isImage) {
        setImageLink(activeFile.url)
      }
    } else {
      setImageLink(undefined)
    }
  }, [activeFile])

  useEffect(() => {
    // Clean up previous URLs when activeFileData changes
    cleanupUrls();
    
    if (activeFileData) {
      if (activeFileData.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImageLink(reader.result as string)
        }
        reader.readAsDataURL(activeFileData)
      } else {
        const link = URL.createObjectURL(activeFileData)
        createdUrlsRef.current.add(link);
        setFileLink(link)
      }
    } else {
      setImageLink(undefined)
      setFileLink(undefined)
    }
  }, [activeFileData, cleanupUrls])

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => cleanupUrls();
  }, [cleanupUrls]);

  return <FilesContext value={{
    openFilePicker,
    setActiveFile,
    setActiveFileData,
    restoreFile,
    deleteFile
  }}>
    <input ref={fileInputRef} type='file' accept='*' style={{display: 'none'}} onChange={onFileChange} />
    <Box onDrop={onDrop} onDragOver={onDragOver}>
      {children}
    </Box>
    <Backdrop sx={{ zIndex: 1300 }} open={activeFile !== undefined || activeFileData !== undefined} onClick={() => {
      setActiveFile(undefined)
      setActiveFileData(undefined)
    }}>
      {(activeFileData || activeFile) && <Stack gap={2} sx={{bgcolor: 'background.default', p: 4}}>
        {imageLink ? <Image
          src={imageLink}
          alt='Active image'
          width={600}
          height={600}
          style={{width: 'auto', height: '90vh'}}
        /> : <Stack sx={{width: '60vw', textAlign: 'center'}} gap={4}>
          <Typography variant='h6'>{t('no_image')}</Typography>
          {activeFile && <Link
            href={activeFile.url}
            target='_blank'
            download={activeFile.url.split('/').at(-1)}
          >
            <Typography variant='h5' color='primary'>{activeFile.url.split('/').at(-1)}</Typography>
          </Link>}
          {activeFileData && fileLink && <Link
            href={fileLink}
            target='_blank'
            download={activeFileData.name}
          >
            <Typography variant='h5' color='primary'>{activeFileData.name}</Typography>
          </Link>}
        </Stack>}
      </Stack>}
    </Backdrop>
  </FilesContext>
}