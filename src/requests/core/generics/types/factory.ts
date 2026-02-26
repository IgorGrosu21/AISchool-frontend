import type { CacheRequestConfig } from 'axios-cache-interceptor';
import type {
  BaseViewsetConfig, RequestConfig,
  ReadonlyViewsetConfig, DefaultViewsetConfig, FileViewsetConfig,
  UpdateArrayEntry
} from "./configs"
import type { ReadonlyViewset, DefaultViewset, FileViewset } from "./viewsets"
import type { RouteTypeRegistry, RouteRegistry, RouteName } from "./routes"

/**
 * Helper type that removes the 'client' property from a config type.
 * 
 * This is used in factory functions where the client is provided separately.
 * 
 * @template T - The config type to modify
 */
type ConfigWithoutClient<T> = Omit<T, 'client' | 'routes'>

/**
 * Factory function type for creating viewsets.
 * 
 * Takes a service client and route registry, and returns an object with methods to create
 * different types of viewsets. The client and routes are automatically injected into each viewset configuration.
 * 
 * @param client - The service client to use for all requests
 * @param routes - Route registry for name-based viewset creation
 * @returns An object with factory methods for creating viewsets
 */
export type ViewsetFactory = <RouteTypes extends RouteTypeRegistry>(
  client: BaseViewsetConfig<RouteTypes, RouteName<RouteTypes>>['client'],
  routes: RouteRegistry<RouteTypes>
) => {
  /** Creates a readonly viewset that only supports fetching data */
  createReadonlyViewset: <N extends RouteName<RouteTypes>>(
    config: ConfigWithoutClient<ReadonlyViewsetConfig<RouteTypes, N>>
  ) => ReadonlyViewset<RouteTypes, N>
  /** Creates a default viewset with CRUD operations */
  createViewset: <N extends RouteName<RouteTypes>>(
    config: ConfigWithoutClient<DefaultViewsetConfig<RouteTypes, N>>
  ) => DefaultViewset<RouteTypes, N>
  /** Creates a file viewset for handling file uploads and deletions */
  createFileViewset: <N extends RouteName<RouteTypes>>(
    config: ConfigWithoutClient<FileViewsetConfig<RouteTypes, N>>
  ) => FileViewset<RouteTypes, N>,
  createUpdateArrayEntry: <Route extends RouteName<RouteTypes>, MutationResponse>(
    updateArrayEntry: UpdateArrayEntry<RouteTypes, Route, MutationResponse>
  ) => UpdateArrayEntry<RouteTypes, Route, MutationResponse>
}

/**
 * Factory function type for creating request resolvers.
 * 
 * Takes a base viewset configuration and returns a function that resolves
 * base request configurations (url, params, data, cache).
 * HTTP method and file id handling are performed by the caller.
 * 
 * @param config - Base viewset configuration
 * @returns A function that resolves request configurations
 */
export type RequestResolverFactory = <
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
>(config: BaseViewsetConfig<RouteTypes, N>) => (
  args?: Omit<RequestConfig<RouteTypes, N>, 'method' | 'id'>
) => CacheRequestConfig