'use client'

import { INote, IPersonJournal } from "@/interfaces"
import { useCallback, useEffect, useTransition } from "react"
import { useJournalContext } from "@/providers";
import { getParentNotes, getStudentNotes } from "@/app/actions"

export function useNotesBySubjects(subjects: (IPersonJournal & { profileType: 'student' })['subjects'], childId?: string) {
  const {period, updateGroups} = useJournalContext()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      let notes;
      if (childId) {
        notes = await getParentNotes(period, childId)
      } else {
        notes = await getStudentNotes(period)
      }
      const groups = subjects.map(subject => {
        return {
          id: subject.slug,
          name: subject.name,
          notes: notes.filter(note => note.specificLesson.lesson.subjectSlug === subject.slug)
        }
      })
      updateGroups(groups)
    })
  }, [childId, period, subjects, updateGroups])

  const getHref = useCallback((note: INote) => {
    const studentId = note.student.id
    const specificLesson = note.specificLesson
    const date = specificLesson.date
    const lesson = specificLesson.lesson
    const lessonTimeSlug = lesson.lessonTime.slug
    const klassOrGroupSlug = lesson.klassOrGroup.slug
    const schoolSlug = lesson.klassOrGroup.schoolSlug

    return `/core/homeworks/${schoolSlug}/${klassOrGroupSlug}/${lessonTimeSlug}/${date}?studentId=${studentId}`
  }, [])

  return {
    isPending,
    getHref
  }
}