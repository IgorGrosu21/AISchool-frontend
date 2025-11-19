'use client'

import { Context, ProviderProps, useCallback, useMemo, useState, useTransition } from "react"

import { useTranslations } from "next-intl";
import { Title } from "@/components";
import { Loader, Panel } from "@/ui";
import { EditorContextType } from "./contexts";
import { ICanEdit } from "@/interfaces";
import { useRouter } from "@/i18n";

//mui components
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar"
import Box from "@mui/material/Box";

interface EditorProviderValue<T> {
  Context: Context<EditorContextType<T> | null>
  initial: T
  action: (instance: T) => Promise<[T | undefined, number]>
  segments?: Array<{ label: string, href: string }>
}

export function EditorProvider<T extends ICanEdit>({children, value: {Context, initial, action, segments}}: ProviderProps<EditorProviderValue<T>>) {
  const t = useTranslations('components.edit');
  const returnLink = useMemo(() => segments ? '/core/' + segments.at(-1)?.href : undefined, [segments])
  const returnLabel = useMemo(() => segments ? '' + segments.at(-1)?.label : undefined, [segments])

  const [instance, setInstance] = useState<T>(initial)
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<number | undefined>(undefined)
  const router = useRouter()
  
  const handleClose = useCallback((e?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    e?.preventDefault()
    if (reason === 'clickaway') {
      return;
    }

    setStatus(undefined);
  }, [])

  const returnBack = useCallback(() => {
    router.back()
  }, [router])

  const discard = useCallback(() => {
    setInstance(initial)
  }, [initial])

  const save = useCallback(() => {
    startTransition(async () => {
      const [updatedInstance, status] = await action(instance)
      if (updatedInstance && status < 300) {
        setStatus(status)
        setInstance({...updatedInstance})
      } else if (status === 401) {
        router.push('/unauthorized')
      } else {
        setStatus(status)
      }
    })
  }, [action, instance, router])
  
  if (!initial.canEdit) {
    router.push('/forbidden')
  }

  return <Context.Provider value={{instance, setInstance}}>
    {returnLabel && returnLink && <Title label={returnLabel} link={returnLink} type='back' />}
    {children}
    <Panel direction='row' gap={2} sx={{flexGrow: 0, justifyContent: 'space-between'}}>
      <Button variant='outlined' onClick={returnBack}>{t('return')}</Button>
      <Box sx={{flex: 1}} />
      <Button variant='outlined' onClick={discard}>{t('discard')}</Button>
      <Button variant='contained' onClick={save}>{t('save')}</Button>
    </Panel>
    <Loader open={pending} />
    <Snackbar open={status !== undefined} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={status === 200 ? 'success' : 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {status && t(status.toString())}
      </Alert>
    </Snackbar>
  </Context.Provider>
}