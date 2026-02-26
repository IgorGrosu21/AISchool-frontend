'use client'

import { Context, ProviderProps, useCallback, useMemo, useState, useTransition, useEffect } from "react"

import { useTranslations } from "next-intl";
import { Panel, WithLoader } from "@/ui";
import { EditorContextType } from "./contexts";
import { useRouter, Link } from "@/i18n";
import { EditActionFunction } from "@/app/actions";
import { isError } from "@/requests";
import { grantPermission, type Resource } from "@/utils/permissions";
import { usePermissions } from "@/hooks";

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Fab from "@mui/material/Fab"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar"
import Box from "@mui/material/Box";
//icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

interface EditorProviderValue<T> {
  Context: Context<EditorContextType<T> | null>
  initial: T
  action: EditActionFunction<T>
  segments: Array<{ label: string, href: string }>
  resource: Resource
}

export function EditorProvider<T extends object>({children, value: {
  Context, initial, action, segments, resource
}}: ProviderProps<EditorProviderValue<T>>) {
  const t = useTranslations('layout.edit');
  const returnLink = useMemo(() => segments.at(-1)?.href, [segments])
  const returnLabel = useMemo(() => segments.at(-1)?.label, [segments])
  
  const [instance, setInstance] = useState<T>(initial)
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<number | undefined>(undefined)
  const { permissions } = usePermissions()
  const permissionGranted = useMemo(() => grantPermission(permissions, resource), [permissions, resource])
  const router = useRouter()

  useEffect(() => {
    if (!permissionGranted && permissions) {
      router.push('/forbidden')
    }
  }, [permissionGranted, permissions, router])
  
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
      const updatedInstance = await action(instance)
      if (isError(updatedInstance)) {
        if (updatedInstance.code === 401) {
          router.push('/unauthorized')
        }
        setStatus(updatedInstance.code)
      } else {
        setStatus(200)
        setInstance({...updatedInstance})
      }
    })
  }, [action, instance, router])

  return <Context.Provider value={{instance, setInstance}}>
    {returnLink && <Stack direction='row' gap={2} sx={{alignItems: 'center', justifyContent: 'space-between'}}>
      <Typography 
        variant='h4'
        sx={{ 
          textAlign: { xs: 'center', md: 'left' },
          fontSize: { xs: '1.5rem', md: '2.125rem' }
        }}
      >
        {returnLabel}
      </Typography>
      <Link href={'/core/' + returnLink}>
        <Fab 
          color='primary'
          size='medium'
          sx={{
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            '& .MuiSvgIcon-root': {
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }
          }}
        >
          <ArrowBackIcon />
        </Fab>
      </Link>
    </Stack>}
    <WithLoader gap={{ xs: 4, md: 8 }} loading={pending}>
      {children}
      <Panel direction='row' gap={2} sx={{flexGrow: 0, justifyContent: 'space-between', mt: 4}}>
        <Button variant='outlined' onClick={returnBack}>{t('return')}</Button>
        <Box sx={{flex: 1}} />
        <Button variant='outlined' onClick={discard}>{t('discard')}</Button>
        <Button variant='contained' onClick={save}>{t('save')}</Button>
      </Panel>
    </WithLoader>
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