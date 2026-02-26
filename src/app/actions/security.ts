'use server'

import { redirect } from '@/i18n'

import { updateAuthUserEmail, updateAuthUserPassword } from "@/requests";
import { IVerificationRequired, IError } from '@/interfaces';
import { isError } from '@/requests';
import type { Validatable } from './template'


export type SecurityFormState = {
  email: Validatable
  backupEmail: Validatable<string | null>
  password: Validatable
  code: Validatable<string | null> & { purpose: 'verify_email' | 'verify_backup_email' }
  success: boolean
}

async function handleResponse(response: null | IVerificationRequired | IError, state: SecurityFormState): Promise<SecurityFormState> {
  if (isError(response)) {
    switch (response.attr) {
      case 'email':
        return { ...state, email: { ...state.email, error: response.detail } }
      case 'backup_email':
        return { ...state, backupEmail: { ...state.backupEmail, error: response.detail } }
      case 'password':
        return { ...state, password: { ...state.password, error: response.detail } }
      case 'code':
        return { ...state, code: { ...state.code, error: response.detail } }
      default:
        await redirect('/error')
        break
    }
  } else if (response === null) {
    return { ...state, code: { ...state.code, value: null, error: '' }, success: true }
  } else {
    return { ...state, code: { value: '', error: '', purpose: response.purpose as 'verify_email' | 'verify_backup_email' } }
  }
  return state
}

export async function editAuthUserEmail(state: SecurityFormState, type: 'primary' | 'backup'): Promise<SecurityFormState> {
  const email = type === 'primary' ? state.email.value : state.backupEmail.value
  const response = await updateAuthUserEmail(email, type, state.code.value)
  return handleResponse(response, state)
}

export async function editAuthUserPassword(state: SecurityFormState): Promise<SecurityFormState> {
  const response = await updateAuthUserPassword(state.password.value)
  return handleResponse(response, state)
}