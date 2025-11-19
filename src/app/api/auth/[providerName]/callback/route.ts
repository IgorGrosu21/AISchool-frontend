import { NextRequest, NextResponse } from "next/server";
import { providers } from "../config";
import { createToken, oauth2 } from "@/app/actions";

export async function GET(req: NextRequest, { params }: { params: Promise<{ providerName: string }> }) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL('/error', req.nextUrl.origin));
  }

  try {
    let tokenRes;
    const { providerName } = await params
    const provider = providers[providerName];
    switch (provider.name) {
      case "facebook":
        tokenRes = await fetch(
          `${provider.tokenUrl}?client_id=${provider.clientId}&redirect_uri=${provider.redirectUri}&client_secret=${provider.clientSecret}&code=${code}`
        );
        break;
      case "google":
        tokenRes = await fetch(provider.tokenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            code,
            client_id: provider.clientId,
            client_secret: provider.clientSecret,
            redirect_uri: provider.redirectUri,
            grant_type: "authorization_code",
          }),
        });
        break;
      default:
        throw new Error('Unknown provider');
    }

    const tokens = await tokenRes.json();
    if (!tokenRes.ok) throw new Error('Failed to get tokens');

    // Fetch user info
    let userRes;
    switch (provider.name) {
      case "facebook":
        userRes = await fetch(`${provider.userUrl}?fields=id,name,email,picture&access_token=${tokens.access_token}`);
        break;
      case "google":
        userRes = await fetch(provider.userUrl, {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        break;
    }

    const user = await userRes.json();
    const token = provider.name === 'google' ? tokens.id_token : tokens.access_token;
    //return NextResponse.json({tokens, user})
    const authTokens = await oauth2(provider.name, user.email, token)
    if (authTokens) {
      const redirectResponse = NextResponse.redirect(new URL('/core', req.nextUrl.origin))
      const accessToken = await createToken('access', authTokens.access)
      const refreshToken = await createToken('refresh', authTokens.refresh)

      const { name: accessName, value: accessValue, ...accessOptions } = accessToken
      const { name: refreshName, value: refreshValue, ...refreshOptions } = refreshToken

      redirectResponse.cookies.set(accessName, accessValue, accessOptions)
      redirectResponse.cookies.set(refreshName, refreshValue, refreshOptions)
      return redirectResponse
    } else {
      return NextResponse.redirect(new URL('/error', req.nextUrl.origin));
    }
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL('/error', req.nextUrl.origin));
  }
}