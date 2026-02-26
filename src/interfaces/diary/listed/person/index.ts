import type { IMedia } from '../../../media'
import type { IKlassName, ISchoolName, ITeacherName, IUserName, IReplacementName } from '../../name'

export type IUser = IUserName & Readonly<{
  avatar: IMedia | null
}>

type IPerson = {
  id: string
  readonly user: IUser
}

export type IParent = IPerson

export type IStudent = IPerson

export type IStudentWithKlass = IStudent & Readonly<{
  klass: IKlassName | null
  school: ISchoolName | null
}>

export type ITeacher = IPerson

export type ITeacherWithReplacements = ITeacherName & {
  subjectSlugs: string[]
  replacements: IReplacementName[]
}

export type { IParentBulkCreate, IStudentBulkCreate, ITeacherBulkCreate } from './bulkCreate'
export type { IParentInvitation, IStudentInvitation, ITeacherInvitation } from './invitation'