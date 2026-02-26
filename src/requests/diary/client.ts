import { createViewsetFactory, diaryClient, type GenericRouteArgs, type GenericRouteResponse } from "../core";
import { diaryRouteRegistry, type DiaryRouteTypeRegistry } from "./routes";

export const {
  createReadonlyViewset, createViewset, createFileViewset, createUpdateArrayEntry
} = createViewsetFactory<DiaryRouteTypeRegistry>(diaryClient, diaryRouteRegistry);

// Args type should only include 'kwargs' and 'params' if they exist; fallback to empty object if not
export type Args<N extends keyof DiaryRouteTypeRegistry> = GenericRouteArgs<DiaryRouteTypeRegistry, N>;
export type Response<N extends keyof DiaryRouteTypeRegistry> = GenericRouteResponse<DiaryRouteTypeRegistry, N>;