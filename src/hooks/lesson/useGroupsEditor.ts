'use client'

import { IGroupWithLessons, ISubject, ITeacherName, IKlassWithLessons } from "@/interfaces"
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useGroupStudentSwapper } from "./useGroupStudentSwapper";

export function useGroupsEditor(klass: IKlassWithLessons, setKlass: Dispatch<SetStateAction<IKlassWithLessons>>) {
  const groups = useMemo(() => klass.groups, [klass])
  const updateGroups = useCallback((groups: IGroupWithLessons[]) => {
    setKlass(k => ({...k, groups}))
  }, [setKlass])

  const swapStudent = useGroupStudentSwapper(groups, updateGroups)

  const updateSubjects = useCallback((subjects: ISubject[]) => {
    const existing: IGroupWithLessons[] = []
    const toAdd: IGroupWithLessons[] = []
    for (const subject of subjects) {
      const group = groups.filter(g => g.subjectSlug === subject.slug)
      if (group.length === 0) {
        const newGroup = {
          id: '',
          klassId: klass.id,
          klassSlug: klass.slug,
          schoolId: klass.school.id,
          schoolSlug: klass.school.slug,
          subjectSlug: subject.slug,
          subjectName: subject.name,
          lessons: [],
          teacher: null,
        }
        toAdd.push(
          {...newGroup, order: 1, slug: klass.slug + `-${1}`, students: [...klass.students]},
          {...newGroup, order: 2, slug: klass.slug + `-${2}`, students: []},
        )
      } else {
        existing.push(...group)
      }
    }
    updateGroups([...existing, ...toAdd])
  }, [groups, klass, updateGroups])

  const updateTeacher = useCallback((group: IGroupWithLessons, teacher: ITeacherName | null) => {
    updateGroups(groups.map(g => g.order === group.order && g.subjectSlug === group.subjectSlug ? {
      ...g,
      teacher: teacher
    } : g))
  }, [groups, updateGroups])

  return { updateSubjects, updateTeacher, swapStudent }
}