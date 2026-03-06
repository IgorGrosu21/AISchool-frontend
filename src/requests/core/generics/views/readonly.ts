import type { ReadonlyViewset, ReadonlyViewsetConfig } from "../types";
import type {
  RouteTypeRegistry,
  RouteResponse,
  RouteName,
} from "../types/routes";
import { createRequestResolverFactory } from "../requestResolvers";

/**
 * Creates a readonly viewset that only supports fetching data.
 *
 * A readonly viewset provides a single `fetch` method for retrieving resources.
 * It's ideal for resources that should not be modified through the API, such as
 * reference data, reports, or read-only endpoints.
 *
 * The viewset is created by route name from the registry. The response type is
 * automatically inferred from the route definition.
 *
 * @template Routes - The route registry type
 * @template N - The route name from the registry
 * @param config - Configuration object containing client, route name, routes, and cache settings
 * @returns A readonly viewset object with only a fetch method
 *
 */
export const createReadonlyViewset = <
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>,
>(
  config: ReadonlyViewsetConfig<RouteTypes, N>,
): ReadonlyViewset<RouteTypes, N> => {
  const resolveRequestConfig = createRequestResolverFactory(config);

  return {
    fetch: async (args = {}) =>
      config.client.request<RouteResponse<RouteTypes, N>>({
        ...resolveRequestConfig({ ...args, type: "fetch" }),
        requiresAuth: config.requiresAuth ?? true,
      }),
  };
};
