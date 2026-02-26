/**
 * @fileoverview Route registry type system.
 * 
 * This module defines the type system for route registries that map route names
 * to their URL templates, response types, and keyword argument types.
 */

import type { Kwargs, Params } from './misc';

/**
 * Definition of a single route in the registry.
 * 
 * @template T - The response type for this route
 * @template K - The keyword arguments type (object with string values)
 */
type RouteTypeDefinition<T, K extends Kwargs = Kwargs, P extends Params = Params> = {
  /** The response type for this route */
  response: T;
  /** The keyword arguments type (extracted from urlTemplate placeholders) */
  kwargs?: K;
  /** The query parameters type (object with string values) */
  params?: P;
}

/**
 * A route registry maps route names to their definitions.
 * 
 */
export type RouteTypeRegistry = {
  [key: string]: RouteTypeDefinition<unknown>;
}

/**
 * Extract the route name from a route registry (string keys only).
 * 
 * @template RouteTypes - The route registry type
 */
export type RouteName<RouteTypes extends RouteTypeRegistry> = Extract<keyof RouteTypes, string>

export type RouteRegistry<RouteTypes extends RouteTypeRegistry> = {
  [key in RouteName<RouteTypes>]: string;
};

/**
 * Extract the response type from a route name in a registry.
 * 
 * @template R - The route registry type
 * @template N - The route name
 */
export type RouteResponse<RouteTypes extends RouteTypeRegistry, N extends RouteName<RouteTypes>> = RouteTypes[N] extends RouteTypeDefinition<infer T> ? T : never;

/**
 * Extract the kwargs type from a route name in a registry.
 * 
 * @template R - The route registry type
 * @template N - The route name
 */
export type RouteKwargs<RouteTypes extends RouteTypeRegistry, N extends RouteName<RouteTypes>, Fallback = undefined> = RouteTypes[N] extends RouteTypeDefinition<unknown, infer K> ? K : Fallback;

/**
 * Extract the query parameters type from a route name in a registry.
 * 
 * @template R - The route registry type
 * @template N - The route name
 */
export type RouteParams<RouteTypes extends RouteTypeRegistry, N extends RouteName<RouteTypes>, Fallback = undefined> = RouteTypes[N] extends RouteTypeDefinition<unknown, Kwargs, infer P> ? P : Fallback;

/**
 * Extract the kwargs type and the query parameters type from a route name in a registry.
 * 
 * @template R - The route registry type
 * @template N - The route name
 */
export type RouteArgs<RouteTypes extends RouteTypeRegistry, N extends RouteName<RouteTypes>> = (
  RouteKwargs<RouteTypes, N, object> & RouteParams<RouteTypes, N, object>
)

/**
 * Resolve a URL template with keyword arguments.
 * 
 * @template RouteTypes - The route registry type
 * @template N - The route name
 */
export type ResolveUrlFn = <
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
>(urlTemplate: string, kwargs?: RouteKwargs<RouteTypes, N>) => string

/**
 * Validate a route definition.
 * 
 * @template RouteTypes - The route registry type
 * @template N - The route name
 */
export type ValidateRouteDefinitionFn = <
  RouteTypes extends RouteTypeRegistry,
  N extends RouteName<RouteTypes>
>(routes: RouteRegistry<RouteTypes>, name: N) => (kwargs?: RouteKwargs<RouteTypes, N>) => string