import type { IStudent, ITeacher, IPosition, IParent, IStudentWithKlass } from '../../listed'
import { IKlassName } from '../../name'
import type { IUserAccount } from './account'

export type IPersonProfile = {
  readonly account: IUserAccount
} & (IStudentProfile & {
  readonly profileType: 'student'
} | ITeacherProfile & {
  readonly profileType: 'teacher'
} | IParentProfile & {
  readonly profileType: 'parent'
})

type IStudentProfile = Omit<IStudent, 'user'> & {
  klass: IKlassName | null
}

type ITeacherProfile = Omit<ITeacher, 'user'> & {
  workPlaces: IPosition[]
  subjectSlugs: string[]
  experience: number
}

type IParentProfile = Omit<IParent, 'user'> & {
  students: IStudentWithKlass[]
}