import { createReadonlyViewset } from "../client"

const viewset = createReadonlyViewset({ name: 'school-list', requiresAuth: false })

export async function fetchSchools() {
  return viewset.fetch()
}