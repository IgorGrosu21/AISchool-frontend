import { createFileViewset, type Response } from "../client"

const name = 'school-photos'

const viewset = createFileViewset({ name })

export async function sendSchoolPhoto(school: Response<'school-details'>, data: FormData) {
  return viewset.send({ kwargs: { schoolSlug: school.slug }, data })
}

export async function deleteSchoolPhoto(school: Response<'school-details'>, id: string) {
  return viewset.delete({ kwargs: { schoolSlug: school.slug }, id })
}