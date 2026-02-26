import type { IMedia, IDetailedMedia } from '@/interfaces';
import type { ResWithError } from '../../serviceClient';
import type { RequestConfig } from './configs';
import type { RouteName, RouteResponse, RouteTypeRegistry } from './routes';

/**
 * A readonly viewset that only supports fetching data.
 * 
 * Readonly viewsets are ideal for resources that should not be modified
 * through the API, such as reference data, reports, or read-only endpoints.
 * 
 * @template T - The type of the resource data
 */
export type ReadonlyViewset<
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
> = {
  /** Fetches a resource from the API. */
  fetch: (args?: Omit<(RequestConfig<RouteTypes, N> & {type: 'fetch'}), 'type'>) => ResWithError<RouteResponse<RouteTypes, N>>
}

/**
 * A default viewset with support for CRUD operations and file uploads.
 * 
 * Default viewsets extend readonly viewsets and add methods for creating,
 * updating, deleting resources, and handling file uploads. Only methods
 * specified in the configuration will be enabled.
 * 
 * @template T - The type of the resource data
 */
export type DefaultViewset<
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
> = ReadonlyViewset<RouteTypes, N> & {
  /** Creates or updates a resource. */
  send: (args: Omit<(RequestConfig<RouteTypes, N> & {type: 'send'}), 'type'>) => ResWithError<RouteResponse<RouteTypes, N>>
  /** Deletes a resource. */
  delete: (args: Omit<(RequestConfig<RouteTypes, N> & {type: 'delete'}), 'type'>) => ResWithError<null>
  /** Uploads a file. */
  sendFile: (args: Omit<(RequestConfig<RouteTypes, N> & {type: 'sendFile'}), 'type'>) => ResWithError<IMedia>
  /** Deletes a file. */
  deleteFile: (args?: Omit<(RequestConfig<RouteTypes, N> & {type: 'deleteFile'}), 'type'>) => ResWithError<null>
}

/**
 * A file viewset for handling file uploads and deletions with metadata.
 * 
 * File viewsets are specialized for handling file operations that return
 * IDetailedMedia objects (files with metadata like ID, URL, delete flag).
 * 
 */
export type FileViewset<
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
> = { 
  /** Uploads a file with detailed metadata. */
  send: (args: Omit<(RequestConfig<RouteTypes, N> & {type: 'sendDetailedFile'}), 'type'>) => ResWithError<IDetailedMedia>
  /** Deletes a file. */
  delete: (args: Omit<(RequestConfig<RouteTypes, N> & {type: 'deleteDetailedFile'}), 'type'>) => ResWithError<null>
}