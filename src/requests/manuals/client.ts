import { createViewsetFactory, manualsClient, type GenericRouteArgs, type GenericRouteResponse } from "../core";
import { manualsRouteRegistry, type ManualsRouteTypeRegistry } from "./routes";

export const {
  createReadonlyViewset, createViewset, createFileViewset, createUpdateArrayEntry
} = createViewsetFactory<ManualsRouteTypeRegistry>(manualsClient, manualsRouteRegistry);

// Args type should only include 'kwargs' and 'params' if they exist; fallback to empty object if not
export type Args<N extends keyof ManualsRouteTypeRegistry> = GenericRouteArgs<ManualsRouteTypeRegistry, N>;
export type Response<N extends keyof ManualsRouteTypeRegistry> = GenericRouteResponse<ManualsRouteTypeRegistry, N>;