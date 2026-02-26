/**
 * @fileoverview Generic viewset factory system.
 * 
 * This module provides a factory system for creating type-safe, reusable viewsets
 * that abstract away HTTP request details and provide consistent interfaces for
 * interacting with REST APIs.
 * 
 * The main export is `createViewsetFactory`, which creates a factory for generating
 * different types of viewsets (readonly, default, file) with a specific service client.
 * 
 */

export { createViewsetFactory } from './factory';
import type { RouteTypeRegistry } from './types';
export type {
  RouteRegistry as GenericRouteRegistry,
  RouteResponse as GenericRouteResponse,
  RouteArgs as GenericRouteArgs
} from './types';
export type GenericRouteTypeRegistry<ConcreteTypeRegistry extends RouteTypeRegistry> = ConcreteTypeRegistry;