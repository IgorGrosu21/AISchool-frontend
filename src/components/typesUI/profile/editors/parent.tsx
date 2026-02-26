'use client'

import type { IPersonProfile } from "@/interfaces"
import { Dispatch, SetStateAction } from "react"

//mui components
import Typography from "@mui/material/Typography"

interface ParentEditorProps {
  parent: IPersonProfile & { profileType: 'parent' }
  setParent: Dispatch<SetStateAction<IPersonProfile & { profileType: 'parent' }>>
}

export function ParentEditor({}: ParentEditorProps) {
  return <Typography variant="h4">Soon!</Typography>
}