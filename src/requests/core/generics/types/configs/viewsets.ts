import type { ServiceClient } from '../../../serviceClient';
import { Method } from '../misc';
import type { RouteTypeRegistry, RouteRegistry, RouteName } from '../routes';

export type BaseViewsetConfig<
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
> = {
  /** The service client to use for making requests */
  client: ServiceClient,
  /** The route registry to use for resolving the route urlTemplate */
  routes: RouteRegistry<RouteTypes>,
  /** Route name from the registry */
  name: N,
  /** Whether caching is enabled for this viewset (default: true) */
  cacheEnabled?: boolean
}

/**
 * Configuration for a readonly viewset.
 * 
 * Readonly viewsets only support fetching data and cannot perform mutations.
 * 
 * @template RouteTypes - The route registry type
 * @template N - The route name (optional, defaults to keyof RouteTypes)
 */
export type ReadonlyViewsetConfig<
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
> = BaseViewsetConfig<RouteTypes, N> & {
  /** Whether authentication is required for this viewset (default: true) */
  requiresAuth?: boolean
}

/**
 * Configuration for a default viewset with CRUD operations.
 * 
 * Default viewsets support multiple HTTP methods, but only the methods
 * specified in `supportedMethods` will be enabled. Attempting to call
 * an unsupported method will throw an error.
 * 
 * @template RouteTypes - The route registry type
 * @template N - The route name (optional, defaults to keyof RouteTypes)
 */
export type DefaultViewsetConfig<
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
> = BaseViewsetConfig<RouteTypes, N> & {
  /** Array of HTTP methods that this viewset supports */
  supportedMethods: Method[]
}

/**
 * Configuration for a file viewset.
 * 
 * File viewsets are specialized for handling file uploads and deletions.
 * They use `sendDetailedFile` for uploads, which returns `IDetailedMedia` objects.
 * 
 * @template RouteTypes - The route registry type
 * @template N - The route name (optional, defaults to keyof RouteTypes)
 */
export type FileViewsetConfig<
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
> = BaseViewsetConfig<RouteTypes, N>