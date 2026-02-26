'use server'

import { redirect } from '@/i18n'

import { sendAuthRequest, sendCodeVerificationRequest, sendOauth2Request, sendLogoutRequest } from "@/requests";
import { deleteTokens, setTokens } from "./token";
import { ITokens, IVerificationRequired, IError } from '@/interfaces';
import { isError } from '@/requests';
import type { DeviceInfo } from '@/utils/deviceInfo'
import type { Validatable } from './template'

export type AuthFormState = {
  type: 'login' | 'signup' | 'restore' | 'verification'
  email: Validatable
  password: Validatable
  code: Validatable & { purpose: 'verify_email' | 'restore_password' }
  rememberMe: boolean
}

async function handleResponse(response: ITokens | IVerificationRequired | IError, state: AuthFormState): Promise<AuthFormState> {
  if (isError(response)) {
    switch (response.attr) {
      case 'email':
        return { ...state, email: { ...state.email, error: response.detail } }
      case 'password':
        return { ...state, password: { ...state.password, error: response.detail } }
      case 'code':
        return { ...state, code: { ...state.code, error: response.detail } }
      default:
        await redirect('/error')
        break
    }
  } else if ('purpose' in response) {
    return { ...state, type: 'verification', code: {
      value: '',
      error: '',
      purpose: state.type === 'restore' ? 'restore_password' : 'verify_email'
    } }
  } else {
    await setTokens(response as ITokens)
    await redirect(state.type === 'signup' ? '/core/settings' : '/core')
  }
  return state
}

export async function dispatchAuthAction(
  state: AuthFormState,
  deviceInfo: DeviceInfo | null
): Promise<AuthFormState> {
  let response: ITokens | IVerificationRequired | IError
  if (state.type === 'verification') {
    response = await sendCodeVerificationRequest({
      email: state.email.value,
      password: state.password.value,
      code: state.code.value,
      purpose: state.code.purpose,
      rememberMe: state.rememberMe,
    }, deviceInfo)

    if (isError(response) && response.code === 404) {
      return { ...state, type: 'signup' }
    }
  } else {
    response = await sendAuthRequest(state.type, {
      email: state.email.value,
      password: state.password.value,
      rememberMe: state.rememberMe,
    }, deviceInfo)
  }
  return handleResponse(response, state)
}

export async function oauth2(
  provider: string,
  email: string,
  token: string,
  deviceInfo: DeviceInfo | null
): Promise<ITokens | undefined> {
  const response = await sendOauth2Request({provider, email, token}, deviceInfo)

  if ('access' in response) {
    return response as ITokens
  }

  return undefined
}

async function logout(all = false) {
  await sendLogoutRequest(all)
  await deleteTokens()
  await redirect('/auth')
}

export async function logoutThis() {
  await logout()
}

export async function logoutAll() {
  await logout(true)
}