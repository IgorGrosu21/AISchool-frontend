import type { RequestResolverFactory } from '../types';
import { validateRouteDefinition } from './resolveUrl';
import { setupCache } from './cache';

/**
 * Creates a request resolver factory for viewsets.
 * 
 * This factory generates a function that converts viewset request arguments into
 * base axios cache request configurations (url, params, data, cache), including
 * cache update entries for mutation requests.
 * HTTP method selection is handled by the caller.
 * The URL template is retrieved from the route registry based on the route name.
 * 
 * @template RouteTypes - The route registry type
 * @param config - Configuration object containing the client, route name, routes, and cache settings
 * @returns A function that resolves request configurations for viewset operations
 * 
 */

export const createRequestResolverFactory: RequestResolverFactory = config => {
  const resolveUrl = validateRouteDefinition(config.routes, config.name);

  return args => ({
    url: resolveUrl(args?.kwargs),
    params: args?.params,
    data: args && 'data' in args ? args.data : undefined,
    cache: args?.type === 'fetch'
      ? { enabled: config.cacheEnabled ?? true } 
      : setupCache(config.routes, config.client.name, config.cacheEnabled, args?.updateArray)
  })
}
