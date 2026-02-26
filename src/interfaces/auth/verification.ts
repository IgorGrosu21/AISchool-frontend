export type IVerificationRequired = {
  purpose: 'verify_email' | 'restore_password'
}

export type VerifyCodeRequest = {
  email: string
  password: string
  code: string
  purpose: string
  rememberMe: boolean
}

export type VerifyTokenRequest = {
  token: string
}