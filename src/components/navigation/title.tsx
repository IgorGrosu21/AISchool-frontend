'use client'

import { useEffect } from 'react'

export function TitleSetter({ title }: { title: string }) {
  useEffect(() => {
    if (title && title !== '' && title !== 'edit') {
      document.title = `${title} | AI School`
    }
  }, [title])

  return <></>
}

