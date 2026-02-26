'use client'

import { INote } from "@/interfaces"
import { createContext, Dispatch, SetStateAction, useContext } from "react"
import type { Semester, Absences } from "@/utils/notes"

export type Group = {
  id: string
  name: string
  notes: INote[]
  performance: string,
  absences: Absences,
  extraNotes: number
}

export type JournalContextType = {
  semester: Semester
  setSemester: Dispatch<SetStateAction<Semester>>
  period: string
  groups: Group[]
  updateGroups: (rawGroups: Array<Pick<Group, 'id' | 'name' | 'notes'>>) => void
}

export const JournalContext = createContext<JournalContextType | null>(null)

export const useJournalContext = () => useContext(JournalContext)!