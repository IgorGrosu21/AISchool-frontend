import type { IUser } from '../../listed'

export type IPersonPermissions = Readonly<{
  user: IUser
  isAutoCreated: boolean
} & (IStudentPermissions & {
  profileType: 'student'
} | ITeacherPermissions & {
  profileType: 'teacher'
} | {
  profileType: 'parent'
})>

type IStudentPermissions = Readonly<{
  schoolSlug: string | null
  klassSlug: string | null
  isManager: boolean
}>

type ITeacherPermissions = Readonly<{
  klassSlug: string | null
  workPlaces: ReadonlyArray<Readonly<{
    schoolSlug: string
    isManager: boolean
  }>>
}>