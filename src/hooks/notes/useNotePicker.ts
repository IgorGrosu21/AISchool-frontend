'use client'

import { INote, INoteName } from "@/interfaces"
import { useCallback, useEffect, useMemo, useState } from "react"

type Note = Omit<INoteName | INote, 'studentId' | 'student' | 'specificLesson'>

export function useNotePicker(activeNote: Note | undefined, updateNote: (note: Note | undefined) => void, closeNotes: () => void) {
  const [newNote, setNewNote] = useState<Note | undefined>(activeNote)
  const dummyNote = useMemo(() => ({
    id: '',
    value: '',
    comment: '',
    lastModified: ''
  }), [])

  useEffect(() => {
    setNewNote(activeNote)
  }, [activeNote])

  const discard = useCallback(() => {
    setNewNote(activeNote)
    closeNotes()
  }, [activeNote, closeNotes])

  const save = useCallback(() => {
    updateNote(newNote)
    closeNotes()
  }, [newNote, updateNote, closeNotes])

  const updateNoteValue = useCallback((value: string) => {
    setNewNote(n => n ? (n.value === value ? undefined : {...n, value}) : {...dummyNote, value})
  }, [dummyNote])

  const updateNoteComment = useCallback((comment: string) => {
    setNewNote(n => n ? {...n, comment} : {...dummyNote, comment})
  }, [dummyNote])

  return {
    newNote,
    discard,
    save,
    updateNoteValue,
    updateNoteComment
  }
}