import type { IAuthUser, IVerificationRequired } from "@/interfaces";
import { get, post, destroy } from "./client";

export function fetchAuthUser() {
  return get<IAuthUser>('/user/')
}

export function updateAuthUserEmail(email: string | null, type: 'primary' | 'backup', code: string | null) {
  return post<{
    email: string | null,
    type: 'primary' | 'backup'
    code: string | null
  }, null | IVerificationRequired>('/user/email/', { email, type, code }, null, true)
}

export function updateAuthUserPassword(password: string) {
  return post<{ password: string }, null>('/user/password/', { password }, null, true)
}

export function deleteAuthUser() {
  return destroy('/user/')
}