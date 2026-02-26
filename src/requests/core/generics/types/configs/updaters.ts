import type { ServiceClient } from '../../../serviceClient';
import type { CacheRequestConfig } from 'axios-cache-interceptor';
import type { RouteTypeRegistry, RouteRegistry, RouteKwargs, RouteParams, RouteResponse, RouteName } from '../routes';

/**
 * A function type for updating cached data.
 * 
 * This is a conditional type that represents either:
 * - A single-parameter function `(cachedData: T) => T` when R is `never` (transform existing data)
 * - A two-parameter function `(cachedData: T, newInstance: R) => T` when R is provided (merge with new data)
 * 
 * @template T - The type of the cached data
 * @template R - The type of the new instance data (use `never` for single-parameter functions)
 * 
 */
type UpdateFn<R, T> = [R] extends [never] ? (
  cachedData: T
) => T : (
  cachedData: T, newInstance: R
) => T

/**
 * A single entry in an update array.
 * 
 * Uses route names from a route registry to provide type-safe cache updates.
 * When you specify a route name, the updater function will have properly typed
 * `cachedData` (from the route response) and `newInstance` (from the mutation response).
 * 
 * @template RouteTypes - The route registry type
 * @template RouteName - The route name
 * @template MutationResponse - The type of the mutation response (for two-parameter updaters)
 * 
 */
export type UpdateArrayEntry<
  RouteTypes extends RouteTypeRegistry,
  Route extends RouteName<RouteTypes>,
  MutationResponse
> = {
  /** The route name from the registry */
  name: Route;
  /** Keyword arguments to resolve the route URL */
  kwargs?: RouteKwargs<RouteTypes, Route>;
  /** Query parameters to resolve the route URL */
  params?: RouteParams<RouteTypes, Route>;
  /** The updater function or shortcut string.
   * The updater function receives:
   * - cachedData: The cached response type from the route (RouteResponse<RouteTypes, Route>)
   * - newInstance: The mutation response type (MutationResponse, or omitted for single-parameter functions)
   */
  updater: UpdateFn<MutationResponse, RouteResponse<RouteTypes, Route>> | 'replace' | 'delete';
}

/**
 * Function type for setup cache entry parameters.
 * 
 * This is used for typing helper argument lists, not as a runtime return value.
 * 
 * @template RouteTypes - The route registry type
 * @template Route - The route name
 * @template MutationResponse - The type of the mutation response
 */

export type SetupCacheEntryFn<
  RouteTypes extends RouteTypeRegistry,
  Route extends RouteName<RouteTypes>,
  MutationResponse
> = (
  routes: RouteRegistry<RouteTypes>,
  clientName: ServiceClient['name'],
  entry: UpdateArrayEntry<RouteTypes, Route, MutationResponse>
) => void

/**
 * An array of update entries for type-safe cache updates.
 * 
 * This type allows each entry to have a different route name. When using the helper function
 * `createUpdateEntry`, TypeScript will properly infer the types for `cachedData` and `newInstance`.
 * 
 * @template RouteTypes - The route registry type
 * @template MutationResponse - The type of the mutation response (for two-parameter updaters)
 * 
 */
export type UpdateArray<
  RouteTypes extends RouteTypeRegistry,
  MutationResponse
> = Array<UpdateArrayEntry<RouteTypes, RouteName<RouteTypes>, MutationResponse>>;

/**
 * A function type for setting up a cache configuration.
 * 
 * @template RouteTypes - The route registry type
 * @template MutationResponse - The type of the mutation response
 */
export type SetupCacheFn = <
  RouteTypes extends RouteTypeRegistry,
  MutationResponse
>(
  routes: RouteRegistry<RouteTypes>,
  clientName: ServiceClient['name'],
  cacheEnabled?: boolean,
  updateArray?: UpdateArray<RouteTypes, MutationResponse>
) => CacheRequestConfig['cache']
