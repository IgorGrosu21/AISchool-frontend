import { createReadonlyViewset, type Args } from "../client"

const name = 'specific-lesson-names'

const viewset = createReadonlyViewset({
  name,
  cacheEnabled: false
})

export async function fetchSpecificLessonNames({ dateRange, schoolSlug, childId }: Args<typeof name>) {
  return viewset.fetch({ kwargs: { dateRange }, params: { schoolSlug, childId } })
}