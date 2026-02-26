'use client'

import { useCallback, useState } from "react"
import { useVerboseSocials } from "./useVerboseSocials"

export function useSocialsEditor(socials: string[], setSocials: (socials: string[]) => void) {
  const [rawSocials, setRawSocials] = useState<string[]>(socials)
  const {verboseSocials, getSocialType} = useVerboseSocials(rawSocials)

  const updateSocial = useCallback((i: number, link: string) => {
    const type = getSocialType(link)
    setRawSocials(r => r.map((s, k) => k === i ? link : s))
    if (type !== 'un') {
      setSocials(socials.map((s, k) => k === i ? link : s))
    }
  }, [getSocialType, setSocials, socials])

  const deleteSocial = useCallback((i: number) => {
    setRawSocials(r => r.filter((_, k) => k != i))
    setSocials(socials.filter((_, k) => k != i))
  }, [setSocials, socials])

  const addSocial = useCallback(() => {
    setRawSocials(r => [...r, ''])
    setSocials([...socials, ''])
  }, [setSocials, socials])

  return {
    verboseSocials,
    updateSocial, deleteSocial, addSocial
  }
}