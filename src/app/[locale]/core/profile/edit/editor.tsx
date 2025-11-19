'use client'

import { ProfileContainer } from "@/components";
import { useUserEditorContext } from "@/providers";

export function Editor() {
  const { instance: user, setInstance: setUser } = useUserEditorContext()
  
  return <ProfileContainer user={user} setUser={setUser} />
}