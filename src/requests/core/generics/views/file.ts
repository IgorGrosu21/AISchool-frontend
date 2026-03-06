import type { FileViewset, FileViewsetConfig } from "../types";
import type { RouteTypeRegistry, RouteName } from "../types/routes";
import { createRequestResolverFactory } from "../requestResolvers";

/**
 * Creates a file viewset for handling file uploads and deletions.
 *
 * A file viewset provides methods for uploading detailed media files (with metadata)
 * and deleting them. It uses `sendDetailedFile` for uploads, which returns
 * `IDetailedMedia` objects with file metadata.
 *
 * @template Routes - The route registry type
 * @template N - The route name
 * @param config - Configuration object containing client, route name, routes, and cache settings
 * @returns The file viewset object
 *
 */
export const createFileViewset = <
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>,
>(
  config: FileViewsetConfig<RouteTypes, N>,
): FileViewset<RouteTypes, N> => {
  const resolveRequestConfig = createRequestResolverFactory(config);

  return {
    send: async (args) =>
      config.client.sendDetailedFile(
        resolveRequestConfig({ ...args, type: "sendDetailedFile" }),
      ),
    delete: async ({ id, ...args }) =>
      config.client.deleteDetailedFile(
        resolveRequestConfig({ ...args, type: "deleteDetailedFile" }),
        id,
      ),
  };
};
