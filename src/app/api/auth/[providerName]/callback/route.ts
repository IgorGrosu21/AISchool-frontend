import { NextRequest, NextResponse } from "next/server";
import { providers } from "../config";
import { oauth2 } from "@/app/actions";
import { extractDeviceInfoFromRequest } from "@/utils/deviceInfo";
import { updateResponseTokens } from "@/utils/cookies";

export async function GET(req: NextRequest, { params }: { params: Promise<{ providerName: string }> }) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL('/error', req.nextUrl.origin));
  }

  try {
    let tokenRes;
    const { providerName } = await params
    const provider = providers[providerName];
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/${providerName.toLowerCase()}/callback`;
    switch (provider.name) {
      case "facebook":
        tokenRes = await fetch(
          `${provider.tokenUrl}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&client_secret=${provider.clientSecret}&code=${code}`
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
            redirect_uri: redirectUri,
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
    
    // Extract device info from request
    const deviceInfo = extractDeviceInfoFromRequest(req)
    
    //return NextResponse.json({tokens, user})
    const authTokens = await oauth2(provider.name, user.email, token, deviceInfo)
    if (authTokens) {
      const redirectResponse = NextResponse.redirect(new URL('/core', req.nextUrl.origin))
      return updateResponseTokens(redirectResponse, authTokens)
    } else {
      return NextResponse.redirect(new URL('/error', req.nextUrl.origin));
    }
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL('/error', req.nextUrl.origin));
  }
}