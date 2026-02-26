import type { UpdateArray } from './updaters';
import type { RouteTypeRegistry, RouteName, RouteResponse, RouteKwargs, RouteParams } from '../routes';
import type { IDetailedMedia, IMedia } from '@/interfaces';

/**
 * Helper type for request configs that may include an update array.
 * 
 * @template MutationResponse - The type of the new instance data for update functions
 * @template RouteTypes - The route registry type
 */
type WithUpdateArray<
  RouteTypes extends RouteTypeRegistry,
  MutationResponse = never,
> = {
  /** Optional array of route-based cache updates */
  updateArray?: UpdateArray<RouteTypes, MutationResponse>;
}

/**
 * Helper type for request configs that include data and optionally an update array.
 * 
 * @template MutationResponse - The type of the new instance data for update functions
 * @template D - The type of the data being sent
 * @template RouteTypes - The route registry type
 */
type WithData<
  RouteTypes extends RouteTypeRegistry,
  MutationResponse,
  D = FormData,
> = WithUpdateArray<RouteTypes, MutationResponse> & {
  /** The data to send with the request */
  data: D,
}

/**
 * Configuration object for viewset requests.
 * 
 * This is a discriminated union type that varies based on the `type` field.
 * Each request type has different required and optional fields.
 * 
 * @template T - The type of the resource data
 * @template RouteTypes - The route registry type
 * 
 */
export type RequestConfig<
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
> = {
  /** Keyword arguments as an object for resolving URL template placeholders */
  kwargs?: RouteKwargs<RouteTypes, N>;
  /** Query parameters as key-value pairs */
  params?: RouteParams<RouteTypes, N>;
} & ({
  /** Fetch request (GET) - read-only operation */
  type: 'fetch',
  /** Fetch requests do not accept cache update entries */
  updateArray?: undefined
} | (WithData<RouteTypes, RouteResponse<RouteTypes, N>, RouteResponse<RouteTypes, N>> & {
  /** Send request (PUT/POST) - create or update operation */
  type: 'send'
  /** HTTP method to use (default: PUT) */
  method?: 'POST' | 'PUT',
}) | (WithUpdateArray<RouteTypes> & {
  /** Delete request (DELETE) - delete operation */
  type: 'delete'
}) | (WithData<RouteTypes, IMedia, FormData> & {
  /** Send file request (PATCH) - upload file operation */
  type: 'sendFile'
}) | (WithUpdateArray<RouteTypes> & {
  /** Delete file request (DELETE) - delete file operation */
  type: 'deleteFile'
}) | (WithData<RouteTypes, IDetailedMedia, FormData> & {
  /** Send detailed file request (POST) - upload file with metadata */
  type: 'sendDetailedFile'
}) | (WithUpdateArray<RouteTypes> & {
  /** Delete detailed file request (DELETE) - delete file with metadata */
  type: 'deleteDetailedFile'
  /** ID of the file to delete */
  id: string
}))