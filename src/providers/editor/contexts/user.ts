'use client'

import { IDetailedUser } from "@/interfaces"
import { createContext, useContext } from "react"
import { EditorContextType } from "./base"

export type UserEditorContextType = EditorContextType<IDetailedUser>

export const UserEditorContext = createContext<UserEditorContextType | null>(null)

export const useUserEditorContext = () => useContext(UserEditorContext)!