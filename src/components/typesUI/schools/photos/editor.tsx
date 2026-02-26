'use client'

import { AttachedFilesEditor, AttachedLinksEditor } from "@/components";
import { IDetailedSchool } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";
import { AttachedItemsProvider } from "@/providers";

//mui components
import Stack from "@mui/material/Stack"

interface PhotosEditorProps {
  school: IDetailedSchool,
  setSchool: Dispatch<SetStateAction<IDetailedSchool>>
}

export function PhotosEditor({school, setSchool}: PhotosEditorProps) {
  return <AttachedItemsProvider value={{ setInstance: setSchool }}>
    <Stack direction='row' gap={2}>
      <AttachedLinksEditor instance={school} small={false} />
      <AttachedFilesEditor instance={school} small={false} />
    </Stack>
  </AttachedItemsProvider>
}