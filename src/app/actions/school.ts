'use server'

import { deleteSchoolPhoto, deleteSchoolPreview, handleResponse, isError, sendKlass, sendKlassWithLessons, sendSchool, sendSchoolPhoto, sendSchoolPreview, sendSchoolWithKlasses, sendSchoolWithTimetable } from "@/requests"
import { IDetailedKlass, IDetailedSchool, IKlassWithLessons, ISchoolWithKlasses, ISchoolWithTimetable } from "@/interfaces"
import { DeleteFileActionFunction, EditActionFunction, EditFileActionFunction } from "./template"
import { sendFiles } from "./files"

export const editKlass: EditActionFunction<IDetailedKlass> = async (instance) => {
  return sendKlass(instance)
}

export const editKlassWithLessons: EditActionFunction<IKlassWithLessons> = async (instance) => {
  return sendKlassWithLessons(instance)
}

export const editSchool: EditActionFunction<IDetailedSchool> = async (instance) => {
  const data = await sendSchool(instance)
  if (isError(data)) {
    return data
  }
  return sendFiles(instance, data, sendSchoolPhoto, deleteSchoolPhoto)
}

export const editSchoolPreview: EditFileActionFunction<IDetailedSchool> = async (formData, instance) => {
  return handleResponse(sendSchoolPreview(formData, { schoolSlug: instance.slug }))
}

export const removeSchoolPreview: DeleteFileActionFunction<IDetailedSchool> = async (instance) => {
  return handleResponse(deleteSchoolPreview({ schoolSlug: instance.slug }))
}

export const editSchoolWithKlasses: EditActionFunction<ISchoolWithKlasses> = async (instance) => {
  return sendSchoolWithKlasses(instance)
}

export const editSchoolWithTimetable: EditActionFunction<ISchoolWithTimetable> = async (instance) => {
  instance.timetable = instance.timetable.filter((lt) => (
    lt.starting != '' && lt.starting.length === 5 && lt.starting.includes(':') &&
    lt.ending != '' && lt.ending.length === 5 && lt.ending.includes(':')
  ))
  return sendSchoolWithTimetable(instance)
}