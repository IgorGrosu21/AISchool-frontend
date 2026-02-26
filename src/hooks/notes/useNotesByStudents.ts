'use client'

import { ILessonTimeName, INote, IPersonJournal, ISpecificLesson } from "@/interfaces"
import { isAfter, isBefore, startOfDay } from 'date-fns';
import { dateToNormal, weekdayMap } from "@/utils/dates";
import { useEffect, useMemo, useTransition, useState, useCallback } from "react"
import { useJournalContext } from "@/providers";
import { editNote, getTeacherNotes, removeNote } from "@/app/actions";
import { useHolidayChecker } from "../calendar/useHoliday";
import { isError } from "@/requests";

type ISchool = (IPersonJournal & { profileType: 'teacher' })['schools'][number]
type IKlassOrGroup = ISchool['klassesOrGroups'][number]

type SpecificLesson = {
  date: string
  lessonTime: ILessonTimeName
  active: boolean
}

export function useNotesByStudents(school: ISchool, klassOrGroup: IKlassOrGroup, subjectSlug: string) {
  const {period, groups, updateGroups} = useJournalContext()
  const [isPending, startTransition] = useTransition()
  const [activeNote, setActiveNote] = useState<INote>()
  const isHoliday = useHolidayChecker(school.holidays)

  const today = useMemo(() => startOfDay(new Date()), [])
  const currentSemesterStartDate = useMemo(() => {
    if (today.getMonth() >= 8) {
      return new Date(today.getFullYear(), 8, 1)
    }
    return new Date(today.getFullYear(), 0, 1)
  }, [today])

  const subject = useMemo(() => {
    return klassOrGroup.subjects.find(s => s.slug === subjectSlug)
  }, [klassOrGroup.subjects, subjectSlug])

  useEffect(() => {
    startTransition(async () => {
      const notes = await getTeacherNotes(school.slug, klassOrGroup.slug, subjectSlug, period)
      const groups = klassOrGroup.students.map(student => {
        return {
          id: student.id,
          name: `${student.user.surname} ${student.user.name}`,
          notes: notes.filter(note => note.student.id === student.id)
        }
      })
      updateGroups(groups)
    })
  }, [subjectSlug, period, school, klassOrGroup, updateGroups])

  const specificLessons = useMemo(() => {
    if (!subject || !subject.timetable || subject.timetable.length === 0) {
      return []
    }

    const [startDate, endDate] = period.split('-').map(dateStr => {
      const [year, month, day] = dateStr.split('.').map(Number)
      return new Date(year, month - 1, day)
    })
    
    const specificLessonsInPeriod: SpecificLesson[] = []
    
    const lessonTemplates = subject.timetable.map(lessonTime => {
      const currentDate = new Date(startDate)
      const targetWeekday = weekdayMap[lessonTime.weekday]
      
      while (currentDate.getDay() !== targetWeekday && currentDate <= endDate) {
        currentDate.setDate(currentDate.getDate() + 1)
      }
      
      // we do not need to set correct values for klass and group, because they aren't validated in the backend
      // they are fetched from url kwargs
      
      return {
        lessonTime,
        currentDate: new Date(currentDate)
      }
    })

    while (lessonTemplates.some(t => t.currentDate <= endDate)) {
      for (const template of lessonTemplates) {
        if (template.currentDate <= endDate && !isHoliday(template.currentDate)) {
          specificLessonsInPeriod.push({
            lessonTime: template.lessonTime,
            date: dateToNormal(template.currentDate),
            active: isAfter(template.currentDate, currentSemesterStartDate) && isBefore(template.currentDate, today)
          })
        }
        // Move to next week
        template.currentDate.setDate(template.currentDate.getDate() + 7)
      }
    }
    
    // Sort by date
    specificLessonsInPeriod.sort((a, b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-'))
      const dateB = new Date(b.date.split('.').reverse().join('-'))
      return dateA.getTime() - dateB.getTime()
    })
    
    return specificLessonsInPeriod
  }, [subject, period, isHoliday, today, currentSemesterStartDate])

  const pickNote = useCallback((studentId: string, date: string, lessonTime: ILessonTimeName, note?: INote) => {
    const lessonDate = new Date(date)
    if (isAfter(lessonDate, today)) {
      return
    }

    if (note) {
      setActiveNote(note)
      return
    }
    const student = klassOrGroup.students.find(s => s.id === studentId)
    if (!student) {
      return
    }

    // we set only the correct slugs so that we can use extractDataFromNote function
    const specificLesson: ISpecificLesson = {
      id: '',
      lesson: {
        klassOrGroup: {
          slug: klassOrGroup.slug,
          schoolId: school.id,
          schoolSlug: school.slug,
        } as ISpecificLesson['lesson']['klassOrGroup'],
        lessonTime: lessonTime,
      } as ISpecificLesson['lesson'],
      date: date,
      title: '',
      desc: '',
      files: [],
      links: []
    }
    setActiveNote({
      id: '',
      value: '',
      specificLesson: specificLesson,
      student: student,
      comment: '',
      lastModified: ''
    })
  }, [klassOrGroup.slug, klassOrGroup.students, school.id, school.slug, today])

  const updateNote = useCallback((note?: INote) => {
    if (!note) {
      if (activeNote && activeNote.id !== '') {
        startTransition(async () => {
          const deletedNote = await removeNote(activeNote, activeNote.student.id)
          if (isError(deletedNote)) {
            return
          }
        })
        updateGroups(groups.map(group => group.id === activeNote.student.id ? {
          ...group,
          notes: group.notes.filter(n => n.id !== activeNote.id)
        } : group))
      }
      setActiveNote(undefined)
      return
    }
    startTransition(async () => {
      const updatedNote = await editNote(note)
      if (isError(updatedNote)) {
        return
      }
      updateGroups(groups.map(group => group.id === note.student.id ? {
        ...group,
        notes: note.id === '' ? [...group.notes, updatedNote] : group.notes.map(n => n.id === note.id ? updatedNote : n)
      } : group))
      setActiveNote(undefined)
    })
  }, [activeNote, groups, updateGroups])

  return {
    isPending, specificLessons,
    activeNote, setActiveNote, pickNote, updateNote
  }
}