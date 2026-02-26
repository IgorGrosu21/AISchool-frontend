import type { INoteName } from "../../../interfaces"
import { createReadonlyViewset, createViewset, createUpdateArrayEntry, type Response, type Args } from "../client"
import { extractDataFromNote } from "./extractors"

const studentNotesViewset = createReadonlyViewset({
  name: 'student-note-list',
  cacheEnabled: false
})
export async function fetchStudentNotes({ dateRange }: Args<'student-note-list'>) {
  return studentNotesViewset.fetch({ kwargs: { dateRange } })
}

const parentNotesViewset = createReadonlyViewset({
  name: 'parent-note-list',
  cacheEnabled: false
})
export async function fetchParentNotes({ childId, dateRange }: Args<'parent-note-list'>) {
  return parentNotesViewset.fetch({ kwargs: { childId, dateRange } })
}

// it is sufficient to use klassSlug because on backend there is another one filter over request teacher
const teacherNotesViewset = createReadonlyViewset({
  name: 'teacher-note-list',
  cacheEnabled: false
})
export async function fetchTeacherNotes({ schoolSlug, klassSlug, subjectSlug, dateRange }: Args<'teacher-note-list'>) {
  return teacherNotesViewset.fetch({ kwargs: { schoolSlug, klassSlug, subjectSlug, dateRange } })
}

const noteViewset = createViewset({
  name: 'notes',
  supportedMethods: ['send', 'delete'],
  cacheEnabled: false
})
export async function sendNote(note: Response<'notes'>) {
  const { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date } = extractDataFromNote(note)
  return noteViewset.send({
    kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
    data: note,
    method: 'POST',
    updateArray: [
      createUpdateArrayEntry({
        name: 'specific-lesson-details',
        kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
        updater: (cachedData, newNote) => {
          const newNoteName: INoteName = {
            id: newNote.id,
            value: newNote.value,
            comment: newNote.comment,
            lastModified: newNote.lastModified,
            studentId: newNote.student.id,
          }
          return {...cachedData, notes: note.id === '' ? [
            ...cachedData.notes, newNoteName
          ] : cachedData.notes.map(n => n.studentId === note.student.id ? newNoteName : n)}
        }
      })
    ]
  })
}

export async function deleteNote(note: Response<'notes'>, studentId: string) {
  const { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date } = extractDataFromNote(note)
  return noteViewset.delete({
    kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
    params: { studentId },
    updateArray: [
      createUpdateArrayEntry({
        name: 'specific-lesson-details',
        kwargs: { schoolSlug, klassOrGroupSlug, lessonTimeSlug, date },
        updater: (cachedData) => {
          return { ...cachedData, notes: cachedData.notes.filter(n => n.studentId !== studentId) }
        }
      })
    ]
  })
}