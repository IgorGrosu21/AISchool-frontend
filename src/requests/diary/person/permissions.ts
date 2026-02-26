import { IPersonPermissions } from "@/interfaces"
import { createViewset } from "../client"

const viewset = createViewset({ name: 'permissions', supportedMethods: ['fetch', 'send'], cacheEnabled: false })

export async function fetchPersonPermissions() {
  return viewset.fetch()
}

export async function unmarkPersonAsAutoCreated() {
  return viewset.send({ method: 'POST', data: {} as IPersonPermissions })
}