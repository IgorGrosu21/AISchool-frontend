export type RefreshTokenRequest = {
  refresh: string
}

export type ITokens = {
  access: string
  refresh: string
  longRefresh: boolean
}