'use client'

import { useCallback, useMemo } from "react"

type ISocial = {
  type: 'fb' | 'ig' | 'un'
  link: string
}

export function useVerboseSocials(socials: Array<string | null>) {
  const getSocialType = useCallback((link: string) => {
    if (link.startsWith('https://www.instagram.com/') || link.startsWith('https://instagram.com/')) {
      return 'ig'
    } else if (link.startsWith('https://www.facebook.com/') || link.startsWith('https://facebook.com/')) {
      return 'fb'
    }
    return 'un'
  }, [])

  const verboseSocials: ReadonlyArray<ISocial> = useMemo(() => {
    return socials.filter(s => s !== null).map(s => ({type: getSocialType(s), link: s}))
  }, [socials, getSocialType])

  const socialsWithNulls: ReadonlyArray<ISocial | null> = useMemo(() => {
    return socials.map(s => s ? ({type: getSocialType(s), link: s}) : null)
  }, [getSocialType, socials])

  return { verboseSocials, socialsWithNulls, getSocialType }
}