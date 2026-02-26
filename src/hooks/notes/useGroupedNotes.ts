'use client'

import { useMemo } from "react"
import { useJournalContext } from "@/providers"
import { roundToHundreeds, parseNoteValue, usesDescriptors, performanceToHundreds, parsePerformance } from "@/utils/notes"
import { absences as allAbsences } from "@/utils/notes"

export function useGroupedNotes() {
  const {semester, period, groups} = useJournalContext()

  const useDescriptors = useMemo(() => usesDescriptors(groups.flatMap(group => group.notes)), [groups])

  // Determine if today is in the first semester (September 1st to December 31st)
  const isFirstSemester = useMemo(() => {
    const today = new Date()
    const currentMonth = today.getMonth() + 1 // getMonth() returns 0-11, so add 1
    return currentMonth >= 9 && currentMonth <= 12
  }, [])

  const annualGroups = useMemo(() => {
    if (semester !== 'annual') {
      return undefined
    }
    return groups.map(group => {
      let [frstSum, frstCount, scndSum, scndCount] = [0, 0, 0, 0]
      const firstSemesterEnd = new Date(`${period.split('-')[0].split('.')[0]}.12.31`)
      let isInFirstSemester = true
      group.notes.forEach(note => {
        const date = new Date(note.specificLesson.date)
        if (date > firstSemesterEnd) {
          isInFirstSemester = false
        }
        if (note.value !== '' && !note.value.includes('a')) {
          const noteValue = parseNoteValue(note.value, useDescriptors)
          if (isInFirstSemester) {
            frstSum += noteValue
            frstCount++
          } else {
            scndSum += noteValue
            scndCount++
          }
        }
      })

      const frstPerformance = frstCount > 0 ? roundToHundreeds(frstSum, frstCount) : 0
      const scndPerformance = scndCount > 0 ? roundToHundreeds(scndSum, scndCount) : 0
      const semestersCount = (frstPerformance > 0 ? 1 : 0) + (scndPerformance > 0 ? 1 : 0)
      const annualPerformance = semestersCount > 0 ? performanceToHundreds(frstPerformance + scndPerformance, useDescriptors, semestersCount) : '-'
      return {
        id: group.id,
        name: group.name,
        notes: [performanceToHundreds(frstPerformance, useDescriptors), performanceToHundreds(scndPerformance, useDescriptors)],
        performance: annualPerformance,
        absences: group.absences,
      }
    })
  }, [groups, period, semester, useDescriptors])

  const absences = useMemo(() => {
    const groups1 = annualGroups ?? groups
    return allAbsences.map(absence => ({
      name: absence,
      value: groups1.reduce((acc, group) => acc + group.absences[absence], 0)
    }))
  }, [annualGroups, groups])

  const performance = useMemo(() => {
    let [sum, count] = [0, 0]
    const groups1 = annualGroups ?? groups
    groups1.filter(group => group.performance !== '-').forEach(group => {
      sum += parsePerformance(group.performance, useDescriptors)
      count++
    })
    return count > 0 ? performanceToHundreds(sum, useDescriptors, count) : '-'
  }, [annualGroups, groups, useDescriptors])

  return {
    isFirstSemester,
    annualGroups,
    absences,
    performance
  }
}