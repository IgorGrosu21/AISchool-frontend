/**
 * @fileoverview Type definitions for the generics module.
 * 
 * This module exports all type definitions used throughout the generics system,
 * including viewset types, configuration types, and function types.
 */

export type {
  SetupCacheEntryFn, SetupCacheFn,
  ReadonlyViewsetConfig, DefaultViewsetConfig, FileViewsetConfig
} from './configs';
export type { ViewsetFactory, RequestResolverFactory } from './factory';
export type { ReadonlyViewset, DefaultViewset, FileViewset } from './viewsets';
export type {
  RouteTypeRegistry, RouteRegistry, RouteName, RouteResponse, RouteArgs,
  ResolveUrlFn, ValidateRouteDefinitionFn
} from './routes';