import { createReadonlyViewset } from "../client"

const viewset = createReadonlyViewset({ name: 'school-names' })

export async function fetchSchoolNames() {
  return viewset.fetch()
}