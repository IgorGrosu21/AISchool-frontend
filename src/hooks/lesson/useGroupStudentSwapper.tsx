'use client'

import { IGroupWithLessons, IStudentName } from "@/interfaces"
import { useCallback } from "react"

export function useGroupStudentSwapper<T extends IGroupWithLessons>(groups: T[], updateGroups: (groups: T[]) => void) {
  const swapStudent = useCallback((student: IStudentName, group: T) => {
    const pairedGroup = groups.find(g => group.subjectSlug === g.subjectSlug && group.order !== g.order)!
    updateGroups(groups.map(g => {
      if (g.subjectSlug !== group.subjectSlug) {
        return g
      }
      if (g.order === group.order) {
        return {...g, students: g.students.filter(s => s.id !== student.id)}
      } else if (g.order === pairedGroup.order) {
        return {...g, students: [...g.students, student]}
      }
      return g
    }))
  }, [groups, updateGroups])

  return swapStudent
}