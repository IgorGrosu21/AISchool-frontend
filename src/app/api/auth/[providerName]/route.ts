import { NextRequest, NextResponse } from "next/server";

import { providers } from "./config";

export async function GET(req: NextRequest, { params }: { params: Promise<{ providerName: string }> }) {
  const { providerName } = await params
  const provider = providers[providerName];
  if (!provider) {
    return NextResponse.redirect(new URL('/error', req.nextUrl.origin));
  }

  const options = {
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/${providerName.toLowerCase()}/callback`,
    client_id: provider.clientId,
    response_type: "code",
    scope: provider.scope,
    ...(provider.name === 'google' ? { access_type: "offline", prompt: "consent" } : {}),
  };

  const qs = new URLSearchParams(options);
  return NextResponse.redirect(`${provider.authUrl}?${qs.toString()}`);
}