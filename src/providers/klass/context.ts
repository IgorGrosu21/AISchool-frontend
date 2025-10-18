'use client'

import { IKlassNameWithGroups } from "@/interfaces"
import { createContext, useContext } from "react"

export type KlassContextType = {
  klass: IKlassNameWithGroups
}

export const KlassContext = createContext<KlassContextType | null>(null)

export const useKlassContext = () => useContext(KlassContext)!