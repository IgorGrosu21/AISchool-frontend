import type { IHomework } from "../../../interfaces"
import { createViewset, createUpdateArrayEntry, type Response, type Args } from "../client"
import { extractDataFromHomework } from "./extractors"

const name = 'homework-details'

const viewset = createViewset({
  name,
  supportedMethods: ['fetch', 'send', 'delete'],
  cacheEnabled: false
})

export async function fetchHomework({ schoolSlug, klassOrGroupSlug, lessonTimeSlug, date, studentId }: Args<typeof name>) {
  return viewset.fetch({
    kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
    params: { studentId }
  })
}

export async function sendHomework(homework: Response<typeof name>) {
  const { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date, studentId } = extractDataFromHomework(homework)
  return viewset.send({
    kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
    params: { studentId },
    data: homework,
    updateArray: [
      createUpdateArrayEntry({
        name: 'specific-lesson-details',
        kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
        updater: (cachedData, newDetailedHomework) => {
          const newHomework: IHomework = {
            id: newDetailedHomework.id,
            comment: newDetailedHomework.comment,
            links: newDetailedHomework.links,
            lastModified: newDetailedHomework.lastModified,
            files: newDetailedHomework.files,
            studentId: newDetailedHomework.student.id,
          }
          return {...cachedData, homeworks: homework.id === '' ? [
            ...cachedData.homeworks, newHomework
          ] : cachedData.homeworks.map(h => h.studentId === studentId ? newHomework : h)}
        }
      })
    ]
  })
}

export async function deleteHomework(homework: Response<typeof name>) {
  const { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date, studentId } = extractDataFromHomework(homework)
  return viewset.delete({
    kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
    params: { studentId },
    updateArray: [
      createUpdateArrayEntry({
        name: 'specific-lesson-details',
        kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
        updater: (cachedData) => {
          return {
            ...cachedData,
            homeworks: cachedData.homeworks.filter(h => h.id !== homework.id)
          }
        }
      })
    ]
  })
}