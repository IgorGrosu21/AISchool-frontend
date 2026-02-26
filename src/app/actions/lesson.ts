'use server'

import {
  handleResponse, isError,
  fetchReplacementNames,
  fetchSpecificLessonNames, sendSpecificLesson, deleteSpecificLesson,
  sendSpecificLessonPhoto, deleteSpecificLessonPhoto,
  sendHomework, deleteHomework,
  sendHomeworkPhoto, deleteHomeworkPhoto,
  fetchTeacherNotes, fetchStudentNotes, fetchParentNotes, sendNote, deleteNote
} from "@/requests";
import { IDetailedHomework, IDetailedSpecificLesson, INote } from "@/interfaces"
import { EditActionFunction } from "./template";
import { sendFiles } from "./files";

export async function getReplacements(startDay: string, endDay: string, schoolSlug?: string, childId?: string) {
  return handleResponse(fetchReplacementNames({ dateRange: `${startDay}-${endDay}`, schoolSlug, childId }))
}

export async function getSpecificLessons(startDay: string, endDay: string, schoolSlug?: string, childId?: string) {
  return handleResponse(fetchSpecificLessonNames({ dateRange: `${startDay}-${endDay}`, schoolSlug, childId }))
}

function noFilesOrLinks(instance: IDetailedSpecificLesson | IDetailedHomework) {
  const noFilesData = instance.filesData === undefined || instance.filesData.length === 0
  return instance.files.length === 0 && instance.links.length === 0 && noFilesData
}

export const editSpecificLesson: EditActionFunction<IDetailedSpecificLesson> = async (instance) => {
  const hasContent = instance.title !== '' || instance.desc !== ''
  const isEmpty = !hasContent && noFilesOrLinks(instance) && instance.notes.length === 0 && instance.homeworks.length === 0
  
  if (!isEmpty) {
    const data = await sendSpecificLesson(instance)
    if (isError(data)) {
      return data
    }
    return sendFiles(instance, data, sendSpecificLessonPhoto, deleteSpecificLessonPhoto)
  } else if (instance.id !== '' && isEmpty) {
    await deleteSpecificLesson(instance)
  }
  return instance
}

export const editHomework: EditActionFunction<IDetailedHomework> = async (instance) => {
  const isEmpty = noFilesOrLinks(instance) && instance.note === undefined && instance.comment === ''

  if (!isEmpty) {
    const data = await sendHomework(instance)
    if (isError(data)) {
      return data
    }
    return sendFiles(instance, data, sendHomeworkPhoto, deleteHomeworkPhoto)
  } else if (instance.id !== '' && isEmpty) {
    await deleteHomework(instance)
  }
  return instance
}

export async function getParentNotes(childId: string, dateRange: string) {
  return handleResponse(fetchParentNotes({
    childId,
    dateRange
  }))
}

export async function getStudentNotes(dateRange: string) {
  return handleResponse(fetchStudentNotes({ dateRange }))
}

export async function getTeacherNotes(schoolSlug: string, klassSlug: string, subjectSlug: string, dateRange: string) {
  return handleResponse(fetchTeacherNotes({ schoolSlug, klassSlug, subjectSlug, dateRange }))
}

export const editNote: EditActionFunction<INote> = async (instance) => {
  return sendNote(instance)
}

export async function removeNote(note: INote, studentId: string) {
  return deleteNote(note, studentId)
}