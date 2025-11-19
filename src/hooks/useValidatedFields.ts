'use client'

import type { FormState } from '@/app/actions';
import { useAuthContext } from '@/providers';
import { useCallback, useState, useEffect, useTransition, useMemo } from 'react';

const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const only_letters_pattern = /^[a-zA-Z]+$/
const only_numbers_pattern = /^\d+$/
const PASSWORD_MIN_LENGTH = 8
const DEBOUNCE_MS = 300 // Debounce validation by 300ms
/*
const SERVER_ERRORS = {
  email: ['email_already_exists', 'email_not_found'],
  password: ['password_incorect']
}
*/

export function useValidatedFields(field: 'email' | 'password'): [string, string, (value: string) => void] {
  const { state, setState } = useAuthContext()
  const [localField, setLocalField] = useState<FormState[typeof field]>({
    value: state[field].value,
    error: state[field].value
  })
  const localValue = useMemo(() => localField.value, [localField.value])
  const localError = useMemo(() => localField.error, [localField.error])
  const currentType = useMemo(() => state.type, [state.type])
  const [, startTransition] = useTransition()
  
  //debouncing values to not validate the field until the user stops typing (DEBOUNCE_MS)
  const [debouncedField, setDebouncedField] = useState(localField)

  const applyValidation = useMemo(() => {
    switch (currentType) {
      case 'login':
        return false
      case 'signup':
        return true
      case 'restore':
        return field === 'password'
    }
  }, [currentType, field])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedField(localField)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeout)
  }, [localField])

  // Validate with debouncing
  useEffect(() => {
    startTransition(() => {
      setState(state => ({...state, [field]: debouncedField}))
    })
  }, [field, debouncedField, setState])

  // Immediate update for input value (no lag)
  const handleChange = useCallback((value: string) => {
    if (applyValidation) {
      let error = ''
      if (value.trim() === '') {
        // Don't show error for empty field (handled by required attribute)
        error = ''
      } else if (field === 'email' && !email_pattern.test(value)) {
        error = 'email_invalid'
      } else if (field === 'password') {
        if (only_letters_pattern.test(value)) {
          error = 'password_only_letters'
        } else if (only_numbers_pattern.test(value)) {
          error = 'password_only_numbers'
        } else if (value.length < PASSWORD_MIN_LENGTH) {
          error = 'password_too_small'
        }
      }
      setLocalField({ value, error })
    }
    setLocalField(prev => ({...prev, value}))
  }, [applyValidation, field])

  return [localValue, localError, handleChange]
}