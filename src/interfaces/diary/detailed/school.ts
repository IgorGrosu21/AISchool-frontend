import type { IMedia, IWithFilesData } from '../../media'
import type { IKlassName, ILessonName, ISchoolName, ILessonTimeName, IStudentName } from '../name'
import type { IStudent, ISchool, IPosition, ITeacher, IGroupWithLessons, IGroup, ISchoolWithReplacements, IParent } from '../listed'
import type { IDetailedCity } from './country'
import type { HasSchoolSlug } from '../primitives'

export type IDetailedSchool = ISchool & IWithFilesData & {
  readonly city: IDetailedCity
}

export type ISchoolWithKlasses = Omit<ISchoolName, 'preview'> & {
  klasses: IKlassName[]
}

export type ISchoolWithTimetable = Omit<ISchoolWithKlasses, 'klasses'> & {
  lang: string
  subjectSlugs: string[]
  timetable: ILessonTimeName[]
  staff: Array<IPosition & { isManager: boolean }>
  readonly klasses: ReadonlyArray<IKlassName>
}

export type IKlassWithLessons = Omit<IKlassName, keyof HasSchoolSlug> & {
  groups: IGroupWithLessons[]
  lessons: ILessonName[]
  school: ISchoolWithReplacements
  teacher: ITeacher | null
  readonly students: ReadonlyArray<IStudentName>
}

export type IDetailedKlass = Omit<IKlassName, keyof HasSchoolSlug> & {
  groups: IGroup[]
  students: Array<IStudent & { isManager: boolean }>
  readonly parents: ReadonlyArray<IParent>
  readonly teacher: Readonly<ITeacher> | null
  readonly school: Readonly<ISchoolWithReplacements>
  readonly lessons: ReadonlyArray<ILessonName>
  readonly photo: IMedia
}