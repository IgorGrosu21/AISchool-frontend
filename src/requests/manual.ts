import type { IDetailedModule, IDetailedManual, IDetailedTopic, IManual } from "../interfaces"
import { request } from "./client"

export async function fetchManuals() {
  return request<IManual[]>({url: 'api/manuals/'})
}

export async function fetchManual(slug: string) {
  return request<IDetailedManual>({url: `api/manuals/${slug}/`})
}

export async function fetchModule(manualSlug: string, slug: string) {
  return request<IDetailedModule>({url: `api/modules/${manualSlug}/${slug}/`})
}

export async function fetchTopic(manualSlug: string, moduleSlug: string, slug: string) {
  return request<IDetailedTopic>({url: `api/topics/${manualSlug}/${moduleSlug}/${slug}/`})
}