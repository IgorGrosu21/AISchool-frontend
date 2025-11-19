export type OAuthProviderConfig = {
  name: 'facebook' | 'google';
  authUrl: string;
  tokenUrl: string;
  userUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
};

export const providers: Record<string, OAuthProviderConfig> = {
  google: {
    name: "google",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!,
    scope: "openid email profile",
  },
  facebook: {
    name: "facebook",
    authUrl: "https://www.facebook.com/v20.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v20.0/oauth/access_token",
    userUrl: "https://graph.facebook.com/me",
    clientId: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    redirectUri: process.env.FACEBOOK_REDIRECT_URI!,
    scope: "email,public_profile",
  },
};
