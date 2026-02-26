import type { DefaultViewset, DefaultViewsetConfig } from '../types';
import type { RouteTypeRegistry, RouteResponse, RouteName } from '../types/routes';
import { createRequestResolverFactory } from '../requestResolvers';

/**
 * Creates a default viewset with support for CRUD operations and file uploads.
 * 
 * A default viewset provides methods for fetching, creating/updating, deleting resources,
 * and handling file uploads. It only enables methods specified in `supportedMethods`.
 * Attempting to call an unsupported method will throw an error.
 * 
 * @template RouteTypes - The route registry type
 * @template N - The route name
 * @param config - Configuration object containing client, route name, routes, cache settings, and supported methods
 * @returns The viewset object
 * 
 */
export const createDefaultViewset = <RouteTypes extends RouteTypeRegistry, N extends RouteName<RouteTypes>>(
  config: DefaultViewsetConfig<RouteTypes, N>
): DefaultViewset<RouteTypes, N> => {
  const resolveRequestConfig = createRequestResolverFactory(config);

  const checkMethod = (method: typeof config.supportedMethods[number]) => {
    if (config.supportedMethods.includes(method)) {
      return undefined
    }
    return async () => {
      throw new Error(`Method '${method}' is not supported for this viewset. Supported methods: ${config.supportedMethods.join(', ')}`);
    };
  };

  return {
    fetch: checkMethod('fetch') ?? (async args => config.client.request<RouteResponse<RouteTypes, N>>(
      resolveRequestConfig({...args, type: 'fetch'})
    )),
    send: checkMethod('send') ?? (async ({method = 'PUT', ...args}) => config.client.request<RouteResponse<RouteTypes, N>>({
      ...resolveRequestConfig({...args, type: 'send'}),
      method
    })),
    delete: checkMethod('delete') ?? (async args => config.client.deleteFile(
      resolveRequestConfig({...args, type: 'delete'})
    )),
    sendFile: checkMethod('sendFile') ?? (async args => config.client.sendFile(
      resolveRequestConfig({...args, type: 'sendFile'})
    )),
    deleteFile: checkMethod('deleteFile') ?? (async args => config.client.deleteFile(
      resolveRequestConfig({...args, type: 'deleteFile'})
    )),
  }
}