import { createReadonlyViewset } from "../client"

const viewset = createReadonlyViewset({ name: 'journal', cacheEnabled: false })

export async function fetchPersonJournal() {
  return viewset.fetch()
}