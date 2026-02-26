'use client'

import { useCallback, useMemo, useState, useTransition } from 'react'
import { INoteName, IStudent } from '@/interfaces'
import { useSpecificLessonEditorContext } from '@/providers'
import { editNote, removeNote } from '@/app/actions'
import { isError } from '@/requests'

export function useSpecificLessonEditor(studentId?: string) {
  const { instance: specificLesson, setInstance: setSpecificLesson } = useSpecificLessonEditorContext()
  const students: ReadonlyArray<IStudent> = useMemo(() => specificLesson.students, [specificLesson])
  
  const [activeStudent, setActiveStudent] = useState<IStudent>(studentId ? students.find(s => s.id === studentId) ?? students[0] : students[0])
  const activeNote = useMemo(() => specificLesson.notes.find(n => n.studentId === activeStudent.id), [specificLesson.notes, activeStudent.id])
  const activeHomework = useMemo(() => specificLesson.homeworks.find(h => h.studentId === activeStudent.id), [specificLesson.homeworks, activeStudent])
  const [isPending, startTransition] = useTransition()

  const updateNote = useCallback((note?: Omit<INoteName, 'studentId'>) => {
    if (!note) {
      if (activeNote && activeNote.id !== '') {
        startTransition(async () => {
          const deletedNote = await removeNote({
            ...activeNote,
            student: activeStudent,
            specificLesson: specificLesson
          }, activeStudent.id)
          if (isError(deletedNote)) {
            return
          }
        })
      }
      setSpecificLesson(s => ({
        ...s,
        notes: s.notes.filter(n => n.studentId != activeStudent.id)
      }))
      return
    }
    startTransition(async () => {
      const updatedNote = await editNote({
        ...note,
        student: activeStudent,
        specificLesson: specificLesson
      })
      if (isError(updatedNote)) {
        return
      }
      const newNote: INoteName = {
        id: updatedNote.id,
        value: updatedNote.value,
        comment: updatedNote.comment,
        lastModified: updatedNote.lastModified,
        studentId: activeStudent.id,
      }
      setSpecificLesson(s => ({
        ...s,
        notes: note.id === '' ? [...s.notes, newNote] : s.notes.map(n => n.studentId === activeStudent.id ? newNote : n)
      }))
    })
  }, [activeNote, activeStudent, setSpecificLesson, specificLesson])

  const updateNoteComment = useCallback((comment: string) => {
    setSpecificLesson(s => ({
      ...s,
      notes: s.notes.map(n => n.studentId === activeStudent.id ? {...n, comment} : n)
    }))
  }, [activeStudent.id, setSpecificLesson])

  return {
    isPending,
    students, activeStudent, setActiveStudent,
    activeHomework, activeNote, updateNote, updateNoteComment
  }
}