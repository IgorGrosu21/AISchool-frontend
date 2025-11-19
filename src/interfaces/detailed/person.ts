import type { IStudent, IKlass, ITeacher, IPosition, IParent, IStudentWithKlass, IUser, INote, ILessonTime } from '../listed'
import type { ILessonName, ISchoolName, ISpecificLessonName, ISubjectName } from '../name'
import type { IDetailedUser } from './user'
import type { ICanEdit } from './canEdit'
import type { IDetailedHomework } from './lesson'

type IDetailedPerson = ICanEdit & {
  id: string
  user: IDetailedUser
}

export type IDetailedParent = IParent & IDetailedPerson & {
  students: IStudentWithKlass[]
}

export type IDetailedStudent = IStudent & IDetailedPerson & {
  klass?: IKlass
}

export type IDetailedTeacher = ITeacher & IDetailedPerson & {
  workPlaces: IPosition[]
  subjects: ISubjectName[]
  experience: number
}

export type IPersonHome = {
  id: string
  user: IUser
} & (IStudentHome & {
  profileType: 'student'
} | ITeacherHome & {
  profileType: 'teacher'
} | IParentHome & {
  profileType: 'parent'
} | IStaffHome & {
  profileType: 'staff'
})

type IAnalytics<T> = Array<{
  subjectName: ISubjectName
  points: Array<T>
}>

type IDefaultHome<T> = {
  tomorrowTimetable: Array<Omit<ILessonTime, 'lessons'> & {lesson?: ILessonName, specificLesson?: ISpecificLessonName}>
  latestData: T[]
}

type IStudentHome = IDefaultHome<INote> & {
  analytics: IAnalytics<{
    date: string
    value: string
  }>
}

type ITeacherHome = IDefaultHome<IDetailedHomework> & {
  analytics: Array<{
    school: ISchoolName
    subjects: IAnalytics<{
      slug: string
      values: string[]
    }>
  }>
}

type IParentHome = {
  students: Array<{
    name: string
    data: IStudentHome
  }>
}

type IStaffHome = {
  id: string
  user: IUser
}