export type AuthRequest = {
  email: string
  password: string
  rememberMe?: boolean
}

export type Oauth2Request = {
  provider: string
  email: string
  token: string
}

/*
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
    readonly id: string,
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
*/