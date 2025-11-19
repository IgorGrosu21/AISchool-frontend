'use client'

import { KeyboardEvent, useCallback, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { AuthButton } from '@/components'
import { useAuthContext } from '@/providers'
import { Code } from '../inputs'

//mui components
import Typography from '@mui/material/Typography'

export function Verification() {
  const t = useTranslations('auth')
  const { state, setState, submit } = useAuthContext()
  const [allowResend, setAllowResend] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(60)

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submit()
    }
  }, [submit])

  useEffect(() => {
    if (!allowResend) {
      const timer = setInterval(() => {
        if (secondsLeft === 0) {
          setAllowResend(true)
          clearInterval(timer)
          return
        }
        setSecondsLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [allowResend, secondsLeft])

  const handleResend = useCallback(() => {
    setAllowResend(false)
    setSecondsLeft(60)
    submit('login')
  }, [submit])

  const handleVerifiedWithLink = useCallback(() => {
    submit('login')
  }, [submit])

  return <>
    <Typography>{t('verification.helper1')}</Typography>
    <Code
      error={state.code.error !== ''}
      helperText={state.code.error}
      value={state.code.value}
      onChange={(value, error) => setState(prev => ({...prev, code: { ...prev.code, value, error }}))}
      onKeyDown={handleKeyDown}
    />
    <AuthButton type={state.type} onClick={submit} />
    <Typography>{t('verification.helper2', { seconds: secondsLeft })}</Typography>
    <AuthButton type='resend' onClick={handleResend} disabled={!allowResend} />
    {state.code.purpose === 'email_verification' && (
      <>
        <Typography>{t('verification.helper3')}</Typography>
        <AuthButton type='verified_with_link' onClick={handleVerifiedWithLink} />
      </>
    )}
  </>
}