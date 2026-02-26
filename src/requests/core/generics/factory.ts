import type { ViewsetFactory } from './types';
import { createReadonlyViewset, createDefaultViewset, createFileViewset } from './views';

/**
 * Creates a factory for generating viewsets with a specific service client.
 * 
 * This factory function takes a service client and route registry, and returns an object 
 * with methods to create different types of viewsets (readonly, default, and file viewsets),
 * plus a helper for creating update array entries.
 * All viewsets created from this factory will use the same client and routes for making requests.
 * 
 * @template Routes - The route registry type
 * @param client - The service client to use for all requests made by viewsets created from this factory
 * @param routes - Route registry for name-based viewset creation and type inference
 * @returns An object with factory methods for creating different types of viewsets
 * 
 */
export const createViewsetFactory: ViewsetFactory = (client, routes) => {
  return {
    createReadonlyViewset: config => createReadonlyViewset({ client, routes, ...config }),
    createViewset: config => createDefaultViewset({ client, routes, ...config }),
    createFileViewset: config => createFileViewset({ client, routes, ...config }),
    createUpdateArrayEntry: entry => entry
  };
}