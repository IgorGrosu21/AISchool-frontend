import type { IUser } from '../../listed'
import type { ILessonTimeName, IStudentName } from '../../name'
import type { ISchoolWithHolidays, ISubject } from './utils'

export type IPersonJournal = Readonly<{
  id: string
} & (IStudentJournal & {
  profileType: 'student'
} | ITeacherJournal & {
  profileType: 'teacher'
} | IParentJournal & {
  profileType: 'parent'
})>

type IStudentJournal = Readonly<{
  subjects: ReadonlyArray<ISubject>
}>

type ITeacherJournal = Readonly<{
  schools: ReadonlyArray<Readonly<Omit<ISchoolWithHolidays, 'timetable'>> & Readonly<{
    id: string
    klassesOrGroups: ReadonlyArray<Readonly<{
      id: string
      slug: string
      type: 'klass' | 'group'
      students: ReadonlyArray<IStudentName>
      subjects: ReadonlyArray<Readonly<ISubject> & Readonly<{
        timetable: ILessonTimeName[]
      }>>
    }>>
  }>>
}>

type IParentJournal = Readonly<{
  children: ReadonlyArray<IStudentJournal & Readonly<{
    id: string
    user: IUser
  }>>
}>