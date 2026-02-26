import { createReadonlyViewset, type Args } from "../client"

const name = 'replacement-names'

const viewset = createReadonlyViewset({
  name,
  cacheEnabled: false
})

export async function fetchReplacementNames({ dateRange, schoolSlug, childId }: Args<typeof name>) {
  return viewset.fetch({ kwargs: { dateRange }, params: { schoolSlug, childId } })
}