import { createReadonlyViewset } from "../client"

const viewset = createReadonlyViewset({ name: 'diary', cacheEnabled: false })

export async function fetchPersonDiary() {
  return viewset.fetch()
}