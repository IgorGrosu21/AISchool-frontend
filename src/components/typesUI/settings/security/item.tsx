'use client'

import { WithLoader } from "@/ui";
import { useTranslations } from "next-intl";
import { useState, useCallback, useTransition } from "react";
import { type SecurityFormState, editAuthUserEmail, editAuthUserPassword } from "@/app/actions";
import { IAuthUser } from "@/interfaces";
import { EmailField, BackupEmailField, PasswordField } from "./fields";
import { Verification } from "./verification";

//mui components
import Stack from "@mui/material/Stack";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

export function Security({ authUser }: { authUser: IAuthUser }) {
  const [state, setState] = useState<SecurityFormState>({
    email: { value: authUser.email, error: '' },
    backupEmail: { value: authUser.backupEmail, error: '' },
    password: { value: '', error: '' },
    code: { value: null, error: '', purpose: 'verify_email' },
    success: false
  })
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('account.security')

  const submitEmail = useCallback((type: 'primary' | 'backup', useCode: boolean = true) => {
    const email = type === 'primary' ? state.email : state.backupEmail
    const isReady = (type === 'backup' || email !== null) && email?.error === '' && email?.value !== ''
    if (!isReady) {
      return
    }
    startTransition(async () => {
      editAuthUserEmail(useCode ? state : {
        ...state,
        code: { value: null, error: '', purpose: type === 'primary' ? 'verify_email' : 'verify_backup_email' }
      }, type).then(setState)
    })
  }, [state])

  const submitPassword = useCallback(() => {
    const isReady = state.password.error === '' && state.password.value !== ''
    if (!isReady) {
      return
    }
    startTransition(async () => {
      editAuthUserPassword(state).then(setState)
    })
  }, [state])
  
  const handleClose = useCallback((e?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    e?.preventDefault()
    if (reason === 'clickaway') {
      return;
    }

    setState(prev => ({...prev, success: false}))
  }, [])

  const updateField = useCallback((field: 'email' | 'backupEmail' | 'password', value: typeof state[typeof field]['value'], error: string) => {
    setState(prev => ({...prev, [field]: { value, error }}))
  }, [])

  const updateEmail = useCallback((value: string, error: string) => {
    updateField('email', value, error)
  }, [updateField])

  const updateBackupEmail = useCallback((value: string | null, error: string) => {
    updateField('backupEmail', value, error)
  }, [updateField])

  const updatePassword = useCallback((value: string, error: string) => {
    updateField('password', value, error)
  }, [updateField])

  return <Stack gap={4}>
    <WithLoader loading={isPending}>
      <EmailField
        value={state.email.value}
        error={state.email.error}
        onChange={updateEmail}
        submit={() => submitEmail('primary')}
      />
      <BackupEmailField
        value={state.backupEmail.value}
        error={state.backupEmail.error}
        onChange={updateBackupEmail}
        submit={() => submitEmail('backup')}
      />
      <PasswordField
        value={state.password.value}
        error={state.password.error}
        onChange={updatePassword}
        submit={submitPassword}
      />
    </WithLoader>
    <Verification
      value={state.code.value}
      error={state.code.error}
      onChange={(value, error) => setState({...state, code: { ...state.code, value, error }})}
      submit={() => submitEmail(state.code.purpose === 'verify_email' ? 'primary' : 'backup')}
      resend={() => submitEmail(state.code.purpose === 'verify_email' ? 'primary' : 'backup', false)}
      cancel={() => setState({...state, code: { value: null, error: '', purpose: 'verify_email' }})}
    />
    <Snackbar open={state.success} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity='success'
        variant="filled"
        sx={{ width: '100%' }}
      >
        {t('success')}
      </Alert>
    </Snackbar>
  </Stack>
}