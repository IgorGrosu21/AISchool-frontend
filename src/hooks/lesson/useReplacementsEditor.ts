'use client'

import { ILessonName, IReplacementName, ISchoolWithReplacements, ITeacherName } from "@/interfaces"
import { useCallback } from "react"

export function useReplacementsEditor(
  school: ISchoolWithReplacements,
  setSchool: (school: ISchoolWithReplacements) => void
) {
  const createReplacement = useCallback((lesson: ILessonName, date: string, teacher: ITeacherName) => {
    setSchool({
      ...school,
      teachers: school.teachers.map(
        t => t.id === teacher.id ? {
          ...t,
          replacements: [...t.replacements, {
            id: '',
            date: date,
            lesson: lesson,
            teacher: t
          }]
        }: t
      )
    })
  }, [school, setSchool])

  const updateReplacement = useCallback((replacement: IReplacementName, teacher: ITeacherName) => {
    if (teacher.id === replacement.teacher.id) {
      // can't happen, because TeachersPicker doesn'trigger on change of the same teacher
      return
    }

    setSchool({
      ...school,
      teachers: school.teachers.map(t => {
        if (t.id === teacher.id) {
          // Add replacement to new teacher
          return {...t, replacements: [...t.replacements, {
            id: '',
            date: replacement.date,
            lesson: replacement.lesson,
            teacher: t
          }]}
        }
        if (t.id === replacement.teacher.id) {
          // Remove replacement from old teacher
          return {...t, replacements: t.replacements.filter(
            r => r.lesson.lessonTimeId !== replacement.lesson.lessonTimeId && r.date !== replacement.date
          )}
        }
        return t
      })
    })
  }, [school, setSchool])

  const deleteReplacement = useCallback((replacement: IReplacementName) => {
    setSchool({
      ...school,
      teachers: school.teachers.map(
        t => t.id === replacement.teacher.id ? {
          ...t,
          replacements: t.replacements.filter(
            r => r.lesson.lessonTimeId !== replacement.lesson.lessonTimeId && r.date !== replacement.date
          )
        }: t
      )
    })
  }, [school, setSchool])

  return { createReplacement, updateReplacement, deleteReplacement }
}
