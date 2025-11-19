import type { ITokens } from "../../interfaces"
import { request } from "./client"
import { deleteAllCache } from "../client";
import { getToken } from "@/app/actions";

export async function sendAuthRequest(type: 'login' | 'signup' | 'restore', email: string, password: string) {
  return request<ITokens>({url: `${type}/`, data: { email, password }})
}

export async function sendCodeVerificationRequest(email: string, password: string, code: string, purpose: string) {
  return request<ITokens>({url: `verify-code/`, data: { email, password, code, purpose }})
}

export async function sendOauth2Request(provider: string, email: string, token: string) {
  return request<ITokens>({url: `oauth2/`, data: { provider, email, token }})
}

export async function sendLogoutRequest(all = false) {
  const refresh = await getToken('refresh')
  
  deleteAllCache()
  return request<undefined>({url: `logout${all ? '-all' : ''}/`, data: { refresh: refresh }})
}