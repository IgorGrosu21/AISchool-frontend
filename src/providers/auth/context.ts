'use client'

import { FormState } from "@/app/actions"
import { createContext, Dispatch, SetStateAction, useContext } from "react"

export type AuthContextType = {
  activeType: FormState['type']
  setActiveType: (type: FormState['type']) => void
  state: FormState
  setState: Dispatch<SetStateAction<FormState>>
  submit: (type?: FormState['type']) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => useContext(AuthContext)!