'use client'

import { Input } from '../inputs';
import { useMemo } from 'react';
import { useValidatedFields } from '@/hooks';
import { useAuthContext } from '@/providers';


export function EmailField() {
  const { state } = useAuthContext()
  const [localValue, localError, handleChange] = useValidatedFields('email')

  const error = useMemo(() => state.email.error ?? localError, [localError, state.email.error])

  return <Input
    autoFocus
    error={error !== ''}
    hasRedirectLabel
    helperText={error}
    type='email'
    name='email'
    value={localValue}
    onChange={e => handleChange(e.target.value)}
  />
}