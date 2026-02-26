'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import type { IPersonPermissions } from '@/interfaces'
import { getPermissions } from '@/app/actions'
import { readPermissions, writePermissions } from '@/utils/permissions'
import { isError } from '@/requests'

export function usePermissions() {
  const [permissions, setPermissions] = useState<IPersonPermissions | null>()
  const [isPending, startTransition] = useTransition()

  const refresh = useCallback(async () => {
    writePermissions(null)
    startTransition(async () => {
      const response = await getPermissions()
      if (isError(response)) {
        setPermissions(null)
        return
      }
      setPermissions(response)
      writePermissions(response)
    })
  }, [])

  useEffect(() => {
    const storedPermissions = readPermissions()
    if (storedPermissions) {
      setPermissions(storedPermissions)
    } else {
      refresh()
    }
  }, [refresh])

  const deletePermissions = useCallback(() => {
    writePermissions(null)
    setPermissions(null)
  }, [])

  return { permissions, setPermissions, isPending, refresh, deletePermissions }
}

