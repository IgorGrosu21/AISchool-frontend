import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { createToken } from "@/app/actions";
import { MiddlewareFactory } from './middlewareFactoryType';
import { IAccessToken } from '@/interfaces';

const maskToken = (token?: string) => {
  if (!token) return 'undefined';
  return `${token.slice(0, 6)}…${token.slice(-6)}`;
};

const DEBUG = false

export const authMiddlewareFactory: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const requiresAuth = segments.includes('core');

    let response = (await next(request, _next)) as NextResponse | undefined | null | void;
    if (!response) {
      response = NextResponse.next();
    }

    if (!requiresAuth) {
      return response;
    }

    const access = request.cookies.get('access_token')?.value;
    const refresh = request.cookies.get('refresh_token')?.value;

    const authRedirectTarget = new URL(`/auth`, request.nextUrl.origin);

    if (DEBUG) {
      console.info('[auth-middleware] incoming request', {
        pathname,
        hasAccess: Boolean(access),
        access: access ? maskToken(access) : 'undefined',
        hasRefresh: Boolean(refresh),
        refresh: refresh ? maskToken(refresh) : 'undefined',
      });
    }

    if (!refresh) {
      if (DEBUG) {
        console.warn('[auth-middleware] missing refresh token; redirecting to auth', {
          redirect: authRedirectTarget.toString(),
        });
      }
      return NextResponse.redirect(authRedirectTarget);
    }

    if (access) {
      if (DEBUG) {
        console.info('[auth-middleware] access token present', {
          access: maskToken(access),
        });
      }
      return response;
    }

    if (DEBUG) {
      console.info('[auth-middleware] refreshing access token', {
      refresh: maskToken(refresh),
      });
    }

    try {
      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh })
      });

      if (!refreshResponse.ok) {
        if (DEBUG) {
          console.error('[auth-middleware] refresh request failed', {
            status: refreshResponse.status,
            statusText: refreshResponse.statusText,
            details: await refreshResponse.json(),
          });
        }
        return response;
      }

      const data: IAccessToken = await refreshResponse.json();
      const token = await createToken('access', data.access);
      const { name, value, ...options } = token;
      response.cookies.set(name, value, options);
      if (DEBUG) {
        console.info('[auth-middleware] set new access token cookie', {
        access: maskToken(data.access),
        });
      }
    } catch (error) {
      if (DEBUG) {
        console.error('[auth-middleware] refresh request threw', error);
      }
      return NextResponse.redirect(authRedirectTarget);
    }

    return response;
  };
};