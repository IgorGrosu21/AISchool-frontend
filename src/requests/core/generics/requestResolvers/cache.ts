import type { CachedResponse, CacheUpdaterRecord, StorageValue } from 'axios-cache-interceptor';
import type {
  RouteTypeRegistry, RouteName,
  SetupCacheEntryFn, SetupCacheFn
} from '../types';
import { validateRouteDefinition } from './resolveUrl';

/**
 * Builds a cache update entry for a given route and update array entry.
 * 
 * @template RouteTypes - The route registry type
 * @template Route - The route name
 * @template MutationResponse - The type of the mutation response
 * @param routes - The route registry
 * @param clientName - Cache key prefix
 * @param entry - The update array entry
 * @returns The cache entry (path + updater)
 */
const setupCacheEntry = <
  RouteTypes extends RouteTypeRegistry,
  Route extends RouteName<RouteTypes>,
  MutationResponse,
>(...[routes, clientName, entry]: Parameters<SetupCacheEntryFn<RouteTypes, Route, MutationResponse>>) => ({
  path: `${clientName}:get_${validateRouteDefinition(routes, entry.name)(entry.kwargs)}`,
  updater: (cache: StorageValue, response: CachedResponse) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    if (entry.updater === 'delete') {
      return 'delete';
    }
    if (entry.updater === 'replace') {
      if (response.data) {
        return {...cache, data: {...cache.data, data: response.data}};
      }
      return 'delete';
    }
    const cachedData = cache.data.data as Parameters<typeof entry.updater>[0];
    if (entry.updater.length === 1) {
      const updateFn = entry.updater as (cached: typeof cachedData) => typeof cachedData;
      return {...cache, data: {...cache.data, data: updateFn(cachedData)}};
    }
    return {
      ...cache,
      data: {
        ...cache.data,
        data: entry.updater(cachedData, response.data as MutationResponse)
      }
    };
  }
})

/**
 * Sets up cache configuration with optional update functions for cache invalidation/updates.
 *
 * This function creates a cache configuration that can include updater functions to modify
 * cached data when mutations occur. It supports three types of update operations:
 * - Function updaters: Custom functions to transform cached data
 * - 'replace': Replace cached data with new response data
 * - 'delete': Delete the cached entry
 *
 * @param routes - Route registry for resolving URL templates
 * @param clientName - Cache key prefix
 * @param cacheEnabled - Whether caching is enabled (default: true)
 * @param updateArray - Optional array of update entries with route names
 * @returns Cache configuration object with optional update record (CacheRequestConfig['cache'])
 *
 */
export const setupCache: SetupCacheFn = (routes, clientName, cacheEnabled = true, updateArray?) => {
  const cache = { enabled: cacheEnabled }
  if (updateArray === undefined) {
    return cache
  }

  const update = (<D>() => ({ } as CacheUpdaterRecord<CachedResponse, D>))() // ts infers D automatically
  for (const updateArrayEntry of updateArray) {
    const { path, updater } = setupCacheEntry(routes, clientName, updateArrayEntry);
    update[path] = updater;
  }

  if (Object.keys(update).length > 0) {
    return { ...cache, update }
  }
  return cache
}