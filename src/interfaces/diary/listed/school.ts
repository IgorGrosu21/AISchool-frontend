import type { IWithFiles, IWithLinks } from '../../media'
import type { IGroupName, ILessonName, ILessonTimeName, ISchoolName, IStudentName, ITeacherName } from '../name'
import type { ITeacher, ITeacherWithReplacements } from './person'
import { IHolidays } from '../primitives'

export type IPosition = {
  id: string
  teacher: ITeacher
  subjectSlugs: string[]
  school: ISchoolName
}

export type ISchool = ISchoolName & IWithLinks & IWithFiles & {
  address: string
  lang: string
  type: string
  profiles: string
  startGrade: number
  finalGrade: number
  desc: string
  phones: string[]
  emails: string[]
  workHours: string
}

export type ISchoolWithReplacements = Omit<ISchoolName, 'preview'> & {
  lang: string
  teachers: ITeacherWithReplacements[]
  readonly subjectSlugs: string[]
  readonly timetable: ReadonlyArray<ILessonTimeName>
  readonly holidays: ReadonlyArray<IHolidays>
}

export type IGroupWithLessons = IGroupName & {
  teacher: ITeacherName | null
  lessons: ILessonName[]
  students: IStudentName[]
}

export type IGroup = IGroupWithLessons & {
  readonly teacher: Readonly<ITeacherName> | null
  readonly lessons: ReadonlyArray<ILessonName>
}