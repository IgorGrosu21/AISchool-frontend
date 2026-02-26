import type { IUser, INote } from '../../listed'
import type { ILessonName, ISchoolName, ILessonTimeName, ISpecificLessonName } from '../../name'
import type { IDetailedHomework } from '../lesson'

export type IPersonHome = Readonly<{
  id: string
  user: IUser
} & (IStudentHome & {
  profileType: 'student'
} | ITeacherHome & {
  profileType: 'teacher'
} | IParentHome & {
  profileType: 'parent'
})>

type IAnalytics<T> = ReadonlyArray<{
  subjectName: string
  points: ReadonlyArray<Readonly<T>>
}>

type CommonHome<T> = Readonly<{
  tomorrowTimetable: ReadonlyArray<Readonly<ILessonTimeName> & Readonly<{
    lesson: ILessonName | null
    specificLesson: ISpecificLessonName | null
  }>>
  latestData: ReadonlyArray<Readonly<T>>
}>

type IStudentHome = CommonHome<INote> & Readonly<{
  analytics: IAnalytics<{
    date: string
    value: string
  }>
}>

type ITeacherHome = CommonHome<IDetailedHomework> & Readonly<{
  analytics: ReadonlyArray<Readonly<{
    school: Readonly<ISchoolName>
    subjects: IAnalytics<{
      slug: string
      values: string[]
    }>
  }>>
}>

type IParentHome = Readonly<{
  students: ReadonlyArray<Readonly<{
    name: string
    data: IStudentHome
  }>>
}>