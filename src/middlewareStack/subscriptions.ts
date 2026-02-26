import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './middlewareFactoryType';
import { extractRequestToken, updateResponseCookie } from '@/utils/cookies';
import { logger, maskToken } from './logger';

const SUBSCRIPTIONS_URL = process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL!;

const log = logger('subscriptions');

export const subscriptionsMiddlewareFactory: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const requiresSubscriptions = pathname.includes('/core/manuals');
    
    if (!requiresSubscriptions) {
      return next(request, _next);
    }

    let response = (await next(request, _next)) as NextResponse | undefined | null | void;
    if (!response) {
      response = NextResponse.next();
    }

    // Get access token (should be set by auth middleware)
    const accessToken = extractRequestToken(request, 'access');
    if (!accessToken) {
      log.warn('missing access token; skipping subscriptions token generation');
      return response;
    }

    // Get existing subscriptions token
    const existingSubscriptionsToken = extractRequestToken(request, 'subscriptions');

    // Ensure subscriptions token exists (non-blocking, uses access token)
    if (existingSubscriptionsToken) {
      return response;
    }

    log.info(`generating subscriptions token`, {
      usingToken: maskToken(accessToken),
    });
  
    try {
      const tokenRes = await fetch(`${SUBSCRIPTIONS_URL}/services/generate-token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({})
      });
  
      if (!tokenRes.ok) {
        log.warn(`failed to generate subscriptions token`, {
          status: tokenRes.status,
          detail: await tokenRes.json(),
        });
        return response;
      }
  
      const generatedToken = await tokenRes.json();
      await updateResponseCookie(response, 'subscriptions_token', generatedToken.token);
      log.info(`set subscriptions token cookie`, {
        token: maskToken(generatedToken.token),
      });
    } catch (error) {
      log.warn(`error generating subscriptions token`, { error });
    }

    return response;
  };
};

