'use client'

import { useSchoolWithKlassesEditorContext } from '@/providers'
import { useCallback, useMemo } from 'react'
import { IKlassName } from '@/interfaces'

const letters = ['A', 'B', 'C', 'D', 'E']
const grades = Array.from({length: 12}, (_, i) => i + 1)

export function useKlassListEditor() {
  const { instance: school, setInstance: setSchool } = useSchoolWithKlassesEditorContext()

  const grouped = useMemo(() => {
    const grouped = grades.map(grade => ({
      grade: grade,
      klasses: [] as IKlassName[]
    }))

    school.klasses.forEach(k => {
      const group = grouped.find(s1 => s1.grade === k.grade)
      if (group) {
        group.klasses.push(k)
        group.klasses.sort((a, b) => a.letter.localeCompare(b.letter))
      }
    })
    return grouped
  }, [school.klasses])

  const removeKlass = useCallback((grade: number, letter: string) => {
    setSchool(s => ({
      ...s,
      klasses: s.klasses.filter(k => !(k.grade === grade && k.letter === letter))
    }))
  }, [setSchool])

  const addKlass = useCallback((grade: number) => {
    const group = grouped[grade - 1]
    const letter = letters[group.klasses.length]
    setSchool(s => ({
      ...s,
      klasses: [...s.klasses, {
        id: '',
        grade: group.grade,
        letter: letter,
        profile: letter === 'A' ? 'R' : 'U',
        schoolId: school.id,
        schoolSlug: school.slug,
        slug: `${group.grade}${letter}`
      }]
    }))
  }, [grouped, setSchool, school.id, school.slug])

  return {
    grouped,
    removeKlass,
    addKlass
  }
}