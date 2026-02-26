import { createFileViewset, createUpdateArrayEntry, type Response } from "../client"
import { extractDataFromHomework } from "./extractors"

const viewset = createFileViewset({
  name: 'homework-files',
  cacheEnabled: false
})

export async function sendHomeworkPhoto(homework: Response<'homework-details'>, data: FormData) {
  const { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date, studentId } = extractDataFromHomework(homework)
  return viewset.send({
    kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
    params: { studentId },
    data,
    updateArray: [
      createUpdateArrayEntry({
        name: 'specific-lesson-details',
        kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
        updater: (cachedData, newFile) => {
          return {...cachedData, homeworks: cachedData.homeworks.map(
            h => h.studentId === studentId ? {...h, files: [...h.files, newFile]} : h
          )}
        }
      })
    ]
  })
}

export async function deleteHomeworkPhoto(homework: Response<'homework-details'>, id: string) {
  const { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date, studentId } = extractDataFromHomework(homework)
  return viewset.delete({
    kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
    params: { studentId },
    id,
    updateArray: [
      createUpdateArrayEntry({
        name: 'specific-lesson-details',
        kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
        updater: (cachedData) => {
          return {
            ...cachedData,
            homeworks: cachedData.homeworks.map(h => 
              h.studentId === studentId ? {...h, files: h.files.filter(f => f.id !== id)} : h
            )
          }
        }
      })
    ]
  })
}