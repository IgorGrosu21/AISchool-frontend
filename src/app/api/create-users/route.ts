import { getToken } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

const URL_MAPPING = {
  manuals: process.env.NEXT_PUBLIC_MANUALS_URL,
  notifications: process.env.NEXT_PUBLIC_NOTIFICATIONS_URL,
  subscriptions: process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL,
}

async function createErrorResponse(req: NextRequest, isApiCall: boolean, status: number, detail: string) {
  if (isApiCall) {
    return NextResponse.json({ code: status, detail }, { status })
  }
  return NextResponse.redirect(new URL(status === 401 ? '/auth' : '/error', req.nextUrl.origin))
}

async function createUser(token: string, type: keyof typeof URL_MAPPING, profileType: string) {
  return fetch(`${URL_MAPPING[type]}/api/create-user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ profileType })
  })
}

export async function POST(req: NextRequest) {
  const { profileType } = await req.json()
  const acceptHeader = req.headers.get('accept')
  const isApiCall = acceptHeader?.includes('application/json') ?? false

  try {
    // Get access token using token manager
    const accessToken = await getToken()
    if (!accessToken) {
      return createErrorResponse(req, isApiCall, 401, 'unauthorized')
    }

    // Create users in all services in parallel using the access token
    const serviceTypes = Object.keys(URL_MAPPING) as Array<keyof typeof URL_MAPPING>
    await Promise.allSettled(
      serviceTypes.map(serviceType => createUser(accessToken, serviceType, profileType))
    )
    
    if (isApiCall) {
      return NextResponse.json({ access: accessToken }, { status: 200 })
    } else {
      return NextResponse.redirect(new URL('/core/settings', req.nextUrl.origin))
    }
  } catch {
    return createErrorResponse(req, isApiCall, 500, 'internal_server_error')
  }
}