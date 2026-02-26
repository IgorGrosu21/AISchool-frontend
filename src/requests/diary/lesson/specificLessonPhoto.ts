import { createFileViewset, type Response } from "../client"
import { extractDataFromSpecificLesson } from "./extractors"

const viewset = createFileViewset({ name: 'specific-lesson-files' })

export async function sendSpecificLessonPhoto(specificLesson: Response<'specific-lesson-details'>, data: FormData) {
  return viewset.send({ kwargs: extractDataFromSpecificLesson(specificLesson), data })
}

export async function deleteSpecificLessonPhoto(specificLesson: Response<'specific-lesson-details'>, id: string) {
  return viewset.delete({ kwargs: extractDataFromSpecificLesson(specificLesson), id })
}