export type IAccessToken = {
  access: string
}

export type ITokens = IAccessToken & {
  refresh: string
}

export type IError = {
  code: number
  detail: string
  attr?: string
}

export type IGoogleAuth = {
  tokens: {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string,
    id_token: string,
  },
  user: {
    id: string,
    email: string,
    verified_email: boolean,
    name: string,
    given_name: string,
    family_name: string,
    picture: string,
  }
}

export type IFacebookAuth = {
  tokens: {
    access_token: string,
    token_type: string,
    expires_in: number
  },
  user: {
    id: number,
    name: string,
    email: string,
    picture: {
      data: {
        height: number,
        width: number,
        is_silhouette: boolean,
        url: string
      }
    }
  }
}
