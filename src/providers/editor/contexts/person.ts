'use client'

import { IUserAccount, IPersonProfile } from "@/interfaces"
import { createContext, useContext } from "react"
import { EditorContextType } from "./base"

export type AccountEditorContextType = EditorContextType<IUserAccount>

export const AccountEditorContext = createContext<AccountEditorContextType | null>(null)

export const useAccountEditorContext = () => useContext(AccountEditorContext)!

export type ProfileEditorContextType = EditorContextType<IPersonProfile>

export const ProfileEditorContext = createContext<ProfileEditorContextType | null>(null)

export const useProfileEditorContext = () => useContext(ProfileEditorContext)!