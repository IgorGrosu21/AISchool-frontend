import type { IUser } from '../../listed'
import type { ILessonName } from '../../name'
import type { ISchoolWithHolidays } from './utils'

export type IPersonDiary = Readonly<{
  id: string
} & (IStudentDiary & {
  profileType: 'student'
} | ITeacherDiary & {
  profileType: 'teacher'
} | IParentDiary & {
  profileType: 'parent'
})>

type IStudentDiary = Readonly<{
  school: ISchoolWithHolidays
  lessons: ILessonName[]
}>

type ITeacherDiary = Readonly<{
  schools: ReadonlyArray<ISchoolWithHolidays & {
    lessons: ILessonName[]
  }>
}>

type IParentDiary = Readonly<{
  children: ReadonlyArray<IStudentDiary & Readonly<{
    id: string
    user: IUser
  }>>
}>