import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n';
import { NextRequest, NextFetchEvent, } from 'next/server';
import { MiddlewareFactory } from './middlewareFactoryType';
 
const localesMiddleware = createMiddleware(routing);

const excludedRoutes = ['trpc', '_next', '_vercel', 'images', 'favicon.ico', 'logo.png', 'manifest', 'robots.txt', 'sitemap.xml']

export const localesMiddlewareFactory: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (new RegExp(`^(?!(\/(?:${excludedRoutes.join('|')}))\/?).*`).test(pathname)) {
      return localesMiddleware(request)
    }
    return next(request, _next);
  };
}