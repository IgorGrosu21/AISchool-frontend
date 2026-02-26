import { createReadonlyViewset } from "../client"

const viewset = createReadonlyViewset({ name: 'home', cacheEnabled: false })

export async function fetchPersonHome() {
  return viewset.fetch()
}