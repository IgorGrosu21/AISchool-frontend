'use server'

import { redirect } from '@/i18n'

import { sendAuthRequest, sendCodeVerificationRequest, sendOauth2Request, sendLogoutRequest } from "@/requests";
import { deleteTokens, setTokens } from "./token";
import { ITokens, IError } from '@/interfaces';

type Validatable = { value: string, error: string }

export type FormState = {
  type: 'login' | 'signup' | 'restore' | 'verification'
  email: Validatable
  password: Validatable
  code: Validatable & { purpose: 'email_verification' | 'password_reset' }
}

async function handleResponse(response: IError | ITokens, status: number, state: FormState): Promise<FormState> {
  switch (status) {
    case 200:
      return { ...state, type: 'verification', code: {
        value: '',
        error: '',
        purpose: state.type === 'restore' ? 'password_reset' : 'email_verification'
      } }
    case 201:
      await setTokens(response as ITokens)
      redirect('/core')
      break
    case 500:
      await redirect('/error')
      break
    default: {
      const errorResponse = response as IError
      switch (errorResponse.attr) {
        case 'email':
          return { ...state, email: { ...state.email, error: errorResponse.detail } }
        case 'password':
          return { ...state, password: { ...state.password, error: errorResponse.detail } }
        case 'code':
          if (state.code) {
            return { ...state, code: { ...state.code, error: errorResponse.detail } }
          }
          return state
        default:
          await redirect('/error')
          break
      }
      break
    }
  }
  return state
}

export async function dispatchAuthAction(state: FormState): Promise<FormState> {
  let response: IError | ITokens
  let status: number
  if (state.type === 'verification') {
    [response, status] = await sendCodeVerificationRequest(state.email.value, state.password.value, state.code.value, state.code.purpose)

    if (status === 404) {
      return { ...state, type: 'signup' }
    }
  } else {
    [response, status] = await sendAuthRequest(state.type, state.email.value, state.password.value)
  }
  return await handleResponse(response, status, state)
}

export async function oauth2(provider: string, email: string, token: string): Promise<ITokens | undefined> {
  const [response, status] = await sendOauth2Request(provider, email, token)

  if (status === 201) {
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