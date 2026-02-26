import type { HasGroupSlug, HasLessonId, HasLessonTimeSlug, HasSchoolSlug, HasStudentId, HasNoteValue, HasHomeworkId, HasSubjectName, HasKlassSlug } from '../primitives'
import type { ITeacherName } from './person'

export type ILessonTimeName = HasSchoolSlug & {
  id: string
  starting: string
  ending: string
  weekday: 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU'
  order: number
  slug: string
}

export type ILessonName = HasLessonTimeSlug & HasSubjectName & {
  id: string
  teacher: ITeacherName | null
  readonly klassOrGroupSlug: string
} & ((HasKlassSlug & {
  type: 'klass'
}) | (HasGroupSlug & {
  type: 'group'
}))

export type INoteName = HasStudentId & {
  id: string
  value: string
  comment: string
  readonly lastModified: string
}

export type IReplacementName = {
  id: string
  date: string
  teacher: ITeacherName
  lesson: ILessonName
}

export type ISpecificLessonName = HasLessonId & Partial<HasNoteValue> & Partial<HasHomeworkId> & {
  id: string
  date: string
  title: string
  desc: string
}