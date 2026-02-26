import { createViewset, createUpdateArrayEntry, type Response, type Args } from "../client"
import { extractDataFromSpecificLesson } from "./extractors"

const name = 'specific-lesson-details'

const viewset = createViewset({
  name,
  supportedMethods: ['fetch', 'send', 'delete']
})

export async function fetchSpecificLesson({ schoolSlug, klassOrGroupSlug, lessonTimeSlug, date }: Args<typeof name>) {
  return viewset.fetch({ kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date } })
}

export async function sendSpecificLesson(specificLesson: Response<typeof name>) {
  const args = extractDataFromSpecificLesson(specificLesson)
  return viewset.send({
    kwargs: args,
    data: specificLesson,
    updateArray: [
      createUpdateArrayEntry({
        name: name,
        kwargs: args,
        updater: 'replace'
      })
    ]
  })
}

export async function deleteSpecificLesson(specificLesson: Response<typeof name>) {
  const args = extractDataFromSpecificLesson(specificLesson)
  return viewset.delete({
    kwargs: args,
    updateArray: [
      createUpdateArrayEntry({
        name: name,
        kwargs: args,
        updater: 'delete'
      })
    ]
  })
}